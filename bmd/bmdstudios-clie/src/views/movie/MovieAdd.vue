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
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="80px"
            style="width: 300px"
        >
            <el-form-item prop="actorName" label="电影名称">
                <el-input
                    v-model="form.actorName"
                    placeholder="请输入电影名称"
                ></el-input>
            </el-form-item>
            <el-form-item prop="actorAvatar" label="选择电影">
                <el-upload
                    class="avatar-uploader"
                    action="http://localhost:9000/upload"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                >
                    <img
                        v-if="form.actorAvatar"
                        :src="form.actorAvatar"
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
            form: {},
        }
    },
    methods: {},
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
