<template>
  <div class="usersTable">
    <h5>用户表</h5>
    <el-button type="primary" size="mini" icon="view" @click='addUsers'>添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column prop="RoleName" label="角色名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="RoleId" label="角色编码" width="180" align="center">
      </el-table-column>
      <el-table-column prop="UserName" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="UserCard" label="工号" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUsersTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件---fzy -->
    <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>
    <add-users v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog" @getUsersTable="getUsersTable"></add-users>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import AddUsers from './components/addUsers'
  import Pagination from "@/components/pagination";
  export default {
    name: "usersTable",
    components: {
      AddUsers,
      Pagination
    },
    data() {
      return {
        tableData1: [],
        // 控制编辑框的显示
        addFundDialog: {
          show: false,
          dialogRow: {}
        },
        // 数据总条数---fzy
        pageTotal: 30
      }
    },
    created() {
      this.getUsersTable()

    },
    methods: {
      handleEdit(index, row) {
        this.addFundDialog.dialogRow = row;
        this.showAddFundDialog();
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      // 显示资金弹框
      showAddFundDialog(val) {
        this.$store.commit('SET_DIALOG_TITLE', val)
        this.addFundDialog.show = true;
      },
      // 重新加载页面
      hideAddFundDialog() {
        this.addFundDialog.show = false;
        console.log(this.addFundDialog.show)
      },
      // 上下分页
      handleCurrentChange(val) {
        // 请求接口
        console.log('请求某某页数据' + val)
      },
      // 每页显示多少条
      handleSizeChange(val) {
        // 请求接口
        console.log('每页显示多少条' + val)
      },
      // 添加用户表
      addUsers() {
        this.showAddFundDialog('add');
      },
      // 加载用户表
      getUsersTable() {
        this.$get('/api/users', {}).then(res => {
          this.tableData1 = res.data.data
        })
      },
      // 删除对应信息
      deleteUsersTable(row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.$delete('/api/users', {
              UserCard: row.UserCard
            })
            .then(res => {
              let data = res.data
              if (data.success) {
                this.getUsersTable()
              } else {
                alert(data.message)
              }

            })
        })
        .catch(() => {})

      }
    }
  }
</script>

<style lang='less' scoped>
  .usersTable {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }

  h5 {
    color: #909399;
  }
</style>