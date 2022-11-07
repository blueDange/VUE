<template>
  <div class="layout">
    <div class="header">
        <!-- 名字叫header的插槽放在此处 -->
        <slot name="header"/>  
    </div>
    <div class="main">
      <div class="left">
          <!-- 名字叫left的插槽放在此处 -->
          <slot name="left"/>
      </div>
      <div class="right">
          <!-- 名字叫right的插槽放在此处 -->
          <slot name="right"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
    height: 100px;
    background-color: burlywood;
}
.main {
    display: flex;
    .left {
        width: 200px;
        height: 400px;
        background-color: cadetblue;
    }
    .right {
        flex: 1;
        height: 400px;
        background-color: darksalmon;
    }
}
</style>