<template>
    <div>
        <TopSwiper :tops='tops' v-if="tops.length" />
        <Card :key="book.id" v-for="book in bookList" :book='book' />
        <p class="text-footer" v-if="!more">没有更多数据了</p>
        <p class="text-footer" v-if="!bookList.length">还没有图书，赶紧去添加吧</p>
    </div>
</template>

<script>
import { get } from '@/utils/index'
import Card from '@/components/Card.vue'
import TopSwiper from '@/components/TopSwiper.vue'
export default {
  components: {
    Card,
    TopSwiper
  },
  data () {
    return {
      bookList: [],
      page: 0,
      more: true,
      tops: []
    }
  },
  methods: {
    // 获取图书列表
    async getBookList (init) {
      // init为真表示是首次加载或者是下拉刷新
      if (init) {
        this.page = 0
        this.more = true
      }
      
      // 显示导航条加载动画
      wx.showNavigationBarLoading()
      const result = await get('/booklist', { page: this.page })
    
      if (result.code === 0) {
        // 上拉刷新时没有更多数据，因为每一页显示6条数据，小于6条说明没有更多数据了
        if (result.data.booklist.length < 6 && this.page > 0) {
          this.more = false
        }

        if (init) {
          // 下拉刷新的情况
          // 直接覆盖掉原来的数据
          this.bookList = result.data.booklist
          // 停止下拉刷新
          wx.stopPullDownRefresh()
        } else {
          // 下拉触底的情况
          // 把请求回来的数据拼接上去
          this.bookList = this.bookList.concat(result.data.booklist)
        }
      }

      // 隐藏导航条加载动画
      wx.hideNavigationBarLoading()
    },
    // 获取图书点击量高的图书
    async getBookTop () {
      const result = await get('/booktop')
      if (result.code === 0) {
        this.tops = result.data.booktop
      }
    }
  },
  mounted () {
    this.getBookList(true)
    this.getBookTop()
  },
  // 下拉刷新
  onPullDownRefresh () {
    this.getBookList(true)
    this.getBookTop()
  },
  // 上拉触底
  onReachBottom () {
    // 没有更多数据
    if (!this.more) {
      return
    }
    this.page = this.page + 1
    this.getBookList(false)
  }
}
</script>

<style>
</style>