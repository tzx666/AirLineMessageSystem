<template>
<div>
  <el-row type="flex" justify="center">
    <el-col :span="24">
      航司飞机信息（仅供查看，无权修改）
    </el-col>
  </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="24">
            <el-table
      :data="tableData"
      :row-style="{height:'50px'}"
      border>
      <el-table-column
        prop="PlaneId"
        label="注册号">
      </el-table-column>
      <el-table-column
        prop="type"
        label="飞机型号">
      </el-table-column>
      <el-table-column
        prop="FullName"
        label="所属公司">
      </el-table-column>
      <el-table-column
        prop="seat1"
        label="头等舱">
      </el-table-column>
      <el-table-column
        prop="seat2"
        label="商务舱">
      </el-table-column>
      <el-table-column
        prop="seat3"
        label="经济舱">
      </el-table-column>
      <el-table-column
        prop="total"
        label="总座位数">
      </el-table-column>
    </el-table>
      </el-col>
    </el-row>
</div>
</template>

<script>
export default {
    name:'PlaneManage',
    created:function(){
       this.tableData=[]
          fetch("http://localhost:9090/api/GetCompanyPlane?com="+this.com, {
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
    }
}
</script>

<style>
.el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
}
.el-table__body tr,
  .el-table__body td {
    padding: 0;
    height: 40px;
}
</style>