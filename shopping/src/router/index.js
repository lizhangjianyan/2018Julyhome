import Vue from 'vue'
import Router from 'vue-router'
const index=()=>import ('@/page/index.vue')
const login=()=>import ('@/page/login.vue')
const register=()=>import ('@/page/register.vue')
const cart=()=>import ('@/page/cart.vue')
const productDetail=()=>import ('@/page/product_detail.vue')
// import index from '@/page/index'
// import login from '@/page/login'
// import register from '@/page/register'
// import cart from '@/page/cart'
// import productDetail from '@/page/product_detail.vue'
Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '*',
      redirect:'/'
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/product/:id',
      component: productDetail
  },
  ]
})
