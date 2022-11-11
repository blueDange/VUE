<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 分割线 -->
        <el-divider></el-divider>
        <!-- 搜索表单 -->
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            @submit.native.prevent
        >
            <el-form-item label="电影名称">
                <el-input
                    v-model="form.moviesData"
                    placeholder="请输入电影名称"
                    @keyup.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider content-position="left"> 电影列表 </el-divider>

        <el-table :data="moviesData.result" style="width: 100%">
            <el-table-column label="封面图片">
                <template slot-scope="scope">
                    <el-image :src="scope.row.cover"></el-image>
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                prop="title"
                label="标题"
            >
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                prop="star_actor"
                label="主演"
            >
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="上映时间"
            >
                <template slot-scope="scope">
                    {{ scope.row.duration }} 分钟
                </template>
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                prop="type"
                label="类型"
            >
            </el-table-column>
            <el-table-column
                header-align="center"
                align="center"
                label="操作"
                width="180px"
            >
                <template>
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-user
"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="info"
                        icon="el-icon-picture-outline
"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            style="float: right; margin: 20px"
            background
            layout="prev, pager, next,total"
            :total="moviesData.total"
            :page-size="moviesData.pagesize"
            :current-page="moviesData.page"
            @current-change="pageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
// @符号表示src源代码目录
export default {
    data() {
        return {
            form: {
                name: '', // 绑定模糊查询的姓名
            },
            moviesData: {
                page: 1,
                pagesize: 5,
                total: 0,
            }, // 绑定当前页面显示的电影列表数据(含分页参数)
        }
    },
    methods: {
        pageChange(page) {
            let params = { page, pagesize: 3 }
            this.$http.movieApi.queryAll(params).then((res) => {
                console.log('加载初始化的电影列表', res) // 将res.data.data存入this.moviesData
                this.moviesData = res.data.data
            })
        },

        onSubmit() {},
    },
    //   组件挂载完毕后自动调用
    mounted() {
        // 发请求,加载电影列表
        let params = { page: 1, pagesize: this.moviesData.pagesize }
        this.$http.movieApi.queryAll(params).then((res) => {
            console.log('加载初始化的电影列表', res)
            // 将res.data.data存入this.moviesData
            this.moviesData = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
