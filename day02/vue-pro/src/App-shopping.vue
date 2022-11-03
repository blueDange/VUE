<template>
  <div>
    <!-- v-for 访问对象 -->
    <div class="food-item" v-for="(item, i) in foods" :key="item.id">
      <div style="width: 10%">{{ item.id }}</div>
      <div style="width: 20%">{{ item.name }}</div>
      <div style="width: 20%">{{ item.price }}</div>
      <div style="width: 15%">
        <button @click="item.num--">-</button>
        {{ item.num }}
        <button @click="item.num++">+</button>
      </div>
      <div style="width: 25%">商品小计:{{ item.price * item.num }}</div>
      <div style="width: 10%">
        <button @click="foods.splice(i, 1)">删除</button>
      </div>
    </div>
    总计:¥{{ total }}元
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
  },
  methods: {
    getTotalPrice() {
      return this.foods.reduce((sum, food) => {
        return sum += food.price * food.num
      }, 0)  // 0 是sum的初始值
    }
  },
  computed: {
    total() {
      // return 用于提供计算属性的返回值
      return this.getTotalPrice()

    },
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
.food-item {
  display: flex;
  width: 600px;
  height: 30px;
  align-items: center;
  border: 1px solid black;
  margin: 5px;
}
</style>