<template>
  <div class="tab">
    <router-link tag="div" class="tab-item" to="/home">
      <span class="tab-link">首页</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/cart">
      <span class="tab-link">购物车</span>
    </router-link>
    <router-link tag="div" class="tab-item" to="/mine">
      <span class="tab-link">我的</span>
    </router-link>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  .tab
    position: fixed
    left: 0
    right: 0
    bottom: 0
    display: flex
    height: 40px
    line-height: 40px
    font-size: $font-size-medium
    background: $color-background-panel
    .tab-item
      flex: 1
      text-align: center
      .tab-link
        padding-bottom: 5px
      &.router-link-active
        .tab-link
          color: $color-theme
          border-bottom: 2px solid $color-theme
</style>
