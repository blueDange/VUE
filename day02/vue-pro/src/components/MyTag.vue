<template>
  <div class="my-tag" :style="`background-color: ${color}`">
    <!-- 自定义组件 -->
    <span>标签内容</span>
  </div>
</template>

<script>
export default {
  props: {  // 在props中声明当前组件所拥有的组件属性

    // 在此处定义color属性,并指定属性的默认值
    // 该属性可能会在父组件使用当前组件时重新赋值
    color: {
      default: '#f03d37'
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