<template>
  <!-- 一般情况下,class类名应于组件名匹配 -->
  <div class="person">
    <img :src="avatar" alt="" />
    <span>{{ name }}</span>
  </div>
</template>

<script>

export default {

  props: {
    avatar: {  // 声明属性, 指定头像
      type: String,
      default: ''
    },
    name: {  // 声明属性,指定需要显示的名称
      type: String,  // 指定该属性的类型,
      default: '默认昵称'  // 指定该属性是否是必填项,使用时必须包含
    }
  },
}
</script>

<style lang="scss" scoped>
.person {
  margin: 5px;
  display: inline-block;
  width: 110px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>