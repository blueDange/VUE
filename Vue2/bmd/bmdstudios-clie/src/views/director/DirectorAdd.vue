<template>
    <div>
        <!-- 面包屑导航 -->
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>导演管理</el-breadcrumb-item>
            <el-breadcrumb-item>新增导演</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 分割线 -->
        <!-- <el-divider></el-divider> -->
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="80px"
            style="width: 300px"
        >
            <el-form-item prop="directorName" label="姓名">
                <el-input
                    v-model="form.directorName"
                    placeholder="请输入姓名"
                ></el-input>
            </el-form-item>
            <el-form-item prop="directorAvatar" label="选择头像">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9000/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <img
                        v-if="form.directorAvatar"
                        :src="form.directorAvatar"
                        class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
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
            form: {
                directorName: '', //绑定姓名
                directorAvatar: '', // 头像
            },
            rules: {
                directorName: [
                    { required: true, message: '姓名必须填', trigger: 'blur' },
                ],
                directorAvatar: [
                    { required: true, message: '必须上传一张图片' },
                ],
            },
        }
    },
    methods: {
        // 上传头像成功后自动调用,将会自动传入响应结果res与文件对象file
        handleAvatarSuccess(res, file) {
            console.log(res)
            this.form.directorAvatar = res.data
        },
        // 提交添加导演表单
        submit() {
            // 先验证表单是否符合要求
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    //valid返回true,以为两个字段都验证成功
                    console.log('验证通过')
                    let url = 'http://localhost:3010/movie-director/add'
                    myaxios.post(url, this.form).then((res) => {
                        console.log(res)
                        if (res.data.code == 200) {
                            // 添加成功
                            this.$refs['form'].resetFields()
                            this.$message({
                                message: '新增导演完成',
                                type: 'success',
                            })
                        }
                    })
                }
            })
        },
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
