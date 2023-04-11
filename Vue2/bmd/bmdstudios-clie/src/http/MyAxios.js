import axios from 'axios'
const instance = axios.create() // 创建axios实例
import qs from 'qs'

import store from '../store/index'

// 封装请求拦截器,发请求之前,携带token一起发送
// 每次使用instance对象发送请求时,都会先执行这个请求拦截器
// 中定义的箭头函数,config => {}
// config对象用于封装请求数据包,可以把token字符串绑定到config对象的请求消息头中,既可在每一个请求中携带token消息头
instance.interceptors.request.use(config => {
  let token = store.state.token // 从vuex中获取token
  if (token) {
    // 把token绑定在authorization消息头上,一起发送请求
    config.headers.authorization = token
  }

  return config
})

const myaxios = {
  /** 用于发送get请求
   *  url: 请求资源路径
   *  params: 请求参数（Object形式）
   */
  get(url, params) {
    return instance({
      url,
      method: 'get',
      params,
    })
  },

  /**
   * 用于发送post请求
   * @param {String} url   请求资源路径
   * @param {Object} params   请求参数（对象类型）
   * @returns Promise
   */
  post(url, params) {
    return instance({
      url,
      method: 'post',
      data: qs.stringify(params),
    })
  },
}

export default myaxios
