<template>
    <div class="book-detail-info">
        <div class="thumb">
            <img 
            :src="bookDetailInfo.image"
            mode='aspectFill'
            class="back"
            >
            <img
            :src="bookDetailInfo.image"
            mode='aspectFit'
            class="img"
            >
            <div class="info">
                <div class="title">{{bookDetailInfo.title}}</div>
                <div class="author">{{bookDetailInfo.author}}</div>
            </div>
        </div>
        <div class="detail">
            <div>
                <img
                 :src="userinfo.avatarUrl" 
                 class="avatar"
                 mode='aspectFit'
                 >
                {{userinfo.nickName}}
            </div>
            <div class="rate">
                {{bookDetailInfo.rate}}分  
                <Start :value="bookDetailInfo.rate" />
            </div>
        </div>
        <div class="detail">
            <div>
                {{bookDetailInfo.publisher}}
            </div>
            <div>
                {{bookDetailInfo.price}}
            </div>
        </div>
        <div>
            <div class="tags" :key="i" v-for="(tag,i) in bookDetailInfo.tags">
                {{tag}}
            </div>
        </div>
        <div>
            <p class="summary" v-for="(summary,i) in bookDetailInfo.summary" :key="i">
                {{summary}}
            </p>
        </div>
    </div>
</template>

<script>
import Start from './Start.vue'
export default {
  components: {
    Start
  },
  props: ['bookDetailInfo'],
  computed: {
    userinfo () {
      return this.bookDetailInfo.user_info || {}
    }
  }
}
</script>
<style lang="less" scoped>
.book-detail-info {
  .thumb {
    position: relative;
    overflow: hidden;
    .back {
      width: 100%;
      height: 500rpx;
      filter: blur(15px);
    }
    .img {
      position: absolute;
      height: 300rpx;
      // 因为设置了图片的裁剪缩放模式，所以设置width: 100%也不会占满整个屏幕，只会居中显示
      width: 100%;
      left: 0;
      top: 30rpx;
    }
    .info {
      color: white;
      position: absolute;
      top: 330rpx;
      left: 0;
      width: 100%;
      .title {
        font-weight: 700;
        text-align: center;
        font-size: 20px;
      }
      .author {
        text-align: center;
        font-size: 16px;
      }
    }
  }
  .detail {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 15px;
    .avatar {
      width: 70rpx;
      height: 70rpx;
      vertical-align: middle;
      border-radius: 50%;
    }
    .rate{
        display:flex;
        flex-direction: row;
        width: 250rpx;
        color: #EC5049
    }
  }
  .tags{
      border-radius: 7px;
      border: 1px solid #EC5049;
      display: inline-block;
      color: #EC5049;
      margin: 7px 5px 7px 12px;
      padding: 5px;
      font-size: 18px;
  }
  .summary{
      font-size: 18px;
      padding: 15px;
    //   首行空2个字出来
      text-indent: 2em;
  }
}
</style>
