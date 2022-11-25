<template>
	<div>
		<div class="top">
			<!-- 标题栏 -->
			<van-nav-bar title="百慕大影城">
				<template #right>
					<van-popover
						placement="bottom-end"
						v-model:show="showPopover"
						:actions="actions"
					>
						<template #reference>
							<van-icon name="apps-o" size="20" />
						</template>
					</van-popover>
				</template>
			</van-nav-bar>

			<!-- 广告头 -->
			<AppHeader></AppHeader>

			<!-- 顶部导航 -->
			<div class="top-nav">
				<div class="city-entry">
					<span class="city-name">北京</span>
					<span class="city-arrow"></span>
				</div>
				<van-tabs class="tabs" v-model:active="navActive">
					<van-tab name="1" title="热映"></van-tab>
					<van-tab name="2" title="待映"></van-tab>
					<van-tab name="3" title="经典"></van-tab>
				</van-tabs>
				<van-icon
					class="icon"
					color="#f03d37"
					size="24"
					name="search"
				/>
			</div>
		</div>

		<!-- 电影列表 -->
		<div class="movie-list">
			<van-list
				v-model:loading="loading"
				:finished="finished"
				finished-text="已经到底了"
				v-if="movies.length != 0"
				@load="onLoad"
			>
				<MovieItem v-for="item in movies" :key="item.id" :movie="item">
				</MovieItem>
			</van-list>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import $http from '@/http'
import Movie from '@/types/Movie'
import mystore from '@/utils/Store'

// 顶部导航 选中项
const navActive = ref('1')
// 监听navActive的变化
watch(navActive, (newValue, oldValue) => {
	console.log(newValue) // newValue就是类别ID值
	// 回到页面顶部，再发请求更新列表
	window.scrollTo(0, 0)
	// 重置一些变量，page改为1，finished改为false
	page.value = 1
	finished.value = false

	let list = mystore.get(newValue)
	console.log(list)
	if (list) {
		// 如果查到了数据
		movies.splice(0, movies.length, ...list)
	} else {
		// 如果查不到数据
		// 重新发送请求，加载新类别下的首页电影列表
		$http.movieApi
			.queryByCategoryId({ cid: newValue, page: 1, pagesize: 20 })
			.then((res) => {
				// movies.length = 0 // 清空数组
				// movies.push(...res.data.data.result)
				let list = res.data.data.result
				movies.splice(0, movies.length, ...list)
				// 将list存入缓存
				mystore.set(newValue, list)
			})
	}
})

// 初始化加载热映类别下的首页电影列表
const movies: Movie[] = reactive([])
onMounted(() => {
	console.log('onMounted...')
	// 使用myaxios发送请求
	$http.movieApi
		.queryByCategoryId({ cid: 1, page: 1, pagesize: 20 })
		.then((res) => {
			movies.push(...res.data.data.result)
		})
})

// 处理首页右上角弹出菜单
const showPopover = ref(false)
const actions = [
	{ text: '首页' },
	{ text: '榜单' },
	{ text: '热点' },
	{ text: '商城' },
]

// 处理列表的触底加载
const loading = ref(false)
const finished = ref(false)
const page = ref(1)
const onLoad = () => {
	// 触底后执行
	console.log('到底了！')
	// vant的list组件自动将loading改为true
	// 一旦loading改为true，就不会再执行onLoad了

	// 发送请求，加载当前类别的下一页电影列表数据
	let cid = navActive.value // 类别ID
	let nextPage = ++page.value // 下一页
	let pagesize = 20 // 每页20条
	$http.movieApi
		.queryByCategoryId({ cid, page: nextPage, pagesize })
		.then((res) => {
			let list = res.data.data.result
			movies.push(...list) // 向数组的末尾追加新列表
			console.log(list)
			// 手动将loading改为false
			loading.value = false
			// 修改finished变量
			if (list.length == 0) {
				// 没有加载到数据
				finished.value = true
			}
		})
}
</script>

<style scoped>
.top {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	background-color: #fff;
	z-index: 99;
}
.movie-list {
	margin-top: 156px;
	margin-bottom: 50px;
	padding: 0px 5px;
}
.top-nav {
	display: flex;
	height: 48px;
	border-bottom: 1px solid #eee;
	justify-content: center;
	align-items: center;
	padding: 0px 20px;
}
.city-entry .city-arrow {
	display: inline-block;
	margin-left: 5px;
	width: 0;
	height: 0;
	border: 4px solid transparent;
	border-top-color: #444;
}
.tabs {
	margin: 0px 40px;
	flex: 1;
}
</style>

<style>
:root {
	--van-nav-bar-background-color: #f03d37;
	--van-nav-bar-title-text-color: #fff;
	--van-nav-bar-icon-color: #fff;
}
.van-tab__text {
	font-weight: bold;
}
</style>
