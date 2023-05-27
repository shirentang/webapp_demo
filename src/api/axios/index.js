import { VAxios } from './axios'

const local = {
    baseURL: '',
    timeout: 5*1000,
  }

const vAxios = new VAxios({
  baseURL: local.baseURL,
  timeout: local.timeout,
})

export default vAxios