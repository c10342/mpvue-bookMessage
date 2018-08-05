import Vue from 'vue'
import App from './App'

// 关闭生产环境下的提示
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    // 这里的pages与原生的pages不一样，这里的page只需要写首页的路径，其他页面可写可不写，每个页面下的main.js是入口文件,这里main后缀名不能写，否则报错
    pages: ['^pages/books/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#EC5049',
      navigationBarTitleText: '小林图书',
      navigationBarTextStyle: 'black'
    },
    tabBar: {
      selectedColor: '#EC5049',
      list: [
        {
          // 这里main后缀名不能写，否则报错
          pagePath: 'pages/books/main',
          text: '图书',
          iconPath: 'static/img/book.png',
          selectedIconPath: 'static/img/book-active.png'
        },
        {
          pagePath: 'pages/comments/main',
          text: '评论',
          iconPath: 'static/img/todo.png',
          selectedIconPath: 'static/img/todo-active.png'
        },
        {
          pagePath: 'pages/me/main',
          text: '我',
          iconPath: 'static/img/me.png',
          selectedIconPath: 'static/img/me-active.png'
        }
      ]
    }
  }
}
