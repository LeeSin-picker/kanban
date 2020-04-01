<template>
  <div class="faultTable">
    <h5>故障表</h5>
    <el-button type="primary" size="mini" icon="view" @click='addParentFault'>添加</el-button>
    <!-- 二级故障详情 -->
    <div class="custom-tree-container" v-if="isIf">
      <div class="block">
        <el-tree default-expand-all :data="faultTree" node-key="id" :expand-on-click-node="false"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
    <add-fault v-if="addFaultDialog.show" :isShow="addFaultDialog.show" :dialogRow="addFaultDialog.dialogRow"
      @closeDialog="hideaddFaultDialog" @getFaultTree="getFaultTree"></add-fault>  
  </div>

</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import AddFault from './components/addFault'
  import Pagination from "@/components/pagination"
  let id = 1000;
  export default {
    name: "faultTable",
    components: {
      AddFault,
      Pagination
    },
    data() {
      const faultTree = [];
      return {
        // 控制编辑框的显示
        addFaultDialog: {
          show: false,
          dialogRow: {}
        },
        faultTree: JSON.parse(JSON.stringify(faultTree)),
        isIf: true
      }
    },
    created() {
      this.getFaultTree()
    },
    methods: {
      // 显示资金弹框
      showaddFaultDialog(val) {
        this.$store.commit('SET_FAULT_TITLE', val)
        this.addFaultDialog.show = true;
      },
      // 添加一级故障
      addParentFault() {
        this.addFaultDialog.dialogRow = {
          FaultParent: 1,
          FaultName: '',
          FaultDescription: '',
          FaultLabel: '一级故障名称:'
        }
        this.showaddFaultDialog('add')
      },
      // 添加二级故障
      addFault(node,data) {       
        let faultParent = node.data.id
        this.addFaultDialog.dialogRow = {
          FaultParent: faultParent,
          FaultName: '',
          FaultDescription: '',
          FaultLabel: '二级故障名称:'
        }
        this.showaddFaultDialog('add')
        
      },
      remove(node, data) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          let faultId = node.data.id
          this.$delete('/api/fault',{FaultId:faultId})
            .then(res => {
              let data = res.data
              if (data.success) {
                this.getFaultTree()
              } else {
                alert(data.message)
              }

            })
        })
        .catch(() => {})
      },

      renderContent(h, { node, data, store }) {
        if (node.level == 1) {
          console.log(node)
          return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              <span>
                <el-button size="mini" type="text" on-click={ () => this.addFault(node,data) }><i class="fa fa-plus-square" aria-hidden="true"></i></el-button>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }><i class="fa fa-minus-square" aria-hidden="true"></i></el-button>
              </span>
            </span>);
          }else {
            
            return (
            <span class="custom-tree-node">
              <span>{node.label}</span>
              <span>{node.data.desc}</span>
              <span>
                <el-button size="mini" type="text" on-click={ () => this.remove(node, data) }><i class="fa fa-minus-square" aria-hidden="true"></i></el-button>
              </span>
            </span>);
          }       
      },
      // 加载故障树---fzy
      getFaultTree() {
        this.$get('/api/fault',{})
        .then(res=>{
          this.faultTree = []
          let data = res.data.data
          for(let i = 0; i < data.length; i++) {
            let faultLevel = data[i].FaultLevel
            if (faultLevel == 1) {
              let treeObj = {}
              let parentId = data[i].FaultId
              treeObj.id = parentId
              treeObj.label = data[i].FaultName
              treeObj.desc = data[i].FaultDescription
              treeObj.children = []
              for(let j = 0; j < data.length; j++) {
                let childrenLevel = data[j].FaultLevel
                if (childrenLevel == 2) {
                  let childrenFaultParent = data[j].FaultParent
                  if (parentId == childrenFaultParent) {
                    let childrenObj = {}
                    childrenObj.id = data[j].FaultId
                    childrenObj.label = data[j].FaultName
                    childrenObj.children = []
                    childrenObj.desc = data[j].FaultDescription
                    treeObj.children.push(childrenObj)
                  }
                }             
                }
              this.faultTree.push(treeObj)
            }
          }
          console.log(this.faultTree)
        })
      },
      // 重新加载页面
      hideaddFaultDialog() {
        this.addFaultDialog.show = false;
        console.log(this.addFaultDialog.show)
      },
    }
  }
</script>

<style lang='less'>
  .faultTable {
    padding: 10px;
    background: #fff;
    border-radius: 2px;

    h5 {
      color: #909399;
    }
    .custom-tree-container {
      background: #000;
      font-size: 30px;
      .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 8px;
      }
    }
    
  }
  
</style>