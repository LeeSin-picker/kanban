<template>
  <div class="usersTable">
    <el-row>
      <el-col :span="6">
        <div class="placeholder">
          <img src="../../assets/img/hzsiasun.png" alt width="60%" style="display:inline-block;" />
        </div>
        <div class="departmentName">部门：智能物流部</div>
      </el-col>
      <el-col :span="12">
        <h1>项目进度管理看板</h1>
      </el-col>
      <el-col :span="6">
        <div style="text-align:right;">
          <img src="../../assets/img/hzsiasun.png" alt width="60%" style="display:inline-block;" />
        </div>
        <div class="timeShow">
          <span class="date">{{date}}</span>
          <span class="time">{{time}}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          :data="tableData1"
          style="width: 100%;"
          row-key="id"
          :header-cell-style="tableHeaderColor"
          :cell-style="cellColor"
          @cell-click="jump"
        >
          <el-table-column label="序号" min-width="4%" align="center">
            <template slot-scope="scope">{{scope.$index+1}}</template>
          </el-table-column>
          <el-table-column prop="projectNo" label="项目号" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="projectLeader" label="项目负责人" align="center" min-width="7%"></el-table-column>
          <el-table-column prop="startup" label="项目启动" align="center" min-width="7%"></el-table-column>
          <el-table-column prop="designStage" label="设计阶段" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="purchase" label="采购加工" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="assemble" label="厂内装配" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="planDeliver" label="计划发货" align="center" min-width="7%"></el-table-column>
          <el-table-column prop="installStart" label="安装开始" align="center" min-width="7%"></el-table-column>
          <el-table-column prop="factoryInstall" label="现场安装" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="equipmentDebug" label="设备调试" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="testRun" label="试运行" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="finalAcceptance" label="终验收" align="center" min-width="7%"></el-table-column>
          <el-table-column prop="timeFrame" label="时间节点" align="center" min-width="6%"></el-table-column>
          <el-table-column prop="workTimeSurplus" label="工期剩余" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="workTimeGrandTotal" label="工期累计" align="center" min-width="5%"></el-table-column>
          <el-table-column prop="workTimeTotal" label="总历时" align="center" min-width="5%"></el-table-column>
          <el-table-column label="更新状态" prop="isUpdate" align="center" min-width="5%"></el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <!-- 分页组件---fzy -->
    <!-- <pagination
      :pageTotal="pageTotal"
      @handleCurrentChange="handleCurrentChange"
      @handleSizeChange="handleSizeChange"
    ></pagination>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Pagination from "@/components/pagination";
