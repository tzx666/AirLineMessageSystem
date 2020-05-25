import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '../components/Register.vue'
import mainpage from '../components/MainPage.vue'
import Login from '@/components/Login.vue'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
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
    component: mainpage
  }
]

const router = new VueRouter({
  routes
})

export default router
