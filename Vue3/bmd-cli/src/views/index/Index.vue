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

            <!-- ///////////////////////////////// -->
            <!-- 广告头 -->
            <AppHeader></AppHeader>

            <!-- //////////////////////////////// -->
            <!-- 顶部导航 -->
            <div class="top-nav">
                <div class="city-entry">
                    <span class="city-name">北京</span>
                    <span class="city-arrow"></span>
                </div>
                <van-tabs class="tabs" v-model:active="navActive">
                    <van-tab title="热映"></van-tab>
                    <van-tab title="待映"></van-tab>
                    <van-tab title="经典"></van-tab>
                </van-tabs>
                <van-icon
                    class="icon"
                    color="#f03d37"
                    size="24"
                    name="search"
                />
            </div>
        </div>

        <!-- //////////////// -->
        <div class="movie-list">
            <!-- 电影列表 -->
            <MovieItem v-for="i in 20" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

// AppHeader广告头
import AppHeader from '@/components/AppHeader.vue'
import $http from '@/http/index'
// MovieItem 电影列表项
// import MovieItem from '@/components/MovieItem.vue'

// 初始化加载热映类别下的首页电影列表
onMounted(() => {
    // 使用http发请求
    $http.actorApi.queryAll().then((res) => {
        console.log(res.data)
    })
})

// 顶部导航
const navActive = ref(0)

// 处理首页右上角弹出菜单
const showPopover = ref(false)
const actions = [
    { text: '首页' },
    { text: '榜单' },
    { text: '热点' },
    { text: '商城' },
]
</script>

<style scoped>
.top {
    position: fixed;
    width: 100%;
    background-color: #fff;
    z-index: 99;
    top: 0;
    left: 0;
}
.movie-list {
    margin-top: 160px;
    margin-bottom: 50px;
}
.top-nav {
    display: flex;
    height: 48px;
    border-bottom: 1px solid #eee;
    justify-content: center;
    align-items: center;
    padding: 0px 15px;
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
    --van-tab-font-size: 16px;
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
