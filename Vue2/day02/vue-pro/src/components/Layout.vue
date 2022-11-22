<template>
  <div class="layout">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="main">
      <div class="left">
        <slot name="left"></slot>
      </div>
      <div class="right">
        <slot name="right"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
.header {
  height: 100px;
  background-color: pink;
}
.main {
  display: flex;
  .left {
    width: 300px;
    height: 400px;
    background-color: skyblue;
  }
  .right {
    flex: 1;
    flex-shrink: 1;
    height: 400px;
    background-color: purple;
  }
}
</style>