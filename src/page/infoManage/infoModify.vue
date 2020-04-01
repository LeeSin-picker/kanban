<template>
  <div class="fillcontain" ref="fillcontain">
    <div class="info_container" ref="info_container">
      <el-row class="info_row row" :gutter="10">
        <el-col :span="8">
          <div class="area">
            <div class="pwdarea">
              <p class="title">
                <i class="fa fa-edit"></i>修改密码
              </p>
              <el-form
                class="form"
                :model="pwdForm"
                :rules="pwdRules"
                ref="pwdForm"
                label-width="100px"
              >
                <el-form-item label="原密码" prop="currentPassword">
                  <el-input
                    type="password"
                    v-model="pwdForm.currentPassword"
                    auto-complete="off"
                    size="mini"
                    placeholder="请输入原密码"
                  ></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newPassword">
                  <el-input
                    type="password"
                    v-model="pwdForm.newPassword"
                    auto-complete="off"
                    size="mini"
                    placeholder="请输入新密码"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('pwdForm')">提交</el-button>
                  <el-button @click="resetForm('pwdForm')">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import * as mutils from "@/utils/mUtils";

export default {
  data() {
    // 附带callback(),是在明确通过验证的情况下去掉输入框上的loading
    let validateEmail = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入邮箱~"));
        return;
      }
      let emailRegex = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
      if (!emailRegex.test(value)) {
        callback(new Error("邮箱格式不正确！"));
      } else {
        callback();
      }
    };
    let validatePhone = (rule, value, callback) => {
      if (value == "") {
        callback(new Error("请输入手机号码~"));
      }
      {
        let phoneRegex = /^1[34578]\d{9}$/;
        if (!phoneRegex.test(value)) {
          callback(new Error("手机号码格式不正确！"));
        } else {
          callback();
        }
      }
    };
    // validateField:对部分表单字段进行校验的方法
    let validateNewpassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入新密码"));
      } else {
        if (this.pwdForm.surepassword !== "") {
          this.$refs.pwdForm.validateField("surepassword");
        }
        callback();
      }
    };
    let validateSurepassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入确认密码"));
      } else if (value !== this.pwdForm.newpassword) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pwdForm: {
        currentPassword: "",
        newPassword: ""
      },
      infoRules: {
        nickname: [
          { required: true, message: "请输入昵称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        touziyear: [
          { required: true, message: "请选择投资年限", trigger: "change" }
        ],
        email: [{ required: true, validator: validateEmail, trigger: "blur" }],
        telphone: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ]
      },
      pwdRules: {
        password: [
          { required: true, message: "请输入原密码", trigger: "blur" }
        ],
        newpassword: [
          { required: true, validator: validateNewpassword, trigger: "blur" }
        ],
        surepassword: [
          { required: true, validator: validateSurepassword, trigger: "blur" }
        ]
      },
      phoneRules: {
        phone: [{ required: true, validator: validatePhone, trigger: "blur" }],
        baseType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个基础短信服务",
            trigger: "change"
          }
        ],
        changeType: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个可选短信服务",
            trigger: "change"
          }
        ]
      }
    };
  },
  created() {},
  mounted() {
    mutils.setContentHeight(this, this.$refs.fillcontain, 170);
  },
  methods: {
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    showUsername() {
      let userinfo = mutils.getStore("userinfo");
      this.infoForm.username = userinfo.username;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          if (formName == "pwdForm") {
            this.$post("/api/services/app/User/ChangePassword", this.pwdForm)
              .then(res => {
                this.showMessage("success", "修改密码成功~");
              })
              .catch(err => {
                this.open4(err);
              });
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    open4(msg) {
      this.$message.error(msg);
    }
  }
};
</script>

<style lang="less" scoped>
.info_container {
  padding: 20px;
  background: #fff;
  box-sizing: border-box;
  overflow: auto;
}
.title {
  text-align: center;
  width: 100%;
  height: 30px;
  line-height: 30px;
  cursor: pointer;
  background-color: #3bc5ff;
  border: 1px solid #3bc5ff;
  color: white;
  display: block;
  .fa {
    margin-right: 5px;
  }
}
.info_row {
  .area {
    border: 1px solid #dfdfdf;
    height: 100%;
    font-size: 14px;
    padding: 10px;
    .form {
      width: 90%;
      margin-top: 20px;
    }
  }
}
</style>


