<template>
    <div>
        <!-- 访问：/computed 时看到当前组件 -->
        <div>商品单价：{{ price }}</div>
        <div>
            商品数量：
            <button @click="count--">-</button>
            {{ count }}
            <button @click="count++">+</button>
        </div>
        <div>商品总价：{{ total }}</div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'

export default defineComponent({
    setup() {
        let price = ref(15.5)
        let count = ref(5)
        console.log(price)
        console.log(count)
        // 声明一个计算属性total
        // 需求：5件以上总价9折
        let total = computed(() => {
            // price与count被ref处理后变成RefImpl对象
            // 如果访问值时，需要price.value  count.value
            return price.value * count.value
        })
        return { price, count, total }
    },
})
</script>

<style scoped></style>
