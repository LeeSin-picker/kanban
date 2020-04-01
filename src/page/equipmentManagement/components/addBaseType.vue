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
        <el-form-item prop="Id" label="设备Id:">
          <el-input type="text" v-model="form.Id"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentTypeCode" label="设备编号:">
          <el-input type="text" v-model="form.EquipmentTypeCode"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentTypeName" label="类型名:">
          <el-input type="text" v-model="form.EquipmentTypeName"></el-input>
        </el-form-item>
        <el-form-item prop="EquipmentTypeDescription" label="描述:">
          <el-input type="text" v-model="form.EquipmentTypeDescription"></el-input>
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
  name: "addBaseType",
  data() {
    let validateData = (rule, value, callback) => {
      if (value === "") {
        let text;
        if (rule.field == "EquipmentTypeCode") {
          text = "设备编号";
        } else if (rule.field == "EquipmentTypeName") {
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
        Id: "",
        EquipmentTypeCode: "",
        EquipmentTypeName: "",
        EquipmentTypeDescription: ""
      },
      roleList: [],
      departmentList: [],
      form_rules: {
        EquipmentTypeCode: [
          {
            required: true,
            message: "设备编号不能为空！",
            trigger: "blur"
          }
        ],
        EquipmentTypeName: [
          {
            required: true,
            message: "类型名不能为空！",
            trigger: "blur"
          }
          // 开启数字校验
          // { required: true, validator:validateData,trigger: 'blur'},
        ],
        EquipmentTypeDescription: [
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