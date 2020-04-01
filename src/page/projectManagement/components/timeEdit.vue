<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addFundDialog.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
    width="50%"
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
        <div>
          <el-card class="box-card" style="width:100%;height:99%;">
            <div slot="header" class="clearfix">
              <span>项目进度计划</span>
            </div>
            <!-- <el-form-item prop="planModifityMan" label="修改人:" class="inline">
              <el-input type="text" v-model="form.planModifityMan"></el-input>
            </el-form-item>
            <el-form-item prop="PlanModifityTime" label="修改时间:" class="inline">
              <el-input type="text" v-model="form.PlanModifityTime"></el-input>
            </el-form-item>-->
            <!-- 项目启动 -->
            <el-form-item label="项目启动:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.startupPlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.startupPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.startupPlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.startupPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 设计阶段 -->
            <el-form-item label="设计阶段:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.designStagePlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.designStagePlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.designStagePlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.designStagePlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 采购加工 -->
            <el-form-item label="采购加工:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.purchasePlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.purchasePlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.purchasePlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.purchasePlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 厂内装配 -->
            <el-form-item label="厂内装配:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.assemblePlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.assemblePlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.assemblePlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.assemblePlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 计划发货 -->
            <el-form-item label="计划发货:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.planDeliverPlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.planDeliverPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.planDeliverPlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.planDeliverPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 安装开始 -->
            <el-form-item label="安装开始:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.installStartPlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.installStartPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.installStartPlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.installStartPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 现场安装 -->
            <el-form-item label="现场安装:">
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.factoryInstallPlanSTime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.factoryInstallPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.factoryInstallPlanETime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.factoryInstallPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 设备调试 -->
            <el-form-item label="设备调试:">
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.equipmentDebugPlanSTime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.equipmentDebugPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.equipmentDebugPlanETime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.equipmentDebugPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 试运行 -->
            <el-form-item label="试运行:">
              <el-col :span="11">
                <el-form-item prop="projectProcess.testRunPlanSTime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.testRunPlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item prop="projectProcess.testRunPlanETime" style="margin-bottom: 0;">
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.testRunPlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
            <!-- 终验收 -->
            <el-form-item label="终验收:">
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.finalAcceptancePlanSTime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划开始时间"
                    v-model="form.projectProcess.finalAcceptancePlanSTime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-form-item
                  prop="projectProcess.finalAcceptancePlanETime"
                  style="margin-bottom: 0;"
                >
                  <el-date-picker
                    type="date"
                    value-format="yyyy-MM-dd"
                    placeholder="计划完成时间"
                    v-model="form.projectProcess.finalAcceptancePlanETime"
                    style="width: 100%;"
                  ></el-date-picker>
                </el-form-item>
              </el-col>
            </el-form-item>
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
      isVisible: this.isShow,
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
      DepID: []
    };
  },
  props: {
    isShow: Boolean,
    dialogRow: Object,
    flag: Boolean
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
  },
  mounted() {},
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
            this.$post("/api/services/app/Project/EditPlanModeifityTime", para)
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