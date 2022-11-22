<template>
    <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column label="编号" width="180">
            <template slot-scope="scope">
                下标:{{ scope.$index }}显示id: {{ scope.row.id }}
            </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column label="年龄">
            <template slot-scope="scope"> {{ scope.row.age }}岁 </template>
        </el-table-column>
        <el-table-column label="工资">
            <template slot-scope="scope"> ${{ scope.row.money }} 元 </template>
        </el-table-column>
        <el-table-column label="婚姻状况">
            <template slot-scope="scope">
                <el-tag :type="scope.row.married ? 'success' : 'danger'">{{
                    scope.row.married ? '已婚' : '未婚'
                }}</el-tag>

                <el-tag v-if="scope.row.married" type="success">已婚</el-tag>
                <el-tag v-else type="danger">未婚</el-tag>
            </template>
        </el-table-column>
        <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="warning" size="mini">编辑</el-button>
                <el-button
                    @click="delItem(scope.$index)"
                    type="danger"
                    size="mini"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        { id: 1001, name: '神里', age: 18, money: 50000, married: false, },
        { id: 1002, name: '申鹤', age: 18, money: 60000, married: true, },
        { id: 1003, name: '胡桃', age: 18, money: 70000, married: true, },
        { id: 1004, name: '优菈', age: 18, money: 80000, married: true, }
      ]
    }
  },
  methods: {
    // 删除某一行 ,需要传入行索引
    delItem(index) {
      this.$confirm('此操作将永久删除该好友, 是否继续?', '警告!', {
        confirmButtonText: '忍痛删除',
        cancelButtonText: '算了吧,我想想',
        type: 'warning'
      }).then(() => {  // 用户点击了确认
        this.tableData.splice(index, 1)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {  // 用户点击了取消
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      })
    }
  },
}
</script>
