<template>
  <div>
    <!-- 组件式跳转 -->
    <router-link to="/">首页</router-link>|
    <router-link to="/slot">插槽页面</router-link>|
    <router-link to="/axios">导演</router-link>|

    <!-- 编程式跳转 -->
    <button @click="goto('/SlotName')">跳转到具名插槽页面</button>
    <router-view />
  </div>
</template>

<script>
export default {
  methods: {
    goto(path) {  // 该方法用于实现路由跳转.
      if (this.$route.path == '/SlotName') return;
      this.$router.push(path)

    }
  },
}
</script>

<style lang="scss" scoped>
</style>