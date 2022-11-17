<template>
    <div>
        为
        <b>{{ cinemaRoom.cinema_name }}</b>
        的
        <b>{{ cinemaRoom.cinema_room_name }}</b>
        添加排片计划
        <el-divider></el-divider>

        <el-form
            style="width: 600px"
            :model="form"
            :rules="rules"
            ref="form"
            label-width="140px"
        >
            <el-form-item label="选择电影" prop="movie_id">
                <el-select
                    style="width: 100%"
                    v-model="form.movie_id"
                    filterable
                    remote
                    reserve-keyword
                    :remote-method="queryMovies"
                    ref="select"
                >
                    <el-option
                        v-for="item in movieList"
                        :key="item.id"
                        :label="item.title"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="放映日期/场次" prop="showingon_date">
                <el-date-picker
                    v-model="form.showingon_date"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                >
                </el-date-picker>
                &nbsp;
                <el-time-select
                    v-model="form.showingon_time"
                    :picker-options="{
                        start: '06:00',
                        step: '00:15',
                        end: '24:00',
                    }"
                    placeholder="选择时间"
                >
                </el-time-select>
            </el-form-item>

            <el-form-item label="票价" prop="price">
                <el-input v-model="form.price" />
            </el-form-item>
            <el-form-item label="立即发布" prop="status">
                <el-switch
                    v-model="form.status"
                    active-color="#13ce66"
                    inactive-color="#ccc"
                    active-value="1"
                    inactive-value="0"
                >
                </el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">
                    立即新增该排片计划
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            movieList: [], // 存储当前可选的电影列表  供el-option使用
            cinemaRoom: {}, // 保存当前放映厅对象信息
            form: {
                cinema_id: '', // 电影院ID
                cinema_room_id: this.$route.params.room_id, //放映厅ID
                movie_id: '',
                showingon_date: '',
                showingon_time: '',
                status: 1, // 排片计划的状态  0未发布  1已发布
                price: '',
            },
            rules: {
                cinema_id: [{ required: true, message: '必填' }],
                cinema_room_id: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                movie_id: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                showingon_date: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                showingon_time: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                price: [{ required: true, message: '必填', trigger: 'blur' }],
            },
        }
    },

    methods: {
        /** 提交表单 */
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) {
                    console.log(this.form)
                    this.$http.showingonPlanApi.add(this.form).then((res) => {
                        console.log('新增排片计划', res)
                        this.$notify({
                            title: '成功',
                            message: `为${this.cinemaRoom.cinema_room_name}放映厅 新增排片计划:<<${this.$refs['select']._data.selectedLabel}>>`,
                            type: 'success',
                        })
                        this.$refs.form.resetFields() // 重置表单
                    })
                }
            })
        },

        // 当输入关键字后，执行该方法，
        // 发送请求，获取查询结果，更新el-option列表项
        queryMovies(word) {
            console.log(word)
            let params = { name: word, page: 1, pagesize: 100 }
            this.$http.movieApi.queryByNameLike(params).then((res) => {
                console.log('模糊查询结果', res)
                // 将模糊查询的结果 存入movieList
                this.movieList = res.data.data.result
            })
        },
    },

    /** 组件挂载完毕后执行 */
    mounted() {
        // 加载放映厅的基本信息，并且显示在头部
        let params = { id: this.form.cinema_room_id }
        this.$http.cinemaRoomApi.queryById(params).then((res) => {
            console.log('加载放映厅基本信息', res)
            // 将res.data.data对象，存入data，在页面中可以直接显示
            this.cinemaRoom = res.data.data
            // 需要将cinema_id 存入form，用于后续发送添加请求
            this.form.cinema_id = res.data.data.cinema_id
        })
    },
}
</script>

<style lang="scss" scoped></style>
