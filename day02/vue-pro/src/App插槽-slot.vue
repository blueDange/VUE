<template>
  <div>
    <!-- 测试组件的插槽 slot -->
    <!-- 使用my-tag时,需要给组件的插槽动态设置标签结构 -->
    <!-- 在子组件开始标签与结束标签中的内容,将会放入子组件默认插槽里 -->
    <my-tag>神里</my-tag>
    <my-tag>申鹤</my-tag>
    <my-tag>胡桃</my-tag>
    <my-tag>
      <img src="/favicon.ico" alt="" />
      <span>小图标</span>
    </my-tag>
  </div>
</template>

<script>
import MyTag from '../../../day02/vue-pro/src/components/MyTag.vue'
export default {
  components: {
    MyTag,
  },
}
</script>

<style lang="scss" scoped>
</style>
