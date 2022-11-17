<template>
    <div>
        <div
            id="container"
            style="width: 100%; height: 250px; border: 1px solid black"
        ></div>

        <el-table :data="cinemas">
            <el-table-column
                header-align="center"
                align="center"
                prop="cinema_name"
                label="影院名称"
            >
            </el-table-column>

            <el-table-column
                header-align="center"
                align="center"
                prop="cinema_name"
                label="影院地址"
            >
            </el-table-column>

            <el-table-column
                header-align="center"
                align="center"
                prop="cinema_name"
                label="影院位置"
            >
                <template slot-scope="scope">
                    {{ scope.row.province }} {{ scope.row.city }}
                </template>
            </el-table-column>

            <el-table-column
                header-align="center"
                align="center"
                label="操作"
                width="180px"
            >
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-user"
                        @click="loc(scope.row)"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="info"
                        icon="el-icon-picture-outline"
                        @click="
                            $router.push(
                                `/home/cinema-room-list/${scope.row.id}`
                            )
                        "
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="warning"
                        icon="el-icon-star-off"
                        circle
                        @click="
                            $router.push(`/home/movie-update/${scope.row.id}`)
                        "
                    ></el-button>
                    <el-button
                        @click="delItem(scope.row.id)"
                        size="small"
                        type="danger"
                        icon="el-icon-delete"
                        circle
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
    data() {
        return {
            map: null,
            cinemas: [],
        }
    },
    methods: {
        delItem(id) {
            console.log('待删除电影的ID', +id)
            // 弹出确认删除对话框
            this.$confirm('该操作将永久删除电影,是否继续', '提示', {
                type: 'warning',
            })
        },

        // 点击定位按钮，需要将地图设置为当前选中影院的位置
        loc(cinema) {
            console.log(cinema)
            let { longitude, latitude } = cinema
            this.map.setCenter([longitude, latitude])
            this.map.setZoom(18)
            // 显示标记
        },
    },

    mounted() {
        // 加载所有的电影院
        this.$http.cinemaApi.list().then((res) => {
            console.log('影院列表', res)
            this.cinemas = res.data.data
        })

        // 加载地图内容
        window._AMapSecurityConfig = {
            securityJsCode: '0b7fff62bb4d6f79bae15c1a1483e327',
        }
        AMapLoader.load({
            // 申请好的Web端开发者Key，首次调用 load 时必填
            key: '7bfbe3ab215345f405c23b5eed760ca8',
            version: '2.0', // 指定要加载的 JSAPI 的版本
            plugins: [], // 需要使用的的插件列表
        }).then((AMap) => {
            this.map = new AMap.Map('container')
        })
    },
}
</script>

<style lang="scss" scoped></style>
