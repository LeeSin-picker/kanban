<template>
  <el-dialog
    :visible.sync="isVisible"
    :title="addFundDialog.title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <div class="form">
      <el-form
        ref="form"
        :model="form"
        :rules="form_rules"
        :label-width="dialog.formLabelWidth"
        style="margin:10px;width:auto;"
      >
        <el-form-item prop="EquipmentModelName" label="设备名称:">
          <el-input type="text" v-model="form.EquipmentModelName"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelCode" label="设备编号:">
          <el-input type="text" v-model="form.EquipmentModelCode"></el-input>
        </el-form-item>
        <el-form-item label="设备类型:" prop="DepID">
          <el-select v-model="form.DepID" multiple placeholder="设备类型">
            <el-option
              v-for="item in departmentList"
              :key="item.DepName"
              :label="item.DepName"
              :value="item.DepID"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="EquipmentModelFactoryName" label="工厂名:">
          <el-input type="text" v-model="form.EquipmentModelFactoryName"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelManufacturingTime" label="设备制造时间:">
          <el-input type="text" v-model="form.EquipmentModelManufacturingTime"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelProductionTime" label="设备生产时间:">
          <el-input type="text" v-model="form.EquipmentModelProductionTime"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelNameplateNum" label="设备台数:">
          <el-input type="text" v-model="form.EquipmentModelNameplateNum"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelWeight" label="设备重量:">
          <el-input type="text" v-model="form.EquipmentModelWeight"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelDetail" label="设备详情:">
          <el-input type="text" v-model="form.EquipmentModelDetail"></el-input>
        </el-form-item>
        <el-form-item prop="SysAddress" label="地址:">
          <el-input type="text" v-model="form.SysAddress"></el-input>
        </el-form-item>
        <el-form-item prop="Description" label="描述:">
          <el-input type="text" v-model="form.Description"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentModelRemarks" label="备注:">
          <el-input type="text" v-model="form.EquipmentModelRemarks"></el-input>
        </el-form-item>
        <el-form-item class="text_right">
          <el-button @click="isVisible = false">取 消</el-button>
          <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "addBasicEquipment",
  data() {
    let validateData = (rule, value, callback) => {
      if (value === "") {
        let text;
        if (rule.field == "EquipmentModelCode") {
          text = "设备编号";
        } else if (rule.field == "EquipmentModelFactoryName") {
          text = "类型名";
        } else {
          text = "";
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
        EquipmentModelName: "",
        EquipmentModelCode: "",
        EquipmentModelFactoryName: "",
        EquipmentModelManufacturingTime: "",
        EquipmentModelProductionTime: "",
        EquipmentModelNameplateNum: "",
        EquipmentModelWeight: "",
        EquipmentModelDetail: "",
        SysAddress: "",
        Description: "",
        EquipmentModelRemarks: ""
      },
      roleList: [],
      departmentList: [],
      form_rules: {
        EquipmentModelCode: [
          {
            required: true,
            message: "设备编号不能为空！",
            trigger: "blur"
          }
        ],
        EquipmentModelFactoryName: [
          {
            required: true,
            message: "类型名不能为空！",
            trigger: "blur"
          }
          // 开启数字校验
          // { required: true, validator:validateData,trigger: 'blur'},
        ],
        EquipmentModelManufacturingTime: [
          {
            required: true,
            message: "描述不能为空！",
            trigger: "blur"
          }
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
    dialogRow: Object
  },
  computed: {
    ...mapGetters(["addFundDialog"])
  },
  created() {
    console.log("b" + this.addFundDialog);
    if (this.addFundDialog.type === "edit") {
      this.form = this.dialogRow;
    } else {
      if (this.$refs["form"] != undefined) {
        this.$refs["form"].resetFields();
      }
    }
    this.$get("/api/department", {}).then(res => {
      this.departmentList = res.data.data;
    });
    this.$get("/api/role", {}).then(res => {
      this.roleList = res.data.data;
      console.log(this.roleList);
    });
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
          // edit
          if (this.addFundDialog.type === "edit") {
            this.$post("/api/users", para).then(res => {
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getUsersTable");
            });
          } else {
            // add
            this.$post("/api/users", para).then(res => {
              console.log(res.data);
              this.$message({
                message: "新增成功",
                type: "success"
              });
              this.$refs["form"].resetFields();
              this.isVisible = false;
              this.$emit("getUsersTable");
            });
          }
        }
      });
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
</style>