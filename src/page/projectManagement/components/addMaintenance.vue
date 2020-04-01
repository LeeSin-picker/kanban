<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addFundDialog.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
    width="80%"
  >
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="form_rules"
        style="margin:10px;width:auto;"
        class="content"
        label-width="80px"
      >
        <div class="fLeft">
          <el-card class="box-card" style="width:100%;margin-bottom:1%;">
            <div slot="header" class="clearfix">
              <span>项目信息</span>
            </div>
            <el-form-item prop="projectNo" label="项目号:" class="inline">
              <el-input type="text" v-model="form.projectNo" placeholder="项目号填写必须加H"></el-input>
            </el-form-item>
            <el-form-item prop="projectName" label="项目名称:" class="inline">
              <el-input type="text" v-model="form.projectName"></el-input>
            </el-form-item>
            <el-form-item prop="customerName" label="客户名称:" class="inline">
              <el-input type="text" v-model="form.customerName"></el-input>
            </el-form-item>
            <el-form-item prop="location" label="实施地点:" class="inline">
              <el-input type="text" v-model="form.location"></el-input>
            </el-form-item>
            <el-form-item prop="isVisible" label="看板显示:" class="inline">
              <el-switch v-model="form.isVisible" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </el-form-item>
          </el-card>
          <el-card class="box-card" style="width:100%;margin-bottom:1%;">
            <div slot="header" class="clearfix">
              <span>项目情况</span>
            </div>
            <el-form-item prop="currentProjectStatus" label="项目状态:" class="inline">
              <el-input type="text" v-model="form.currentProjectStatus" disabled></el-input>
            </el-form-item>
            <el-form-item prop="currentProcess" label="当前进度:" class="inline">
              <el-input type="text" v-model="form.currentProcess" disabled></el-input>
            </el-form-item>
            <el-form-item prop="currentProcessFinishRate" label="完成率:" class="inline">
              <el-input type="text" v-model="form.currentProcessFinishRate" :disabled="flag"></el-input>
            </el-form-item>
            <el-form-item prop="currentProcessTeamSize" label="团队人数:" class="inline">
              <el-input type="text" v-model="form.currentProcessTeamSize" :disabled="flag"></el-input>
            </el-form-item>
          </el-card>
        </div>
        <div class="fRight" ref="fLeft">
          <el-card class="box-card" style="width:100%;height:98%">
            <div slot="header" class="clearfix">
              <span>项目团队</span>
            </div>
            <el-form-item prop="projectLeader" label="项目负责:">
              <el-select v-model="form.projectLeader" placeholder="项目负责人">
                <el-option
                  v-for="item in projectLeaderList"
                  :key="item.userName"
                  :label="item.userName"
                  :value="item.userName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item prop="technicalLeader" label="技术负责:">
              <el-input type="text" v-model="form.technicalLeader"></el-input>
            </el-form-item>
            <el-form-item prop="mechanicalMan" label="机械人员:">
              <el-input type="text" v-model="form.mechanicalMan"></el-input>
            </el-form-item>
            <el-form-item prop="electricalMan" label="电气人员:">
              <el-input type="text" v-model="form.electricalMan"></el-input>
            </el-form-item>
            <el-form-item prop="softwareMan" label="软件人员:">
              <el-input type="text" v-model="form.softwareMan"></el-input>
            </el-form-item>
          </el-card>
        </div>
        <div v-if="!flag">
          <el-card class="box-card" style="width:100%;height:99%;">
            <div slot="header" class="clearfix">
              <el-row>
                <el-col :span="8">
                  <span>项目进度</span>
                </el-col>
                <el-col :span="8" style="text-align:center;font-weight:bold;">
                  <span>修改人:{{processPlanData.planModifityMan}}</span>
                </el-col>
                <el-col :span="8" style="text-align:right;font-weight:bold;">
                  <span>修改时间:{{processPlanData.planModifityTime}}</span>
                </el-col>
              </el-row>
            </div>
            <!-- <el-form-item prop="planModifityMan" label="修改人:" class="inline">
              <el-input type="text" v-model="form.planModifityMan"></el-input>
            </el-form-item>
            <el-form-item prop="PlanModifityTime" label="修改时间:" class="inline">
              <el-input type="text" v-model="form.PlanModifityTime"></el-input>
            </el-form-item>-->
            <el-table
              :data="tableDataTwo"
              style="width: 100%;background:"
              row-key="id"
              :default-sort="{prop:'id'}"
            >
              <!-- <el-table-column type="index" :index="indexMethod"></el-table-column> -->
              <el-table-column prop="id" label="编号" align="center" v-if="false"></el-table-column>
              <el-table-column prop="processName" label="项目阶段" align="center"></el-table-column>
              <el-table-column prop="planSTime" label="计划开始时间" align="center"></el-table-column>
              <el-table-column prop="planETime" label="计划结束时间" align="center"></el-table-column>
              <el-table-column prop="actualSTime" label="实际开始时间" align="center"></el-table-column>
              <el-table-column prop="actualETime" label="实际结束时间" align="center"></el-table-column>
              <el-table-column prop="abnormalDelayDays" label="非正常延期" align="center"></el-table-column>
              <el-table-column prop="processPeriod" label="实际工期" align="center"></el-table-column>
            </el-table>
          </el-card>
        </div>
        <div style="float:right;">
          <el-form-item class="text_right">
            <el-button @click="isVisible = false">取 消</el-button>
            <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
          </el-form-item>
        </div>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "addUsers",
  data() {
    let validateData = (rule, value, callback) => {
      if (value === "") {
        let text;
        if (rule.field == "projectNo") {
          text = "项目号";
        } else if (rule.field == "userName") {
          text = "用户名";
        } else {
          text = "是否激活";
        }
        callback(new Error(text + "不能为空~"));
      } else {
        let numReg = /^[0-9]+.?[0-9]*$/;
        if (!numReg.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }
    };
    return {
      tableDataTwo: [],
      isVisible: this.isShow,
      abc: "admin",
      projectLeaderList: [],
      form: {
        projectNo: "",
        projectName: "",
        customerName: "",
        location: "",
        projectLeader: "",
        technicalLeader: "",
        mechanicalMan: "",
        electricalMan: "",
        softwareMan: "",
        projectProcess: {
          startupPlanSTime: "",
          startupPlanETime: "",
          designStagePlanSTime: "",
          designStagePlanETime: "",
          purchasePlanSTime: "",
          purchasePlanETime: "",
          assemblePlanSTime: "",
          assemblePlanETime: "",
          planDeliverPlanSTime: "",
          planDeliverPlanETime: "",
          installStartPlanSTime: "",
          installStartPlanETime: "",
          factoryInstallPlanSTime: "",
          factoryInstallPlanETime: "",
          equipmentDebugPlanSTime: "",
          equipmentDebugPlanETime: "",
          testRunPlanSTime: "",
          testRunPlanETime: "",
          finalAcceptancePlanSTime: "",
          finalAcceptancePlanETime: ""
        },
        currentProjectStatus: "",
        currentProcess: "",
        currentProcessFinishRate: "",
        currentProcessTeamSize: "",
        isVisible: true,
        planModifityMan: "",
        PlanModifityTime: ""
      },
      rolesList: [],
      departmentList: [],
      form_rules: {
        userName: [
          {
            required: true,
            message: "用户名不能为空！",
            trigger: "blur"
          }
        ],
        Password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur"
          }
          // 开启数字校验
          // { required: true, validator:validateData,trigger: 'blur'},
        ]
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      },
      RoleId: ["a", "b"],
      DepID: [],
      processList: [
        "项目启动",
        "设计阶段",
        "采购加工",
        "厂内装配",
        "计划发货",
        "安装开始",
        "现场安装",
        "设备调试",
        "试运行",
        "终验收"
      ]
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
    flag: Boolean,
    processPlanData: Object
  },
  computed: {
    ...mapGetters(["addFundDialog"])
  },
  created() {
    if (this.addFundDialog.type === "edit") {
      this.form = this.dialogRow;
    } else {
      if (this.$refs["form"] != undefined) {
        this.$refs["form"].resetFields();
      }
    }
    this.tableDataTwo = this.processPlanData.getProcessTime;
  },
  mounted() {
    this.$get("/api/services/app/User/GetUsers").then(res => {
      this.projectLeaderList = res.data.result;
    });
  },
  methods: {
    onScreeoutMoney() {},
    onAddMoney() {},
    closeDialog() {
      this.$emit("closeDialog");
    },
    //表单提交
    onSubmit(form) {
      this.$refs[form].validate(valid => {
        if (valid) {
          //表单数据验证完成之后，提交数据;
          let formData = this[form];
          const para = Object.assign({}, formData);
          // edit
          if (this.addFundDialog.type === "edit") {
            this.$post("/api/services/app/Project/EditProject", para)
              .then(res => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getUsersTable");
              })
              .catch(err => {
                this.open4(err);
              });
          } else {
            // add
            this.$post("/api/services/app/Project/CreateProject", para)
              .then(res => {
                this.$message({
                  message: "新增成功",
                  type: "success"
                });
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getUsersTable");
              })
              .catch(err => {
                this.open4(err);
              });
          }
        }
      });
    },
    open4(msg) {
      this.$message.error(msg);
    },
    indexMethod(index) {
      return this.processList[index];
    }
  }
};
</script>

<style lang="less" scoped>
.search_container {
  margin-bottom: 20px;
}

.btnRight {
  float: right;
  margin-right: 0px !important;
}

.searchArea {
  background: rgba(255, 255, 255, 1);
  border-radius: 2px;
  padding: 18px 18px 0;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 480px;
}
.line {
  text-align: center;
}
.fLeft {
  width: 49%;
  float: left;
  margin-right: 2%;
  height: 436px;
}
.fRight {
  width: 49%;
  float: left;
  height: 436px;
}
.content:after {
  content: ".";
  display: block;
  height: 0;
  visibility: hidden;
  clear: both;
}
.content {
  zoom: 1;
}
.inline {
  display: inline-block;
  width: 49.5%;
}
</style>