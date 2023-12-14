<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// App端需要调用setUIStyle，否则无法使用深色模式
			// #ifdef APP-PLUS
			plus.nativeUI.setUIStyle('auto')
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	/*每个页面公共css */
</style>