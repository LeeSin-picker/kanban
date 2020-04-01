<template>
  <div class="usersTable">
    <h5>故障查询</h5>
    <div style="width: 50%; display:inline-block;">
      <el-table :data="tableData1"  row-key="id" border @row-click="rowClick">
        <el-table-column prop="FaultRecordId" label="故障ID" width="180" align="center">
        </el-table-column>
        <el-table-column prop="FaultName" label="故障名称" width="180" align="center">
        </el-table-column>
        <el-table-column prop="UserName" label="用户名" align="center">
        </el-table-column>
        <el-table-column prop="RecordTime" label="记录时间" align="center">
        </el-table-column>>
      </el-table>
      <pagination :pageTotal="pageTotal" @handleCurrentChange="handleCurrentChange" @handleSizeChange="handleSizeChange">
      </pagination>
    </div>
     <children-fault :FaultRecordId = "FaultRecordId" style="width: 49%; display:inline-block;"></children-fault>
    <!-- 分页组件---fzy -->
    
   
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Pagination from "@/components/pagination"
  import ChildrenFault from './components/childrenFault'
  export default {
    name: "faultInquiry",
    components: {
      Pagination,
      ChildrenFault
    },
    data() {
      return {
        tableData1: [],
        // 控制编辑框的显示
        addFundDialog: {
          show: false,
          dialogRow: {}
        },
        // 数据总条数---fzy
        pageTotal: 0,
        pageIndex: 1,
        pageSize: 10,
        FaultRecordId: null
      }
    },
    created() {
      this.getUsersTable()

    },
    methods: {
      // 上下分页
      handleCurrentChange(val) {
        // 请求接口
        this.pageIndex = val
        this.getUsersTable()
        console.log('请求某某页数据' + val)
      },
      // 每页显示多少条
      handleSizeChange(val) {
        // 请求接口
        this.pageSize = val
        this.getUsersTable()
        console.log('每页显示多少条' + val)
      },
      // 加载用户表
      getUsersTable() {
        this.$get('/api/faultrecord', {pageIndex:this.pageIndex,pageSize:this.pageSize}).then(res => {
          this.tableData1 = res.data.data
          this.pageTotal = res.data.pageTotal
        })
      },
      // 点击表格的随意行
      rowClick(row, column, event) {
        this.FaultRecordId = row.FaultRecordId
      }
    }
  }
</script>

<style lang='less' scoped>
  .usersTable {
    padding: 10px ;
    background: #fff;
    border-radius: 2px;
    vertical-align: top;
  }

  h5 {
    color: #909399;
  }

</style>