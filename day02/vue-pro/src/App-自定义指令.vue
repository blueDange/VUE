<template>
  <div>
    <h3 v-pink>这段文字用于测试自定义指令 v-pink</h3>
    <p v-skyBlue>这段文字用于测试v -skyblue</p>
    <p v-color="`#f03361`">这段文字用于测试v -skyblue</p>
  </div>
</template>

<script>
export default {
  directives: {
    pink(el) {
      el.style.color = 'pink'
    },
    skyBlue(el) {
      el.style.color = 'skyblue'
    },
    color(el, bindings) {
      el.style.color = bindings.value
    }
  }
}
</script>

<style lang="scss" scoped>
</style>