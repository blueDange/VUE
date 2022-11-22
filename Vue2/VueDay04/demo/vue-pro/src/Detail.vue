<template>
    <div>
        <h2>电影详情页</h2>
        <p>
            电影封面：
            <img :src="movieData.cover" alt="" width="150px" />
        </p>
        <p>电影名称：{{ movieData.title }}</p>
        <p>电影类型：{{ movieData.type }}</p>
        <p>电影上映时间：{{ movieData.showingon }}</p>
        <p>电影简介：{{ movieData.description }}</p>
    </div>
</template>

<script>
import myaxios from './http/MyAxios'
export default {
    data() {
        return {
            movieData: {}, // 绑定电影对象
        }
    },
    mounted() {
        // 当组件已经挂载到DOM上（已展示）时被vue自动调用
        console.log('生命周期方法mounted被调用')

        // 接收请求路径后的  ?key=value 格式的参数id
        // let id = this.$route.query.id
        // 接收路径参数: /detail/:id 格式的参数id
        let id = this.$route.params.suibian
        console.log('接收到参数id:' + id)
        // https://web.codeboy.com/bmdapi/movie-info/query?id=5
        let url = 'https://web.codeboy.com/bmdapi/movie-info/query'
        myaxios.get(url, { id }).then((res) => {
            console.log(res) // res.data.data中存储了电影对象 {}
            this.movieData = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
