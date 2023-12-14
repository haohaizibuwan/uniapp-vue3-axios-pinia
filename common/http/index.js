import Request from './fetch';

const http = new Request()

http.interceptor.request((config, cancel) => { /* 请求之前拦截器 */
	let uuid = uni.getStorageSync('uuid');
	let token = uni.getStorageSync('token');
	// console.log(token);
	config.header = {
		'Authorization': "appclient YXBwY2xpZW50OjYzYzVmOWMyMjc4NTAwYjJlYWM3YzM0MGYyMjRjMDc1YWU3MWIzOGY=",
		'Blade-UUID': uuid,
		// 'content-type': 'application/json',
		'tenant-id': '000000',
		'Blade-X': token
	}

	if(config.custom.loading){
		uni.showLoading({
			title: config.custom.loading,
			mask: true
		})
	}else{
	}
	
    console.log(config);
	return config
})

// 必须使用异步函数，注意
http.interceptor.response(async (response) => { /* 请求之后拦截器 */
	console.log(response);
	if (response.statusCode !== 200 && response.statusCode !== 403) { // 请求状态码 如果不是200则说明请求异常
	  return Promise.reject(response);
	  uni.hideLoading();
	  return false;
	}
	return response.data
}, (response) => { // 请求错误做点什么
	return response
})

export {
	http
}
