<template>
<a :href="detailUrl">
    <div class="book-card">
        <div class="thumb">
            <img 
            @click.stop='previewImage'
            :src="book.image" 
            class="img" 
            mode='aspectFit'>
        </div>      
        <div class="detail">
            <div class="row firstrow">
                <div class="left">{{book.title}}</div>
                <div class="ri">
                    <div class="rate">{{book.rate}}</div>
                    <Start :value='book.rate' />
                </div>
            </div>
            <div class="row">
                <div class="left">{{book.author}}</div>
                <div class="right">浏览量 : {{book.count}}</div>
            </div>
            <div class="row">
                <div class="left">{{book.publisher}}</div>
                <div class="right">{{book.user_info.nickName}}</div>
            </div>
        </div>
    </div>
    </a>
</template>

<script>
import Start from './Start.vue'
export default {
  components: {
    Start
  },
  props: ['book'],
  computed: {
    detailUrl () {
      return `/pages/bookDetail/main?bookid=${this.book.id}`
    }
  },
  methods: {
    previewImage () {
      wx.previewImage({
        // 当前显示的图片链接
        current: this.book.image,
        // 需要预览的图片链接列表
        urls: [this.book.image]
      })
    }
  }
}
</script>

<style scoped lang='less'>
.book-card {
  padding: 5px;
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  overflow: hidden;
  font-size: 17px;
  .thumb {
    width: 100px;
    height: 120px;
    margin: 0 5px;
    .img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .detail {
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    .firstrow {
      color: #ec5049;
    }
    .row {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .left {
        flex: 6;
      }
      .ri {
        padding-right: 10px;
        flex: 4;
        display: flex;
        flex-direction: row;
        .rate {
          margin-right: 7px;
        }
      }
      .right{
        text-align: right;
        padding-right: 10px;
      }
    }
  }
}
</style>
