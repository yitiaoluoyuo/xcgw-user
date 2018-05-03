<template>
  <div class="confirm-order-page">
    <div class="title">
      <p><<&nbsp;确认订单</p>
    </div>
    <div class="shipping">
      <div>
        <div>
          <span>{{orderVo.shipping.receiverName}}</span>
          <span>{{orderVo.shipping.receiverPhone}}</span>
        </div>
        <div>收货地址：{{orderVo.shipping.receiverDistrict}} {{orderVo.shipping.receiverAddress}}</div>
      </div>
    </div>
    <div class="order-info">
      <div><p>{{ orderVo.shopName }}</p></div>
      <div class="product-list" v-for="item in orderVo.orderItemVoList">
        <img :src="item.productImage"/>
        <div>
          <p id="product-name">{{item.productName}}</p>
          <p>{{item.property}} - {{item.specification}}</p>
          <p class="colour">￥{{item.currentUnitPrice}}</p>
        </div>
        <div class="count">
          <p>数量：{{ item.quantity }}</p>
        </div>
      </div>

      <div><p>配送方式:</p>
        <p>送货上门</p></div>
      <div><p>运费:</p>
        <p>0元</p></div>
      <div><p>买家留言：</p><input placeholder="填写的内容已经和卖家协商确认"/></div>
      <div>共5件商品 &nbsp;&nbsp; 小计:<span class="colour">￥{{orderVo.payment}}</span></div>
    </div>
    <div class="bar">
      <p>合计:<span class="colour">￥{{orderVo.payment}}</span></p>
      <p @click="createOrder()">提交订单</p>
    </div>


  </div>
</template>
<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../api/http.js"
  import url from "../../api/url.js"

  export default {
    components: {},
    data() {
      return {
        orderVo: '',
        shippingId: '',
        sendType: 0,
        payResponse: ''
      }
    },
    methods: {
      confirmOrder() {
        api.get(url.buyer.order.confirm).then((res) => {
          if (res.status === 0) {
            console.log("order.confirm:", res)
            let vo = res.data
            this.orderVo = {
              shipping: vo.shipping,
              orderItemVoList: vo.orderItemVoList,
              shopName: vo.shopName,
              payment: vo.payment,
            }
            this.shippingId = this.orderVo.shipping.id
            console.log("orderVo", this.orderVo)
          }
        })
      },
      createOrder() {
        let params = {
          shippingId: this.shippingId,
          sendType: this.sendType,
        }
        api.get(url.buyer.order.create, params).then((res) => {
          if (res.status === 0) {
            let bo = res.data
            let params = {
              openid: bo.openid,
              orderAmount: bo.orderAmount,
              orderId: bo.orderId,
              orderName: bo.orderName,
              payTypeEnum: bo.payTypeEnum,
            }
            api.get(url.buyer.pay.create, params).then((res) => {
              console.log("pay.create", res)
              eval(res)
            })
          }

        })
      },
    },
    mounted() {
      this.confirmOrder()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .confirm-order-page {
    list(column)
    background: $color-background
    .title {
      width: 100%
      height: 50px
      line-height: 50px
      text-align: left
      color: #fff
      font-size: $font-size-large
      padding-left: 10px
      background: $color-theme
      position: fixed
      top: 0px
    }
    .shipping {
      list(column)
      padding: 8px 15px
      margin-top: 50px
      div {
        list(row)
        width: 100%
        justify-content: space-between
        padding: 3px 0px
        font-size: $font-size-medium
        line-height: 1.1
      }

    }
    .order-info {
      margin-top: 3px
      margin-bottom: 41px
      list(row)
      width: 100%
      padding: 5px 7px
      box-sizing: border-box;
      border-bottom: 5px solid $color-background
      div {
        list(row)
        width: 100%
        padding: 6px
        font-size: $font-size-medium
        &:first-child {
          height: 30px
          line-height: 30px
          font-size: $font-size-medium-x
          border-bottom: 1px solid $color-background
        }
        input {
          flex: 1
        }
      }
      .product-list {
        list(row)
        width: 100%
        align-items: center
        margin-top: 4px
        border-bottom: 1px solid $color-background
        img {
          width: 60px
          height: 60px
        }
        div {
          flex: 6
          list(column)
          padding-left: 4px
          justify-content: space-between
          p {
            font-size: 12px
            &:first-child {
              flex: 2
              line-height: 1.1
              padding: 2px 0px
            }
            &:nth-child(2) {
              flex: 1
              padding: 2px 0px
            }
            &:nth-child(3) {
              flex: 1
              padding: 2px 0px
            }
          }
        }
        .count {
          flex: 2
          list(column)
          align-items: center
          margin: 4px
        }
      }
    }
    .bar {
      list(row)
      width: 100%
      height: 40px
      position: fixed
      bottom: 0px
      justify-content: space-between
      align-items: center
      p {
        box-sizing: border-box
        padding: 10px 20px
        height: 100%
        &:nth-child(2) {
          background: $color-theme
          color: #fff
        }

      }
    }
    .colour {
      color: $color-theme
    }

  }
</style>
