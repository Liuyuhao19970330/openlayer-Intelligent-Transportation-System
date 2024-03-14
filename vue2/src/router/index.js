import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/login.vue'
import Register from '../components/register.vue'
import NotFound from '../components/NotFound.vue'
import Map from '../components/map.vue'
import Delete from '../components/delete.vue'


Vue.use(VueRouter)
//可以换成嵌套路由
const routes = [
  {
    path: '/api/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/api/register',
    name: 'LoRegister',
    component: Register
  },
  { path: '*', component: () => import('../components/NotFound.vue') },
  {
    path: '/api/map',
    name: 'Map',
    component: Map
  },
  {
    path: '/api/delete',
    name: 'Delete',
    component: Delete
  },
  
  
]

const router = new VueRouter({
  routes
})

export default router
