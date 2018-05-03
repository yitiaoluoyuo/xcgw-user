<template>
  <div class="login-from">
    <input type="text" v-model="usernameOrPhone"/>
    <input type="password" v-model="password"/>
    <button @click="login">登录</button>
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
        usernameOrPhone: '',
        password: ''
      }
    },
    methods: {
      login() {
        let params = {
          usernameorphone:this.usernameOrPhone,
          password:this.password
        }
        api.get(url.buyer.user.login,params).then((res)=>{
          if(res.status === 0){
           // $.toast("登录成功")
            this.$router.replace("home")
          }
        })


      }
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/variable.styl"
  @import "../../common/stylus/mixin.styl"
  .login-from {
    items()
    height: 100%;
    line-height: 60px
    input {
      padding: 10px 20px
      margin :20px 5px
      border: 1px solid $color-background
    }

  }
</style>
