<template>
  <div class="login_page">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="titleArea rflex">
          <img class="logo" :src="logo" alt="Andon" />
          <span class="title">
            <i>智能物流部项目管理系统</i>
          </span>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm" class="loginForm">
          <el-form-item prop="UserNameOrEmailAddress" class="login-item">
            <span class="fa-tips">
              <i class="fa fa-user"></i>
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="text"
              placeholder="用户名"
              v-model="loginForm.UserNameOrEmailAddress"
            ></el-input>
          </el-form-item>
          <el-form-item prop="Password" class="login-item">
            <span class="fa-tips">
              <i class="fa fa-lock"></i>
            </span>
            <el-input
              @keyup.enter.native="submitForm('loginForm')"
              class="area"
              type="password"
              placeholder="密码"
              v-model="loginForm.Password"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">SIGN IN</el-button>
          </el-form-item>
          <div class="tiparea">
            <p class="wxtip">温馨提示：</p>
            <p class="tip">
              用户名为：admin
              <!-- <span class="tips">(可用于切换权限)</span> -->
            </p>
            <p class="tip">密码为：123qwe</p>
          </div>
          <div class="sanFangArea">
            <p class="title">第三方账号登录</p>
            <ul class="rflex">
              <li @click="loginByWechat">
                <icon-svg icon-class="iconwechat" />
              </li>
              <li>
                <icon-svg icon-class="iconweibo" />
              </li>
              <li>
                <icon-svg icon-class="iconGithub" />
              </li>
            </ul>
          </div>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import store from "@/store";
import { asyncRouterMap, constantRouterMap } from "@/router";
import { mapGetters } from "vuex";
import logoImg from "@/assets/img/logo.png";
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
export default {
  data() {
    return {
      logo: logoImg,
      loginForm: {
        UserNameOrEmailAddress: "",
        Password: ""
      },
      rules: {
        UserNameOrEmailAddress: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          {
            min: 2,
            max: 8,
            message: "长度在 2 到 8 个字符",
            trigger: "blur"
          }
        ],
        Password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      localToken: ""
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "isCollapse", "sidebar", "menuIndex"])
  },
  mounted() {
    console.log(asyncRouterMap);
  },
  methods: {
    loginByWechat() {},
    showMessage(type, message) {
      this.$message({
        type: type,
        message: message
      });
    },
    submitForm(loginForm) {
      this.$refs[loginForm].validate(valid => {
        if (valid) {
          let userinfo = this.loginForm;
          // 去除mock数据，留下位置给以后接口使用---fzy
          // 访问校验登录信息
          this.$post("/api/TokenAuth/Authenticate", userinfo)
            .then(res => {
              //校验信息
              this.localToken = res.data.result.accessToken;
              let userId = res.data.result.userId;
              let userList = {
                token: "admin",
                name: "管理员"
              };
              setToken("Token", this.localToken);
              this.$router.push({
                path: "/"
              });
              //设置左边菜单始终为展开状态
              this.$store.dispatch("initLeftMenu");
            })
            .catch(err => {
              this.open4(err);
            });
          // let userList = {
          //   token: "admin",
          //   name: "管理员"
          // };
          // setToken("Token", userList.token);
          // this.$router.push({
          //   path: "/kanban/indexPage"
          // });
          // this.$store.dispatch("initLeftMenu"); //设置左边菜单始终为展开状态
          // 屏蔽mock请求---fzy
          // login(userinfo).then(res => {
          // 	let userList = res.data.userList;
          // 	setToken("Token", userList.token)
          // 	this.$router.push({
          // 		path: '/'
          // 	})
          // 	this.$store.dispatch('initLeftMenu'); //设置左边菜单始终为展开状态
          // })
        }
      });
    },
    open2(msg) {
      this.$message({
        message: msg,
        type: "success"
      });
    },
    open4(msg) {
      this.$message.error(msg);
    },
    getIndex(item, param) {
      for (let i = 0; i < item.length; i++) {
        let index = param.findIndex(function(value, index, arr) {
          return value.name == item[i];
        });
        if (index >= 0) {
          param[index].hidden = false;
        } else {
          for (let j = 0; j < param.length; j++) {
            if (param[j].children) {
              let childIndex = param[j].children.findIndex(function(
                value,
                index,
                arr
              ) {
                return value.name == item[i];
              });

              if (childIndex >= 0) {
                param[j].children[childIndex].meta.routerType = "topmenu";
              }
            }
          }
        }
      }
    }
  }
};
</script>

<style lang="less" scoped>
.login_page {
  position: absolute;
  width: 100%;
  height: 100%;
  background: url(../assets/img/bg9.png) no-repeat center center;
  background-size: 100% 100%;
}

.form_contianer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  width: 370px;
  border-radius: 5px;
  padding: 25px;
  text-align: center;

  .titleArea {
    justify-content: center;
    align-items: center;
    text-transform: uppercase;
    font-size: 22px;
    width: 100%;
    padding-bottom: 20px;

    .logo {
      width: 40px;
      margin-right: 10px;
    }

    .title {
      i {
        color: #409eff !important;
      }
    }
  }

  .loginForm {
    .submit_btn {
      width: 100%;
      padding: 13px 0;
      font-size: 16px;
    }

    .fa-tips {
      position: absolute;
      left: 10px;
      z-index: 20;
      color: #409eff;
      font-size: 18px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}

.manage_tip {
  margin-bottom: 20px;

  .title {
    font-family: cursive;
    font-weight: bold;
    font-size: 26px;
    color: #fff;
  }

  .logo {
    width: 60px;
    height: 60px;
  }
}

.tiparea {
  text-align: left;
  font-size: 12px;
  color: #409eff;
  padding: 10px 0;

  .tip {
    margin-left: 54px;
  }

  .tips {
    color: red;
  }
}

.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}

.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}

.loginForm {
  .el-button--primary {
    background-color: #409eff;
    border: 1px solid #409eff;
  }
}

.sanFangArea {
  border-top: 1px solid #dcdfe6;
  padding: 10px 0;
  display: none;

  .title {
    font-size: 14px;
    color: #8b9196;
    margin-bottom: 10px;
  }

  ul {
    li {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;

      .svg-icon {
        font-size: 24px;
      }
    }
  }
}
</style>