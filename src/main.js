// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// axios 配置
import './common/http'

import axios from 'axios'
import VueAxios from 'vue-axios'



Vue.prototype.$http = axios
Vue.use(VueAxios, axios)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
