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
    <el-input v-model="form.password"></el-input>
  </el-form-item>
  <el-form-item label="重复密码">
    <el-input v-model="form.repeatpassword"></el-input>
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
          value1:''
        },options:[],//这里是航司列表
      }
    }, methods: {
      onSubmit() {
        console.log('submit!');
        this.$global_msg.islogin=true
        this.$router.push({path:'/Login'})
      },
      onCancel(){
        var res=Web3.utils.sha3('123456')
        console.log(res)
        this.$router.push({path:'/Login'})
      }
    },
    created:function (){
      console.log("预备启动")
      fetch("http://localhost:9090/api/getAllAirlines")
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