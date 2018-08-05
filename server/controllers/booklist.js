const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    // const result = await mysql('books').select('*');
    // ctx.state.data={
    //     code:0,
    //     data:{
    //         booklist:result
    //     }
    // }

    // 分页，页码
    const { page, openId } = ctx.request.query
    // 每一页显示多少条数据
    const size = 6
    // 实现链表查询，查找出添加图书的人
    const mysqlselect = mysql('books')
    //     // 查找的列
        .select('books.*', 'cSessionInfo.user_info')
    //     // 要连接的表和连接起来的条件
        .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
    //     // 每次查询6条数据
    //     // .limit(size)
    //     // 从第几条数据开始查询
    //     // .offset(Number(page) * size)
    //     // 对查询出来的结果进行降序排序，使新添加的图书在最前面，因为新添加的图书id一定是比较大的，id自增长的
        .orderBy('books.id', 'desc')

    let result;
    if (openId) {
        // 个人页面获取所有图书
        result = await  mysqlselect.where('openId', openId)
    } else {
        // 图书页面获取图书
        // 实现链表查询，查找出添加图书的人
        result = await mysqlselect
            .limit(size)
            // 从第几条数据开始查询
            .offset(Number(page) * size)
    }
    ctx.state.data = {
        code: 0,
        data: {
            booklist: result.map(v => {
                // 获取出添加图书的人，user_info是以字符串的形式存储在表中的,同时只过滤出user_info中有用的部分，其他的不要
                const userinfo = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    user_info: {
                        nickName: userinfo.nickName
                    }
                })
            })
        }
    }
}
