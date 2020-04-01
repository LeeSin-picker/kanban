<template>
  <div class="projectProgress">
    <el-card class="box-card" style="width:100%;margin-bottom:2%;">
      <div slot="header" class="clearfix">
        <span>项目进度更新</span>
      </div>
      <el-form
        ref="form"
        :model="form"
        :label-width="dialog.formLabelWidth"
        style="padding:10px;width:39%;float:left;padding-left:5%;padding-right:5%;border-right:1px solid #000;"
        label-position="left"
      >
        <el-form-item prop="projectNo" label="项目号:">
          <el-input type="text" v-model="form.projectNo" disabled class="inputStyle"></el-input>
        </el-form-item>
        <!-- 开始流程 -->
        <el-form-item label="开始流程:">
          <el-col :span="11">
            <el-form-item prop="startProcess" style="margin-bottom: 0;">
              <el-select v-model="form.startProcess" placeholder="开始流程">
                <el-option
                  v-for="item in processList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="sTime" style="margin-bottom: 0;">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="开始时间"
                v-model="form.sTime"
                style="width: 100%;"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="processRemark" label="流程说明:">
          <el-input type="text" v-model="form.processRemark"></el-input>
        </el-form-item>
        <el-form-item prop="abnormalDelayDays" label="非正常延期:" style="visibility:hidden;">
          <el-input type="text" v-model="form.abnormalDelayDays"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="currentProcessFinishRate" label="完成率:">
          <el-input type="text" v-model="form.currentProcessFinishRate"></el-input>
        </el-form-item>
        <el-form-item prop="currentProcessTeamSize" label="团队人数:">
          <el-input type="text" v-model="form.currentProcessTeamSize"></el-input>
        </el-form-item>-->
        <el-form-item class="text_right">
          <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
        </el-form-item>
      </el-form>
      <!-- 右表单 -->
      <el-form
        ref="formRight"
        :model="formRight"
        :label-width="dialog.formLabelWidth"
        style="padding:10px;width:39%;float:left;padding-left:5%;padding-right:5%;"
        label-position="left"
      >
        <el-form-item prop="projectNo" label="项目号:">
          <el-input type="text" v-model="formRight.projectNo" disabled class="inputStyle"></el-input>
        </el-form-item>
        <!-- 结束流程 -->
        <el-form-item label="结束流程:">
          <el-col :span="11">
            <el-form-item prop="endProcess" style="margin-bottom: 0;">
              <el-select v-model="formRight.endProcess" placeholder="结束流程">
                <el-option
                  v-for="item in processList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-form-item prop="eTime" style="margin-bottom: 0;">
              <el-date-picker
                type="date"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                placeholder="结束时间"
                v-model="formRight.eTime"
                style="width: 100%;"
                :picker-options="pickerOptions0"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item prop="processRemark" label="流程说明:">
          <el-input type="text" v-model="formRight.processRemark"></el-input>
        </el-form-item>
        <el-form-item prop="abnormalDelayDays" label="非正常延期:">
          <el-input type="text" v-model="formRight.abnormalDelayDays"></el-input>
        </el-form-item>
        <!-- <el-form-item prop="currentProcessFinishRate" label="完成率:">
          <el-input type="text" v-model="form.currentProcessFinishRate"></el-input>
        </el-form-item>
        <el-form-item prop="currentProcessTeamSize" label="团队人数:">
          <el-input type="text" v-model="form.currentProcessTeamSize"></el-input>
        </el-form-item>-->
        <el-form-item class="text_right">
          <el-button type="primary" @click="onSubmit('formRight')">提 交</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "addUsers",
  data() {
    let validateData = (rule, value, callback) => {
      //   if (value === "") {
      //     let text;
      //     if (rule.field == "rule") {
      //       text = "团队人数";
      //     } else if (rule.field == "userName") {
      //       text = "用户名";
      //     }
      //     callback(new Error(text + "不能为空~"));
      //   } else {
      if (value === "") {
        callback();
      } else {
        let numReg = /^[0-9]+.?[0-9]*$/;
        if (!numReg.test(value)) {
          callback(new Error("请输入数字值"));
        } else {
          callback();
        }
      }

      //   }
    };
    let oString = new Date().toLocaleDateString();
    let oArray = oString.split("/");
    if (oArray[1] <= 10) {
      oArray[1] = "0" + oArray[1];
    }
    if (oArray[2] <= 10) {
      oArray[2] = "0" + oArray[2];
    }
    let oTime = oArray.join("-");
    return {
      isVisible: this.isShow,
      form: {
        projectNo: "",
        startProcess: "",
        sTime: oTime,
        processRemark: ""
      },
      formRight: {
        projectNo: "",
        endProcess: "",
        eTime: oTime,
        processRemark: "",
        abnormalDelayDays: ""
      },
      processList: [
        { label: "", value: "" },
        { label: "项目启动", value: "Startup" },
        { label: "设计阶段", value: "DesignStage" },
        { label: "采购加工", value: "Purchase" },
        { label: "厂内装配", value: "Assemble" },
        { label: "计划发货", value: "PlanDeliver" },
        { label: "安装开始", value: "InstallStart" },
        { label: "现场安装", value: "FactoryInstall" },
        { label: "设备调试", value: "EquipmentDebug" },
        { label: "试运行", value: "TestRun" },
        { label: "终验收", value: "FinalAcceptance" }
      ],
      departmentList: [],
      form_rules: {
        currentProcessTeamSize: [
          { required: false, validator: validateData, trigger: "blur" }
        ],
        abnormalDelayDays: [
          { required: false, validator: validateData, trigger: "blur" }
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
      // 设置只能选择当前日期及之后的日期
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now(); //如果没有后面的-8.64e7就是不可以选择今天的
        }
      }
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
    // 获取跳转参数projectNo;
    if (this.$route.params.projectNo) {
      this.form.projectNo = this.$route.params.projectNo;
      this.formRight.projectNo = this.$route.params.projectNo;
      // let epCN = this.$route.params.currentProcess;
      // for (let i = 0; i < this.processList.length; i++) {
      //   if (this.processList[i].label == epCN) {
      //     this.form.endProcess = this.processList[i].value;
      //   }
      // }
    }
  },
  mounted() {
    console.log(this.isShow);
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
          console.log(para);
          // add
          this.$confirm("确认更新该进度吗?", "提示", {
            type: "warning"
          }).then(() => {
            this.$put("/api/services/app/Project/UpdateProgress", para)
              .then(res => {
                console.log(res.data);
                this.$message({
                  message: "设置成功",
                  type: "success"
                });
                this.$refs["form"].resetFields();
                this.form.projectNo = "";
                this.form.endProcess = "";
                // 打开tagFlag开关
                this.$store.commit("SET_TAGS_FLAG", true);
                this.$router.push({ name: "projectMaintenance" });
              })
              .catch(err => {
                this.open4(err);
              });
          });
        }
      });
    },
    open4(msg) {
      this.$message.error(msg);
    }
  }
};
</script>

<style lang="less" >
.search_container {
  margin-bottom: 20px;
}
.projectProgress {
  padding: 10px;
  background: #fff;
  border-radius: 2px;
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
.line {
  text-align: center;
}

.inputStyle input.el-input__inner {
  color: black !important;
}
.projectProgress .el-card__body:after {
  content: "";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.projectProgress .el-card__body {
  zoom: 1;
}
</style>