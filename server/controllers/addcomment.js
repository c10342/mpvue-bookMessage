const {mysql} = require('../qcloud')

module.exports = async (ctx) => {
    // console.log(ctx.request.body)
    try {
        await mysql('comments').insert(ctx.request.body)
        ctx.state.data = {
            code: 0,
            data: {
                msg: 'success'
            }
        }
    } catch (e) {
        ctx.state.data = {
            code: 1,
            data: {
                msg: '发表评论失败'
            }
        }
    }
}
