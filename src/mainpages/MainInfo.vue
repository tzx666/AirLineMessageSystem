<template>
<div>
<el-row type="flex" justify="space-around">
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
</el-row>
<el-row type="flex" justify="space-around">
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
</el-row>
<el-row type="flex" justify="space-around">
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <span>卡片名称</span>
    <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
  </div>
</el-card>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
    name:'MainInfo'
}
</script>

<style scoped>
.text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
    
    margin-top: 40px;
  }
</style>