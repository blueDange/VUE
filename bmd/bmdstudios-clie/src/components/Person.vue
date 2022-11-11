<template>
    <!-- 一般情况下,class类名应于组件名匹配 -->
    <div class="person">
        <img :src="avatar" alt="" />
        <span>{{ name }}</span>
        <i @click="doClick" class="el-icon-circle-close"></i>
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
  methods: {
    // 监听删除图标被点击
    doClick() {
      // 在此发现用户点击了删除小图标
      // 需要立即通知父组件,自定义事件: delete被触发
      // $emit()方法用于通知父组件自定义事件被触发
      // 参数1: 'delete' 就是自定义时间的事件类型名称
      // 参数2: {a:100,b:200}
      // 在父组件中,就可以通过 <div @delete=""></div>
      this.$emit('delete')
    }
  }
}
</script>

<style lang="scss">
.person {
    margin: 5px;
    display: inline-block;
    width: 110px;
    padding: 5px;
    border: 1px solid #ccc;
    text-align: center;
    position: relative;

    &:hover i {
        display: block;
    }

    > i {
        display: none;
        position: absolute;
        top: -10px;
        right: -10px;
        background-color: #fff;
        font-size: 20px;
    }
}
</style>
