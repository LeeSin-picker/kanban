<template>
  <div class="projectMaintenance">
    <h5>项目维护</h5>
    <el-row :gutter="20">
      <el-col :span="20" :offset="0">
        <el-input v-model="projectNo" placeholder="项目号" style="width:10%;"></el-input>
        <el-input v-model="projectName" placeholder="项目名称" style="width:10%;"></el-input>
        <el-input v-model="customerName" placeholder="客户名称" style="width:10%;"></el-input>
        <el-input v-model="projectLeader" placeholder="项目负责人" style="width:10%;"></el-input>
        <el-select v-model="currentProjectStatus" placeholder="项目状态" style="width:10%;">
          <el-option
            v-for="item in statusList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-select v-model="currentProcess" placeholder="当前项目阶段" style="width:12.5%;">
          <el-option
            v-for="item in processList"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-button type="primary" size="mini" icon="view" @click="searchData">搜索</el-button>
      </el-col>
    </el-row>
    <el-button class="addBtn" type="primary" size="mini" icon="view" @click="addUsers">添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column label="操作" align="center" width="300">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">项目信息</el-button>
          <el-button size="mini" type="primary" @click="handleEditTwo(scope.$index, scope.row)">计划编辑</el-button>
          <el-button size="mini" type="primary" @click="editProgress(scope.$index, scope.row)">项目进度</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="projectNo" label="项目号" width="120" align="center"></el-table-column>
      <el-table-column prop="projectName" label="项目名称" width="150" align="center"></el-table-column>
      <el-table-column prop="projectLeader" label="项目负责人" width="100" align="center"></el-table-column>
      <el-table-column prop="currentProcess" label="当前项目阶段" align="center" width="100"></el-table-column>
      <el-table-column prop="currentProcessFinishRate" label="当前阶段完成率" align="center" width="120"></el-table-column>
      <el-table-column prop="customerName" label="客户名称" align="center" width="150"></el-table-column>
      <el-table-column prop="planStartTime" label="项目计划开始时间" align="center" width="120"></el-table-column>
      <el-table-column prop="planEndTime" label="项目计划结束时间" align="center" width="120"></el-table-column>
      <el-table-column prop="actualStartTime" label="项目实际开始时间" align="center" width="120"></el-table-column>
      <el-table-column prop="actualEndTime" label="项目实际结束时间" align="center" width="120"></el-table-column>
      <el-table-column prop="currentProjectStatus" label="项目状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center" width="80">
        <template slot-scope="scope">
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
    <add-maintenance
      v-if="addFundDialog.show"
      :isShow="addFundDialog.show"
      :dialogRow="addFundDialog.dialogRow"
      :processPlanData="processPlanData"
      :flag="addFundDialog.flag"
      @closeDialog="hideAddFundDialog"
      @getUsersTable="getUsersTable"
    ></add-maintenance>
    <time-edit
      v-if="addFundDialogTwo.show"
      :isShow="addFundDialogTwo.show"
      :dialogRow="addFundDialogTwo.dialogRow"
      :flag="addFundDialogTwo.flag"
      @closeDialog="hideAddFundDialogTwo"
      @getUsersTable="getUsersTable"
    ></time-edit>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddMaintenance from "./components/addMaintenance";
import TimeEdit from "./components/timeEdit";
import Pagination from "@/components/pagination";
export default {
  name: "projectMaintenance",
  components: {
    AddMaintenance,
    Pagination,
    TimeEdit
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
      addFundDialogTwo: {
        show: false,
        dialogRow: {},
        //添加一个标志字段用于控制密码输入方式的不同（添加和编辑的不同）
        flag: true
      },
      // 数据总条数---fzy
      pageTotal: 30,
      //   查询字段初始化
      projectNo: "",
      projectName: "",
      customerName: "",
      projectLeader: "",
      currentProjectStatus: "",
      currentProcess: "",
      statusList: [
        { label: "", value: "" },
        { label: "待启动", value: "待启动" },
        { label: "进行中", value: "进行中" },
        { label: "已完成", value: "已完成" }
      ],
      processList: [
        { label: "", value: "" },
        { label: "项目启动", value: "项目启动" },
        { label: "设计阶段", value: "设计阶段" },
        { label: "采购加工", value: "采购加工" },
        { label: "厂内装配", value: "厂内装配" },
        { label: "计划发货", value: "计划发货" },
        { label: "安装开始", value: "安装开始" },
        { label: "现场安装", value: "现场安装" },
        { label: "设备调试", value: "设备调试" },
        { label: "试运行", value: "试运行" },
        { label: "终验收", value: "终验收" }
      ],
      // 计划编辑数据
      processPlanData: {}
    };
  },
  created() {
    this.getUsersTable();
  },
  methods: {
    handleEdit(index, row) {
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: row.projectNo
      }).then(res => {
        this.addFundDialog.dialogRow = res.data.result.items[0];
        this.$get("/api/services/app/Project/GetProcessPlan", {
          projectNo: row.projectNo
        }).then(res => {
          this.processPlanData = res.data.result;
          this.showAddFundDialog();
          this.addFundDialog.flag = false;
        });
      });
    },
    handleEditTwo(index, row) {
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: row.projectNo
      }).then(res => {
        this.addFundDialogTwo.dialogRow = res.data.result.items[0];
        this.showAddFundDialogTwo();
        this.addFundDialogTwo.flag = false;
      });
    },
    editProgress(index, row) {
      console.log(row);
      this.$router.push({
        name: "projectProgress",
        params: { projectNo: row.projectNo, currentProcess: row.currentProcess }
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
    // 显示资金弹框
    showAddFundDialogTwo(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialogTwo.show = true;
    },
    // 重新加载页面
    hideAddFundDialog() {
      this.addFundDialog.show = false;
    },
    // 重新加载页面
    hideAddFundDialogTwo() {
      this.addFundDialogTwo.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      // 请求接口
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: "",
        PageSize: 10,
        PageIndex: val
      })
        .then(res => {
          this.tableData1 = res.data.result.items;
        })
        .catch(err => {
          this.open4(err);
        });
      console.log("请求某某页数据" + val);
    },
    // 每页显示多少条
    handleSizeChange(val) {
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: "",
        PageSize: val,
        PageIndex: 1
      })
        .then(res => {
          this.tableData1 = res.data.result.items;
        })
        .catch(err => {
          this.open4(err);
        });
    },
    // 添加用户表
    addUsers() {
      this.showAddFundDialog("add");
      this.addFundDialog.flag = true;
    },
    // 加载用户表
    getUsersTable() {
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: "",
        PageSize: 10,
        PageIndex: 1
      })
        .then(res => {
          this.tableData1 = res.data.result.items;
          this.pageTotal = res.data.result.totalCount;
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
        this.$delete("/api/services/app/Project/Delete", {
          projectNo: row.projectNo
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
      this.$get("/api/services/app/Project/GetProject", {
        projectNo: this.projectNo,
        projectName: this.projectName,
        customerName: this.customerName,
        projectLeader: this.projectLeader,
        currentProjectStatus: this.currentProjectStatus,
        currentProcess: this.currentProcess
      })
        .then(res => {
          if (res.data.success) {
            this.tableData1 = res.data.result.items;
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

<style lang='less' >
.projectMaintenance {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}

h5 {
  color: #909399;
  margin-bottom: 10px;
}
.addBtn {
  margin-top: 10px;
}
.el-input--mini .el-input__inner {
  color: #000;
  font-weight: bold;
}
.el-input.is-disabled .el-input__inner {
  color: #000;
}
</style>