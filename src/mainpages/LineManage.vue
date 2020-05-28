<template>
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="Pid"
        label="执飞注册号"
        >
      </el-table-column>
      <el-table-column
        prop="type"
        label="机型"
        >
      </el-table-column>
      <el-table-column
        prop="FullName"
        label="执飞航司">
      </el-table-column>
      <el-table-column
        prop="takeoffplace"
        label="起飞机场"
        >
      </el-table-column>
      <el-table-column
        prop="landplace"
        label="目的机场"
        >
      </el-table-column>
      <el-table-column
        prop="pre_takeoff"
        label="预计起飞时间">
      </el-table-column>
      <el-table-column
        prop="pre_landing"
        label="预计到达时间"
        >
      </el-table-column>
      <el-table-column
        prop="tickctA_rest"
        label="头等舱余票"
        >
      </el-table-column>
      <el-table-column
        prop="tickctA_price"
        label="头等舱票价">
      </el-table-column>
      <el-table-column
        prop="tickctB_rest"
        label="商务舱余票">
      </el-table-column>
      <el-table-column
        prop="tickctB_price"
        label="商务舱票价"
        >
      </el-table-column>
      <el-table-column
        prop="tickctC_rest"
        label="经济舱余票">
      </el-table-column>
      <el-table-column
        prop="tickctC_price"
        label="经济舱票价"
        >
      </el-table-column>
      <el-table-column
        prop="total"
        label="总座位数"
        >
      </el-table-column>
      <el-table-column
        prop="isdelay"
        label="是否延误">
      </el-table-column>
      <el-table-column
        prop="delaycode"
        label="延误代码">
      </el-table-column>
    </el-table>
</template>

<script>
export default {
    name:'LineManage',
    created:function(){
        this.tableData=[]
          fetch("http://localhost:9090/api/getbycompany?id="+this.com, {
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
    data(){
        return{
            tableData:[]
        }
    },
     props: ['com'],
}
</script>

<style scoped>

</style>