<template>
<div><h1>航点管理</h1>
<el-button type="primary" round @click="dialogTableVisible = true">新建航点</el-button>
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
    <el-dialog title="新增航点" :visible.sync="dialogTableVisible">
  <el-form :model="form">
    <el-form-item label="选择城市" :label-width="formLabelWidth">
      <el-select v-model="value" placeholder="请选择" @change="selectprovice">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
      <el-select v-model="value1" placeholder="请选择" @change="selectcity">
    <el-option
      v-for="item in options1"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="选择机场" :label-width="formLabelWidth" >
      <el-select v-model="value2" placeholder="请选择机场" @change="selectairport">
       <el-option
      v-for="item in options2"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
      </el-select>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogTableVisible = false">取 消</el-button>
    <el-button type="primary" @click="addstation">确 定</el-button>
  </div>
</el-dialog>
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
        beforeCreate: function () {
    console.log('钩子函数被调用了')
    fetch('http://localhost:9090/sqltest1',{
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
    props: ['com'],
     data(){
        return{
          tableData: [],
          dialogTableVisible: false,
          gridData: [],
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        options:[],
        options1:[],
        options2:[],
        value:'',//选择省份
        value1:'',//选择城市
        value2:'',//选择机场
        islegel:''
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
        if(this.islegel==='0'){
          this.$message.error('该航点已存在')
          return 
        }else{
          this.tableData=[]
          fetch('http://localhost:9090/station2', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'code=' + this.value2 + '&com=' + this.com + '&city=' + this.value1
      }).then(res => res.text()).then(data => {
        if (data === '0') {
          this.$message.error('插入失败')
        } else {
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
            message: '插入成功',
            type: 'success'
          })
          this.dialogTableVisible = false
          });
        }})
        }
      },
      selectprovice:function(){
        console.log(this.value)
        this.value1=''
        fetch('http://localhost:9090/sqltest2', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({'pinyin': this.value}),
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
      selectcity:function(){
        this.value2=''
        fetch('http://localhost:9090/airport', {
        method: 'POST',
         credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'city=' + this.value1
      }).then(res => res.json()).then(data => {
        console.log(data)
        let midopt1 = []
        for (let i = 0; i < data.length; i++) {
          midopt1.push({value: data[i].ICAO, label: data[i].name})
        }
        this.options2 = midopt1
      })
      },
      selectairport:function(){
        console.log(this.value2+" "+this.com)
        fetch('http://localhost:9090/station1', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'code=' + this.value2 + '&com=' + this.com
      }).then(res => res.text()).then(data => {
        if (data === '1') {
          this.$message.error('该航点已存在')
          this.islegel='0'
        }
      })
      }
  }
}
</script>

<style scoped>

</style>