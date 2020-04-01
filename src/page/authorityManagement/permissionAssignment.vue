<template>
<div class="peimissionAssign">
  <el-row :gutter="20" style="padding-bottom:10px;">
      <el-col :span="8">
        角色列表:
        <el-select v-model="value2" placeholder="请选择" @change="roleChange">
    <el-option
      v-for="item in options"
      :key="item.value2"
      :label="item.label"
      :value="item.value2">
    </el-option>
  </el-select>
      </el-col>
    </el-row>
  <el-transfer v-model="value" :data="data" :titles="['未分配权限','已分配权限']" @change="handleChange" style="padding-bottom:10px;"></el-transfer>
  <el-button type="primary" size="mini" icon="view" @click='save'>保存</el-button>
</div>
</template>

<script>
  export default {
    data() {
       const generateData = _ => {
        const data = [];
        for (let i = 1; i <= 15; i++) {
          data.push({
            key: i,
            label: `权限级别 ${ i }`
          });
        }
        return data;
      };
      
      return {
        data: generateData(),
        value: [],
         options: [{
          value2: '选项1',
          label: '信息系统部经理'
        }, {
          value2: '选项2',
          label: '信息系统部职员'
        }, {
          value2: '选项3',
          label: '信息系统部测试员'
        }, {
          value2: '选项4',
          label: '龙须面'
        }, {
          value2: '选项5',
          label: '北京烤鸭'
        }],
        value2: '',
        //用于存取右侧穿梭框的数据
        rightVal:[],
        flag:false
      };
    },
    methods:{
      roleChange(val){
        if(val=='选项1'){
          this.value=[1,2,3]
        }else if(val=='选项2'){
          this.value=[1,2,3,4]
        }
      },
      //穿梭框改变处理函数
      handleChange(value, direction, movedKeys){
        this.rightVal=value
        this.flag=true
      },
      save(){
        if(this.flag){
          console.log(this.rightVal)
        }
        
      }
    }
  };
</script>
<style lang='less' scoped>
.peimissionAssign{
  // background: #fff;
  padding: 10px;
}
</style>