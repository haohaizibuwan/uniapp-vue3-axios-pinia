/** 
 * const params = encodeURIComponent(JSON.stringify({id: 1, name: 'zxc'}))
 * JSON.parse(decodeURIComponent(e.item))
 * 有效避免用户多次点击按钮，打开多个页面问题
 */
let navigateLock = false;
const router = {
	/** 
	 * @param type {String} 'navigateTo' 'redirectTo' 'reLaunch' 'switchTab'
	 * @param url {String}  
	*/
	jumpPage(type = 'navigateTo', url) {
		if (navigateLock) return;
		navigateLock = true;
		uni[type]({
			url: url,
			complete() {
				setTimeout(() => {
					navigateLock = false;
				}, 1000)
			}
		})
	}
}
export default router;