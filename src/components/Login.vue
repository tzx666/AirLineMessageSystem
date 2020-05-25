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
    <el-input v-model="form.password"></el-input>
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
        console.log('submit!');
        this.$global_msg.islogin=true
        this.$router.push({path:'/mainpage'})
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