import axios from 'axios';
import mpAdapter from "axios-miniprogram-adapter";
import adapter from './adapter.js';
axios.defaults.adapter = adapter;
axios.defaults.retry = 5; // 设置请求次数
axios.defaults.retryDelay = 1000;// 重新请求时间间隔
import {
	netConfig
} from '@/common/config/net.config';
import indexStore from '@/store/index.js';
const {
	baseURL,
	contentType,
	requestTimeout,
	successCode
} = netConfig;

let tokenLose = true;

const instance = axios.create({
	baseURL: baseURL[0],
	timeout: requestTimeout,
	headers: {
		'Content-Type': contentType,
		'Authorization': "Basic YXBwY2xpZW50OjYzYzVmOWMyMjc4NTAwYjJlYWM3YzM0MGYyMjRjMDc1YWU3MWIzOGY=",
		'Blade-UUID': uni.getStorageSync('uuid'),
		'tenant-id': '000000',
		'Accept-Language': 'zh-CN,zh;q=0.9'
	},
	adapter: mpAdapter
});


// request interceptor
instance.interceptors.request.use(
	(config) => {
		if (config.baseURLIndex) {
			config.baseURL = baseURL[config.baseURLIndex]
		}
		if (uni.getStorageSync('token')) {
			config.headers['Blade-X'] = uni.getStorageSync('token') || '';
		}
		let {
			axiosStore
		} = indexStore();
		config.cancelToken = new axios.CancelToken(cancel => {
			// 存入一个cancel token
			axiosStore.addCancelToken(cancel);
		})
		// do something before request is sent
		return config;
	},
	(error) => {
		console.log(error);
		// do something with request error
		return Promise.reject(error);
	}
);

// response interceptor
instance.interceptors.response.use(
	/**
	 * If you want to get http information such as headers or status
	 * Please return  response => response
	 */
	(response) => {
		console.log(response);
		const res = response.data;
		// 请求出错处理
		// -1 超时、token过期或者没有获得授权
		if (res.status === -1 && tokenLose) {
			tokenLose = false;
			// uni.showToast({
			// 	title: '服务器异常',
			// 	duration: 2000
			// });

			return Promise.reject(res);
		}
		const status = res.status || res.statusCode;
		if (successCode.indexOf(status) !== -1) {
			return Promise.reject(res);
		}
		return res;
	},
	(error) => {
		console.log(error.response);
		uni.hideLoading()
		return Promise.reject(error.response);
	}
);

export default instance;