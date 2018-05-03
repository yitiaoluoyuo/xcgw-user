<template>
  <div class="cart-page">


    <scroll class="content-cart" :data="cartVo">
      <div>
        <div class="shop-list" v-for="item in cartVo">
          <div>{{ item.shopName }}</div>
          <div class="product-list" v-for="p in item.cartProductVoNewList">
            <input type="checkbox" :value='p' v-model="p.productChecked" @change="checkBoxOnchange(p)"/>
            <img :src="p.productMainImage"/>
            <div>
              <p>{{p.productName}}</p>
              <p>{{ p.property }} {{ p.specification}}</p>
              <p>￥{{ p.productPrice }}</p>
            </div>
            <div class="count">
              <p>
                <button class="counter-btn" @click="addOne(p.productInfoId)">+</button>
              </p>
              <p>{{ p.quantity }}</p>
              <p>
                <button class="counter-btn" @click="minusOne(p.productInfoId)">-</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </scroll>
    <div class="title-cart">
      <div></div>
      <div>购物车</div>
      <div @click="deleteCheck()">删除</div>
    </div>


    <div class="footer">
      <div><input type="checkbox"/>全选</div>
      <div>合计:￥{{totalPrice}}</div>
      <div @click="settlement()">结算</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../api/http.js"
  import url from "../../api/url.js"
  import Scroll from '../../components/base/scroll/scroll.vue'

  export default {
    components: {Scroll},
    data() {
      return {
        cartVo: [],
        totalPrice: 0.00,
      }
    },
    methods: {
      deleteCheck() {
        if (this.cartVo.length === 0) {
          return
        }
        if (this.totalPrice === 0) {
          return
        }
        api.get(url.buyer.cart.delete_checked).then((res) => {
          console.log("checked:", res)
          if (res.status === 0) {
            this.getList()
          }
        })
      },
      checkBoxOnchange(p) {
        console.log("checkBoxOnchange:", p)
        //数据库产品选中状态
        if (p.productChecked === 1 || p.productChecked === true) {
          this.checked(p.productInfoId)
        }
        if (p.productChecked === 0 || p.productChecked === false) {
          this.unChecked(p.productInfoId)
        }
        this.getPrice()
      },
      settlement() {
        //检查是否选择一家店铺的产品
        api.get(url.buyer.order.checkUp).then((res) => {
          console.log("settlement:", res)
          if (res.status === 0) {
            this.$router.replace("confirmOrder")
          }
        })

      },
      checked(productInfoId) {
        api.get(url.buyer.cart.select, {productInfoId: productInfoId}).then((res) => {
          console.log("checked:", res)
          if (res.status === 0) {
            this.getList()
          }
        })
      },
      unChecked(productInfoId) {
        api.get(url.buyer.cart.unSelect, {productInfoId: productInfoId}).then((res) => {
          console.log("unChecked:", res)
          if (res.status === 0) {
            //window.location.reload(true)
            this.getList()
          }
        })
      },
      getPrice() {
        let data = this.cartVo
        console.log("getPeice-this.cartVo:", this.cartVo)
        this.totalPrice = 0
        for (let i in data) {
          let cartProductVoNewList = data[i].cartProductVoNewList
          for (let j in cartProductVoNewList) {
            if (cartProductVoNewList[j].productChecked === 1 ||
              cartProductVoNewList[j].productChecked === true) {
              this.totalPrice += cartProductVoNewList[j].productPrice * cartProductVoNewList[j].quantity
            }
          }
        }
      },
      addOne(productInfoId) {
        api.get(url.buyer.cart.addOne, {productInfoId: productInfoId}).then((res) => {
          console.log("addOne:", res)
          if (res.status === 0) {
            //window.location.reload(true)
            this.getList()
          }
        })
      },
      minusOne(productInfoId) {
        api.get(url.buyer.cart.minusOne, {productInfoId: productInfoId}).then((res) => {
          console.log("minusOne:", res)
          if (res.status === 0) {
            //window.location.reload(true)
            this.getList()
          }
        })
      },

      getList() {
        api.get(url.buyer.cart.getList).then((res) => {
          console.log("getList()", res)
          if (res.status === 0) {
            this.cartVo = _.map(res.data, (item) => {
              return {
                shopId: item.shopId,
                shopName: item.shopName,
                cartProductVoNewList: item.cartProductVoNewList,
              }
            })
            this.Scroll.methods.refresh()
            console.log("this.cartVo", this.cartVo)
          }
        })
      }
    },
    created(){
      this.getList()
    },
    mounted() {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .cart-page {
    .title-cart {
      display: flex
      flex-direction: row
      height: 40px
      background: $color-theme
      position: fixed
      top: 0
      left: 0
      right: 0
      div {
        color: #fff
        flex: 1
        text-align: center
        line-height: 40px
      }

    }
    .content-cart {
      list(column)
      margin-top: 40px
      margin-bottom: 80px
      .shop-list {
        list(row)
        width: 100%
        padding: 5px 7px
        box-sizing: border-box;
        border-bottom: 5px solid $color-background
        div {
          &:first-child {
            width: 100%
            height: 30px
            line-height: 30px
            border-bottom: 1px solid $color-background
          }

        }
        .product-list {
          list(row)
          width: 100%
          align-items: center
          margin-top: 4px
          border-bottom: 1px solid $color-background
          &:first-child {
            background: #c60023
          }
          input {
            width: 20px
          }
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
            p {
              .counter-btn {
                height: 20px;
                line-height: 20px;
                width: 20px;
                font-size: 16px
                color: #fff
                background: $color-theme
                border: 1px solid #e3e3e3;
                border-radius: 6px
                text-align: center;
                cursor: pointer;
              }
              &:nth-child(2) {
                background: $color-background-panel
              }
            }
          }
        }
      }
    }
    .footer {
      list(row)
      align-items: center
      height: 40px
      justify-content: space-between
      position: fixed
      bottom: 40px
      left: 0px
      right: 0px
      border-bottom: 1px solid $color-background
      border-top: 2px solid $color-background
      div {
        line-height: 40px
        text-align: center
        padding: 0px 10px
        &:first-child {
          flex: 1.5
        }
        &:nth-child(2) {
          flex: 3
          text-align: right
        }
        &:nth-child(3) {
          flex: 2
          background: $color-theme
        }
      }
    }
  }


</style>
