<template>
    <div>
        <!-- views/Form.vue 表单组件 -->
        <el-form
            style="width: 600px"
            ref="form"
            :model="form"
            label-width="100px"
            :rules="rules"
        >
            <el-form-item label="账号" prop="name">
                <el-input
                    ref="nameInput"
                    v-model="form.name"
                    placeholder="请输入账号"
                ></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pwd1">
                <el-input
                    show-password
                    v-model="form.pwd1"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="再次输入密码" prop="pwd2">
                <el-input
                    show-password
                    v-model="form.pwd2"
                    placeholder="请输入密码"
                ></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input
                    v-model="form.phone"
                    placeholder="请输入手机号"
                ></el-input>
            </el-form-item>
            <el-button type="primary" @click="submit">提交</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: '',
        email: '',
        phone: '',
        pwd1: '',
        pwd2: ''
      },
      rules: {
        name: [
          { required: true, message: '账号必填', trigger: 'blur' },
          { min: 5, max: 15, message: '字符长度5~15之间', trigger: 'blur' }
        ],
        pwd1: [
          { required: true, message: '密码必填', trigger: 'blur' },
          { pattern: /^\d{6}/, message: '密码需要6位数字', trigger: 'blur' }
        ],
        pwd2: [
          // 当焦点失去时,触发验证器函数进行表单验证
          // 验证器函数:(rule,value,callback) =>{....}
          // 该函数用于验证表单组件中的值是否符合要求,
          // 验证完毕后该函数需要返回验证结果(以callback方式返回)
          {
            validator: (rule, value, callback) => {
              if (value == this.form.pwd1) {
                callback()
              } else {
                callback(new Error('两次密码不一致'))
              }
            }, trigger: 'blur'
          },

        ],
        phone: [
          { required: true, message: '手机号未填写', trigger: 'blur' },
          { pattern: /^1[3456789]\d{9}$/, message: '手机号不符合规则', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submit() {
      let form = this.$refs['form']
      console.log(form)
      let nameInput = this.$refs.nameInput
      console.log(nameInput)
      console.log('用户点击了提交按钮', this.form)
      // myaxios.post(url,this.form,)

      // validate方法用于验证整个表单,
      // 如果验证成功则返回true
      // 如果验证失败返回false  以callback的方式返回
      form.validate((valid) => {
        if (valid) {
          console.log('用户点击了提交按钮', this.form)
        } else {
          console.log('验证失败')
        }
      })
    }
  },

}
</script>

<style lang="scss" scoped>
</style>
