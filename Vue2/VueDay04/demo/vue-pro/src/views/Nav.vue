<template>
    <div>
        <el-menu
            class="menu"
            style="width: 240px"
            mode="horizontal"
            :default-active="active"
        >
            <el-menu-item index="1">指南</el-menu-item>
            <el-menu-item index="2">组件</el-menu-item>
            <el-submenu index="3">
                <template slot="title">主题</template>
                <el-menu-item index="3-1">中国红</el-menu-item>
                <el-menu-item index="3-2">究极绿</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">资源</el-menu-item>
        </el-menu>

        <el-menu :default-active="active" active-text-color="#f00">
            <el-menu-item index="1">指南</el-menu-item>
            <el-menu-item index="2">组件</el-menu-item>
            <el-submenu index="3">
                <template slot="title">主题</template>
                <el-menu-item index="3-1">中国红</el-menu-item>
                <el-menu-item index="3-2">究极绿</el-menu-item>
            </el-submenu>
            <el-menu-item index="4">资源</el-menu-item>
        </el-menu>
    </div>
</template>

<script>
export default {
    data() {
        return {
            active: '1',
        }
    },
}
</script>

<style lang="scss" scoped>
.menu {
    width: 240px;
}
</style>
