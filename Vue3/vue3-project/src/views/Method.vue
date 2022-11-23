<template>
    <div>
        <button :disabled="disable" @click="minus">-</button>
        <h1>商品数量：{{ count }}</h1>
        <button @click="doClick">+</button>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    setup() {
        // 声明变量
        let count = ref(5)
        // 声明函数
        let doClick = () => {
            count.value++
        }
        // 点击减号，count--， 修改disabled
        let disable = ref(false)
        let minus = () => {
            count.value--
            if (count.value == 1) {
                disable.value = true
            }
        }
        return {
            disable,
            minus,
            count,
            doClick,
        }
    },
})
</script>

<style scoped></style>
