import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Show from './views/Show.vue'
import movedNumber from './views/movedNumber/index.vue'
import CompanyView from './views/baseInfo/index.vue'

/*功能模块模板*/
import templateModuleManagerList from './views/templateModuleManager/list/index';
Vue.use(Router)
/* eslint-disable */
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/company',
      name: 'CompanyView',
      component: CompanyView
    },
    {
        path: '/commonModule/:moduleName/:param1?/:param2?/:param3?/:param4?/:param5?',
        name: "templateModuleManagerList",
        component: templateModuleManagerList,
    },
    {
      path:'/number/:sum?',
      name:'number',
      component:Show
    },
    {
      path:'/box/:sum?',
      name:'movedNumber',
      component:movedNumber
    }
  ]
})
