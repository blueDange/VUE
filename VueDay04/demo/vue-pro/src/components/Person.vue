<template>
  <!-- 一般情況下，class类名应与组件名匹配(建议，不强制要求)
         组件名：Person.vue   class类:  person
  组件名: MyTag.vue    class类:  my-tag-->
  <div class="person">
    <img :src="avatar" width="100px">
    <span>{{name}}</span>
  </div>
</template>

<script>
export default {
  props: {
    avatar: {
      // 声明属性，指定需要显示的头像路径
      type: String,
      default: ""
    },
    name: {
      // 声明属性，指定需要显示的昵称
      type: String,
      default: "默认昵称"
    }
  }
};
</script>

<style lang="scss" scoped>           
.person {
  margin:5px;
  display: inline-block;
  width: 110px;
  padding: 5px;
  border: 1px solid #ccc;
  text-align: center;
}
</style>