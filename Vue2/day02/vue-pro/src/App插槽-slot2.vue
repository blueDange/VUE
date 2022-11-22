<template>
  <div>
    <layout>
      <div slot="header">顶部导航内容: 首页,文档,等</div>
      <div slot="left">左侧边栏需要现实的内容</div>
      <div slot="right">主题内容</div>
    </layout>
  </div>
</template>

<script>
import Layout from './components/Layout.vue'

export default {
  components: {
    Layout,
  },
}

</script>

<style lang="scss" scoped>
</style>