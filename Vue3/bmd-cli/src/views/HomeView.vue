<template>
    <div>
        <!-- 占位符 -->
        <router-view />

        <!-- 底部选项卡 -->
        <van-tabbar
            v-model="active"
            active-color="#f03d37"
            inactive-color="#444"
        >
            <van-tabbar-item icon="home-o">
                <span>电影/影院</span>
                <template #icon>
                    <img
                        :src="
                            require(`../assets/tabs/index_${
                                active == 0 ? 1 : 0
                            }.png`)
                        "
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="search">
                视频
                <template #icon>
                    <img
                        src="../assets/tabs/video_1.png"
                        v-if="active == 1"
                        alt=""
                        srcset=""
                    />
                    <img
                        src="../assets/tabs/video_0.png"
                        v-else
                        alt=""
                        srcset=""
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="friends-o">
                演出
                <template #icon>
                    <img
                        src="../assets/tabs/show_1.png"
                        v-if="active == 2"
                        alt=""
                        srcset=""
                    />
                    <img
                        src="../assets/tabs/show_0.png"
                        v-else
                        alt=""
                        srcset=""
                    />
                </template>
            </van-tabbar-item>
            <van-tabbar-item icon="setting-o">
                我的
                <template #icon>
                    <img
                        src="../assets/tabs/me_1.png"
                        v-if="active == 3"
                        alt=""
                        srcset=""
                    />
                    <img
                        src="../assets/tabs/me_0.png"
                        v-else
                        alt=""
                        srcset=""
                    />
                </template>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
</script>

<style scoped></style>
