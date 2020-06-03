<template>
<el-container>
  <!-- 999管理员权限，101 签派权限 100 管制权限 -->
  <el-aside width="200px">
      <el-menu
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
       default-active="1"
      @select="handleSelect">
     
      <el-menu-item index="1">
        <i class="el-icon-menu"></i>
        <span slot="title">总览</span>
      </el-menu-item>
      <el-menu-item index="2" v-if="permission==='999'||permission==='101'">
        <i class="el-icon-menu"></i>
        <span slot="title">飞机管理</span>
      </el-menu-item>
      <el-menu-item index="3" v-if="permission==='999'||permission==='101'">
        <i class="el-icon-menu"></i>
        <span slot="title">航点管理</span>
      </el-menu-item>
      <el-menu-item index="4" v-if="permission==='999'||permission==='101'">
        <i class="el-icon-menu"></i>
        <span slot="title">航线管理</span>
      </el-menu-item>
      <el-menu-item index="5" v-if="permission==='999'">
        <i class="el-icon-menu"></i>
        <span slot="title">管理员身份设置</span>
      </el-menu-item>
      <el-menu-item index="6" v-if="permission==='999'||permission==='100'">
        <i class="el-icon-menu"></i>
        <span slot="title">延误管理</span>
      </el-menu-item>
      <el-menu-item index="7" v-if="permission==='999'">
        <i class="el-icon-menu"></i>
        <span slot="title">利润分析</span>
      </el-menu-item>
      <el-menu-item index="8" v-if="permission==='999'">
        <i class="el-icon-menu" ></i>
        <span slot="title">数据备份</span>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="el-icon-menu"></i>
        <span slot="title">退出登录</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
    <el-main v-if="selectMenu[0]==='1'"><MainInfo v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='2'"><PlaneManage v-bind:com="com" /> </el-main>
     <el-main v-else-if="selectMenu[0]==='3'"><StationManage v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='4'"><LineManage v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='5'"><AdstorManage v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='6'"><DelayReport v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='7'"><ProfitAyansis v-bind:com="com"/> </el-main>
     <el-main v-else-if="selectMenu[0]==='8'"><BackUp/> </el-main>
</el-container>
</template>

<script>
import MainInfo from '../mainpages/MainInfo'
import AdstorManage from'../mainpages/AdstorManage'
import BackUp from '../mainpages/BackUp'
import DelayReport from '../mainpages/DelayReport'
import LineManage from '../mainpages/LineManage'
import PlaneManage from '../mainpages/PlaneManage'
import ProfitAyansis from '../mainpages/ProfitAyansis'
import StationManage from '../mainpages/StationManage'
export default {
    name:'mainpage',
    data(){
      return{
        username:'',
        permission:'',
        selectMenu:'1',
        com:''
      }
    },
    created:function(){
      console.log(
      this.$route.query,
      this.$root.islogin)
      this.username=this.$route.query.name
      this.permission=this.$route.query.id
      this.com=this.$route.query.com
      console.log(
      this.$route.query,
      this.$root.islogin,
      this.permission)
    }, methods: {
      handleSelect(key,keyPath){
        this.selectMenu=keyPath
        if(this.selectMenu[0]==='9'){
          console.log('改变了')
          fetch("http://49.233.81.150:9090/api/loginout", {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            })
          }).then(res => res.text()).then(data=>{
            console.log(data)
            if(data === '登出成功'){
              this.$root.islogin=false
               this.$router.push({path:'/Login'})
            }else{
              console.log("退出失败")
            }
          })
          
        }
        console.log(this.selectMenu[0]);
      }
    },components:{
      MainInfo,
      AdstorManage,
      BackUp,
      DelayReport,
      LineManage,
      PlaneManage,
      ProfitAyansis,
      StationManage
    }
}
</script>

<style scoped>
    .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 50px;
  }
  
  body > .el-container {
    margin-bottom: 40px;
  }
  
  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }
  
  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>