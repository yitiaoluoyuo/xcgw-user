'use strict'

import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  // 当响应异常时做一些处理
  return Promise.resolve(error.response)
})


function checkStatus(response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}


function checkCode(res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    swal(res.msg)
  }
  if (res.data && (res.data.status === 1)) {
    //alert(res.data.msg || '哪里不对了~')
    swal(res.data.msg)
  }
  console.log('---------------checkCode res-----------------', res)
  return res.data
}


export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: 'http://www.5aitou.com/',
      url,
      data: qs.stringify(data),
      timeout: 3000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }
    }).then(
      (response) => {
        // return checkStatus(response)
        console.log('response:', response)
        return response.data
      }
    )
  },
  get(url, params) {
    return axios({
      method: 'get',
      baseURL: 'http://mxcgw.s1.natapp.cc',
      url,
      params, // get 请求时带的参数
      timeout: 3000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        return checkCode(res)
      }
    )
  }
}
