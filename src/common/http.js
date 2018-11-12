/**
 * http配置
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// 超时时间
axios.defaults.timeout = 10000
//axios.defaults.baseURL = 'http://jkzs.sytlj.com:8089/api'
//axios.defaults.baseURL = 'http://sy.66diqiu.cn/api'
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
	const token = localStorage.getItem('token');
	config.headers.common['Authorization'] = 'Bearer ' + token;
	//console.log(config)
	return config
}, error => {
 	console.log('req error')
	return Promise.reject(error)
})


// http响应拦截器
axios.interceptors.response.use(data => {
	return data
}, error => {
 	console.log('res error...')
	return Promise.reject(error)
})

export default axios