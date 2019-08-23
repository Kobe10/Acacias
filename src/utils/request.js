import axios from 'axios'
import {Message, MessageBox} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

/**
 * 请求字符串处理：json=> urlStr
 * @param obj
 * @return {string}
 */
const toQueryString = function(obj) {
  return obj ? Object.keys(obj).sort().map(function(key) {
    const val = obj[key]
    if (Array.isArray(val)) {
      return val.sort().map(function(val2) {
        return encodeURIComponent(key) + '=' + encodeURIComponent(val2)
      }).join('&')
    }
    return encodeURIComponent(key) + '=' + encodeURIComponent(val)
  }).join('&') : ''
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.BASE_API, // api 的 base_url
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  withCredentials: true,
  timeout: 50000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    let sendData = config.data
    if (config.method === 'get') {
      sendData = config.params
    }
    if (!sendData) {
      sendData = {}
    }
    if (store.getters.token) {
      // 让每个请求携带token-- ['X-Token']为自定义key 请根据实际情况自行修改
      sendData['LOGIN_ACCEPT'] = getToken()
    }
    if (config.method === 'get') {
      config.params = sendData
    } else if (config.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      config.data = toQueryString(sendData)
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  // response => response,
  /**
   * 下面的注释为通过在response里，自定义code来标示请求状态
   * 当code返回如下情况则说明权限有问题，登出并返回到登录页
   * 如想通过 xmlhttprequest 来状态码标识 逻辑可写在下面error中
   * 以下代码均为样例，请结合自生需求加以修改，若不需要，则可删除
   */
  response => {
    let errorJson = response.headers['error-json']
    if (errorJson) {
      errorJson = JSON.parse(errorJson)
      if (errorJson.code === '121004') {
        MessageBox.confirm('当前会话已失效，请重新登录系统', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return
    }
    // 正常返回了数据
    let res = response.data
    if (res.success === undefined) {
      res.success = res.isSussess
    }
    if (res.success === undefined) {
      res.success = res.isSuccess
    }
    // 临时处理
    if (res.success === undefined && res.data === undefined) {
      res = {success: true, data: res}
    }
    if (!res.success) {
      if (res.code === '121004') {
        MessageBox.confirm('当前会话已失效，请重新登录系统', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      } else {
        Message({
          message: res.msg,
          type: 'error',
          duration: 5 * 1000
        })
      }
      return Promise.reject(response.data)
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
