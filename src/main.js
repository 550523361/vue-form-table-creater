import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//全部引入
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueDND from './directive/vue-dragging'


Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(VueDND);



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


