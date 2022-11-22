import axios from "axios"

const instance = axios.create()  // 创建axios实例

import qs from 'qs'

const myaxios = {

  // url 请求地址
  // params: 请求参数(Object形式)
  /**
   * 
   * @param {*} url 请求资源路径
   * @param {*} params 请求参数(Object形式)
   * @returns 
   */
  get(url, params) {
    return instance({
      url,
      method: 'GET',
      params
    })
  },
  /**
   * 
   * @param {string} url 请求资源路径
   * @param {object} params  请求参数(Object形式)
   * @returns Promise
   */
  post(url, params) {
    return instance({
      url,
      method: 'POST',
      data: qs.stringify(params)
    })
  },
}

export default myaxios