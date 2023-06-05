import Vue from 'vue'

import 'normalize.css/normalize.css'// A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN' // lang i18n
import VCharts from 'v-charts'

import '@/styles/index.scss' // global css

import App from './App'
import router from './router'
import store from './store'

import '@/icons' // icon
import '@/permission' // permission control

Vue.use(ElementUI, { locale })
Vue.use(VCharts)

Vue.config.productionTip = false
// 引入时间格式化组件库
import moment from 'moment'
// 定义时间过滤器 date是时间过滤器名称
Vue.filter('date', function (n) {
  const result = moment(n * 1000).format('YYYY-MM-DD hh:mm:ss') // 转换时间格式
  return result // 返回出去 否则不会生效
})
Vue.filter('dateXin', function (n) {
  const result = moment(n * 1000).format('YYYY-MM-DD ') // 转换时间格式
  return result // 返回出去 否则不会生效
})


// new Vue({
//   el: '#app',
//   router,
//   store,
//   template: '<App/>',
//   components: { App }
// })
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
