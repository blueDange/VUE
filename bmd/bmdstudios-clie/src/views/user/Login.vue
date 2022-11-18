<template>
    <div>
        <div class="back">
            <el-form
                class="form"
                label-position="left"
                :model="form"
                :rules="rules"
                ref="form"
            >
                <p class="title">Welcome</p>
                <el-form-item prop="username">
                    <el-input
                        v-model="form.username"
                        placeholder="请输入管理员账号"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        v-model="form.password"
                        type="password"
                        placeholder="请输入管理员密码"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button
                        type="primary"
                        style="width: 100%"
                        @click="onSubmit()"
                        >登录
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
            },
            rules: {
                username: [
                    {
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^\w{3,15}$/,
                        message: '3~15位字符，可以包含：数字、字母、下划线',
                        trigger: 'blur',
                    },
                ],
                password: [
                    {
                        required: true,
                        message: '请填写用户名',
                        trigger: 'blur',
                    },
                    {
                        pattern: /^\w{6,15}$/,
                        message: '6~15位字符，可以包含：数字、字母、下划线',
                        trigger: 'blur',
                    },
                ],
            },
        }
    },

    methods: {
        onSubmit() {
            this.$refs['form'].validate((valid) => {
                if (valid) {
                    // 验证通过
                    // 发送登录请求
                    this.$http.adminApi.login(this.form).then((res) => {
                        console.log('登录请求结果', res)
                        if (res.data.code == 200) {
                            // 跳转到首页
                            this.$router.push('/home/index')
                            this.$message({
                                type: 'success',
                                message: '登录成功',
                            })
                            // 将登录用户存入vuex
                            this.$store.commit(
                                'updateUserInfo',
                                res.data.data.user
                            )
                        } else {
                            this.$message({
                                type: 'error',
                                message: `注意：${res.data.msg}`,
                            })
                        }
                    })
                } else {
                    this.$message({
                        type: 'error',
                        message: '请正确填写表单',
                    })
                }
            })
        },
    },
}
</script>

<style scoped>
.form {
    display: block;
    width: 20%;
    position: absolute;
    top: 30%;
    left: 40%;
}
.form .title {
    text-align: center;
    font-size: 1.5em;
    color: white;
    margin-bottom: 20px;
}
.back {
    height: 100vh;
    background-image: linear-gradient(
        125deg,
        #e14040,
        #b050cd,
        #4842c9,
        #34828d
    );
    background-size: 500%;
    animation: animate 20s infinite;
}
@keyframes animate {
    0% {
        background-position: 0% 50%;
    }
    50% {
        background-position: 100% 50%;
    }
    100% {
        background-position: 0% 50%;
    }
}
</style>
