<template>
<el-container>
  <el-main>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <el-image
      style="width: 100px; height: 100px"
      :src="require('@/assets/tower.jpg')"
      ></el-image>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center">
      <el-col :span="6">
        <span>工作人员注册</span>
    <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" >
    <el-col :span="6">
    <el-form ref="form" :model="form" label-width="110px" :label-position="'left'">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
  <el-form-item label="重复密码">
    <el-input v-model="form.repeatpassword" show-password></el-input>
  </el-form-item>
  <el-form-item label="真实姓名">
    <el-input v-model="form.realname"></el-input>
  </el-form-item>
    <el-form-item label="身份">
      <el-select v-model="form.value" placeholder="请选择">
    <el-option label="签派" value="101"></el-option>
      <el-option label="管制" value="100"></el-option>
      <el-option label="管理员" value="999"></el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="选择航司">
       <el-select v-model="form.value1" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
    </el-form-item>
    <el-form-item label="输入航司授权码">
    <el-input v-model="form.hash"></el-input>
  </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">注册</el-button>
    <el-button @click="onCancel">返回</el-button>
  </el-form-item>
</el-form>
</el-col>
  </el-row>
  </el-main>
</el-container>
</template>

<script>
var Web3 = require('web3');
const fetch = require('node-fetch')
export default {
    name:'Register',
    data() {
      return {
        form:{
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value:'',
          password:'',
          hash:'',
          repeatpassword:'',
          value1:'',
          realname:''
        },options:[],//这里是航司列表
      }
    }, methods: {
      onSubmit() {
        console.log('submit!');
        if(this.form.name==""||this.form.password==""||this.form.password!=this.form.repeatpassword
        ||this.form.staff==""||this.form.hash==""){
          this.$message.error('信息填写错误！');return;
        }
        var msg={
          name:this.form.name,
          psw:Web3.utils.sha3(this.form.password),
          staff:this.form.realname,
          com:this.form.value1,
          type:this.form.value,
          hash:this.form.hash
        }
        console.log(msg)
        fetch('http://49.233.81.150:9090/api/Register', {
        method: 'POST',
        body: JSON.stringify(msg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => 
          res.json()
        ).then(data => {
        console.log(data)
        if(data.status==1){
          this.$message({
          message: '恭喜你，注册成功',
          type: 'success'
        });
          this.$router.push({path:'/Login'})
        }else{
          this.$message.error('注册失败！'+data.res);
        }
      }).then(error=>{console.log(error)})
        //this.$global_msg.islogin=true
        this.$router.push({path:'/Login'})
      },
      onCancel(){
       // var res=
       // console.log(res)
        this.$router.push({path:'/Login'})
      }
    },
    created:function (){
      console.log("预备启动")
      fetch("http://49.233.81.150:9090/api/getAllAirlines")
  .then(response => response.json())
  .then(result => {
    let midopt1 = []
        for (let i = 0; i < result.length; i++) {
          midopt1.push({value: result[i].regID, label: result[i].fullName})
        }
  this.options=midopt1
  })
  .catch(error => console.log('error', error));
    }
}
</script>

<style scoped>
.el-main{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>