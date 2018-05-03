<template>
  <scroll  class="content">
    <h-slider/>
    <hot-product/>
  </scroll>
</template>

<script type="text/ecmascript-6">
  import Scroll from '../../components/base/scroll/scroll.vue'
  import HSlider from "./hslider.vue"
  import HotProduct from "./hotProduct.vue"

  export default {
    components:{
      HSlider,
      HotProduct,
      Scroll,
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

</style>
