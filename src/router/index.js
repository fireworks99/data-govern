import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Home.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/DefaultPage.vue'),
      },
      {
        path: '/govern/data-govern',
        component: () => import('@/views/govern/DataGovern.vue'),
      },
      {
        path: '/govern/data-query',
        component: () => import('@/views/govern/DataQuery.vue'),
      },
      {
        path: '/govern/govern-status',
        component: () => import('@/views/govern/GovernStatus.vue'),
      },
      {
        path: '/govern/algo-manage',
        component: () => import('@/views/govern/AlgoManage.vue'),
      },
      {
        path: '/service/union-search',
        component: () => import('@/views/service/UnionSearch.vue'),
      },
      {
        path: '/service/knowledge-dig',
        component: () => import('@/views/service/KnowDig.vue'),
      },
      {
        path: '/service/data-apply',
        component: () => import('@/views/service/DataApply.vue'),
      },
    ]
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
