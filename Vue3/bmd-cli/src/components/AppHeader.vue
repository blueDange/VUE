<template>
    <div class="header">
        <img src="@/assets/logo.svg" />
        <p class="title">百慕大</p>
        <p class="info">发现最新最热电影</p>
        <p class="link">打开App</p>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 50px;
    padding: 5px 10px;
    border-bottom: 1px solid #eee;
}
.header img {
    width: 40px;
    height: 40px;
}
.header p {
    line-height: 40px;
    height: 40px;
}
.header .title {
    flex: 1;
    text-align: left;
    margin-left: 5px;
    font-weight: bold;
    color: #f03d37;
    font-size: 1.2em;
}

.header .info {
    font-size: 0.9em;
    font-weight: bold;
    margin-right: 15px;
    color: #555;
}

.header .link {
    font-weight: bold;
    font-size: 1.1em;
    color: #b37e93;
}
</style>
