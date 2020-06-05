<template>
   <div>
       <el-table :data="tableData">
         <el-table-column label="航班号" prop="ComID"></el-table-column>
         <el-table-column label="出发机场" prop="name"></el-table-column>
         <el-table-column label="到达机场" prop="name1"></el-table-column>
         <el-table-column label="预计起飞时间" prop="pre_takeoff"></el-table-column>
         <el-table-column label="预计到达时间" prop="pre_landing"></el-table-column>
         <el-table-column label="执飞机型" prop="type"></el-table-column>
         <el-table-column label="注册号" prop="Pid"></el-table-column>
         <el-table-column label="头等舱上座率" prop="rest1"></el-table-column>
         <el-table-column label="商务舱上座率" prop="rest2"></el-table-column>
         <el-table-column label="经济舱上座率" prop="rest3"></el-table-column>
         <el-table-column label="状态" prop="isdelay"></el-table-column>
         <el-table-column label="操作" width="150">
         <template slot-scope="scope">
        <el-button  type="text" @click="onchange(scope.$index)">修改状态</el-button>
         </template>
      </el-table-column>
       </el-table>
       <el-dialog title="更新状态" :visible.sync="isvisible">
           <el-form>
               <el-form-item label="选择状态">
                   <el-select v-model="val1" placeholder="选择状态">
                     <el-option v-for="item in options"
                      :key="item.errorCode"
                      :label="item.errorReason"
                    :value="item.errorCode"></el-option>
                   </el-select>
               </el-form-item>
           </el-form>
             <div slot="footer" class="dialog-footer">
    <el-button @click="isvisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
       </el-dialog>
   </div>
</template>

<script>
export default {
    name:'DelayReport',
    created:function(){
         this.refresh()
          fetch("http://49.233.81.150:9090/api/delaytip", {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.json()).then(data=>{
                this.options=data
                console.log(this.delaycode)
          })
    },
    data(){
        return{
            tableData:[],
            delaycode:[],
            id:'',
            com:'',
            isvisible:false,
            options:[],
            val1:''
        }
    },methods:{
        vertDate:function(date){
              var time = date
              var dt = new Date(time)
              var timeStr = dt.getFullYear() + '-' + (dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth()+1 ) : dt.getMonth()+1 ) + '-' + (dt.getDate() + 1 < 10 ? "0" + (dt.getDate() ) : dt.getDate() ) + ' ' 
              + (dt.getHours() + 1 < 10 ? "0" + (dt.getHours() ) : dt.getHours() ) + ':' + (dt.getMinutes() + 1 < 10 ? "0" + (dt.getMinutes() ) : dt.getMinutes()) 
              + ':' +(dt.getSeconds() + 1 < 10 ? "0" + (dt.getSeconds()) : dt.getSeconds())
              return timeStr
       },
        onchange:function(index){
            console.log(index)
             this.isvisible=true
             this.id=this.tableData[index].ID
        },submit:function(){
            this.isvisible=false
            var msg={
                id:this.id,
                code:this.val1
            }
            console.log(msg)
             fetch('http://49.233.81.150:9090/api/updateScheduleState', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(msg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res=>res.text()).then(data=>{
            console.log(data)
            if(data==='1'){
            this.$message({
            message: '修改成功',
            type: 'success'
          })
           this.refresh()
           this.isvisible = false
            }else{
                this.$message.error('插入失败')
            }
        })
        },
        refresh:function(){
            this.tableData=[]
             fetch("http://49.233.81.150:9090/service/GetUndoSchedule", {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.json()).then(data=>{
            for(let i=0;i<data.length;i++){
              if(data[i].isdelay===0){
                data[i].isdelay='否'
                data[i].delaycode='已起飞'
              }else if(data[i].isdelay===-1){
                 data[i].isdelay='未起飞'
                 data[i].delaycode='计划'
              }else{
                data[i].isdelay='异常'
                data[i].delaycode='延误或取消'
              }
              if(data[i].rest1===null)data[i].rest1=0
              data[i].rest1=(data[i].rest1*100).toFixed(2)+"%"
              data[i].rest2=(data[i].rest2*100).toFixed(2)+"%"
              data[i].rest3=(data[i].rest3*100).toFixed(2)+"%"
               data[i].pre_takeoff=this.vertDate(data[i].pre_takeoff)
               data[i].pre_landing=this.vertDate(data[i].pre_landing)
               data[i].ComID=data[i].ComID+data[i].ID
              this.tableData.push(data[i])
            }
          })
        }
    }
}
</script>

<style scoped>

</style>