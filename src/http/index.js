import axios from 'axios'

const instance = axios.create({
  // baseURL: 'http://127.0.0.1:3000/api/report/v1/',
  baseURL: 'http://1.117.1.94:8889/api/report/v1/',
  timeout: '5000',
  method: 'GET'
})

// 请求拦截器
instance.interceptors.request.use(
  config => {
    // 此处编写请求拦截代码，一般用于加载弹窗，或者每个请求都需要携带的token
    console.log('正在请求...')
    return config
  },
  err => {
    console.log('请求失败', err)
  }
)

// 响应拦截器
instance.interceptors.response.use(
  res => {
    console.log('响应成功')
    //该返回对象会绑定到响应对象中
    return res
  },
  err => {
    console.log('请求失败', err)
  }
)

export default instance