export default {
  name: "usersTable",
  components: {
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
      pageTotal: 30,
      input: "",
      time: "",
      date: ""
    };
  },
  created() {
    this.getUsersTable();
    this.getCurrentTime();
    this.refreshKanban();
  },
  mounted() {},
  beforeDestroy() {
    var that = this;
    if (this.getDate) {
      clearInterval(that.getDate);
    }
    if (this.getUsersTable) {
      clearInterval(that.getUsersTable);
    }
  },
  methods: {
    jump(row, column, cell, event) {
      if (column.property == "isUpdate") {
        window.open("/#/projectManagement/projectMaintenance", "_blank");
      }
    },
    handleDelete(index, row) {},
    // 显示资金弹框
    showAddFundDialog(val) {
      this.$store.commit("SET_DIALOG_TITLE", val);
      this.addFundDialog.show = true;
    },
    // 重新加载页面
    hideAddFundDialog() {
      this.addFundDialog.show = false;
    },
    // 上下分页
    handleCurrentChange(val) {
      // 请求接口
      this.$get("/api/services/app/Project/GetProjectKB", {
        PageSize: 10,
        PageIndex: val
      }).then(res => {
        this.tableData1 = res.data.result.items;
      });
    },
    // 每页显示多少条
    handleSizeChange(val) {
      // 请求接口
      this.$get("/api/services/app/Project/GetProjectKB", {
        PageSize: val,
        PageIndex: 1
      }).then(res => {
        this.tableData1 = res.data.result.items;
      });
    },
    // 加载用户表
    getUsersTable() {
      this.$get("/api/services/app/Project/GetProjectKB", {}).then(res => {
        this.tableData1 = res.data.result.items;
        this.pageTotal = res.data.result.totalCount;
      });
    },
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 2) {
        return "border-right:2px solid #fff;background-color: #244062!important;color: #fff;";
      } else if (columnIndex === 7) {
        return "border-right:2px solid #fff;background-color: #FF0000!important;color: #fff;";
      } else if (columnIndex === 12) {
        return "border-right:2px solid #fff;background-color: #FF0000!important;color: #fff;";
      } else if (columnIndex === 15) {
        return "border-right:2px solid #fff;background-color: #244062!important;color: #fff;";
      } else if (columnIndex === 16) {
        return "border-right:2px solid #fff;background-color: #244062!important;color: #fff;";
      } else if (
        columnIndex === 0 ||
        columnIndex === 1 ||
        columnIndex === 2 ||
        columnIndex === 13 ||
        columnIndex === 14 ||
        columnIndex === 17
      ) {
        return "background-color: #244062!important;color: #fff;";
      } else if (columnIndex === 3 || columnIndex === 8) {
        return "background-color: #FF0000!important;color: #fff;";
      } else if (columnIndex === 4 || columnIndex === 5 || columnIndex === 6) {
        return "background-color: #00B0F0!important;color: #fff;";
      } else if (
        columnIndex === 9 ||
        columnIndex === 10 ||
        columnIndex === 11
      ) {
        return "background-color: #0070C0!important;color: #fff;";
      }
      //边框2px
    },
    cellColor({ row, column, rowIndex, columnIndex }) {
      let styleFlag = "";
      if (3 <= columnIndex && columnIndex < 7) {
        styleFlag += "background-color: #B7DEE8!important;";
      } else if (8 <= columnIndex && columnIndex < 12) {
        styleFlag += "background-color: #D8E4BC!important;";
      } else if (columnIndex === 0 || columnIndex === 2) {
        styleFlag +=
          "border-right:2px solid #fff;background-color: #D9D9D9!important;";
      } else if (columnIndex === 1) {
        styleFlag += "background-color: #D9D9D9!important;";
      } else if (columnIndex === 7) {
        styleFlag +=
          "border-right:2px solid #fff;background-color: #B7DEE8!important;";
      } else if (columnIndex === 12) {
        styleFlag +=
          "border-right:2px solid #fff;background-color: #D8E4BC!important;";
      } else if (columnIndex === 15 || columnIndex === 16) {
        styleFlag +=
          "border-right:2px solid #fff;background-color: #D9D9D9!important;";
      } else {
        styleFlag += "background-color: #D9D9D9!important;";
      }
      //表格动态加载颜色-- - fzy;
      if (row.currentProcess == column.label) {
        styleFlag +=
          "background-color: #00B050!important;color:#fff;font-weight:bold;";
      }
      // 工期剩余小于10添加颜色
      let workRemind = parseInt(row.workTimeSurplus);
      if (workRemind > 0 && workRemind <= 10 && column.label == "工期剩余") {
        styleFlag +=
          "background-color: #FFFF00!important;color:#000;font-weight:bold;";
      } else if (workRemind < 0 && column.label == "工期剩余") {
        styleFlag +=
          "background-color: #ff0000!important;color:#fff;font-weight:bold;";
      }
      //终验收判断
      let finalAcceptanceStatus = row.finalAcceptance;
      if (finalAcceptanceStatus) {
        if (finalAcceptanceStatus == "进行中" && column.label == "终验收") {
          styleFlag +=
            "background-color: #00B050!important;color:#fff;font-weight:bold;";
        } else if (
          finalAcceptanceStatus != "进行中" &&
          column.label == "终验收"
        ) {
          styleFlag +=
            "background-color: #002060!important;color:#fff;font-weight:bold;";
        }
      }
      //未更新和已更新的字体颜色
      let updateStatus = row.isUpdate;
      if (updateStatus) {
        if (updateStatus == "未更新" && column.label == "更新状态") {
          styleFlag += "color:#FF0000;";
        } else if (updateStatus == "已更新" && column.label == "更新状态") {
          styleFlag += "color:#00B050;";
        }
      }
      return styleFlag;
    },
    // 获取时间和日期
    getDate() {
      let d = new Date();
      let year = d.getFullYear();
      let months = d.getMonth() + 1;
      let days = d.getDate();
      let hours = d.getHours();
      let minutes = d.getMinutes();
      let seconds = d.getSeconds();
      months = months < 10 ? "0" + months : months;
      days = days < 10 ? "0" + days : days;
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      this.date = year + "年" + months + "月" + days + "日";
      this.time = hours + ":" + minutes + ":" + seconds;
    },
    getCurrentTime() {
      var that = this;
      let timer = setInterval(that.getDate, 1000);
    },
    // 看板设置定时器(4小时)
    refreshKanban() {
      setInterval(this.getUsersTable, 600000);
    },
    indexMethod(index) {
      return this.processList[index];
    }
  }
};
</script>

<style lang='less'>
.usersTable {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
}

h1 {
  color: #002060;
  text-align: center;
  height: 47px;
  line-height: 47px;
}
.time,
.date {
  text-align: right;
  font-weight: bold;
}
.timeShow {
  text-align: right;
}
.usersTable .el-table--mini {
  // font-size: 8px;
  color: #000;
}
.usersTable .el-table .cell {
  padding: 0;
}
.usersTable {
  width: 98.5%;
  height: 97%;
  background-image: url("../../assets/img/kanbanBg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.departmentName {
  color: #002060;
  font-weight: bold;
}
.placeholder {
  visibility: hidden;
}
</style>