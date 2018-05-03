import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/indexPage.vue'
import Home from '../pages/home/index.vue'
import Cart from '../pages/cart/index.vue'
import Mine from '../pages/mine/index.vue'
import ConfirmOrder from '../pages/order/confirmOrder.vue'
import Shipping from '../pages/mine/shipping/shipping.vue'
import AddShipping from '../pages/mine/shipping/addShipping.vue'
import ProductDetail from '../pages/detail/index.vue'
import Login from '../pages/public/login.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: IndexPage,
      redirect: 'home',
      children: [
        {
          path: 'home',
          component: Home,
        },
        {
          path: 'cart',
          component: Cart,
        },
        {
          path: 'mine',
          component: Mine,
        },

      ]
    },
    {
      path: '/productDetail/:id',
      component: ProductDetail

    },
    {
      path: '/login',
      component: Login

    },
    {
      path: '/shipping',
      component: Shipping
    },
    {
      path: '/addShipping',
      component: AddShipping

    },
    {
      path: '/confirmOrder',
      component: ConfirmOrder

    },
  ]
})
