<template>
  <div>
    <input
      v-model="keyword"
      type="text"
      name=""
      id=""
      placeholder="请输入关键字"
    />
    <button @click="getMoviesLike">点我模糊查询电影列表</button>
    <br /><br />
    <button @click="getMovies">点我加载电影信息</button>
    <table style="width: 1200px; margin: 0 auto">
      <thead>
        <tr>
          <td>封面</td>
          <td>电影名称</td>
          <td>主演</td>
          <td>上映时间</td>
          <td>时长</td>
          <td>评分</td>
          <td>类型</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data.result" :key="item.id">
          <td>
            <img :src="item.cover" alt="" width="100px" />
          </td>
          <td>{{ item.title }}</td>
          <td>{{ item.star_actor }}</td>
          <td>{{ item.showingon }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import myaxios from './http/myAxios'
import axios from 'axios'
import qs from 'qs'
export default {
  data() {
    return {
      data: {},   // 用于绑定电影列表请求的响应结果
      keyword: ''  // 用于绑定搜索关键字
    }
  },
  methods: {
    getMoviesLike() {
      let url = 'https://web.codeboy.com/bmdapi/movie-infos/name'
      // 也可以这么写参数
      // let params = {name: this.keyword, page: 1, pagesize: 10}
      // 再把params写入第二个参数的位置
      myaxios.post(url, { name: this.keyword, page: 1, pagesize: 10 }).then(response => {
        this.data = response.data.data
      })
    },




    getMovies() {
      // let url = 'https://web.codeboy.com/bmdapi/movie-infos?page=2&pagesize=10 '
      let url = 'https://web.codeboy.com/bmdapi/movie-infos'
      // 使用自定义的myaxios 发送get请求
      myaxios.get(url, { page: 1, pagesize: 10 }).then(response => {
        this.data = response.data.data
      })

    }
  },
}
</script>

<style lang="scss" scoped>
</style>