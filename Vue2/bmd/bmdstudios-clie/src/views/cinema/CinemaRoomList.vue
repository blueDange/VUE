<template>
    <div>
        <el-button type="primary" plain @click="dialogFormVisible = true"
            >新增放映厅</el-button
        >
        <el-divider></el-divider>
        <!-- 放映厅列表 -->

        <el-table :data="rooms">
            <el-table-column prop="room_name" label="放映厅名称">
            </el-table-column>
            <el-table-column prop="room_type" label="放映厅类型">
            </el-table-column>
            <el-table-column label="座位数量">
                <template slot-scope="scope">
                    {{
                        scope.row.room_size
                            ? scope.row.room_size
                            : '暂未配置座位模板'
                    }}
                </template>
            </el-table-column>
            <el-table-column label="操作" width="180px">
                <template slot-scope="scope">
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-location-information"
                        circle
                        @click="
                            $router.push(
                                `/home/showingonplan-list/${scope.row.id}`
                            )
                        "
                    >
                    </el-button>
                    <el-button
                        size="small"
                        type="success"
                        icon="el-icon-data-line"
                        circle
                        @click="
                            $router.push(`/home/seat-template/${scope.row.id}`)
                        "
                    >
                    </el-button>
                    <el-button
                        size="small"
                        type="primary"
                        icon="el-icon-edit"
                        circle
                    ></el-button>
                    <el-button
                        size="small"
                        type="danger"
                        icon="el-icon-plus"
                        circle
                        @click="
                            $router.push(
                                `/home/showingonplan-add/${scope.row.id}`
                            )
                        "
                    ></el-button>
                </template>
            </el-table-column>
        </el-table>

        <!-- 声明一个自定义对话框,放置添加放映厅的表单 -->
        <el-dialog title="新增放映厅" :visible.sync="dialogFormVisible">
            <el-form :model="form" label-width="140px">
                <el-form-item label="放映厅名称">
                    <el-input
                        v-model="form.room_name"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="放映厅类型">
                    <el-select
                        v-model="form.room_type"
                        placeholder="请选择放映厅类型"
                        width="100%"
                    >
                        <el-option
                            v-for="item in types"
                            :key="item.id"
                            :label="item.type_name"
                            :value="item.type_name"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            rooms: [],
            types: [], // 保存所有的放映厅的类型
            dialogFormVisible: false, // 控制是否显示对话框
            form: {
                room_name: '', // 放映厅名称
                room_type: '', // 放映厅类型
                // 上一个页面(影院列表项) 点击影院后传过来影院id
                movie_cinema_id: this.$route.params.cinema_id,
            },
        }
    },

    methods: {
        // 提交添加放映厅的请求
        submit() {
            // 完成表单验证 重要!: 需要整理好请求参数
            // room_type room_type movie_cinema_id

            this.$http.cinemaRoomApi.add(this.form).then((res) => {
                if (res.data.code == 200) {
                    // 新增成功
                    this.$message({
                        type: 'success',
                        message: '添加成功',
                    })
                    // 隐藏弹出窗口
                    this.dialogFormVisible = false
                }
            })
        },
    },

    mounted() {
        // 加载当前电影院的放映厅列表
        // let params = {cinema_id: this.form.movie_cinema_id}
        let params = { cinema_id: this.$route.params.cinema_id }
        this.$http.cinemaRoomApi.list(params).then((res) => {
            console.log('加载当前电影院的放映厅', res)
            this.rooms = res.data.data
            console.log(this.rooms)
        })

        // 加载所有放映厅的类型
        this.$http.cinemaRoomApi.queryAllTypes().then((res) => {
            this.types = res.data.data
        })
    },
}
</script>

<style lang="scss" scoped></style>
