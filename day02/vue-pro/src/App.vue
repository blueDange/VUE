<template>
  <div>
    <!-- v-for 访问对象 -->
    <div class="food-item" v-for="(item, i) in foods" :key="i">
      <div style="width: 10%">{{ item.id }}</div>
      <div style="width: 40%">{{ item.name }}</div>
      <div style="width: 20%">{{ item.price }}</div>
      <div style="width: 15%">{{ item.num }}</div>
      <div style="width: 15%">商品小计:</div>
    </div>

    <!-- v-for指令的基础用法 -->
    <p v-for="n in 10" :key="n">段落内容{{ n }}</p>

    <!-- v-for 访问数组中的元素与下标 -->
    <p>申鹤喜欢的电影</p>
    <p class="item" v-for="n in movies" :key="n">{{ n }}</p>
    <p class="item" v-for="(m, i) in movies" :key="i">{{ i }}--{{ m }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      foods: [
        { id: 1001, name: '大腰子', price: 20, num: 5 },
        { id: 1002, name: '鲱鱼罐头', price: 120, num: 2 },
        { id: 1003, name: '香精煎鱼', price: 220, num: 3 },
        { id: 1004, name: '明雷麻辣烫', price: 15, num: 500 },
        { id: 1005, name: '豆汁', price: 6, num: 6 },
      ],
      movies: ['夏洛特烦恼', '飞驰人生', '这个杀手不太冷静', '西虹市首富', '独行月球']
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  margin-left: 10px;
  display: inline-block;
  padding: 5px 10px;
  background-color: skyblue;
}
.food-item {
  display: flex;
  width: 600px;
  height: 30px;
  align-items: center;
  border: 1px solid black;
  margin: 5px;
}
</style>