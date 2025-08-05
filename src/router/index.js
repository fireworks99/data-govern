import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 子路由路径如果以 / 开头，会被认为是绝对路径，Vue Router 会忽略父路径。

const routes = [
  {
    path: '',
    component: () => import('@/views/Home.vue'),
    meta: { title: '首页', icon: "el-icon-s-home", },
    children: [
      {
        path: '',
        component: () => import('@/views/DefaultPage.vue'),
        meta: { title: '', icon: "el-icon-s-home" },
      },
    ]
  },
  {
    path: '/govern',
    component: () => import('@/views/Home.vue'),
    meta: { title: '数据治理分系统', icon: "el-icon-s-tools", },
    children: [
      {
        path: 'data-govern',
        component: () => import('@/views/govern/DataGovern.vue'),
        meta: { title: '数据治理', icon: "el-icon-setting" },
      },
      {
        path: 'data-query',
        component: () => import('@/views/govern/DataQuery.vue'),
        meta: { title: '数据查询', icon: "el-icon-search" },
      },
      {
        path: 'govern-status',
        component: () => import('@/views/govern/GovernStatus.vue'),
        meta: { title: '治理状态', icon: "el-icon-orange" },
      },
      {
        path: 'algo-manage',
        component: () => import('@/views/govern/AlgoManage.vue'),
        meta: { title: '算法管理', icon: "el-icon-coin" },
      },
    ]
  },
  {
    path: '/service',
    component: () => import('@/views/Home.vue'),
    meta: { title: '数据服务分系统', icon: "el-icon-s-platform" },
    children: [
      {
        path: 'union-search',
        component: () => import('@/views/service/UnionSearch.vue'),
        meta: { title: '联合搜索', icon: "el-icon-search" },
      },
      {
        path: 'knowledge-dig',
        component: () => import('@/views/service/KnowDig.vue'),
        meta: { title: '知识挖掘', icon: "el-icon-tickets" },
      },
      {
        path: 'data-apply',
        component: () => import('@/views/service/DataApply.vue'),
        meta: { title: '数据申领', icon: "el-icon-unlock" },
      },
    ]
  }
]

export { routes }

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
