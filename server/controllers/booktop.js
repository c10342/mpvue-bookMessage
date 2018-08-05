const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const result = await mysql('books')
        .select('id', 'title', 'image', 'count')
        .orderBy('count', 'desc')
        .limit(9)

    ctx.state.data = {
        code: 0,
        data: {
            booktop: result
        }
    }
}
