import Vue from 'vue'
import App from './App.vue'
import store from './store'

// 导入ant-design-vue 组件库
import Antd from 'ant-design-vue'
// 导入组件库的样式表
import 'ant-design-vue/dist/antd.css'
// 安装组件库
Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
  store,
  render: (h) => h(App)
}).$mount('#app')
