<template>
    <div>
        <input placeholder="手机号" v-model="phone" />
    </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
    setup() {
        let phone = ref('')
        // 监听phone变量的变化，如果达到了11位数，则alert
        watch(phone, (newValue, oldValue) => {
            console.log(`${oldValue} -> ${newValue}`)
            if (newValue.length == 11) {
                alert('够11位了')
            }
        })
        return { phone }
    },
})
</script>

<style scoped></style>
