<template>
  <section class="mainImg">
    <slider :options="options" :items="items"></slider>
  </section>
</template>

<script type="text/ecmascript-6">
  import Slider from '../../components/base/slider.vue'

  export default {
    components: {
      Slider,
    },
    props: {
      items: {
        type: Array,
        default() {
          return [
            {
              src: "//m.360buyimg.com/n12/jfs/t17383/125/1470478028/71155/1cb53bc2/5acc5248N6a5f81cd.jpg!q70.jpg",
            }, {
              src: "//m.360buyimg.com/n12/jfs/t17383/125/1470478028/71155/1cb53bc2/5acc5248N6a5f81cd.jpg!q70.jpg",
            }
          ]
        }
      },
    },
    data() {
      return {
        options: {
          autoplay: false,
          loop: false,
        }
      }
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .mainImg
    margin: 0px
    img
      width: 100%


</style>
