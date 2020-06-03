<template>
    <div>
        <h1>管理员/用户管理</h1>
        <el-row type="flex" justify="center">
          <el-col :span="12">
              <el-button type="" @click="shoWhat=false">管理员管理</el-button>
              <el-button type="" @click="shoWhat=true">用户管理</el-button>
          </el-col>
        </el-row>
        <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    v-if="shoWhat==false">
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Staff"
      label="真实姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="FullName"
      label="所属航司">
    </el-table-column>
    <el-table-column
      prop="type"
      label="职务">
    </el-table-column>
    <el-table-column label="操作" width="150">
         <template slot-scope="scope">
        <el-button  type="text" @click="onchange(scope.$index)">停职/恢复</el-button>
        <el-button  type="text" @click="ondel(scope.$index)">删除</el-button>
         </template>
      </el-table-column>
  </el-table>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    v-if="shoWhat==true">
    <el-table-column
      prop="name"
      label="用户名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="Staff"
      label="等级"
      width="180">
    </el-table-column>
    <el-table-column
      prop="FullName"
      label="积分">
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
export default {
    name:'AdstorManage',
    created:function(){
       this.refresh()
    },
    data(){
        return{
            shoWhat:false,
            tableData:[]
        }
    },
    props: ['com'],
    methods:{
        refresh:function(){
            this.tableData=[]
fetch('http://49.233.81.150:9090/API/GetStaffInfo', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'com=' +this.com
        }).then(res=>res.json()).then(data=>{
            for(let i=0;i<data.length;i++){
                if(data[i].type===999){
                    data[i].type='管理员'
                }
                if(data[i].type===101){
                    data[i].type='签派'
                }
                if(data[i].type===100){
                    data[i].type='管制'
                }
                if(data[i].type===-999){
                    data[i].type='管理员（停职）'
                }
                if(data[i].type===-101){
                    data[i].type='签派（停职）'
                }
                if(data[i].type===-100){
                    data[i].type='管制（停职）'
                }
                this.tableData.push(data[i])
            }
        })
        },
        onchange:function(index){
            console.log(this.tableData[index])
            fetch('http://49.233.81.150:9090/API/UpdateStaffState', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' +this.tableData[index].name
        }).then(res=>res.json()).then(data=>{
            if(data.status===1){
            this.$message({
            message: '更新成功',
            type: 'success'
          })
           this.refresh()
          }else{
              this.$message.error('更新失败')
          }
        })
        },
        ondel:function(index){
            console.log(this.tableData[index])
            fetch('http://49.233.81.150:9090/API/DeleteStaffState', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' +this.tableData[index].name
        }).then(res=>res.json()).then(data=>{
            if(data.status===1){
            this.$message({
            message: '删除成功',
            type: 'success'
          })
           this.refresh()
          }else{
              this.$message.error('删除失败')
          }
        })
        }
    }
}
</script>

<style scoped>

</style>