
const https = require('https')

const {mysql} = require('../qcloud')

function getJSON (url) {
    return new Promise((resolve, reject) => {
        // res返回的数据以流的形式返回
        https.get(url, res => {
            let urlData = ''
            // 接收数据
            res.on('data', data => {
                urlData += data
            })
            // 接收数据结束
            res.on('end', data => {
                const bookInfo = JSON.parse(urlData)
                if (bookInfo.title) {
                    resolve(bookInfo)
                }
                reject(bookInfo)
            })
        })
    })
}

module.exports = async (ctx) => {
    const { isbn, openId } = ctx.request.body
    // 查找要添加的图书是否已经存在
    const findRes = await mysql('books').select().where('isbn', isbn)
    if (findRes.length !== 0) {
        ctx.state.data = {
            code: -1,
            data: {
                msg: '图书已存在'
            }
        }
        return
    }
    let url = 'Https://api.douban.com/v2/book/isbn/' + isbn
    const result = await getJSON(url)

    // 过滤数据
    const rate = result.rating.average
    // 标题，图片，豆瓣地址，出版社，简介，价格
    const { title, image, alt, publisher, summary, price } = result
    const tags = result.tags.map(v => {
        return `${v.title} ${v.count}`
    }).join(',')
    const author = result.author.join(',')

    // 往数据库中插入数据
    try {
        await mysql('books').insert({ isbn, openId, rate, title, image, alt, publisher, summary, price, tags, author })
        ctx.state.data = {
            code: 0,
            data: {
                title,
                msg: '添加成功'
            }
        }
    } catch (e) {
        ctx.state.data = {
            code: -1,
            data: {
                msg: '服务器出错,添加失败'
            }
        }
    }
}
