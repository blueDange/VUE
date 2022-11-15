<template>
    <div>
        <!-- 面包屑导航 -->
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影列表</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <!-- 搜索表单 -->
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            @submit.native.prevent
        >
            <el-form-item label="电影名称">
                <el-input
                    v-model="form.name"
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
                <template slot-scope="scope">
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
                        @click="
                            $router.push(`/home/movie-update/${scope.row.id}`)
                        "
                    ></el-button>
                    <el-button
                        @click="delItem(scope.row.id)"
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
            keyword: '',
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
        // pagination组件抛出的自定义事件 并且传递参数
        pageChange(page) {
            console.log(page)

            // 若用户输入关键字并点击了确定 则模糊查询电影
            if (this.keyword) {
                let params = {
                    name: this.form.name,
                    page: page,
                    pagesize: this.moviesData.pagesize,
                }
                this.$http.movieApi.queryByNameLike(params).then((res) => {
                    console.log('模糊查询的结果', res)
                    this.moviesData = res.data.data
                })
            } else {
                // 查询所有电影
                let params = { page, pagesize: this.moviesData.pagesize }
                this.$http.movieApi.queryAll(params).then((res) => {
                    console.log('加载初始化的电影列表', res)
                    // 将res.data.data存入this.moviesData
                    this.moviesData = res.data.data
                })
            }
        },

        onSubmit() {
            // 点击搜索后，真正的更新新变量：keyword用于分页时使用
            this.keyword = this.form.name
            // 当点击查询按钮后执行
            if (this.form.name.trim()) {
                let params = {
                    name: this.form.name,
                    page: 1,
                    pagesize: this.moviesData.pagesize,
                }
                this.$http.movieApi.queryByNameLike(params).then((res) => {
                    console.log('模糊查询的结果', res)
                    this.moviesData = res.data.data
                })
            } else {
                // 查询所有
                let params = { page: 1, pagesize: this.moviesData.pagesize }
                this.$http.movieApi.queryAll(params).then((res) => {
                    console.log('加载初始化的电影列表', res)
                    this.moviesData = res.data.data
                })
            }
        },

        // 删除电影列表项, 发送请求, 删除成功后更新列表
        delItem(id) {
            console.log('待删除电影的ID', +id)
            // 弹出确认删除对话框
            this.$confirm('该操作将永久删除电影,是否继续', '提示', {
                type: 'warning',
            })
                .then(() => {
                    // 确认删除
                    // 发请球,执行删除操作
                    this.$message({ type: 'success', message: '删除成功' })
                    this.$http.movieApi.delete({ id }).then((res) => {
                        //  刷新当前列表
                        // 有keyword. 带着一起模糊查询
                        // 若用户输入关键字并点击了确定 则模糊查询电影
                        if (this.keyword) {
                            let params = {
                                name: this.form.name,
                                page: this.moviesData.page,
                                pagesize: this.moviesData.pagesize,
                            }
                            this.$http.movieApi
                                .queryByNameLike(params)
                                .then((res) => {
                                    console.log('模糊查询的结果', res)
                                    this.moviesData = res.data.data
                                })
                        } else {
                            // 查询所有电影
                            // 没有keyword, 直接查询

                            let params = {
                                page: this.moviesData.page,
                                pagesize: this.moviesData.pagesize,
                            }
                            this.$http.movieApi.queryAll(params).then((res) => {
                                console.log('加载初始化的电影列表', res)
                                // 将res.data.data存入this.moviesData
                                this.moviesData = res.data.data
                            })
                        }
                    })
                })
                .catch((err) => {
                    this.$message({ type: 'error', message: '删除失败' })
                })
        },
    },

    //   组件挂载完毕后自动调用
    mounted() {
        // 发请求,加载电影列表
        let params = { page: 1, pagesize: this.moviesData.pagesize }
        this.$http.movieApi.queryAll(params).then((res) => {
            // 将res.data.data存入this.moviesData
            this.moviesData = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
