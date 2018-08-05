import Vue from 'vue'

import Books from './books.vue'

const app = new Vue(Books)

app.$mount()

export default{
  config: {
    // 开启下拉刷新
    enablePullDownRefresh: true
  }
}
