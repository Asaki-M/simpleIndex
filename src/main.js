import Vue from 'vue'
import App from './App.vue'
import '../public/reset.css'
import './assets/iconfont/iconfont.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
