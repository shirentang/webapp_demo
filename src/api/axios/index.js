import { VAxios } from './axios'

const local = {
    baseURL: 'http://127.0.0.1:7100',
    timeout: 5*1000,
  }

const vAxios = new VAxios({
  baseURL: local.baseURL,
  timeout: local.timeout,
})

export default vAxios