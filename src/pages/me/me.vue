<template>
    <div>
        <div class="container">
            <div class="userinfo">
                <img :src="imgUrl">
                <p class="username">{{userinfo.nickName}}</p>
            </div>
            <YearProgress />
            <button open-type="getUserInfo" @click="login" v-if="!userinfo.openId">登录</button>
            <button class="btn" @click='handelAddBook'>添加图书</button>
        </div>
    </div>
</template>

<script>
import qcloud from 'wafer2-client-sdk'
import config from '../../utils/config.js'
import YearProgress from '@/components/YearProgress.vue'
import {showSuccess, post, showModal} from '@/utils/index'
export default {
  components: {
    YearProgress
  },
  data () {
    return {
      userinfo: {}
    }
  },
  methods: {
    // 发送请求，添加图书
    async addBook (isbn) {
      const result = await post('/addbook', {isbn, openId: this.userinfo.openId})
      if (result.code === 0 && result.data.title) {
        showModal('添加图书成功', result.data.title + '添加成功')
      } else {
        showModal('添加图书失败', result.data.msg)
      }
    },
    handelAddBook () {
      // 扫码
      wx.scanCode({
        success: res => {
          const {result: isbn} = res
          this.addBook(isbn)
        }
      })
    },
    login () {
      wx.showLoading({
        title: '登录中',
        mask: true
      })
      let self = this
      qcloud.setLoginUrl(config.loginUrl)
      qcloud.login({
        success: function (userInfo) {
          self.userinfo = userInfo
          showSuccess('登陆成功')
          // 把登录信息存放在缓存中
          wx.setStorageSync('userinfo', userInfo)
          wx.hideLoading()
        },
        fail: function (err) {
          wx.hideLoading()
          showModal('错误', '登录失败')
          console.log('登录失败', err)
        }
      })
    }
  },
  computed: {
    imgUrl () {
      return this.userinfo.openId ? this.userinfo.avatarUrl : require('../../../static/img/unlogin.png')
    }
  },
  onShow () {
    const userinfo = wx.getStorageSync('userinfo')
    if (userinfo) {
      this.userinfo = userinfo
    }
  },
}
</script>

<style scoped lang='less'>
.container {
  padding: 0 30rpx;
}
.userinfo {
  text-align: center;
  margin-top: 50rpx;
  img {
    width: 200rpx;
    height: 200rpx;
    border-radius: 100rpx;
    margin: 0 auto;
  }
}
</style>

