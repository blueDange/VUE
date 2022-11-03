<template>
  <div>
    <h2>注册</h2>
    <table>
      <tr>
        <td>姓名:</td>
        <td>
          <input type="text" v-model="name" />
        </td>
      </tr>
      <tr>
        <td>年龄:</td>
        <td>
          <input type="text" v-model="age" />
        </td>
      </tr>
      <tr>
        <td>性别</td>
        <td>
          <input type="radio" value="men" v-model="detail.sex" /> 男
          <input type="radio" value="women" v-model="detail.sex" /> 女
        </td>
      </tr>
      <tr>
        <td>爱好:</td>
        <td>
          <input type="checkbox" value="chouKa" v-model="detail.hobby" /> 抽卡
          <input type="checkbox" value="sing" v-model="detail.hobby" /> 唱
          <input type="checkbox" value="dance" v-model="detail.hobby" /> 跳
          <input type="checkbox" value="rap" v-model="detail.hobby" /> rap
          <input type="checkbox" value="basketball" v-model="detail.hobby" />
          篮球
        </td>
      </tr>
      <tr>
        <td>选择籍贯:</td>
        <td>
          <select v-model="detail.jiguan" name="" id="">
            <option value="sx">陕西</option>
            <option value="hn">河南</option>
            <option value="sd">山东</option>
            <option value="hb">湖北</option>
          </select>
        </td>
      </tr>
    </table>
    <button @click="submit">提交</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      age: '',
      detail: {
        hobby: [],
        jiguan: 'hb'
      }
    }
  },
  methods: {
    submit() {
      console.log(`name:${this.name} age:${this.age}`)
      // 清空输入框中的内容
      this.name = ''
      this.age = ''
    }
  },
}
</script>

<style lang="scss" scoped>
</style>