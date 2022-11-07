<template>
    <div>
        <input v-model="keyword" type="text" placeholder="请输入查询关键字" />
        <button @click="getMoviesLike">点我模糊查询电影列表</button>
        <br /><br />

        <button @click="getMovies">点我加载电影数据</button>
        <br /><br />

        <table style="width: 1000px; margin: 0px auto">
            <thead>
                <tr>
                    <td>封面</td>
                    <td>电影名称</td>
                    <td>主演</td>
                    <td>上映时间</td>
                    <td>时长</td>
                    <td>评分</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in data.result" :key="item.id">
                    <td>
                        <img
                            @click="$router.push(`detail/${item.suibian}`)"
                            :src="item.cover"
                            width="60px"
                        />
                    </td>
                    <td>
                        <router-link :to="`/detail?id=${item.id}`">
                            {{ item.title }}
                        </router-link>
                    </td>
                    <td>{{ item.star_actor }}</td>
                    <td>{{ item.showingon }} 上映</td>
                    <td>{{ item.duration }}分钟</td>
                    <td>{{ item.score }}分</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import myaxios from './http/MyAxios'

export default {
    data() {
        return {
            keyword: '', // 绑定搜索关键字
            data: {}, // 用于绑定电影列表请求的响应结果:{page, pagesize, result, total}
        }
    },
    methods: {
        // 通过关键字模糊查询电影列表   POST请求
        getMoviesLike() {
            let url = 'https://web.codeboy.com/bmdapi/movie-infos/name'
            let params = { name: this.keyword, page: 1, pagesize: 5 }
            myaxios.post(url, params).then((res) => {
                this.data = res.data.data
            })
        },

        /** 点击按钮后执行该方法，发送http请求，获取电影列表  GET请求 */
        getMovies() {
            let url = 'https://web.codeboy.com/bmdapi/movie-infos'
            // 使用自定义的myaxios 发送get请求
            myaxios.get(url, { page: 1, pagesize: 10 }).then((res) => {
                this.data = res.data.data
            })
        },
    },
    beforeCreate() {
        console.log('beforeCreate')
    },
    created() {
        console.log('created')
    },
    beforeMount() {
        console.log('beforeMount')
    },
    mounted() {
        console.log('mounted')
    },
    beforeUpdate() {
        console.log('beforeupdate')
    },
    updated() {
        console.log('updated')
    },
    beforeDestroy() {
        console.log('beforeDestroy')
    },
    destroyed() {
        console.log('destroyed')
    },
}
</script>

<style lang="scss" scoped></style>
