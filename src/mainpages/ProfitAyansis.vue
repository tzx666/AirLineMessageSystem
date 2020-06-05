<template>
<div>
    <h1>资产情况</h1>
    <span>今日：{{profit}}</span>
</div>
</template>

<script>
export default {
    name:'ProfitAyansis',
    data(){
        return{
            profit:''
        }
    },
    created:function(){
        fetch("http://49.233.81.150:9090/api/ticketnum", {
            method: 'GET',
            credentials: 'include',
            headers: new Headers({
              'Content-Type': 'application/json'
            }),
          }).then(res=>res.text()).then(
              data=>this.profit=data
          )
    }
}
</script>

<style scoped>

</style>