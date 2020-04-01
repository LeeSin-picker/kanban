<template>
  <div class="usersTable">
    <h5>基础设备列表</h5>
    <el-row :gutter="20">
      <el-col :span="4" :offset="20">
        <el-input v-model="input" placeholder="请输入内容" style="width:50%;"></el-input>
        <el-button type="primary" size="mini" icon="view" @click="searchData">搜索</el-button>
      </el-col>
    </el-row>
    <el-button type="primary" size="mini" icon="view" @click="addUsers">添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column prop="Id" label="设备Id" width="180" align="center" v-if="false"></el-table-column>
      <el-table-column prop="EquipmentModelName" label="设备名称" width="180" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelCode" label="设备编号" width="180" align="center"></el-table-column>
      <el-table-column prop="EquipmentType" label="设备类型" width="180" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelFactoryName" label="工厂名" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelManufacturingTime" label="设备制造时间" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelProductionTime" label="设备生产时间" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelNameplateNum" label="设备台数" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelWeight" label="设备重量" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelDetail" label="设备详情" align="center"></el-table-column>
      <el-table-column prop="SysAddress" label="地址" align="center"></el-table-column>
      <el-table-column prop="Description" label="描述" align="center"></el-table-column>
      <el-table-column prop="EquipmentModelRemarks" label="备注" align="center"></el-table-column>
      <el-table-column prop="UpdateTime" label="更新时间" align="center"></el-table-column>
      <el-table-column prop="CreationTime" label="创建时间" align="center"></el-table-column>
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
    <add-basic-equipment
      v-if="addFundDialog.show"
      :isShow="addFundDialog.show"
      :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog"
      @getUsersTable="getUsersTable"
    ></add-basic-equipment>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AddBasicEquipment from "./components/addBasicEquipment";
import Pagination from "@/components/pagination";
export default {
  name: "usersTable",
  components: {
    AddBasicEquipment,
    Pagination
  },
  data() {
    return {
      tableData1: [
        {
          Id: 1,
          EquipmentModelName: "机床",
          EquipmentModelCode: "Hz001",
          EquipmentType: "机床",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "165",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址1",
          Description: "2333",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
        },
        {
          Id: 2,
          EquipmentModelName: "切割机",
          EquipmentModelCode: "Hz001",
          EquipmentType: "切割机",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "145",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址2",
          Description: "2333",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
        },
        {
          Id: 3,
          EquipmentModelName: "机床",
          EquipmentModelCode: "Hz001",
          EquipmentType: "机床",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "150",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址3",
          Description: "2333",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
        },
        {
          Id: 1,
          EquipmentModelName: "切割机",
          EquipmentModelCode: "Hz001",
          EquipmentType: "切割机",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "150",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址4",
          Description: "2333",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
        },
        {
          Id: 1,
          EquipmentModelName: "切割机",
          EquipmentModelCode: "Hz001",
          EquipmentType: "切割机",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "100",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址5",
          Description: "2333",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
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
      console.log(row.Id);
      this.$confirm("确认删除该记录吗?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$delete("/api/users", {
            userId: row.IsActive
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
          Id: 1,
          EquipmentModelName: "切割机",
          EquipmentModelCode: "Hz001",
          EquipmentType: "切割机",
          EquipmentModelFactoryName: "杭州新松机器人",
          EquipmentModelManufacturingTime: "2019-12-21",
          EquipmentModelProductionTime: "2020-02-01",
          EquipmentModelNameplateNum: "100",
          EquipmentModelWeight: "2000kg",
          EquipmentModelDetail: "",
          SysAddress: "地址2",
          Description: "233",
          EquipmentModelRemarks: "",
          UpdateTime: "2020-02-20",
          CreationTime: "2020-02-20"
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