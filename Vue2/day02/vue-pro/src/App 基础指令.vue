<template>
  <div>
    <!-- 测试vue的常用指令 -->
    <p>{{ text }}</p>
    <p v-text="text"></p>
    <p v-html="text"></p>
    <p v-pre>{{ 1 + 1 }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: `<span style="color:red">爆!散兵砍了雷神一刀</span>`
    };
  },
};
</script>

<style lang="scss" scoped>
</style>