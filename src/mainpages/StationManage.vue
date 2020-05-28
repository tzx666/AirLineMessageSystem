<template>
<div><h1>航点管理</h1>
<el-button type="primary" round @click="addstation">新建航点</el-button>
    <el-row>
      <el-col :span="24">
 <el-table
      :data="tableData"
      :row-style="{height:'50px'}"
      border>
      <el-table-column
        prop="city"
        label=" 城市">
      </el-table-column>
      <el-table-column
        prop="name"
        label="机场名称">
      </el-table-column>
      <el-table-column
        prop="engname"
        label="英文名">
      </el-table-column>
       <el-table-column
      fixed="right"
      label="操作"
      width="120">
      <template slot-scope="scope">
        <el-button
          @click="ondelClick(scope.$index)"
          type="primary"
          size="small">
          删除航点
        </el-button>
      </template>
    </el-table-column>
    </el-table>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name:'StationManage',
    created:function(){
       this.tableData=[]
          fetch("http://localhost:9090/station?com="+this.com, {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.json()).then(data=>{
            console.log(data)
            for(let i=0;i<data.length;i++){
              this.tableData.push(data[i])
            }
          })
    },
    props: ['com'],
     data(){
        return{
          tableData: [],
        } 
    },methods:{
      ondelClick:function(index){
        console.log(this.tableData[index].name+this.com)
        fetch("http://localhost:9090/api/Delstation?com="+this.com+"&name="+this.tableData[index].name, {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.text()).then(data=>{
            console.log(data)
            if(data==='1'){
              this.tableData=[]
          fetch("http://localhost:9090/station?com="+this.com, {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.json()).then(data=>{
            console.log(data)
            for(let i=0;i<data.length;i++){
              this.tableData.push(data[i])
            }
            this.$message({
              message: '删除成功！',
              type: 'success'
        });
          })
            }else{
               this.$message.error('删除失败');
            }
          })
      },
      addstation:function(){
        
      }
  }
}
</script>

<style scoped>

</style>