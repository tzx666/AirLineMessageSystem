<template>
<div>
<h1>航线管理系统</h1>
<el-row type="flex" justify="center">
  <el-col :span="16">
    <el-button  round @click="dialogVisible=true">新建航线</el-button>
  </el-col>
</el-row>
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName">
      <el-table-column
        prop="Pid"
        label="执飞注册号"
        >
      </el-table-column>
      <el-table-column
        prop="type"
        label="机型"
        width="90">
      </el-table-column>
      <el-table-column
        prop="FullName"
        label="执飞航司"
        width="110">
      </el-table-column>
      <el-table-column
        prop="takeoffplace"
        label="起飞机场"
        width="150">
      </el-table-column>
      <el-table-column
        prop="landplace"
        label="目的机场"
        width="150">
      </el-table-column>
      <el-table-column
        prop="pre_takeoff"
        label="预计起飞时间"
        width="180">
      </el-table-column>
      <el-table-column
        prop="pre_landing"
        label="预计到达时间"
        width="180">
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
        label="状态">
      </el-table-column>
      <el-table-column label="操作" width="150">
         <template slot-scope="scope">
        <el-button  type="text" @click="onchange(scope.$index)">修改</el-button>
        <el-button  type="text" @click="ondel(scope.$index)">删除</el-button>
         </template>
      </el-table-column>
    </el-table>
    <el-dialog title="修改航线" :visible.sync="changedialogVisible" fullscreen center>
      <el-form label-width="500px" style="width:800px">
        <el-form-item label="修改起降时间">
          <el-divider></el-divider>
          <span>预计起飞：{{willtime1}} </span>
           <el-divider></el-divider>
          <span>预计降落：{{willtime2}}</span>
           <el-divider></el-divider>
            <el-date-picker
     @change="dateChange"
      v-model="changetime1"
      start-placeholder="起飞时间"
      end-placeholder="降落时间"
      :default-time="['12:00:00']"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
        </el-form-item>
        <el-form-item label="修改价格">
          <el-divider></el-divider>
          <div>
          <span>头等舱余票：{{rs1}} 票价：{{p1}}</span>
          <el-input v-model="np1" placeholder="请输入更改后价格"></el-input>
          <el-divider></el-divider>
          <span>商务舱余票：{{rs2}} 票价：{{p2}}</span>
          <el-input v-model="np2" placeholder="请输入更改后价格"></el-input>
          <el-divider></el-divider>
          <span>经济舱余票：{{rs3}} 票价：{{p3}}</span>
          <el-input v-model="np3" placeholder="请输入更改后价格"></el-input>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
    <el-button @click="changedialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="changesubmit">确 定</el-button>
  </div>
    </el-dialog>
<el-dialog title="新建航线" :visible.sync="dialogVisible" fullscreen center >
  <el-form :model="form1" label-width="500px" style="width:800px">
    <el-form-item label="起飞机场" >
       <el-select v-model="value2" placeholder="选择省" @change="onprivice1Changed">
    <el-option
      v-for="item in options"
      :key="item.value2"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-select v-model="value3" placeholder="选择市" @change="oncity1change">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-select v-model="value4" placeholder="选择机场">
    <el-option
      v-for="item in options2"
      :key="item.value4"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
        <el-form-item label="到达机场" >
       <el-select v-model="value5" placeholder="选择省" @change="onprivice2Changed">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-select v-model="value6" placeholder="选择市" @change="oncity2change">
    <el-option
      v-for="item in options4"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <el-select v-model="value7" placeholder="选择机场">
    <el-option
      v-for="item in options5"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="起降时间">
     <el-date-picker
     @change="dateChange"
      v-model="form.value1"
      start-placeholder="起飞时间"
      end-placeholder="降落时间"
      :default-time="['12:00:00']"
      type="datetimerange"
      value-format="yyyy-MM-dd HH:mm:ss"
      placeholder="选择日期时间">
    </el-date-picker>
    </el-form-item>
    <el-form-item label="选择执飞飞机">
       <el-select v-model="value8" placeholder="请选择" @change="planechanged">
    <el-option
      v-for="item in options3"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="">
        <span>头等舱座位：{{s1}} 商务舱座位:{{s2}}  经济舱座位:{{s3}} 总数：{{total}}</span>
    </el-form-item>
    <el-form-item label="头等舱价格">
      <el-input v-model="p1" placeholder="" > </el-input>
    </el-form-item>
    <el-form-item label="商务舱价格">
      <el-input v-model="p2" placeholder="" autosize></el-input>
    </el-form-item>
    <el-form-item label="经济舱价格">
      <el-input v-model="p3" placeholder="" autosize></el-input>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="submit">确 定</el-button>
  </div>
