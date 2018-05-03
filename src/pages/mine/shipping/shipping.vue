<template>
  <div class="shipping-page">
    <div class="header">
      <p>地址管理</p>
      <router-link tag="p" class="add" to="/addShipping">添加</router-link>
    </div>
    <div class="shipping-list" v-for="(item ,index) in shippingList">
      <div>
        <span>{{ item.receiverName }}</span>
        <span>{{ item.receiverPhone }}</span>
      </div>
      <div>{{ item.receiverDistrict }} {{ item.receiverAddress }}</div>
      <div>
        <span class="default" @click="setDefault(item.isDefault, index)">
          <input type="checkbox" v-model="item.isDefault"/>
          <em>设置为默认</em>
        </span>
        <span @click="deleteS(item.id)">删除</span>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../../api/http.js"
  import url from "../../../api/url.js"

  export default {
    components: {},
    data() {
      return {
        shippingList: []
      }
    },
    computed: {
      resetCheck: {
        get: function () {
          return 1
        }
        ,
        set: function (newValue) {
          console.log("newValue ", newValue)
        }
      }
    },
    methods: {
      deleteS(id) {
        api.get(url.buyer.shipping.del, {shippingId: id}).then((res) => {
          if (res.status === 0) {
            this.getShippingList()
          }
        })
      },
      setDefault(isDefault, index) {
        if (isDefault === 1 || isDefault === true) {
          return
        }
        let params = {id: this.shippingList[index].id}
        api.get(url.buyer.shipping.setDefault, params).then((res) => {
          if (res.status === 0) {
            this.getShippingList()
          }
        })
      },
      getShippingList() {
        api.get(url.buyer.shipping.list).then((res) => {
            if (res.status === 0) {
              this.shippingList = _.map(res.data.list, (item) => {
                return {
                  id: item.id,
                  receiverName: item.receiverName,
                  isDefault: item.isDefault,
                  receiverPhone: item.receiverPhone,
                  receiverProvince: item.receiverProvince,
                  receiverCity: item.receiverCity,
                  receiverDistrict: item.receiverDistrict,
                  receiverAddress: item.receiverAddress,
                }
              })
            }
          }
        )
      }
    }
    ,
    mounted() {
      this.getShippingList()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  @import "../../../common/stylus/mixin.styl"
  .shipping-page {
    list(column)
    background :$color-background
    .header {
      width: 100%
      height: 50px
      line-height: 50px
      text-align: center
      color: #fff
      font-size: 17px
      background: $color-theme
      .add {
        position: fixed
        top: 0px
        right: 15px
        font-size: 15px

      }
    }
    .shipping-list {
      border :1px solid #fff
      border-radius :12px
      list(column)
      padding-top: 5px
      margin-bottom :10px
      margin-top :5px
      div {
        list(row)
        width: 100%
        padding: 5px 15px 5px 15px
        font-size: $font-size-medium
        justify-content: space-between
        &:nth-child(3) {
          padding: 15px 15px 13px 15px
          border-top: 1px solid $gray-5
        }
        .default {
          list(row)
          align-items: center
          em {
            padding-left: 3px
          }
        }
      }

    }
  }
</style>
