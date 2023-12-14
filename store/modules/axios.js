/**
 * 取消 axios 请求
 * 在发起请求之前调用
 * axiosStore.cancelTokenList.forEach((cancel, index) => {
			cancel()
			axiosStore.deleteCancelToken(index)
		})
 */
import { defineStore } from 'pinia'

export const cancelRequestStore = defineStore('cancelAxios', {
	state() {
		return {
			cancelTokenList: []
		}
	},
	unistorage: false, // 开启后对 state 的数据读写都将持久化
	actions: {
		addCancelToken(payload) {
			const maxCancelTokenNum = 15 // 最大存cancelToken条数
			if (this.cancelTokenList.length >= maxCancelTokenNum) {
				this.cancelTokenList.shift();
			}
			this.cancelTokenList.push(payload)
		},
		deleteCancelToken(payload) {
			this.cancelTokenList.splice(payload, 1)
		}
	}
})