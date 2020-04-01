<template>
  <div class="usersTable">
    <h5>部门表</h5>
    <el-row :gutter="20">
      <el-col :span="4" :offset="20">
        <el-input v-model="input" placeholder="请输入内容" style="width:50%;"></el-input>
        <el-button type="primary" size="mini" icon="view" @click="searchData">搜索</el-button>
      </el-col>
    </el-row>
    <el-button type="primary" size="mini" icon="view" @click="addUsers">添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column prop="DepartmentId" label="部门ID" width="180" align="center" v-if="false"></el-table-column>
      <el-table-column prop="Name" label="部门名称" width="180" align="center"></el-table-column>
      <el-table-column prop="HigherDepartment" label="上级部门名称" width="180" align="center"></el-table-column>
      <el-table-column prop="LeaderName" label="部门负责人" align="center"></el-table-column>
      <el-table-column prop="PhoneNumber" label="部门联系电话" align="center"></el-table-column>
      <el-table-column prop="EmailAddress" label="部门邮箱" align="center"></el-table-column>
      <el-table-column prop="CreatorUserId" label="创建人Id" align="center" v-if="false"></el-table-column>
      <el-table-column prop="CreatorName" label="创建人" align="center"></el-table-column>
      <el-table-column prop="CreationTime" label="创建时间" align="center"></el-table-column>
      <el-table-column prop="EditorUserId" label="编辑人ID" align="center" v-if="false"></el-table-column>
      <el-table-column prop="EditorName" label="编辑人" align="center"></el-table-column>
      <el-table-column prop="EditTime" label="编辑时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUsersTable(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件---fzy -->
    <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>
    <add-department
      v-if="addFundDialog.show"
      :isShow="addFundDialog.show"
      :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog"
      @getUsersTable="getUsersTable"
    ></add-department>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddDepartment from "./components/addDepartment";
import Pagination from "@/components/pagination";
export default {
  name: "usersTable",
  components: {
    AddDepartment,
    Pagination
  },
  data() {
    return {
      tableData1: [
        {
          DepartmentId: "1",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 1,
          CreatorName: "小A",
          CreationTime: "2020-02-24",
          EditorUserId: 11,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        },
        {
          DepartmentId: "2",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 2,
          CreatorName: "小B",
          CreationTime: "2020-02-24",
          EditorUserId: 12,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        },
        {
          DepartmentId: "3",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 3,
          CreatorName: "小A",
          CreationTime: "2020-02-24",
          EditorUserId: 13,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        },
        {
          DepartmentId: "4",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 4,
          CreatorName: "小A",
          CreationTime: "2020-02-24",
          EditorUserId: 14,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        },
        {
          DepartmentId: "5",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 5,
          CreatorName: "小D",
          CreationTime: "2020-02-24",
          EditorUserId: 15,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        }
      ],
      // 控制编辑框的显示
      addFundDialog: {
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
      console.log("row" + row);
      this.addFundDialog.dialogRow = row;
      this.showAddFundDialog();
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
    },
    // 加载用户表
    getUsersTable() {
      this.$get("/api/users", {}).then(res => {
        this.tableData1 = res.data.data;
      });
    },
    // 删除对应信息
    deleteUsersTable(row) {
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$delete("/api/users", {
            userId: row.HigherDepartment
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
    },
    //搜索
    searchData() {
      this.tableData1 = [
        {
          DepartmentId: "6",
          Name: "信息系统部",
          HigherDepartment: "智能工程中心",
          LeaderName: "郭靖",
          PhoneNumber: "16898985858",
          EmailAddress: "abc@163.com",
          CreatorUserId: 6,
          CreatorName: "小D",
          CreationTime: "2020-02-24",
          EditorUserId: 16,
          EditorName: "小刘",
          EditTime: "2020-02-24"
        }
      ];
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