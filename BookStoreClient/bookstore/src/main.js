// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/font_aefw5kjfppq/iconfont.css"
import axios from "axios"
import VueAxios from "vue-axios"
import $ from 'jquery'

Vue.config.productionTip = false
Vue.use(ElementUi)
Vue.use(VueAxios,axios)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
