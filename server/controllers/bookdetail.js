const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { id } = ctx.request.query

    const result = await mysql('books')
        .select('books.*', 'cSessionInfo.user_info')
        .join('cSessionInfo', 'books.openId', 'cSessionInfo.open_id')
        .where('id', id)
        // 获取第一条数据，直接返回的是一个json对象，而不是数组
        .first()

    const info = JSON.parse(result.user_info)
    ctx.state.data = {
        code: 0,
        data: {
            bookDetailInfo: Object.assign({}, result, {
                tags: result.tags.split(','),
                summary: result.summary.split('\n'),
                user_info: {
                    nickName: info.nickName,
                    avatarUrl: info.avatarUrl
                }
            })
        }
    }

    await mysql('books')
        .where('id', id)
        // 让count这个字段加一
        .increment('count', 1)
}
