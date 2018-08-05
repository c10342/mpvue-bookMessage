<template>
    <div class="progressbar">
        <progress :percent='percent' activeColor='#EC5049' />
        <p>{{year}}年已经过去{{days}}天，{{percent}}%</p>
    </div>
</template>

<script>
export default {
  methods: {
    // 判断是否为闰年
    isLeapYear () {
      const year = new Date().getFullYear()

      if (year % 400 === 0) {
        return true
      } else if (year % 4 === 0 && year % 100 !== 0) {
        return true
      } else {
        return false
      }
    },
    // 获取一年有多少天
    getDaysOfYear () {
      return this.isLeapYear() ? 366 : 365
    }
  },
  computed: {
    year () {
      return new Date().getFullYear()
    },
    days () {
      let start = new Date()
      // 今年的第一个月
      start.setMonth(0)
      // 今年的第一天
      start.setDate(1)
      // start是1月1日

      // now是当前的时间戳
      let now = new Date().getTime()

      let offset = now - start.getTime()

      // 根据时间戳的差计算出今年过了多少天
      let day = parseInt(offset / 1000 / 60 / 60 / 24) + 1

      return day
    },
    percent () {
      // toFixed(1)保留小数点后一位
      return (this.days * 100 / this.getDaysOfYear()).toFixed(1)
    }
  }
}
</script>

<style scoped lang='less'>
.progressbar {
  width: 100%;
  text-align: center;
  margin: 40rpx 0 50rpx 0;
  p {
    margin-top: 30rpx;
  }
}
</style>
