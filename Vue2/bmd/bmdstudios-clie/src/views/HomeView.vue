<template>
    <div>
        <el-container style="height: 100vh">
            <el-aside
                class="aside"
                :style="{
                    width: `${isCollapse ? 65 : 240}px`,
                    transition: '0.4s',
                }"
            >
                <el-menu
                    router
                    :default-active="$route.path"
                    background-color="#345"
                    text-color="#bbb"
                    :style="{ height: '100vh' }"
                    :collapse="isCollapse"
                    class="el-menu-vertical-demo"
                >
                    <el-menu-item>
                        <img width="30px" src="../assets/logo.svg" alt="" />
                        <template slot="title">
                            <span
                                style="
                                    font-size: 1.2em;
                                    color: #efefef;
                                    font-weight: bold;
                                "
                                >&nbsp;&nbsp;百慕大影城后台管理</span
                            >
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/home/index">
                        <i class="el-icon-message"></i>
                        <template slot="title"> 首页 </template>
                    </el-menu-item>
                    <el-submenu index="/home/actor">
                        <template slot="title">
                            <i class="el-icon-user-solid"></i>
                            <span slot="title">演员管理</span>
                        </template>
                        <el-menu-item index="/home/actor-list">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">演员列表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/actor-add">
                            <i class="el-icon-plus"></i>
                            <span slot="title">新增演员</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="/home/director">
                        <template slot="title">
                            <i class="el-icon-s-custom"></i>
                            <span slot="title">导演管理</span>
                        </template>
                        <el-menu-item index="/home/director-list">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">导演列表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/director-add">
                            <i class="el-icon-plus"></i>
                            <span slot="title">新增导演</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="/home/movie">
                        <template slot="title">
                            <i class="el-icon-film"></i>
                            <span slot="title">电影管理</span>
                        </template>
                        <el-menu-item index="/home/movie-list">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">电影列表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/movie-add">
                            <i class="el-icon-plus"></i>
                            <span slot="title">新增电影</span>
                        </el-menu-item>
                    </el-submenu>

                    <el-submenu index="/home/cinema">
                        <template slot="title">
                            <i class="el-icon-office-building"></i>
                            <span slot="title">电影院管理</span>
                        </template>
                        <el-menu-item index="/home/cinema-list">
                            <i class="el-icon-s-data"></i>
                            <span slot="title">电影院列表</span>
                        </el-menu-item>
                        <el-menu-item index="/home/cinema-add">
                            <i class="el-icon-plus"></i>
                            <span slot="title">新增电影院</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>

            <el-container>
                <el-header class="header">
                    <i
                        v-show="!isCollapse"
                        class="el-icon-s-fold"
                        @click="isCollapse = true"
                    ></i>
                    <i
                        v-show="isCollapse"
                        class="el-icon-s-unfold"
                        @click="isCollapse = false"
                    ></i>

                    <!-- 面包屑导航 -->
                    <el-breadcrumb separator="/" class="breadcrumb">
                        <el-breadcrumb-item
                            v-for="item in $route.meta.nav"
                            :key="item"
                        >
                            {{ item }}
                        </el-breadcrumb-item>
                    </el-breadcrumb>

                    <span v-if="user"> 欢迎：{{ user.nickname }}</span>
                    <span v-else>未登录</span>
                </el-header>

                <el-main>
                    <!-- 二级路由 动态设置内容 -->
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    data() {
        return {
            isCollapse: false,
        }
    },
    computed: {
        //mapState将开放vuex中保存的user对象到当前组件的计算属性中
        //这样，在当前组件内部,就可以直接使用user来访问vuex中的user
        ...mapState(['user', 'cart', 'loc']),
        // 删除写法与下列函数效果一致：
        /*
    user(){ return this.$store.state.user },
    cart(){ return this.$store.state.cart },
    loc(){ return this.$store.state.loc },
    */
    },
}
</script>

<style lang="scss" scoped>
.header {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ccc;

    i {
        font-size: 1.3em;
    }

    .breadcrumb {
        margin-left: 20px;
        flex: 1;
    }
}
.aside::-webkit-scrollbar {
    display: none;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 240px;
    min-height: 400px;
}
</style>
