<template>
    <div class="swiper">
        <swiper
    :indicator-dots='true'
    indicator-color='#EC5049'
    :autoplay='true'
    :duration='1000'
    :circular='true'
    >
        <div v-for="(bookitem,divindex) in bookArry" :key="divindex">
            <swiper-item>
                <image 
                @click.stop='bookdetail(item)'
                mode='aspectFit'
                class="slider-image" 
                v-for="item in bookitem" 
                :key="item.id"
                :src='item.image'
                />
            </swiper-item>
        </div>
</swiper>
    </div>
</template>

<script>
export default {
  props: ['tops'],
  computed: {
    // 把传递过来的图书分为3个数组
    bookArry () {
      let item = this.tops
      return [item.slice(0, 3), item.slice(3, 6), item.slice(6)]
    }
  },
  methods: {
    bookdetail (item) {
      wx.navigateTo({
        url: `/pages/bookDetail/main?bookid=${item.id}`
      })
    }
  }
}
</script>

<style lang="less" scoped>
.swiper {
  margin-top: 10px;
  .slider-image {
    width: 33.3%;
    height: 290rpx;
  }
}
</style>
