<template>
  <div>
    <input
      v-model="keyword"
      type="text"
      name=""
      id=""
      placeholder="请输入导演名字"
    />
    <button @click="search">通过姓名查询导演</button>
    <button @click="add">点我访问导演列表</button>
    <br /><br />
    <div class="item" v-for="item in data" :key="item.id">
      <img :src="item.director_avatar" alt="" />
      <p>{{ item.director_name }}</p>
    </div>
  </div>
</template>

<script>
import myaxios from './http/myAxios'
export default {
  data() {
    return {
      data: [],
      keyword: ''
    }
  },
  methods: {
    add() {
      let url = 'https://web.codeboy.com/bmdapi/movie-directors'
      myaxios.get(url, { page: 1, pagesize: 100 }).then(response => {
        // console.log(response)
        this.data = response.data.data
      })
    },

    // 未实现1
    search() {
      let url = 'https://web.codeboy.com/bmdapi/movie-directors/name'
      myaxios.post(url, { name: this.keyword, page: 1, pagesize: 10 }).then(response => {
        this.data = response.data.data
        console.log(response)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.item {
  margin-left: 10px;
  display: inline-block;
  padding: 5px 10px;
  background-color: skyblue;
}
</style>