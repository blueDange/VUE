<template>
  <div>
    <button @click="getActors">点我发请求</button>
    <br />
    <div v-for="item in actors" :key="item.id" class="item">
      <img :src="item.actor_avatar" width="100px" alt="" />
      <p>{{ item.actor_name }}</p>
    </div>
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
    getActors() { // 点击发送http请求,访问演员列表
      let url = ' https://web.codeboy.com/bmdapi/movie-actors?page=1&pagesize=100'
      axios.get(url).then(response => {
        console.log(response)
        this.actors = response.data.data
      })

    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  display: inline-block;
  width: 110px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
  margin: 5px;
}
</style>