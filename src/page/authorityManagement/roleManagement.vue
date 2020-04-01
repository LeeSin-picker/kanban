<template>
  <div class="usersTable">
    <h5>角色表</h5>
    <el-button type="primary" size="mini" icon="view" @click="addUsers">添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUsersTable(scope.row)">删除</el-button>
          <el-button
            size="mini"
            type="primary"
            @click="handlePermissions(scope.$index, scope.row)"
          >分配权限</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="id" label="角色Id" align="center" v-if="false"></el-table-column>
      <el-table-column prop="name" label="角色名称" align="center"></el-table-column>
      <el-table-column prop="description" label="描述" align="center"></el-table-column>
    </el-table>
    <!-- 分页组件---fzy -->
    <!-- <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>-->
    <add-roles
      v-if="addFundDialog.show"
      :isShow="addFundDialog.show"
      :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog"
      @getUsersTable="getUsersTable"
    ></add-roles>
    <edit-permissions
      v-if="addFundDialogTwo.show"
      :isShow="addFundDialogTwo.show"
      :permissionList="permissionList"
      :allPermissions="allPermissions"
      @closeDialog="hideAddFundDialogTwo"
      @getUsersTable="getUsersTable"
    ></edit-permissions>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddRoles from "./components/addRoles";
import EditPermissions from "./components/editPermissions";
import Pagination from "@/components/pagination";
export default {
  name: "usersTable",
  components: {
    AddRoles,
    EditPermissions,
    Pagination
  },
  data() {
    return {
      tableData1: [],
      // 权限数组
      permissionList: {},
      //所有的权限
      allPermissions: [],
      // 控制编辑框的显示
      addFundDialog: {
        show: false,
        dialogRow: {}
      },
      addFundDialogTwo: {
        show: false,
        dialogRow: {}
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
      console.log(row);
      this.addFundDialog.dialogRow = row;
      this.showAddFundDialog();
    },
    handlePermissions(index, row) {
      console.log(row);
      this.$get("/api/services/app/Role/Get", { id: row.id }).then(res => {
        this.permissionList = res.data.result;
        this.$get("/api/services/app/Role/GetAllPermissions", {}).then(res => {
          console.log(res.data.result);
          this.allPermissions = res.data.result;
          this.showPermissions();
        });
      });
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    // 显示资金弹框
    showAddFundDialog(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialog.show = true;
    },
    // 显示权限弹框
    showPermissions(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialogTwo.show = true;
    },
    // 重新加载页面
    hideAddFundDialog() {
      this.addFundDialog.show = false;
      console.log(this.addFundDialog.show);
    },
    hideAddFundDialogTwo() {
      this.addFundDialogTwo.show = false;
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
    },
    // 加载用户表
    getUsersTable() {
      this.$get("/api/services/app/Role/GetAll", {}).then(res => {
        this.tableData1 = res.data.result.items;
      });
    },
    // 删除对应信息
    deleteUsersTable(row) {
      console.log(row.RoleId);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$delete("/api/users", {
            userId: row.UserId
          }).then(res => {
            let data = res.data;
            if (data.success) {
              this.getUsersTable();
            } else {
              alert(data.message);
            }
          });
        })
        .catch(() => {});
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