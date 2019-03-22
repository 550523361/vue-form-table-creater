import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
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
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
        path: '/commonModule/:moduleName/:param1?/:param2?/:param3?/:param4?/:param5?',
        name: "templateModuleManagerList",
        component: templateModuleManagerList,
    },
  ]
})
