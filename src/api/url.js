const buyer = {
  product: {
    list: '/buyer/product/list.do',
    allList: '/buyer/product/all_list.do',
    detail: '/buyer/product/detail.do',
  },
  cart: {
    add: '/buyer/cart/add.do',
    addOne: '/buyer/cart/addOne.do',
    minusOne: '/buyer/cart/minusOne.do',
    getList: '/buyer/cart/list.do',
    select: '/buyer/cart/select.do',
    unSelect: '/buyer/cart/un_select.do',
    delete_checked: '/buyer/cart/delete_product_checked.do',
  },
  user: {
    login: '/buyer/user/login.do',
  },
  order: {
    create: '/buyer/order/create.do',
    confirm: '/buyer/order/confirm.do',
    checkUp: '/buyer/order/check_up.do',
  },
  pay:{
    create: '/buyer/pay/create.do',
  },
  area: {
    get: '/buyer/area/get_area.do',
  },
  shipping: {
    add: '/buyer/shipping/add.do',
    list: '/buyer/shipping/list.do',
    setDefault: '/buyer/shipping/set_default.do',
    del: '/buyer/shipping/del.do',
  }
}

export default {
  buyer,
}
