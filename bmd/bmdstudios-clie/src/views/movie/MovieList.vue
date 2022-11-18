<template>
    <div>
        <!-- 访问vuex中的state里的user.nickname -->
        <!-- {{$store.state.user.nickname}}
    {{$store.state.user.email}} -->

        <!-- 新增表单 行内表单 -->
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            @submit.native.prevent
        >
            <el-form-item label="电影名称">
                <el-input
                    v-model="form.name"
                    placeholder="输入电影名称:模糊查询"
                    @keyup.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
        <el-divider content-position="left"> 电影列表 </el-divider>

        <!-- 表格 -->
        <el-table :data="moviesData.result">
            <el-table-column label="封面" width="100px">
                <template slot-scope="scope">
                    <img :src="scope.row.cover" width="50px" alt="" />
                </template>
            </el-table-column>
            <el-table-column label="标题" prop="title"> </el-table-column>
            <el-table-column label="主演" prop="star_actor"> </el-table-column>
            <el-table-column label="上映时间" prop="showingon">
            </el-table-column>
            <el-table-column label="时长" width="100px">
                <template slot-scope="scope">
                    {{ scope.row.duration }} 分钟
                </template>
            </el-table-column>
            <el-table-column label="所属类别" prop="type"> </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="info"
                        icon="el-icon-user"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-picture-outline"
                        circle
                    ></el-button>
                    <el-button
                        @click="
                            $router.push(`/home/movie-update/${scope.row.id}`)
                        "
                        size="small"
                        type="primary"
                        icon="el-icon-edit"
                        circle
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
            background
            layout="->, prev, pager, next, total, jumper"
            :current-page="moviesData.page"
            :page-size="moviesData.pagesize"
            :total="moviesData.total"
            @current-change="pageChange"
        >
        </el-pagination>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: '',
            form: {
                name: '', // 绑定模糊查询的姓名
            },
            moviesData: {
                // 绑定当前页面中显示的电影列表数据（含分页参数）
                page: 1,
                pagesize: 3,
                total: 0,
            },
        }
    },
    methods: {
        // 删除电影列表项  发送请求，删除成功后更新列表
        delItem(id) {
            console.log('待删除电影的ID：' + id)
            // 弹出确认删除对话框
            this.$confirm('该操作将永久删除电影，是否继续？', '提示', {
                type: 'warning',
            }).then(() => {
                // 确认删除
                // 发送请求，执行删除操作
                this.$http.movieApi.delete({ id }).then((res) => {
                    this.$message({ type: 'success', message: '删除成功' })
                    // 刷新当前列表  整理参数发送请求
                    // 有keyword,带着一起模糊查询 没有keyword, 直接查询
                    if (this.keyword) {
                        let params = {
                            name: this.keyword,
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
        },

        // pagination组件抛出的自定义事件 并且传递参数
        pageChange(page) {
            console.log(page)

            // 若用户输入关键字并点击了确定 则模糊查询电影
            if (this.keyword) {
                let params = {
                    name: this.keyword,
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
            // 当点击查询按钮后执行
            // 点击搜索后，真正的更新新变量：keyword用于分页时使用
            this.keyword = this.form.name

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
    },

    /** 组件挂载完毕后自动调用 生命周期方法 */
    mounted() {
        // 发送请求，加载电影列表
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
