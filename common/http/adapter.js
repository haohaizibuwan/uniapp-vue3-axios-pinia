import settle from "@/node_modules/axios/lib/core/settle"
import buildURL from "@/node_modules/axios/lib/helpers/buildURL"

/* 格式化路径 */
const URLFormat = function(baseURL, url) {
	return url.startsWith("http") ? url : baseURL
}

/* axios适配器配置 */
const adapter = function(config) {
	return new Promise((resolve, reject) => {
		uni.request({
			method: config.method.toUpperCase(),
			url: buildURL(URLFormat(config.baseURL, config.url), config.params, config
				.paramsSerializer),
			header: config.headers,
			data: config.data,
			dataType: config.dataType,
			responseType: config.responseType,
			sslVerify: config.sslVerify,
			complete: function complete(response) {
				response = {
					data: response.data,
					status: response.statusCode,
					errMsg: response.errMsg,
					header: response.header,
					config: config
				};
				settle(resolve, reject, response);
			}
		})
	})

}

export default adapter;