<template>
	<view class="content">
		<image class="logo" src="/static/logo.png"></image>
		<view class="text-area">
			<text class="title">{{userInfo.userName}}</text>
		</view>
		<view class="" @tap="jumpPage">防止路由多次跳转</view>
		<view class="" @tap="jumpPage1">路由跳转</view>
	</view>
</template>

<script setup>
	import {
		storeToRefs
	} from 'pinia'
	import indexStore from '@/store/index.js';
	import {
		onLoad
	} from '@dcloudio/uni-app';
	import {
		ceshi,
		ceshi1
	} from '@/common/api/user.js';
	import router from '@/common/router/index.js'

	const {
		userStore,
		axiosStore
	} = indexStore();
	// 使用storeToRefs可以保证解构出来的数据也是响应式的
	let {
		userInfo
	} = storeToRefs(userStore);
	// 设置用户信息
	const data = {
		userName: 'snail2'
	}
	userStore.setUserInfo(data)
	// 打印用户信息
	console.log(userInfo)
	setTimeout(() => {
		userStore.setUserInfo({
			userName: 'asdad'
		})
	}, 2000)
	const jumpPage = () => {
		setTimeout(() => {
			router.jumpPage('navigateTo', '/pages/demo/demo')
		}, 1000)
	}
	const jumpPage1 = () => {
		setTimeout(() => {
			uni.navigateTo({
				url: '/pages/demo/demo'
			})
		}, 1000)
	}
	onLoad(() => {
		ceshi({name: '1'}).then(res => {
			console.log(res);
		}).catch(err => {
			console.log(err);
		})
		setTimeout(() => {
			axiosStore.cancelTokenList.forEach((cancel, index) => {
				cancel()
				axiosStore.deleteCancelToken(index)
			})
			console.log('取消请求成功');
			ceshi().then(res => {
				console.log(res);
			}).catch(err => {
				console.log(err);
			})
		}, 1000)
		
	})
</script>

<style>
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}
</style>