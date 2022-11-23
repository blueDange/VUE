<template>
    <div>
        <h3>电影标签: {{ movie.title }}</h3>
        <button @click="next">点我下一步电影</button>
    </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const movie = reactive({
    title: '功夫之王',
    actors: ['凉凉', '小花园'],
})

const a = 100

const next = () => {
    movie.title = '熊出没奔向地球'
}
</script>

<style scoped></style>
