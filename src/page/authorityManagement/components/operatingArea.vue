<template>
  <div class="operatingArea">
      <i class="el-icon-plus" @click='addUsers'></i>
      <add-users v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog" ></add-users>
  </div>
</template>

<script>
import {
mapGetters
} from 'vuex';
import AddUsers from './addUsers';
export default {
  name: '',
  components: {
      AddUsers
    },
  data() {
    return {
        // 控制编辑框的显示
        addFundDialog: {
          show: false,
          dialogRow: {}
        }
    };
  },
  computed:{
  },
  watch:{
  },
  methods: {
    // 添加用户表
    addUsers() {
    this.showAddFundDialog('add');
    },
    // 显示资金弹框
    showAddFundDialog(val) {
    this.$store.commit('SET_DIALOG_TITLE', val)
    this.addFundDialog.show = true;
    },
    // 重新加载页面
      hideAddFundDialog() {
        this.addFundDialog.show = false;
        console.log(this.addFundDialog.show)
      },
  },
};
</script>

<style lang='less' scoped>
.operatingArea{
    position: absolute;
    bottom: 20px;
    left: 10px;
    height: 32px;
    line-height: 32px;
}
</style>