</el-dialog>
    </div>
</template>

<script>
export default {
    name:'LineManage',
    beforeCreate:function(){
       fetch('http://49.233.81.150:9090/sqltest1',{
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res =>
      res.json()).then(data => {
      let midopt = []
      console.log(data)
      for (let i = 0; i < data.length; i++) {
        midopt.push({value: data[i].pinyin, label: data[i].name})
      }
      this.options = midopt
      console.log(this.options)
    })
    },
    created:function(){
      /*获取表信息 */
        this.refresh()
    },
    data(){
        return{
            tableData:[],
            dialogVisible:false,
            changedialogVisible:false,
            form:{
              name:'',
              value1:''
            },
            options:[],
            options1:[],
            options2:[],
            options3:[],//可用飞机列表
            options4:[],
            options5:[],
            value2:'',
            value3:'',
            value4:'',
            value5:'',
            value6:'',
            value7:'',
            value8:'',
            p1:'',
            p2:'',
            p3:'',
            np1:'',
            np2:'',
            np3:'',
            s1:'',
            s2:'',
            s3:'',
            rs1:"",
            rs2:'',
            rs3:'',
            total:'',
            time1:'',
            willtime1:'',
            willtime2:'',
            changetime1:'',
            takeoffval:'',
            landval:'',
            upid:'',
            ptk:'',
            pl:'',
            willchangeindex:'',
            form1:{

            }
        }
    },
     props: ['com'],
     methods:{
       vertDate:function(date){
              var time = date
              var dt = new Date(time)
              var timeStr = dt.getFullYear() + '-' + (dt.getMonth() + 1 < 10 ? "0" + (dt.getMonth()+1 ) : dt.getMonth()+1 ) + '-' + (dt.getDate() + 1 < 10 ? "0" + (dt.getDate() ) : dt.getDate() ) + ' ' 
              + (dt.getHours() + 1 < 10 ? "0" + (dt.getHours() ) : dt.getHours() ) + ':' + (dt.getMinutes() + 1 < 10 ? "0" + (dt.getMinutes() ) : dt.getMinutes()) 
              + ':' +(dt.getSeconds() + 1 < 10 ? "0" + (dt.getSeconds()) : dt.getSeconds())
              return timeStr
       },
       dateChange:function(){
         console.log(this.form.value1[0]+" "+this.form.value1[1])
          fetch('http://49.233.81.150:9090/api/GetUsefulPlane', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'takeoff=' +this.form.value1[0] +"&land="+this.form.value1[1]+"&com="+this.com
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].PlaneId, label: data[i].PlaneId+" "+data[i].type})
        }
        this.options3 = midopt1
      })
       },
       onprivice1Changed:function(){
            //出发机场省份变化，回调查询市的变化
            console.log(this.value2)
            this.value3=''
            this.options1=[]
            fetch('http://49.233.81.150:9090/sqltest2', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({'pinyin': this.value2}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].sname, label: data[i].sname})
        }
        this.options1 = midopt1
      })
       },
       oncity1change:function(){
         /*根据市的变化回调航点的变化 */
         console.log(this.value3)
         this.value4=''
         this.options2=[]
          fetch('http://49.233.81.150:9090/station3', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'com=' +this.com +"&city="+this.value3
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].ICAO, label: data[i].name})
        }
        this.options2 = midopt1
      })
       },
      onprivice2Changed:function(){
            //出发机场省份变化，回调查询市的变化
            console.log(this.value5)
            this.value6=''
            this.options4=[]
            fetch('http://49.233.81.150:9090/sqltest2', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({'pinyin': this.value5}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].sname, label: data[i].sname})
        }
        this.options4 = midopt1
      })
       },
       oncity2change:function(){
         /*根据市的变化回调航点的变化 */
         console.log(this.value6)
         this.value7=''
         this.options5=[]
          fetch('http://49.233.81.150:9090/station3', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'com=' +this.com +"&city="+this.value6
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].ICAO, label: data[i].name})
        }
        this.options5 = midopt1
      })
       },
       planechanged:function(){
         fetch('http://49.233.81.150:9090/api/planetype', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'id=' +this.value8
      }).then(res => res.json()).then(data => {
        console.log(data)
        this.s1=data.seat1
        this.s2=data.seat2
        this.s3=data.seat3
        this.total=data.total
        })
       },
       submit:function(){
         var sendmsg={
              "pid":this.value8,
              "comid":this.com,
              "pretakeoff":this.form.value1[0],
              "prelanding":this.form.value1[1],
              "takeoffplace":this.value4,
              "landplace":this.value7,
              "pricea":this.p1,
              "priceb":this.p2,
              "pricec":this.p3
         }
              console.log(sendmsg)
         fetch('http://49.233.81.150:9090/api/AddSchedule', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(sendmsg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        }).then(res => res.json()).then(data=>{
          if(data.status===1){
            this.$message({
            message: '插入成功',
            type: 'success'
          })
           this.refresh()
           this.dialogVisible = false
          }else{
              this.$message.error('插入失败')
          }
        })
       },
       refresh:function(){
         this.tableData=[]
          fetch("http://49.233.81.150:9090/api/getbycompany?id="+this.com, {
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
               data[i].pre_takeoff=this.vertDate(data[i].pre_takeoff)
               data[i].pre_landing=this.vertDate(data[i].pre_landing)
              this.tableData.push(data[i])
            }
          })
       },
       ondel:function(index){
          if(this.tableData[index].isdelay!='未起飞'){
              this.$message.error('已起飞航班无法删除！')
              return
          }
          fetch('http://49.233.81.150:9090/api/GetAirportCode', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' +this.tableData[index].takeoffplace
        }).then(res=>res.text()).then(data=>{
          console.log(data)
          this.takeoffval=data
           fetch('http://49.233.81.150:9090/api/GetAirportCode', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'name=' +this.tableData[index].landplace
        }).then(res=>res.text()).then(data=>{
          console.log(this.takeoffval+" "+data)
          var sendmsg={
              "pid":this.tableData[index].Pid,
              "pretakeoff":this.tableData[index].pre_takeoff,
              "prelanding":this.tableData[index].pre_landing,
              "takeoffplace":this.takeoffval,
              "landplace":data
          }
          console.log(sendmsg)
           fetch('http://49.233.81.150:9090/api/deleteSchedule', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(sendmsg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        }).then(res => res.json()).then(data=>{
          if(data.status===1){
            this.$message({
            message: '删除成功',
            type: 'success'
          })
           this.refresh()
           this.dialogVisible = false
          }else{
              this.$message.error('插入失败')
          }
        })
        })
        })
       },
       onchange:function(index){
          console.log(index)
          if(this.tableData[index].isdelay!='未起飞'){
              this.$message.error('已起飞航班无法修改！')
          }else{
            this.willchangeindex=index
          this.p1=this.tableData[index].tickctA_price
          this.p2=this.tableData[index].tickctB_price
          this.p3=this.tableData[index].tickctC_price
          this.rs1=this.tableData[index].tickctA_rest
          this.rs2=this.tableData[index].tickctB_rest
          this.rs3=this.tableData[index].tickctC_rest
          this.willtime1=this.tableData[index].pre_takeoff
          this.willtime2=this.tableData[index].pre_landing
          this.upid=this.tableData[index].Pid
          this.ptk=this.tableData[index].pre_takeoff
          this.pl=this.tableData[index].pre_landing
          this.changedialogVisible=true
          }
          
       },
        changesubmit:function(){
           var flag=0;
            if(this.changetime1.length===0||this.changetime1===null){
              var t1=this.willtime1
              var t2=this.willtime2
              this.changetime1={'t1':t1,'t2':t2}
              flag=1;
              }else{
              t1=this.changetime1[0]
              t2=this.changetime1[1]
              this.changetime1={'t1':t1,'t2':t2}
              flag=0;
              }
            if(this.np1==="")this.np1=this.p1
            if(this.np2==="")this.np2=this.p2
            if(this.np3==="")this.np3=this.p3
              if(flag===1&&this.np1===this.p1&&this.np2===this.p2&&this.np3===this.p3){
                this.$message.error("未做更改！")
              console.log("日期无更改"+" "+this.np1+" "+this.np2+" "+this.np3)
            }else{
               console.log(this.changetime1+" "+this.np1+" "+this.np2+" "+this.np3)
              var msg={
                pid:this.upid,
                pretakeoff:this.ptk,
                prelanding:this.pl,
                time1:this.changetime1.t1,
                time2:this.changetime1.t2,
                priceA:this.np1,
                priceB:this.np2,
                priceC:this.np3
              }
              console.log(msg)
                         fetch('http://49.233.81.150:9090/api/updateSchedule', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(msg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
        }).then(res => res.json()).then(data=>{
          if(data.status===1){
            this.$message({
            message: '更新成功',
            type: 'success'
          })
           this.refresh()
          this.changedialogVisible = false
          }else{
              this.$message.error('插入失败')
          }
      })
    } 
  },tableRowClassName({row, rowIndex}) {
      console.log(row)
        if (this.tableData[rowIndex].isdelay!='否'&&this.tableData[rowIndex].isdelay!='未起飞') {
          return 'warning-row';
        } else if (this.tableData[rowIndex].isdelay==='否') {
          return 'success-row';
        }
        return '';
      }
 }
}
</script>

<style>
 .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>