import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
Vue.config.productionTip = false

new Vue({
  router,
  data: function(){
    return {
      islogin:false
    }
},
  store,
  render: h => h(App)
}).$mount('#app')
