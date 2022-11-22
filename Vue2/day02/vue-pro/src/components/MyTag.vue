<template>
  <div class="my-tag" :style="`background-color: ${color}`">
    <!-- 自定义组件 -->
    <!-- 测试组件的插槽 slot -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {  // 在props中声明当前组件所拥有的组件属性

    // 在此处定义color属性,并指定属性的默认值
    // 该属性可能会在父组件使用当前组件时重新赋值
    color: {
      default: '#f03d37',  // 设置属性默认值
      type: String,
      required: true,
    }

  }
}
</script>

<style lang="scss" scoped>
.my-tag {
  margin-right: 10px;
  display: inline-block;
  padding: 0 10px;
  border: 1px solid #f03d3788;
  background-color: #f03d37;
  color: white;
  text-align: center;
  height: 30px;
  border-radius: 3px;
}
</style>