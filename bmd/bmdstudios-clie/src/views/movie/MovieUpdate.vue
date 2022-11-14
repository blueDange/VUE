<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>电影管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增电影</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 分割线 -->
        <el-divider></el-divider>
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
                    :show-file-list="false"
                    :on-success="handleSuccess"
                >
                    <img v-if="form.cover" :src="form.cover" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
            </el-form-item>

            <el-form-item label="电影类别" prop="categoryId">
                <el-radio-group v-model="form.categoryId">
                    <el-radio label="1">热映 </el-radio>
                    <el-radio label="2">待映</el-radio>
                    <el-radio label="3">经典</el-radio>
                </el-radio-group>
            </el-form-item>

            <el-form-item label="电影名称" prop="title">
                <el-input v-model="form.title"></el-input>
            </el-form-item>

            <el-form-item label="电影类型" prop="type">
                <el-select
                    v-model="form.type"
                    multiple
                    placeholder="请选择电影类型"
                >
                    <el-option
                        v-for="item in movieTypes"
                        :key="item.id"
                        :label="item.typename"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="电影主演" prop="starActor">
                <el-select
                    v-model="form.starActor"
                    placeholder="请选择电影主演"
                    multiple
                    remote
                    filterable
                    :remote-method="queryActors"
                    reserve-keyword
                >
                    <el-option
                        v-for="item in actors"
                        :key="item.id"
                        :label="item.actor_name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="上映时间" prop="showingon">
                <el-date-picker
                    v-model="form.showingon"
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="请选择时间"
                ></el-date-picker>
            </el-form-item>

            <el-form-item label="电影评分" prop="score">
                <el-input v-model="form.score"></el-input>
            </el-form-item>

            <el-form-item
                label="电影时长"
                prop="duration
"
            >
                <el-input v-model="form.duration"></el-input>
            </el-form-item>

            <el-form-item label="电影简介" prop="description">
                <el-input v-model="form.description"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submit">立即新增</el-button>
                <el-button>返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import myaxios from '@/http/MyAxios'
export default {
    data() {
        return {
            movieTypes: [], // 绑定所有的电影雷西兴[{id:1,typename:''}]
            actors: [], // 绑定选择主演列表数据[{id,actor_name,actor_avatar}]
            form: {
                //封装表点数据
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
        handleSuccess(res, file) {
            // 将上传成功后的图片访问地址.存放在data
            this.form.cover = res.data
        },

        /**接受输入框中的关键字 */
        queryActors(word) {
            // 发送http请求,模糊查询演员列表,查询结果存入data
            this.$http.actorApi.queryByNameLike({ name: word }).then((res) => {
                console.log('演员列表查询结果:+', res)
                this.actors = res.data.data
            })
        },

        // 提交表单
        submit() {
            // 完成表单验证
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    console.log('验证通过', this.form)
                    // 需要整理每个表单参数字段,使之正确: starActor
                    this.form.type = this.form.type.join(' / ')
                    this.form.starActor = this.form.starActor.join(' / ')
                    console.log('验证通过:', this.form)
                    // 发送请求,添加新电影到数据库
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
    },

    // 页面挂载完毕后执行
    mounted() {
        // 加载所有的电影类型
        this.$http.movieApi.queryMovieTypes().then((res) => {
            // 将res.data存入data中,在页面中使用v-for遍历
            this.movieTypes = res.data.data
        })

        let id = this.$route.params.id
        this.$http.movieApi.queryById({ id }).then((res) => {
            console.log('通过ID查询电影详情', res)
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
    width: 120px;
    height: 120px;
    display: block;
}
</style>
