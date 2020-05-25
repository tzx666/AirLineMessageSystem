import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import mainpage from '../components/MainPage.vue'
import Login from '@/components/Login.vue'
var global_msg={
  islogin:false
}
Vue.prototype.$global_msg = global_msg
Vue.use(VueRouter)

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
router.beforeEach((to, from, next) => {
  console.log(Vue.prototype.$global_msg.islogin)
  //let token = false;
  if(to.path==from.path){next('/Login');return}
  if(to.meta.requireAuth&&!Vue.prototype.$global_msg.islogin){next('/Login');return}
  next();
});
export default router
