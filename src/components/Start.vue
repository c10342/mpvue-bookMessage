<template>
    <div class="rate">
        <div class="whitestarts">☆☆☆☆☆</div>
        <div class="blackstarts" :style="style">★★★★★</div>
    </div>
</template>

<script>
export default {
  props: {
    value: { type: [Number, String], default: '0' }
  },
  computed: {
    style () {
      return `width:${this.value / 3}em`
    }
  }
}
</script>

<style scoped lang='less'>
.rate {
  position: relative;
  .whitestarts {
    position: absolute;
    top: 0;
    left: 0;
  }
  .blackstarts {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    overflow: hidden;
  }
}
</style>
