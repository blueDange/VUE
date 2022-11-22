<template>
    <div>
        <!-- 面包屑导航 -->
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增电影</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->

        <!-- 新增电影的表单 -->
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="80px"
            style="width: 500px"
        >
            <el-form-item label="封面" prop="cover">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9000/upload"
                    :on-success="uploadSuccess"
                    :show-file-list="false"
                >
                    <img v-if="form.cover" :src="form.cover" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="电影类别" prop="categoryId">
                <el-radio v-model="form.categoryId" label="1"> 热映</el-radio>
                <el-radio v-model="form.categoryId" label="2"> 待映</el-radio>
                <el-radio v-model="form.categoryId" label="3"> 经典</el-radio>
            </el-form-item>
            <el-form-item prop="title" label="电影名称">
                <el-input v-model="form.title" />
            </el-form-item>
            <el-form-item prop="type" label="电影类型">
                <el-select v-model="form.type" multiple placeholder="请选择">
                    <el-option
                        v-for="item in movieTypes"
                        :key="item.id"
                        :label="item.typename"
                        :value="item.typename"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="starActor" label="电影主演">
                <el-select
                    v-model="form.starActor"
                    multiple
                    remote
                    filterable
                    reserve-keyword
                    :remote-method="queryActors"
                    placeholder="请选择"
                >
                    <el-option
                        v-for="item in actors"
                        :key="item.id"
                        :label="item.actor_name"
                        :value="item.actor_name"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item prop="showingon" label="上映日期">
                <el-date-picker
                    v-model="form.showingon"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期"
                >
                </el-date-picker>
            </el-form-item>

            <el-form-item prop="score" label="电影评分">
                <el-input v-model="form.score" />
            </el-form-item>
            <el-form-item prop="duration" label="电影时长">
                <el-input v-model="form.duration" />
            </el-form-item>
            <el-form-item prop="description" label="电影简介">
                <el-input v-model="form.description" />
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit"> 立即新增 </el-button>
                <el-button>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 绑定选择主演的列表数据[{id,actor_name,actor_avatar},]
            actors: [],
            movieTypes: [], // 绑定所有的电影类型 [{id:1, typename:''}..]
            form: {
                // 封装表单数据
                categoryId: '1',
                cover: '',
                title: '',
                type: '',
                starActor: '',
                showingon: '',
                score: '',
                description: '',
                duration: '',
            },
            rules: {
                // 整理表单验证规则
                categoryId: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                cover: [{ required: true, message: '必填', trigger: 'blur' }],
                title: [{ required: true, message: '必填', trigger: 'blur' }],
                type: [{ required: true, message: '必填', trigger: 'blur' }],
                starActor: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                showingon: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                score: [{ required: true, message: '必填', trigger: 'blur' }],
                description: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
                duration: [
                    { required: true, message: '必填', trigger: 'blur' },
                ],
            },
        }
    },

    methods: {
        /** 提交表单 */
        submit() {
            // 完成表单验证
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // 需要整理每个表单参数字段，使之正确：starActor  type
                    this.form.type = this.form.type.join(' / ')
                    this.form.starActor = this.form.starActor.join(' / ')
                    console.log('验证通过：', this.form)
                    // 发送请求，添加新电影到数据库
                    this.$http.movieApi.add(this.form).then((res) => {
                        console.log('新增电影', res)
                        if (res.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '新增电影成功',
                            })
                            // 回到上一页
                            // this.$router.go(-1)
                            this.$router.push('/home/movie-list')
                        }
                    })
                }
            })
        },

        /** 接收输入框中的关键字 */
        queryActors(word) {
            console.log('关键字:' + word)
            // 发送http请求，模糊查询演员列表，查询结果存入data
            this.$http.actorApi.queryByNameLike({ name: word }).then((res) => {
                console.log('演员列表查询结果:', res)
                this.actors = res.data.data
            })
        },

        /** 上传成功后自动调用，将会自动传入响应结果res与文件对象file */
        uploadSuccess(res, file) {
            console.log(res)
            // 将上传成功后的图片访问地址，存入data
            this.form.cover = res.data
        },
    },

    /** 页面挂载完毕后执行 */
    mounted() {
        // 加载所有的电影类型
        this.$http.movieApi.queryMovieTypes().then((res) => {
            console.log('加载所有电影类型：', res)
            // 将res.data存入data中，在页面使用v-for进行遍历
            this.movieTypes = res.data.data
        })
    },
}
</script>

<style lang="scss">
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
}
.avatar {
    height: 120px;
    display: block;
}
</style>
