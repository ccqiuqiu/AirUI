import Vue from 'vue'
import App from './App'
import router from './router'
import demoBlock from './components/demo-block.vue'
import AirUI from '../lib/index'
import '../lib/css/index.css'

Vue.component('demo-block', demoBlock)
Vue.use(AirUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
