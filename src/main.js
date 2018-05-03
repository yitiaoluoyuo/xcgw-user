// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import Layout from 'components/layout/layout.vue'
import router from './router'
import FastClick from 'fastclick'
import VueLazyload from 'vue-lazyload'
import VueSwal from 'vue-swal'
import Toast from 'vue-easy-toast'


import 'common/stylus/index.styl'

Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(VueLazyload, {
  loading: require('common/image/default.png')
})
Vue.use(VueSwal)
Vue.use(Toast)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { Layout },
  template: '<Layout/>'
})
