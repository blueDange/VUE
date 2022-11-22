<template>
    <div>
        <b>{{ cinemaRoom.cinema_name }}</b>
        的
        <b>{{ cinemaRoom.cinema_room_name }}</b>
        的排片计划列表
        <el-divider></el-divider>
        <el-table :data="plans" style="width: 100%">
            <el-table-column prop="title" label="电影名称"> </el-table-column>
            <el-table-column prop="showingon_date" label="放映日期">
            </el-table-column>
            <el-table-column prop="showingon_time" label="放映场次">
            </el-table-column>
            <el-table-column prop="price" label="票价"> </el-table-column>
            <el-table-column label="是否已发布">
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.status"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        :active-value="1"
                        :inactive-value="0"
                    ></el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template>
                    <el-button
                        type="danger"
                        size="small"
                        icon="el-icon-delete"
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            plans: [], // 保存排片计划列表
            movieList: [], // 存储当前可选的电影列表  供el-option使用
            cinemaRoom: {}, // 保存当前放映厅对象信息
        }
    },

    methods: {},

    /** 组件挂载完毕后执行 */
    mounted() {
        // 加载放映厅的基本信息，并且显示在头部
        let params = { id: this.$route.params.room_id }
        this.$http.cinemaRoomApi.queryById(params).then((res) => {
            console.log('加载放映厅基本信息', res)
            // 将res.data.data对象，存入data，在页面中可以直接显示
            this.cinemaRoom = res.data.data
        })

        // 加载当前放映厅下的所有排片列表
        params = { room_id: this.$route.params.room_id }
        this.$http.showingonPlanApi.queryByRoomId(params).then((res) => {
            console.log('当前放映厅的所有排片计划', res)
            this.plans = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
