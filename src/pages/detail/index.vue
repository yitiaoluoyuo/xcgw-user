<template>
  <div class="detail-content">
    <main-img :items="mainImgs"/>

    <div class="info">
      <div class="item">
        <p>{{ detailVo.name }}</p>
      </div>
      <div class="item">
        <p>{{ detailVo.shopName }}</p>
        <p class="area">{{ detailVo.sellerArea }}</p>
      </div>
      <div class="item">
        <p class="price"><span>￥</span><span>{{ price }}</span></p>
        <p>库存{{ detailVo.stock }}</p>
        <p class="sellCount">已售{{ detailVo.salesCount }}</p>
      </div>
    </div>

    <div class="property">
      <dl class="item">
        <p>选择属性：</p>
        <chooser :selections="propertyS" @on-change="onParamChange('property', $event)"></chooser>
      </dl>
      <dl class="item">
        <p>选择规格：</p>
        <chooser :selections="specificationS" @on-change="onParamChange('specification', $event)"></chooser>
      </dl>
    </div>

    <div class="detail">
      <div class="title-cart">
        -- 商品详情 --
      </div>
      <div class="info" id="detail">
        <!-- <p>这里是商品详情</p>
         <p>这里是商品详情</p>
         <p>这里是商品详情</p>
         <p>这里是商品详情</p>-->
      </div>
    </div>

    <div class="footer">
      <p>这里是footer</p>
      <p>这里是footer</p>
      <p>这里是footer</p>
      <p>这里是footer</p>
      <p>这里是footer</p>
      <p>这里是footer</p>
    </div>

    <div class="detail-tab">
      <p>店铺</p>
      <p @click="addCart">加入购物车</p>
    </div>

  </div>
</template>

<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../api/http.js"
  import url from "../../api/url.js"
  import MainImg from './mainImg.vue'
  import Chooser from '../../components/base/chooser.vue'

  export default {
    components: {
      MainImg,
      Chooser,
    },
    data() {
      return {
        property: '',
        specification: '',
        productInfoId:'',
        price: '',
        stock: '',
        mainImgs: [{
          src: "//m.360buyimg.com/n12/jfs/t17383/125/1470478028/71155/1cb53bc2/5acc5248N6a5f81cd.jpg!q70.jpg",
        }],
        propertyS: [],
        specificationS: [],
        productInfoList: [],
        detailVo: {},
      }
    },
    methods: {
      onParamChange(attr, val) {
        this[attr] = val
        console.log('onParamChange', val)
        this.getPrice()
      },
      getPrice() {
        for (let index in this.productInfoList) {
          let productInfo = this.productInfoList[index]
          if (productInfo.property === this.property.label &&
            productInfo.specification === this.specification.label) {
            this.price = productInfo.price
            this.detailVo.stock = productInfo.stock
            this.productInfoId = productInfo.id
          }
        }
      },
      addCart() {
        let params = {
          count: 1,
          productId: this.detailVo.id,
          productInfoId: this.productInfoId,
        }
        api.get(url.buyer.cart.add, params).then((res) => {
            if(res.status === 0){
              //alert("添加购物车成功！")
              this.$toast('添加购物车成功',{
                horizontalPosition: 'center',
                verticalPosition: 'center',
                duration: 1000,
              })
            }
        })
      },
      getProductDetail() {
        let params = {productId: this.$route.params.id}
        console.log("params:", params)
        api.get(url.buyer.product.detail, params).then((res) => {
          if (res.status === 0) {
            let data = res.data
            console.log("res:", res)
            this.detailVo = {
              name: data.name,
              subImages: data.subImages,
              salesCount: data.salesCount,
              shopName: data.shopName,
              sellerArea: data.sellerArea,
              productInfoList: data.productInfoList,
              stock: data.stock,
              detail: data.detail,
              id: data.id,
            }
            document.getElementById('detail').innerHTML = data.detail
            let subImages = data.subImages.split(",")
            this.mainImgs = _.map(subImages, (item) => {
              return {
                src: item
              }
            })


            let productInfoList = new Array();
            let propertys = new Array();
            let specifications = new Array();
            productInfoList = this.detailVo.productInfoList
            this.productInfoList = this.detailVo.productInfoList
            for (let i = 0; i < productInfoList.length; i++) {
              if (propertys.indexOf(productInfoList[i].property) === -1) {
                propertys.push(productInfoList[i].property)
              }
              if (specifications.indexOf(productInfoList[i].specification) === -1) {
                specifications.push(productInfoList[i].specification)
              }
            }

            for (let item in propertys) {
              this.propertyS.push({
                label: propertys[item]
              })
            }
            for (let item in specifications) {
              this.specificationS.push({
                label: specifications[item]
              })
            }
            this.specification = this.specificationS[0]
            this.property = this.propertyS[0]

            for (let index in productInfoList) {
              let productInfo = productInfoList[index]
              if (productInfo.property === this.property.label &&
                productInfo.specification === this.specification.label) {
                this.price = productInfo.price
                this.productInfoId = productInfo.id
              }
            }

          }
        })
      }
    },
    created() {
      // 组件创建完后获取数据，
      // 此时 data 已经被 observed 了
      this.getProductDetail()
    },
    mounted() {

    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .detail-content {
    .info {
      margin: 0px
      items()
      .item {
        item()
        justify-content: space-between
        align-items: flex-end
        p {
          font-size: $font-size-medium
        //no-wrap()
        }
        .price {
          color: #F04752;
          span {
            &:first-child {
              font-size: 2px
            }
            &:nth-child(2) {
              font-size: $font-size-large
            }
          }

        }

      }
    }

    .property {
      margin-top: 2px
      items()
      .item {
        align-items: baseline
        item()
      }
    }
    .detail {
      margin-top: 2px
      line-height: 20px;
      items()
      .title-cart {
        text-align: center
        height: 40px
        line-height: 40px
      }
      .info {
        border-top: 1px solid $color-background
      }
    }
    .footer {
      background: $color-background-panel
      margin-top: 2px
      padding: 10px
      line-height: 30px
      margin-bottom: 42px
    }
    .detail-tab {
      display: flex
      flex-direction: row
      position: fixed
      justify-content: center
      left: 0
      right: 0
      bottom: 0
      height: 40px
      margin: 0
      background: $color-background-panel
      p {
        text-align: center
        line-height: 40px
        &:first-child {
          flex: 2
          color: $color-text
          border-right: 2px solid $color-background
        }
        &:nth-child(2) {
          flex: 3
          color: #fff
          background: $color-theme
        }
      }
    }
  }

</style>
