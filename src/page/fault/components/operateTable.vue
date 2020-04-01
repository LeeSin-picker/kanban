<template>
  <div class="operateTable">
    <h5>操作表</h5>
     <el-button type="primary" size="mini" icon="view" @click='addOprate'>添加</el-button>
    <el-table :data="tableData1" style="width: 100%" row-key="id" border lazy>
      <el-table-column prop="consoleName" label="操作台名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="consoleNo" label="操作台编码" width="180" align="center">
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件---fzy -->
    <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
    </pagination>
    <add-operate v-if="addFundDialog.show" :isShow="addFundDialog.show" :dialogRow="addFundDialog.dialogRow"
      @closeDialog="hideAddFundDialog"></add-operate>
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import AddOperate from './components/addOperate'
  import Pagination from "@/components/pagination"
  export default {
    name: "operateTable",
    components: {
      AddOperate,
      Pagination
    },
    data() {
      return {
        tableData1: [{
          id: 1,
          consoleName: '操作台1',
          consoleNo: 'op_001'
        }, {
          id: 2,
          consoleName: '操作台2',
          consoleNo: 'op_002'
        }, {
          id: 3,
          consoleName: '操作台3',
          consoleNo: 'op_003'
        }, {
          id: 4,
          consoleName: '操作台4',
          consoleNo: 'op_004'
        }],
        // 控制编辑框的显示
        addFundDialog: {
          show: false,
          dialogRow: {}
        },
        // 数据总条数---fzy
        pageTotal: 30
      }
    },
    methods: {
      handleEdit(index, row) {
        this.addFundDialog.dialogRow = row;
        this.showAddFundDialog();

      },
      handleDelete(index, row) {
        console.log(index, row);
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
      // 上下分页
      handleCurrentChange(val) {
        // 请求接口
        console.log('请求某某页数据' + val)
      },
      // 每页显示多少条
      handleSizeChange(val) {
        // 请求接口
        console.log('每页显示多少条' + val)
      },
      // 添加操作台
      addOprate() {
        this.showAddFundDialog('add');
      }
    }
  }
</script>

<style lang='less' scoped>
  .operateTable {
    padding: 10px;
    background: #fff;
    border-radius: 2px;
  }

  h5 {
    color: #909399;
  }
</style>