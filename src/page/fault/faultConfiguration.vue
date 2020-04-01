<template>
  <div class="faultConfiguration">
    <!-- 用户表 -->
    <users-table></users-table>
    <!-- 操作表 -->
    <operate-table></operate-table>
    <!-- 故障表 -->
    <fault-table></fault-table>
  </div>
</template>

<script>
  import UsersTable from './components/usersTable'
  import OperateTable from './components/operateTable'
  import FaultTable from './components/faultTable'
  export default {
    name: "faultConfiguration",
    components: {
      UsersTable,
      OperateTable,
      FaultTable
    }
  }
</script>

<style lang='less' scoped>
  .faultConfiguration {
    padding: 20px;
  }
</style>