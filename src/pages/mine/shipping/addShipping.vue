<template>
  <div class="addShipping-page">
    <div class="header">
      <p>添加地址</p>
    </div>
    <div class="form">
      <div><span>收件人</span><input v-model="shipping.receiverName" placeholder="姓名"/></div>
      <div><span>联系电话</span><input v-model="shipping.receiverPhone" placeholder="电话"/></div>
      <div><span class="area">所在地区</span>
        <Selection class="selection"
                   :selections="areaSelections"
                   @on-change="onParamChange('areaSelected',$event)"
        ></Selection>
      </div>
      <div><textarea v-model="shipping.receiverAddress" placeholder="详细地址信息"></textarea></div>
    </div>
    <dl @click="addShipping()">保存</dl>
  </div>
</template>

<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../../api/http.js"
  import url from "../../../api/url.js"
  import Selection from '../../../components/base/selection.vue'

  export default {
    components: {
      Selection,
    },
    data() {
      return {
        shipping: {
          receiverName: '',
          receiverPhone: '',
          receiverDistrict: '',
          receiverAddress: '',
        },
        areaSelections: [],
        areaSelected: '',
      }
    },
    methods: {
      onParamChange(attr, val) {
        this[attr] = val.label
      },
      addShipping() {
        let params = {
          receiverName: this.shipping.receiverName,
          receiverPhone: this.shipping.receiverPhone,
          receiverDistrict:this.areaSelected,
          receiverAddress: this.shipping.receiverAddress,
        }
        api.get(url.buyer.shipping.add, params).then((res) => {
            if (res.status === 0) {
              this.$router.replace("shipping")
            }
          }
        )

      },
      getArea() {
        api.get(url.buyer.area.get, {areaId: 0}).then((res) => {
            if (res.status === 0) {

              this.areaSelections = _.map(res.data, (item) => {
                return {
                  label: item.areaName,
                  id: item.id,
                }
              })
              this.areaSelected = this.areaSelections[0].label
            }
          }
        )
      }
    },
    mounted() {
      this.getArea()
    }

  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/stylus/variable.styl"
  @import "../../../common/stylus/mixin.styl"
  .addShipping-page {
    background: $color-background
    .header {
      width: 100%
      height: 50px
      line-height: 50px
      text-align: center
      color: #fff
      font-size: 17px
      background: $color-theme

    }
    .form {
      list(row)
      width: 100%
      padding: 10px 15px
      div {
        list(row)
        width: 100%
        align-items: center
        border-bottom: 1px solid $gray-5
        padding: 8px 0px
        font-size: $font-size-medium
        span {
          flex: 2
          color: $gray-2
        }
        input {
          flex: 7
          color: $gray-3
        }
        textarea {
          width: 100%
          border: none
        }

        .area {
          flex: 2
        }
        .selection {
          flex: 7
          border: none
        }

      }

    }
    dl {
      background: #fff
      margin-top: 12px
      width: 100%
      padding: 10px
      font-size: $font-size-large
      text-align: center
      color: $color-theme
    }
  }
</style>
