<template>
  <el-dialog
    :visible.sync="isVisible"
    title="分配权限"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    :modal-append-to-body="false"
    @close="closeDialog"
  >
    <el-tree
      ref="tree"
      :data="data"
      show-checkbox
      node-key="name"
      :default-expanded-keys="['Pages.Project']"
      :default-checked-keys="pList"
      :props="defaultProps"
    ></el-tree>
    <el-button type="primary" @click="onSubmit('form')">提 交</el-button>
  </el-dialog>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "editPermissions",
  data() {
    return {
      pList: [],
      isVisible: this.isShow,
      checkedList: [],
      data: [],
      defaultProps: {
        children: "children",
        label: "displayName"
      },
      //详情弹框信息
      dialog: {
        width: "400px",
        formLabelWidth: "120px"
      }
    };
  },
  props: {
    isShow: Boolean,
    permissionList: Object,
    allPermissions: Array
  },
  computed: {
    ...mapGetters(["addFundDialog"])
  },
  created() {
    this.pList = this.permissionList.grantedPermissions;
    this.data = this.allPermissions;
    console.log(this.allPermissions);
    this.filterParent(this.allPermissions);
  },
  mounted() {},
  methods: {
    filterParent(allPermissions) {
      for (let i = 0; i < allPermissions.length; i++) {
        if (allPermissions[i].children.length > 0) {
          console.log(allPermissions[i].name);
          let index = this.pList.indexOf(allPermissions[i].name);
          if (index >= 0) {
            this.pList.splice(index, 1);
          }
          this.filterParent(allPermissions[i].children);
          console.log(this.pList);
        }
      }
    },
    onScreeoutMoney() {},
    onAddMoney() {},
    closeDialog() {
      this.$emit("closeDialog");
    },
    getCheckedKeys() {
      this.permissionList.grantedPermissions = [
        ...this.$refs.tree.getHalfCheckedKeys(),
        ...this.$refs.tree.getCheckedKeys()
      ];
    },
    //表单提交
    onSubmit(form) {
      this.getCheckedKeys();
      console.log(this.permissionList.grantedPermissions);
      this.$put("/api/services/app/Role/UpdateRole", this.permissionList).then(
        res => {
          this.isVisible = false;
          this.$emit("getUsersTable");
        }
      );
      //   this.$refs[form].validate(valid => {
      //     if (valid) {
      //       //表单数据验证完成之后，提交数据;
      //       let formData = this[form];
      //       const para = Object.assign({}, formData);
      //       console.log(para);
      //       // edit
      //       if (this.addFundDialog.type === "edit") {
      //         this.$post("/api/users", para).then(res => {
      //           this.$message({
      //             message: "修改成功",
      //             type: "success"
      //           });
      //           this.$refs["form"].resetFields();
      //           this.isVisible = false;
      //           this.$emit("getUsersTable");
      //         });
      //       } else {
      //         // add
      //         this.$post("/api/users", para).then(res => {
      //           console.log(res.data);
      //           this.$message({
      //             message: "新增成功",
      //             type: "success"
      //           });
      //           this.$refs["form"].resetFields();
      //           this.isVisible = false;
      //           this.$emit("getUsersTable");
      //         });
      //       }
      //     }
      //   });
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