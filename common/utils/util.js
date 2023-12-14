// 防抖
export function debounce(fn, wait) {
	let flag = true
	let timer = null
	return function() {
		let context = this;
		let args = arguments;
		clearTimeout(timer)
		if (flag) {
			flag = false
			fn.apply(context, args);
		}
		timer = setTimeout(() => {
			flag = true
		}, wait)
	}
}
// 节流
export function throttle(fn, wait) {
	let flag = true;
	return function() {
		let context = this;
		let args = arguments;
		if (flag) {
			flag = false
			fn.apply(context, args);
			setTimeout(() => {
				flag = true
			}, wait);
		}
	}
}
export function networkStatus() {
	uni.getNetworkType({
	    success: function (res) {}
	});
	uni.onNetworkStatusChange(function(res) {
		let title = `您当前处于${res.networkType}网络`
		if (res.networkType == 'none') title = '当前无网络连接'
		uni.showToast({
			title,
			icon: 'none'
		});
	});
}