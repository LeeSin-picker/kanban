<template>
  <div class="menu_left cflex" :style="{width:sidebar.width+'px'}">
    <div class="menu_page_top rflex">
      <img :class="['logo',{'closeLogo':!sidebar.opened}]" :src="logo" alt="Andon" />
      <span class="title" v-show="sidebar.opened">
        <i>{{$t('commons.xiaoai')}}</i>
      </span>
    </div>
    <div class="menu_page_bottom el-scrollbar">
      <el-menu
        mode="vertical"
        theme="dark"
        :show-timeout="200"
        :default-active="$route.path"
        :collapse="isCollapse"
        :background-color="menuObj.bgColor"
        :text-color="menuObj.textColor"
        :active-text-color="menuObj.activeTextColor"
        :style="{'width':sidebar.width+'px'}"
      >
        <template v-for="(item,index) in permission_routers">
          <!--表示 有一级菜单-->
          <router-link
            v-if="!item.hidden && item.noDropdown"
            :to="item.path+'/'+item.children[0].path"
            :key="index"
          >
            <el-menu-item
              :background-color="menuObj.bgColor2"
              class="dropItem"
              :index="item.path+'/'+item.children[0].path"
            >
              <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
              <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span>
            </el-menu-item>
          </router-link>

          <!--表示 有二级或者多级菜单 -->
          <el-submenu
            v-if="item.children  && item.children.length >= 1 && !item.hidden && !item.noDropdown"
            :index="item.path"
            :key="index"
          >
            <template slot="title">
              <i v-if="item.meta.icon" :class="'fa fa-margin '+item.meta.icon"></i>
              <span v-if="item.meta.title" slot="title">{{ $t(`commons.${item.name}`)}}</span>
            </template>
            <!--直接定位到子路由上，子路由也可以实现导航功能-->
            <router-link
              v-for="(citem,cindex) in item.children"
              :to="getIindex(citem,item,cindex)"
              :key="cindex"
              :target="(citem.path=='projectProgressKanban'||citem.path=='TVKanban')?blank:self"
            >
              <el-menu-item
                v-if="citem.meta.routerType != 'topmenu' && citem.meta.title"
                :index="getIindex(citem,item,cindex)"
              >
                <span slot="title">{{ $t(`commons.${citem.name}`)}}</span>
              </el-menu-item>
            </router-link>
          </el-submenu>
        </template>
      </el-menu>
    </div>
  </div>
</template>

<script>
import store from "@/store";
import { mapGetters } from "vuex";
import * as mUtils from "@/utils/mUtils";
import logoImg from "@/assets/img/logo.png";

export default {
  name: "left-Menu",
  data() {
    return {
      menuObj: {
        //bgColor: "#324057",
        bgColor: "#fff",
        textColor: "#666",
        activeTextColor: "#409EFF"
      },
      logo: logoImg,
      self: "_self",
      blank: "_blank"
    };
  },
  computed: {
    ...mapGetters(["permission_routers", "isCollapse", "sidebar", "menuIndex"])
  },
  created() {
    this.$get("/api/services/app/Session/GetCurrentLoginInformations", {}).then(
      res => {
        let userId = res.data.result.user.id;
        this.$get("/api/services/app/User/GetPermissionByUsers", {
          currentUserId: userId
        }).then(res => {
          let permissionList = res.data.result;
          this.getIndex(permissionList, this.permission_routers);
        });
      }
    );
  },
  mounted() {
    console.log(store.getters.name);
  },
  methods: {
    getIindex(citem, item, cindex) {
      return citem.meta.titleList
        ? item.path + "/" + citem.path + "/" + citem.meta.titleList[0].path
        : item.path + "/" + citem.path;
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
                console.log(param[j].children[childIndex]);
                param[j].children[childIndex].meta.routerType = "leftmenu";
              }
            }
          }
        }
      }
      console.log(this.permission_routers);
    }
  }
};
</script>


<style lang="less">
@left-bgColor: #fff; // 左侧菜单背景颜色;
@icon-link: #409eff !important;
.menu_left {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
}
.el-scrollbar {
  overflow: auto;
}
.menu_page_top {
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-around;
  text-transform: uppercase;
  box-sizing: border-box;
  box-shadow: 0px 2px 5px 0px rgba(230, 224, 224, 0.5);
  .logo {
    height: 36px;
    width: 36px;
    vertical-align: middle;
    display: inline-block;
  }
  .closeLogo {
    width: 30px;
    height: 30px;
  }
  .title {
    font-size: 22px;
    i {
      color: #409eff !important;
    }
  }
}
.menu_page_bottom {
  width: 100%;
  overflow-y: scroll;
  flex: 1;
  margin-top: 3px;
}
.fa-margin {
  margin-right: 5px;
}
.router-link-active {
  li {
    .el-submenu__title {
      // color: @icon-link !important;
    }
  }
}
.menu_left .el-submenu .el-menu-item {
  // color: #409eff !important;
}
</style>
