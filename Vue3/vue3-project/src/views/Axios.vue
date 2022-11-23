<template>
    <div>
        <button @click="load">点我发送请求,加载演员</button>
        <img
            width="100"
            v-for="item in actors"
            :key="item.id"
            :src="item.actor_avatar"
            :alt="item.actor_name"
            srcset=""
        />
    </div>
</template>

<script setup lang="ts">
import axios from 'axios'
import { reactive } from 'vue'
interface Actor {
    id: number
    actor_name: string
    actor_avatar: string
}
const actors: Actor[] = reactive([])
const load = () => {
    let url = 'https://web.codeboy.com/bmdapi/movie-actors?page=1&pagesize=100'
    axios.get(url).then((res) => {
        console.log(res)
        let actorList = <Actor[]>res.data.data
        actors.push(...actorList)
    })
}
</script>

<style lang="scss" scoped></style>
