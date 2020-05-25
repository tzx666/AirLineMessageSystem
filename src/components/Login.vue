<template>
<el-container>
  <el-header>Header</el-header>
  <el-main>
    <el-row type="flex" justify="center" >
    <el-col :span="6">
    <el-form ref="form" :model="form" label-width="80px">
  <el-form-item label="用户名">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
  <el-form-item label="密码">
    <el-input v-model="form.password"></el-input>
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
 import Vue from 'vue' 
export default {
    name: 'Login',
    data() {
      return {
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    }, methods: {
      onSubmit() {
        console.log('submit!');
        this.$router.push({path:'/Register'})
      },
      onCancel(){
        Vue.prototype.$islogin=false
this.$router.push({path:'/mainpage'})
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