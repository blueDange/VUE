<template>
    <div>
        <!-- 面包屑导航 -->
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>演员列表</el-breadcrumb-item>
            <el-breadcrumb-item>演员管理</el-breadcrumb-item>
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
            <el-form-item label="姓名">
                <el-input
                    v-model="form.name"
                    placeholder="请输入演员姓名"
                    @keyup.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider content-position="left"> 演员列表 </el-divider>

        <!-- 演员列表 -->
        <Person
            v-for="(item, i) in actors"
            :key="i"
            :avatar="item.actor_avatar"
            :name="item.actor_name"
            @delete="deleteItem(item.id)"
        ></Person>
    </div>
</template>

<script>
// @符号表示src源代码目录
import Person from '@/components/Person.vue'
export default {
    components: {
        Person,
    },
    data() {
        return {
            form: {
                name: '', // 绑定模糊查询的姓名
            },
            actors: [],
        }
    },
    methods: {
        onSubmit() {
            this.$http.actorApi.queryByNameLike(this.form).then((res) => {
                this.actors = res.data.data
            })
            //   let url = 'http://localhost:3010/movie-actors/name'
            //   myaxios.post(url, this.form).then(res => {
            //     console.log(res)
            //     this.actors = res.data.data
            //   })
        },
        deleteItem(id, params) {
            // 执行删除业务
            this.$http.actorApi.delete({ id }).then((res) => {
                if (res.data.code == 200) {
                    this.$message({ message: '删除成功', type: 'success' })
                    this.onSubmit()
                }
            })
        },
    },
    //   组件挂载完毕后自动调用
    mounted() {
        this.$http.actorApi.queryAll().then((res) => {
            this.actors = res.data.data
        })
        // let url = 'http://localhost:3010/movie-actors'
        // let params = { page: 1, pagesize: 20 }
        // myaxios.get(url, params).then(res => {
        //   console.log(res)
        //   this.actors = res.data.data
        // })
    },
}
</script>

<style lang="scss" scoped></style>
