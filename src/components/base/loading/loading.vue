<template>
  <div class="loading">
    <img src="./loading.gif">
    <p class="desc">{{title}}</p>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    props: {
      title: {
        type: String,
        default: '正在载入...'
      }
    }
  }
</script>
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"

  .loading{
    width: 100%
    text-align: center
    img {
      width: 20px
      height: 20px
    }
    .desc{
      line-height: 20px
      font-size: $font-size-small
      color: $gray-3
    }
  }

</style>
