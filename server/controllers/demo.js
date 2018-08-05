module.exports = async (ctx, next) => {
    ctx.state.data = {msg: 'hello'}
}
