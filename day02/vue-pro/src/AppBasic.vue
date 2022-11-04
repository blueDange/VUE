<template>
  <div>
    <button @click="add">点我访问导演列表</button>
    <br /><br />
    <div>
      <img src="" alt="" />
      <p></p>
    </div>
  </div>
</template>

<script>
import myaxios from './http/myAxios'
export default {
  data() {
    return {
      data: ''
    }
  },
  methods: {
    add() {
      let url = 'https://web.codeboy.com/bmdapi/'
      myaxios.get(url, params).then(response => {
        console.log(response)
      })
    }
  },
}
</script>

<style lang="scss" scoped>
</style>