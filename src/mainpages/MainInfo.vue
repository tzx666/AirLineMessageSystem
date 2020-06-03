<template>
<div>
<el-row type="flex" justify="space-around">
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <b>飞机总数:</b>
    {{planeTotal}}
  </div>
</el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <b>航站总数:</b>
    {{stationTotal}}
  </div>
</el-card>
  </el-col>
</el-row>
<el-row type="flex" justify="space-around">
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
    <b>航线总数:</b>
      {{LineTotal}}
  </div>
</el-card>
  </el-col>
  <el-col :span="8">
      <el-card class="box-card">
  <div slot="header" class="clearfix">
      <b>延误总量:</b>
      {{DelayTotal}}
  </div>
</el-card>
  </el-col>
</el-row>
</div>
</template>

<script>
export default {
    name:'MainInfo',
    created:function(){
        console.log(this.com)
        fetch("http://49.233.81.150:9090/api/maininfo?com="+this.com, {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.json()).then(data=>{
            console.log(data)
            this.planeTotal=data.plane
            this.stationTotal=data.station
            this.LineTotal=data.schedule
            this.DelayTotal=data.delay
          })
    },
    data(){
      return{
        planeTotal:'0',
        stationTotal:'0',
        LineTotal:'0',
        DelayTotal:'0'
      }
    }, methods:{

    },props: ['com']
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
    height: 200px;
    margin-top: 40px;
  }
</style>