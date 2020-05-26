import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import mainpage from '../components/MainPage.vue'
import Login from '@/components/Login.vue'
console.log('indes调用')
Vue.use(VueRouter)
Vue.use(require('vue-cookies'))
  const routes = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/Register',
    name: 'Register',
    component: Register
  },{
    path: '/mainpage',
    name: 'mainpage',
    component: mainpage,
    meta : {                      //加一个自定义obj
      requireAuth:true      //这个参数 true 代表需要登录才能进入A
  }
  }
]

const router = new VueRouter({
  routes
})
router.beforeEach(function(to, from, next) {
  console.log(from.path+" "+to.path)
  fetch("http://localhost:9090/isLogin", {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(res => res.text()).then(data => {
    console.log(data)
    /*if(from.path===to.pahth){
      next();return
    }
    //let token = false;*/
    if('/'===to.path){next('/Login');return}
    if(to.meta.requireAuth&&data==='0'){next('/Login');return}
    next();
  }).then(error=>console.log(error))
});
export default router
