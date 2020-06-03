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
        <span>民航后台管理系统</span>
    <el-divider></el-divider>
      </el-col>
    </el-row>
    <el-row type="flex" justify="center" >
    <el-col :span="6">
    <el-form ref="form" :model="form" label-width="80px" :label-position="'left'">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password" show-password></el-input>
  </el-form-item>
    <el-form-item label="身份">
      <el-select v-model="form.value" placeholder="请选择">
    <el-option label="签派" value="101"></el-option>
      <el-option label="管制" value="100"></el-option>
      <el-option label="管理员" value="999"></el-option>
  </el-select>
    </el-form-item>
    <el-form-item>
    <el-button type="primary" @click="onSubmit">登录</el-button>
    <el-button @click="onCancel">注册</el-button>
  </el-form-item>
</el-form>
</el-col>
  </el-row>
  </el-main>
</el-container>
  
</template>

<script>
var Web3 = require('web3');
 //import Vue from 'vue' 
export default {
    name: 'Login',
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          value:'',
        }
      }
    }, methods: {
      onSubmit() {
        if(this.form.name==""||this.form.password==""){
          this.$message.error('请输入用户名和密码');return;
        }
        var res=Web3.utils.sha3(this.form.password)
        var self=this
        console.log(res)
        var sendmsg={"name":this.form.name,"password":res,"type":this.form.value}
        console.log(sendmsg)
        fetch('http://49.233.81.150:9090/api/Login', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(sendmsg),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      }).then(res => 
          res.json()
        ).then(data => {
        console.log(data)
        if(data.status==1){
         self.$root.islogin=true
          this.$router.push({path:'/mainpage',
             query: {
              name: this.form.name,
               id: this.form.value,
              com:data.com
        }})
        }else{
          this.$message.error('密码错误或无权限访问！');
        }
      })
        //
      },
      onCancel(){
        this.$router.push({path:'/Register'})
      }
    }
}
</script>

<style scoped>
  /* html,body,#app,.el-container,.el-main {
    padding: 0px;
    margin: 0px;
    height: 100%;
  } */
  .el-main{
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
  }
</style>