<template>
    <div>
        <!-- 新增表单 行内表单 -->
        <el-form
            :inline="true"
            :model="form"
            class="demo-form-inline"
            @submit.native.prevent
        >
            <el-form-item label="姓名">
                <el-input
                    v-model="form.name"
                    placeholder="输入演员姓名:模糊查询"
                    @keyup.native.enter="onSubmit"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">查询</el-button>
            </el-form-item>
        </el-form>
        <!-- 分割线 -->
        <el-divider content-position="left"> 演员列表 </el-divider>

        <!-- 演员列表 -->
        <person
            v-for="(item, i) in actors"
            :key="i"
            :avatar="item.actor_avatar"
            :name="item.actor_name"
            @delete="deleteItem(i, $event)"
        >
        </person>
    </div>
</template>

<script>
//  @符号代表src源代码目录
import Person from '@/components/Person.vue'

export default {
    components: { Person },
    data() {
        return {
            form: {
                name: '', // 绑定模糊查询的姓名
            },
            actors: [], // 演员列表
        }
    },
    methods: {
        /** 通过ID删除选中的演员 */
        deleteItem(i, params) {
            let id = this.actors[i].id
            console.log('点击了删除演员图标:', id)
            console.log('点击了删除演员图标:', params)
            // 执行删除业务
            this.$http.actorApi.delete({ id }).then((res) => {
                if (res.data.code == 200) {
                    this.$message({ message: '删除完成', type: 'success' })
                    // 将当前列表中的i位置的元素移除
                    this.actors.splice(i, 1)
                }
            })
        },

        onSubmit() {
            // 当点击查询按钮后执行
            this.$http.actorApi.queryByNameLike(this.form).then((res) => {
                this.actors = res.data.data
            })
        },
    },

    /** 组件挂载完毕后自动调用 生命周期方法 */
    mounted() {
        this.$http.actorApi.queryAll().then((res) => {
            this.actors = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
