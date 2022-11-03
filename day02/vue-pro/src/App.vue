<template>
  <div>
    <button @click="add">点我加载电影信息</button>
    <table style="width: 700px; margin: 0 auto">
      <thead>
        <tr>
          <td>封面</td>
          <td>电影名称</td>
          <td>主演</td>
          <td>上映时间</td>
          <td>时长</td>
          <td>评分</td>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img src="/favicon.ico" alt="" />
          </td>
          <td>填写电影名称</td>
          <td>填写主演</td>
          <td>填写上映时间</td>
          <td>填写时长</td>
          <td>填写评分</td>
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
      actors: []
    }
  },
  methods: {
    add() {
      let url = 'https://web.codeboy.com/bmdapi/movie-actors?page=1&pagesize=100'
      axios.get(url).then(response => {
        console.log(response)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>