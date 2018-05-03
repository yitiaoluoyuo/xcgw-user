<template>
  <div class="detail-content">
    <h4 class="title-cart">-- 热卖商品 --</h4>
    <div class="items">
      <router-link v-for="item in PList" class="item"
                   :to="{ path: 'productDetail/'+item.id}"
                   tag="div">
        <img v-lazy=item.mainImage alt="">
        <p>{{ item.name }}</p>
        <p>{{ item.area }}</p>
        <p><em class="red">￥</em><em class="red">{{ item.price }}</em><em>已售{{ item.salesCount
          }}</em></p>
      </router-link>

    </div>
    <div class="loading-container" v-show="!PList.length">
      <loading></loading>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
  import _ from "lodash"
  import api from "../../api/http.js"
  import url from "../../api/url.js"
  import Loading from '../../components/base/loading/loading.vue'

  export default {
    components: {Loading},
    data() {
      return {
        PList: []
      }
    },
    methods: {
      getProductList() {
        api.get(url.buyer.product.allList).then((res) => {
          if (res.status === 0) {
            let list = []
            list = _.map(res.data.list, (item) => {
              return {
                id: item.id,
                mainImage: item.mainImage,
                name: item.name,
                area: item.area,
                price: item.price,
                salesCount: item.salesCount,
              }
            })
            this.PList = list
            console.log("this.PList", this.PList)
          } else {
            alert(res.msg || "哪里出错了~")
          }
        })
      }
    },
    mounted() {
      this.getProductList()
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  .detail-content {
    background: $color-background-panel
    .title-cart {
      width: 100%
      text-align: center;
      padding: 10px 0px
      font-size: $font-size-large
    }
    .items {
      display: flex
      flex-direction: row
      width: 100%
      flex-wrap: wrap
      .item {
        display: flex
        flex-direction: row
        justify-content: center;
        flex-wrap: wrap
        width: 50%;
        box-sizing: border-box;
        padding-bottom: 2px;
        border-bottom: solid 4px #eee;
        &:nth-child(2n+1) {
          border-right: solid 2px #eee;
        }
        &:nth-child(2n) {
          border-left: solid 2px #eee;
        }
        h4 {
          font-size: 13px;
          line-height: 20px;
        }
        p {
          width: 100%;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          margin: 2px 10px;
          color: #888;
          letter-spacing: 1.1px;
          &:nth-child(2) {
            color: #444;
          }
          &:nth-child(3) {
            font-size: 12px;
            text-align: right;
            paddind-right: 2px;
          }
        }
        em {
          &:first-child {
            font-size: 7px;
          }
          &:nth-child(2) {
            font-size: 14px;

          }
          &:nth-child(3) {
            font-size: 10px;
            margin-left: 10px;
          }
        }
        img {
          margin: 5px auto;
          width: 100px;
          height: 100px;

        }
        .red {
          color: #F04752;
        }
      }

    }

    .loading-container {

      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
    }

  }


</style>
