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
        <el-form-item label="角色名称:" prop="roleNames">
          <el-select v-model="form.roleNames" multiple placeholder="角色名称">
            <el-option v-for="item in rolesList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item prop="userName" label="用户名:">
          <el-input type="text" v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码:" v-if="flag">
          <el-input type="text" v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item prop="currentPassword" label="管理员密码:" v-if="!flag">
          <el-input type="text" v-model="form.currentPassword"></el-input>
        </el-form-item>
        <el-form-item prop="newPassword" label="新密码:" v-if="!flag">
          <el-input type="text" v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item prop="emailAddress" label="email地址:">
          <el-input type="text" v-model="form.emailAddress"></el-input>
        </el-form-item>
        <el-form-item label="是否激活:" prop="isActive">
          <el-switch v-model="form.isActive" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
  name: "addUsers",
  data() {
    let validateData = (rule, value, callback) => {
      if (value === "") {
        let text;
        if (rule.field == "password") {
          text = "密码";
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
        roleNames: [],
        userName: "",
        password: "",
        isActive: true
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
        password: [
          {
            required: true,
            message: "密码不能为空！",
            trigger: "blur"
          }
          // 开启数字校验
          // { required: true, validator:validateData,trigger: 'blur'},
        ]
        // emailAddress: [
        //   {
        //     required: true,
        //     message: "邮箱不能为空！",
        //     trigger: "blur"
        //   }
        // ]
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
    console.log("b" + this.addFundDialog);
    if (this.addFundDialog.type === "edit") {
      this.form = this.dialogRow;
    } else {
      if (this.$refs["form"] != undefined) {
        this.$refs["form"].resetFields();
      }
    }
    this.$get("/api/department", {})
      .then(res => {
        this.departmentList = res.data.data;
      })
      .catch(err => {
        this.open4(err);
      });
    this.$get("/api/services/app/User/GetRoleNames", {})
      .then(res => {
        this.rolesList = res.data.result.roleNames;
        console.log(this.rolesList);
      })
      .catch(err => {
        this.open4(err);
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
          let para = formData;
          console.log(para);
          // edit
          if (this.addFundDialog.type === "edit") {
            this.$put("/api/services/app/User/Update", para)
              .then(res => {
                this.$message({
                  message: "修改成功",
                  type: "success"
                });
                // 管理员重置密码
                console.log(para.currentPassword);
                console.log(para.newPassword);
                if (para.currentPassword && para.newPassword) {
                  console.log("zhixingl ");
                  this.$post("/api/services/app/User/ResetPassword", {
                    adminPassword: para.currentPassword,
                    newPassword: para.newPassword,
                    userId: para.id
                  })
                    .then(res => {})
                    .catch(err => {
                      this.open4(err);
                    });
                }
                this.$refs["form"].resetFields();
                this.isVisible = false;
                this.$emit("getUsersTable");
              })
              .catch(err => {
                this.open4(err);
              });
          } else {
            // add
            this.$post("/api/services/app/User/Create", para)
              .then(res => {
                console.log(res.data);
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
</style>