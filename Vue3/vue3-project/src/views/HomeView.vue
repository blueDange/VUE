<template>
    <div class="home">
        姓名: {{ name }}
        <div>
            年龄: {{ age }}
            <button @click="age++">点击后加1</button>
        </div>
        <div>
            余额: {{ money }}
            <button @click="money += 10">点击后加10</button>
        </div>

        <div>电影信息</div>
        <div>标题: {{ movie.title }}</div>
        <div>主演: {{ movie.actor }}</div>
        <div>上映时间: {{ movie.showingon }}</div>
        <div>票价: {{ movie.price }}</div>
        <button @click="movie.price += 10">点击后加10</button>

        <div>
            num1: {{ num1 }}
            <button @click="num1++">num1++</button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from 'vue'

export default defineComponent({
    name: 'HomeView',
    setup() {
        let data = reactive({
            num1: 100,
            num2: 200,
            num3: 300,
        })
        console.log('toRefs(data):', toRefs(data))
        let movie = {
            title: '如果vue不记得',
            actor: '尤雨溪',
            showingon: '2022-2-3',
            price: 33,
        }
        return {
            ...toRefs(data),
            movie: reactive(movie),
            name: '愤怒的亮',
            age: ref(15),
            money: ref(50),
        }
    },
})
</script>
