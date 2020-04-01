<template>
  <header class="head-nav rflex" :style="{'width':headNavWidth+'px'}" id="header_container">
    <div class="right-nav" ref="rightNav">
      <top-menu></top-menu>
      <div class="userinfo-right rflex">
        <div class="userinfo">
          <el-menu class="el-menu-demo" mode="horizontal" menu-trigger="hover">
            <el-submenu index="2">
              <template slot="title">
                <div class="welcome">
                  <span class="name">{{$t('commons.hi')}},</span>
                  <span class="name avatarname">{{userName}}</span>
                </div>
                <!-- <img :src="avatar" class="avatar" alt /> -->
              </template>
              <!-- <el-menu-item index="2-1" @click="setDialogInfo('info')">个人信息</el-menu-item> -->
              <el-menu-item index="2-1" @click="setDialogInfo('pass')">修改密码</el-menu-item>
              <el-menu-item index="2-2" @click="setDialogInfo('logout')">退出</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";
import * as mUtils from "@/utils/mUtils";
import { setToken, getToken, removeToken } from "@/utils/auth";
import store from "@/store";
import topMenu from "./topMenu";
import logoImg from "@/assets/img/logo.png";
import chinaImg from "@/assets/img/china.svg";
import americaImg from "@/assets/img/america.svg";

export default {
  name: "head-nav",
  data() {
    return {
      userName: "",
      logo: logoImg,
      langLogo: getToken("langLogo") || chinaImg,
      chinaImg: chinaImg,
      americaImg: americaImg,
      menu: {
        userBgcolor: "#f0f2f5"
      }
    };
  },
  components: {
    topMenu
  },
  computed: {
    ...mapGetters(["name", "avatar", "sidebar"]),
    headNavWidth() {
      return document.body.clientWidth - this.sidebar.width;
    }
  },
  created() {
    console.log(store.getters.name);
    this.userName = store.getters.name;
  },
  mounted() {},
  methods: {
    logout() {
      removeToken("Token");
      location.reload();
      // this.this.$store.dispatch("LogOut").then(() => {
      //   location.reload();
      // });
    },
    /**
     * 弹出框-修改密码或者系统设置
     * @param {string} cmditem 弹框类型
     */
    setDialogInfo(cmditem) {
      switch (cmditem) {
        case "info":
          this.$router.push("/infoManage/infoShow/infoShow1");
          break;
        case "pass":
          this.$router.push("/infoManage/infoModify");
          break;
        case "logout":
          this.logout();
          break;
      }
    },
    // 切换语言
    changeLocale(type) {
      setToken("lang", type);
      this.$i18n.locale = type;
      if (type === "en") {
        this.langLogo = this.americaImg;
      } else {
        this.langLogo = this.chinaImg;
      }
      setToken("langLogo", this.langLogo);
    }
  }
};
</script>

<style scoped lang='less'>
.right-nav {
  display: flex;
  flex: 1;
  width: calc(100% - 180px);
  padding-right: 15px;
  justify-content: space-between;
  box-shadow: 0px 2px 5px 0px rgba(237, 233, 233, 0.5);
}
.fa-user {
  position: relative;
  top: -2px;
  margin-right: 4px;
}
.head-nav {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 29;
  transition: width 0.2s;
  justify-content: space-between;
  height: 60px;
  box-sizing: border-box;
  background: #fff;
  .logout {
    vertical-align: middle;
    cursor: pointer;
  }
}
.middle {
  align-items: center;
  border: 1px solid;
}
.userinfo-right {
  width: 320px;
  padding: 0 10px;
  justify-content: flex-end;
}
.userinfo {
  line-height: 60px;
  text-align: right;
}
.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.langAvatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  vertical-align: middle;
  padding: 0 5px;
  .name {
    line-height: 20px;
    text-align: center;
    font-size: 12px;
  }
  .avatarname {
    color: #409eff;
    font-weight: bolder;
    font-size: 13px;
  }
}

.username {
  cursor: pointer;
  margin-right: 5px;
}
.border {
  border: 1px solid;
}
.notify-row {
  line-height: 60px;
  flex: 1;
  ul {
    display: flex;
    justify-content: space-around;
  }
}

ul.top-menu > li {
  position: relative;
}
</style>
