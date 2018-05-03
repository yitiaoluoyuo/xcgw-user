<template>
  <div class="mine-page">
    <div class="header">个人中心</div>
    <div class="order">
      <div class="my-order"><p>我的订单</p>
        <p>全部订单>></p></div>
      <div class="order-category">
        <p>待付款</p>
        <p>待收货</p>
        <p>售后</p>
      </div>
      <router-link tag="div" class="shipping" to="/shipping">
        <p>收货地址</p>
        <p> > </p>
      </router-link>
    </div>
    <div class="lists"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {},
    data() {
      return {}
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .mine-page {
    list(column)
    .header {
      width: 100%
      height: 50px
      line-height: 50px
      text-align: center
      color: #fff
      font-size: 17px
      background: $color-theme

    }
    .order {
      list(column)
      background: $color-background
      .my-order {
        list(row)
        box-sizing: border-box
        width: 100%
        justify-content: space-between
        padding: 15px 10px
        p {
          color :$gray-2
          &:nth-child(2) {
            text-align: right
            color :$gray-3
          }
        }
      }
      .order-category {
        list(row)
        box-sizing: border-box
        width: 100%
        justify-content: space-between
        padding: 18px 20px
      }

    }
    .shipping {
      list(row)
      box-sizing: border-box
      width: 100%
      justify-content: space-between
      margin-top: 20px
      padding: 10px 20px
    }
  }
</style>
