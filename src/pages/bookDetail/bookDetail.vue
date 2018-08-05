<template>
    <div>
      <BookDetailInfo :bookDetailInfo='bookDetailInfo'/>
      <div class="comments" v-if="isshow">
        <textarea 
        v-model="comments"
        placeholder="请输入内容"
        :maxlength="200"
        class="textarea"
        />
        <div class="location">
          地理位置 : 
          <switch
          color='#EC5049'
          :checked='location'
          @change.stop="getlocation"
          />
          <span class="text">{{location}}</span>
        </div>
        <div class="phone">
          手机型号 : 
          <switch
          :checked='phone'
          color='#EC5049'
          @change.stop="getphone"
          />
          <span class="text">{{phone}}</span>
        </div>
        <button class="btn" @click="addcomment">发表评论</button>
      </div>
      <CommentsList :comments='commentsList' />
      <div v-if="!isshow" class="text">没登录或者已经评论过了</div>
    </div>
</template>

<script>
import { get, showModal, post } from '@/utils/index'
import BookDetailInfo from '@/components/BookDetailInfo.vue'
import CommentsList from '@/components/CommentsList.vue'
export default {
  components: {
    BookDetailInfo,
    CommentsList
  },
  data () {
    return {
      bookId: '',
      bookDetailInfo: '',
      comments: '',
      location: '',
      phone: '',
      userinfo: '',
      commentsList: [],
      page: 0,
      hasMore: true
    }
  },
  mounted () {
    // 获取小程序在 page onLoad 时候传递的 options
    // 在所有 页面 的组件内可以通过 this.$root.$mp.query 进行获取。
    this.bookId = this.$root.$mp.query.bookid
    this.getBookDetail()
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
    this.page = 0
    this.getCommentList(0)
  },
  methods: {
    // 获取图书详情
    async getBookDetail () {
      const result = await get('/bookdetail', { id: this.bookId })
      if (result.code === 0) {
        wx.setNavigationBarTitle({
          title: result.data.bookDetailInfo.title
        })
        this.bookDetailInfo = result.data.bookDetailInfo
      }
    },
    // 获取地理位置
    getlocation (e) {
      let self = this
      // 通过申请成为百度开发者获取得到的ak(服务密钥)
      let ak = 'D4TUf5STtrmb7UxDDjpPfnXhkGvg5DvD'
      // 获取地理位置的地址
      let url = 'http://api.map.baidu.com/geocoder/v2/'
      if (e.target.value) {
        wx.getLocation({
          success (res) {
            wx.request({
              url,
              methods: 'GET',
              data: {
                ak,
                // 返回的数据格式
                output: 'json',
                // 经纬度
                location: `${res.latitude},${res.longitude}`
              },
              success (result) {
                self.location = result.data.result.formatted_address
              },
              fail () {
                self.location = '未知地理位置'
              }
            })
          }
        })
      } else {
        this.location = ''
      }
    },
    // 获取手机型号
    getphone (e) {
      if (e.target.value) {
        let res = wx.getSystemInfoSync()
        this.phone = res.model
      } else {
        this.phone = ''
      }
    },
    // 发表评论
    async addcomment () {
      if (!this.comments) {
        showModal('提示', '评论不能为空')
        return
      }
      const data = {
        openid: this.userinfo.openId,
        bookid: this.bookId,
        comment: this.comments,
        location: this.location,
        phone: this.phone
      }
      try {
        const result = await post('/addcomment', data)
        if (result.code === 0) {
          this.comments = ''
          this.page = 0
          this.getCommentList(0)
          showModal('成功', '发表评论成功')
        } else {
          showModal('错误', result.data.msg)
        }
      } catch (e) {
        showModal('错误', e.msg)
      }
    },
    // 获取评论列表
    async getCommentList (page) {
      try {
        const result = await get('/getcommentslist', {
          bookid: this.bookId,
          page
        })
        if (result.code === 0) {
          if (result.data.commentslist.length < 6 && page > 0) {
            this.hasMore = false
          }
          if (page === 0) {
            this.commentsList = result.data.commentslist
          } else {
            this.commentsList = this.commentsList.concat(
              result.data.commentslist
            )
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  },
  computed: {
    isshow () {
      // 没有登录
      if (!this.userinfo.openId) {
        return false
      }
      // 登陆了且已经评论过了
      if (
        this.commentsList.filter(v => v.openid === this.userinfo.openId).length
      ) {
        return false
      }
      return true
    }
  },
  // 点击右上角的分享按钮
  onShareAppMessage: function (res) {
    // return {
    //   title: "自定义转发标题",
    //   path: "/page/bookDetail/main?bookid=" + this.bookId
    // };
  },
  // 上拉触底
  onReachBottom () {
    // 没有更多数据
    if (!this.hasMore) {
      return
    }
    this.page = this.page + 1
    this.getCommentList(this.page)
  }
}
</script>


<style scoped lang='less'>
.comments {
  margin-top: 5px;
  .textarea {
    width: 100%;
    height: 200rpx;
    background-color: #cccccc;
    padding: 10px;
  }
  .location {
    margin: 15px;
  }
  .phone {
    margin: 15px;
  }
  .text {
    color: #ec5049;
    margin-left: 10px;
  }
  .btn {
    width: 100%;
    margin-bottom: 20px;
  }
}
.text {
  text-align: center;
  padding: 15px;
  font-size: 16px;
}
</style>


