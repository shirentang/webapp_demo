import axios, { AxiosHeaders } from 'axios'
import { Modal } from 'antd-mobile'

export class VAxios {

  constructor(config) {
    this.instance = axios.create(config)
    this.setupInterceptors()
  }

  setupInterceptors() {
    this.instance.interceptors.request.use(
      config => config,
      error => Promise.reject(error),
    )

    this.instance.interceptors.response.use(
      (res) => {
        return res},
      (error) => {
        // Modal.alert({
        //   content: '连接错误',
        //   onConfirm: () => {
        //     console.log('Confirmed')
        //   },
        // })
        return Promise.reject(error)
      },
    )
  }

  transformResponse(res) {
    // 处理错误 及 返回数据
    const error = null
    const { data } = res

    return { data, error }
  }

  request(config) {
    return new Promise((resolve, reject) => {
      this.instance
        .request(config) 
        .then((res) => {
          const { data, error } = this.transformResponse(res.data)

          if (error)
            reject(error)
          else
            resolve(data)
        })
        .catch(error => reject(error))
    })
  }

  get(config) {
    return this.request({ ...config, method: 'GET' })
  }

  post(config) {
    return this.request({ ...config, method: 'POST' })
  }
}
