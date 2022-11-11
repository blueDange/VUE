<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导演列表</el-breadcrumb-item>
            <el-breadcrumb-item>导演管理</el-breadcrumb-item>
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
            <el-form-item label="姓名">
                <el-input
                    v-model="form.name"
                    placeholder="请输入导演姓名"
                    @keyup.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <el-divider content-position="left"> 导演列表 </el-divider>

        <!-- 导演列表 -->
        <Person
            v-for="(item, i) in directors"
            :key="i"
            :avatar="item.director_avatar"
            :name="item.director_name"
        ></Person>
    </div>
</template>

<script>
// @符号表示src源代码目录
import myaxios from '@/http/MyAxios.js'
import Person from '@/components/Person.vue'
export default {
  components: {
    Person,
  },
  data() {
    return {
      form: {
        name: ''  // 绑定模糊查询的姓名
      },
      directors: []
    }
  },
  methods: {
    onSubmit() {
      let url = 'http://localhost:3010/movie-directors/name'
      myaxios.post(url, this.form).then(res => {
        console.log(res)
        this.directors = res.data.data
      })
    }
  },
  //   组件挂载完毕后自动调用
  mounted() {
    let url = 'http://localhost:3010/movie-directors'
    let params = { page: 1, pagesize: 20 }
    myaxios.get(url, params).then(res => {
      console.log(res)
      this.directors = res.data.data
    })
  },

}
</script>

<style lang="scss" scoped>
</style>
