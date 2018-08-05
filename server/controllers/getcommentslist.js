const { mysql } = require('../qcloud')

module.exports = async (ctx) => {
    const { bookid, page, openId } = ctx.request.query
    let size = 6
    try {
        // 这里mysqlselect是一个异步任务，还没有执行
        const mysqlselect = mysql('comments')
            .select('comments.*', 'cSessionInfo.user_info')
            // 连表查询,查询的表是comments和cSessionInfo，连接条件是comments.openid=cSessionInfo.open_id
            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id');
            let result;
            if(bookid){ // 图书详情页发起的获取评论列表请求，根据bookid获取这本书的所有评论
                result = await mysqlselect
                .where('bookid', bookid)
                .limit(size)
                .offset(Number(page) * size)
                .orderBy('comments.id', 'desc');
            }else if(openId){ //个人评论页面发起获取评论列表请求，根据openId获取用户的所有评论
                result = await mysqlselect.where('openId',openId);
            }
        ctx.state.data = {
            code: 0,
            data: {
                commentslist: result.map(v => {
                    const userinfo = JSON.parse(v.user_info)
                    return Object.assign({}, v, {
                        user_info: {
                            nickName: userinfo.nickName,
                            avatarUrl: userinfo.avatarUrl
                        }
                    })
                })
            }
        }
    } catch (e) {
        ctx.state.data = {
            code: 1,
            data: {
                msg: '服务器出现错误'
            }
        }
    }
}
