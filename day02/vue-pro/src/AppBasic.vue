<template>
  <div>
    <img width="400px" :src="`/banner/${n}.jpg`" />
    <h3>{{ moviename }}</h3>
    <div>电影时长: {{ m }}</div>
    <button @click="next">切换下一步电影</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      moviename: "人生大事",
      m: 113,
      n: 1,
    };
  },
  methods: {
    next() {
      this.moviename = "凉凉的两辆";
      this.m = 122;
      this.n = this.n == 4 ? 1 : this.n + 1;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>