<template>
  <div class="usersTable">
    <el-table :data="tableData1"  row-key="id" border lazy>
      <el-table-column prop="FaultRecordSlaveId" label="ID" width="180" align="center">
      </el-table-column>
      <el-table-column prop="FaultName" label="故障名称" width="180" align="center">
      </el-table-column>
      <el-table-column prop="UserName" label="用户名" align="center">
      </el-table-column>
      <el-table-column prop="RecordTime" label="记录时间" align="center">
      </el-table-column>>
    </el-table>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    name: "childrenFault",
    components: {
    },
    data() {
      return {
        tableData1: [],
      }
    },
    props:{FaultRecordId:Number},
    created() {
      this.getUsersTable()
    },
    watch: {
      FaultRecordId(newName, oldName) {
        this.getUsersTable(newName)
      }
    },
    methods: {
      // 加载用户表
      getUsersTable(para) {
        console.log(this.FaultRecordId)
        this.$get('/api/faultrecord', {id:para}).then(res => {
          this.tableData1 = res.data.data
        })
      }
    }
  }
</script>

<style lang='less' scoped>
  .usersTable {
    padding: 0px;
    background: #fff;
    border-radius: 2px;
  }

  h5 {
    color: #909399;
  }
</style>