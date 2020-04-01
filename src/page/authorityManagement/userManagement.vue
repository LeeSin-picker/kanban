<template>
  <div class="usersTable">
    <h5>用户表</h5>
    <el-row :gutter="20">
      <el-col :span="4" :offset="20">
        <el-input v-model="input" placeholder="请输入内容" style="width:50%;"></el-input>
        <el-button type="primary" size="mini" icon="view" @click="searchData">搜索</el-button>
      </el-col>
    </el-row>
    <el-button type="primary" size="mini" icon="view" @click="addUsers">添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUsersTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="用户Id" width="180" align="center" v-if="false"></el-table-column>
      <el-table-column prop="userName" label="用户名" width="180" align="center"></el-table-column>
      <el-table-column prop="roleNames" label="角色名称" width="180" align="center"></el-table-column>
      <el-table-column prop="emailAddress" label="email地址" align="center"></el-table-column>
      <el-table-column prop="creationTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="lastLoginTime" label="上一登录时间" align="center"></el-table-column>
      <el-table-column label="是否激活" width="180" align="center" prop="isActive">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.isActive"
            active-color="#13ce66"
            inactive-color="#ff4949"
            disabled
          ></el-switch>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件---fzy -->
    <!-- <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>-->
    <add-users
      v-if="addFundDialog.show"
      :isShow="addFundDialog.show"
      :dialogRow="addFundDialog.dialogRow"
      :flag="addFundDialog.flag"
      @closeDialog="hideAddFundDialog"
      @getUsersTable="getUsersTable"
    ></add-users>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddUsers from "./components/addUsers";
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
        dialogRow: {},
        //添加一个标志字段用于控制密码输入方式的不同（添加和编辑的不同）
        flag: true
      },
      // 数据总条数---fzy
      pageTotal: 30,
      input: ""
    };
  },
  created() {
    this.getUsersTable();
  },
  methods: {
    handleEdit(index, row) {
      console.log("row" + row);
      this.addFundDialog.dialogRow = row;
      this.showAddFundDialog();
      this.addFundDialog.flag = false;
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 显示资金弹框
    showAddFundDialog(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialog.show = true;
    },
    // 重新加载页面
    hideAddFundDialog() {
      this.addFundDialog.show = false;
      console.log(this.addFundDialog.show);
    },
    // 上下分页
    handleCurrentChange(val) {
      // 请求接口
      console.log("请求某某页数据" + val);
    },
    // 每页显示多少条
    handleSizeChange(val) {
      // 请求接口
      console.log("每页显示多少条" + val);
    },
    // 添加用户表
    addUsers() {
      this.showAddFundDialog("add");
      this.addFundDialog.flag = true;
    },
    // 加载用户表
    getUsersTable() {
      this.$get("/api/services/app/User/GetAll", {})
        .then(res => {
          this.tableData1 = res.data.result.items;
          this.tableData1.forEach((val, index) => {
            val.creationTime = val.creationTime.split("T")[0];
          });
        })
        .catch(err => {
          this.open4(err);
        });
    },
    // 删除对应信息
    deleteUsersTable(row) {
      console.log(row.id);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      }).then(() => {
        this.$delete("/api/services/app/User/Delete", {
          id: row.id
        })
          .then(res => {
            let data = res.data;
            if (data.success) {
              this.getUsersTable();
            } else {
              alert(data.error);
            }
          })
          .catch(err => {
            this.open4(err);
          });
      });
    },
    //搜索
    searchData() {
      this.$get("/api/services/app/User/GetUserByName", {
        name: this.input
      })
        .then(res => {
          if (res.data.success) {
            this.tableData1 = res.data.result;
          } else {
            alert(res.data.error);
          }
        })
        .catch(err => {
          this.open4(err);
        });
    },
    open4(msg) {
      this.$message.error(msg);
    }
  }
};
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