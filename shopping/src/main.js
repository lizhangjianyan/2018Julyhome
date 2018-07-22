// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './vuex/vuex.js'
import './css/base.css'
import './css/reset.css'
Vue.config.productionTip = false

/* eslint-disable no-new */
let vm=new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
