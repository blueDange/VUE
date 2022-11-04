<template>
  <div>
    <my-tag></my-tag>
    <MyTag></MyTag>
    <ah-tag></ah-tag>
    <!-- 如果希望在使用子组件时, 动态修改组件的外观, 则可以通过组件属性向组件传参
        color属性自定义属性,通过属性可以向my-tag组件传递参数-->
    <my-tag color="#ddaa22"></my-tag>
    <my-tag color="blue"></my-tag>
    <my-tag color="pink"></my-tag>
    <my-tag color="orange"></my-tag>
    <my-tag color="skyblue"></my-tag>
    <my-tag color="black"></my-tag>
  </div>
</template>

<script>
import MyTag from './components/MyTag.vue'
export default {
  components: {
    MyTag,
    // 组件名称: 组件对象
    'ah-tag': MyTag
  }
}
</script>

<style lang="scss" scoped>
</style>