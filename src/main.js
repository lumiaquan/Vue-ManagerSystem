import Vue from 'vue'
import App from './App.vue'
import router from './router'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import axios from 'axios'

import VueAxios from 'vue-axios'
Vue.use(VueAxios, axios)
import qs from 'querystring'
import api from './api/api'

Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.$qs = qs
Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
