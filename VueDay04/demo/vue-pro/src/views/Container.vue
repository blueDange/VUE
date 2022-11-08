<template>
    <div>
        <el-container>
            <el-header class="header">
                <p>百慕大影城后台管理系统</p>
                <span>未登录 | 欢迎：张三</span>
            </el-header>
            <el-container>
                <el-aside style="width: 200px">
                    <el-menu
                        router
                        :default-active="$route.path"
                        active-text-color="#efefef"
                        background-color="#444"
                        text-color="#aaa"
                        style="height: calc(100vh - 60px)"
                    >
                        <el-menu-item index="/container/button"
                            >按钮:Button</el-menu-item
                        >
                        <el-menu-item index="/container/table"
                            >表格:Table</el-menu-item
                        >
                        <el-menu-item index="/container/form"
                            >表单:Table</el-menu-item
                        >
                    </el-menu>
                </el-aside>
                <el-main style="background: pink">
                    <router-view />
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
    background-color: #444;
    color: white;
    display: flex;
    align-items: center;
    p {
        font-size: 1.3em;
        font-weight: bold;
        flex: 1;
    }
}
</style>
