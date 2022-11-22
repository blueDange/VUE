<template>
  <div class="my-tag" 
       :style="`background-color: ${color};`">
    <!-- 自定义组件  components/MyTag.vue -->
    <!-- 设计一个插槽，在使用时给插槽动态赋值页面结构 -->
    <slot />
  </div>
</template>

<script>
export default {
  props: {    // 在props中声明当前组件所拥有的组件属性
    // 在此定义个color属性，并指定属性的默认值
    // 该属性可能会在父组件使用当前组件时重新赋值
    color: {
      default: '#f03d37',   // 设置属性的默认值
      type: String,  // 指定该属性的类型，此处指定为字符串
      required: false,  // 指定该属性是否是必填项, 使用时必须包含该属性
    }
  }
};
</script>

<style lang="scss" scoped>
.my-tag {
    font-size: 0.9em;
    font-family: 微软雅黑;
    margin-right: 10px;
    opacity: 0.9;
    display: inline-block;
    padding: 0px 10px;
    border: 1px solid #f03d3788;
    background-color: #f03d37;
    color: white;
    text-align: center;
    height: 30px;
    line-height: 30px;
    border-radius: 3px;
}
</style>
