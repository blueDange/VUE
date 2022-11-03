<template>
  <div>
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
        <tr v-for="(item, i) in data.result" :key="item.id">
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
import axios from 'axios'
export default {
  data() {
    return {
      data: {},   // 用于绑定电影列表请求的响应结果
    }
  },
  methods: {
    getMovies() {
      // let url = 'https://web.codeboy.com/bmdapi/movie-infos?page=2&pagesize=10 '
      let url = 'https://web.codeboy.com/bmdapi/movie-infos'


      // 创建axios实例
      let instance = axios.create()
      instance(url, {
        method: 'get',
        params: { page: 1, pagesize: 10 },
        headers: { 'headername': 'headervalue' }
      }).then(response => {
        this.data = response.data.data
        console.log(response)
      })

    }
  },
}
</script>

<style lang="scss" scoped>
</style>