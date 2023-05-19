import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  { path: '/sublet', component: () => import('@/views/sublet/index'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  }
]

export const asyncRouterMap = [
  {
    path: '/ywgl',
    component: Layout,
    redirect: '/ywgl/robot',
    name: 'ywgl',
    meta: { title: '业务管理', icon: 'product' },
    children: [
      {
        path: 'robot',
        name: 'robot',
        component: () => import('@/views/ywgl/robot/index'),
        meta: { title: '机器人列表', icon: 'product-list' }
      },
      {
        path: 'customer',
        name: 'customer',
        component: () => import('@/views/ywgl/customer/index'),
        meta: { title: '客服列表', icon: 'product-list' }
      },
      {
        path: 'supplier',
        name: 'supplier',
        component: () => import('@/views/ywgl/supplier/index'),
        meta: { title: '供应商列表', icon: 'product-list' }
      },
      {
        path: 'supplierAdd',
        name: 'supplierAdd',
        component: () => import('@/views/ywgl/supplier/add'),
        meta: { title: '供应商添加' },
        hidden: true
      },
      {
        path: 'supplierEdit',
        name: 'supplierEdit',
        component: () => import('@/views/ywgl/supplier/edit'),
        meta: { title: '供应商修改' },
        hidden: true
      },
      {
        path: 'freeze',
        name: 'freeze',
        component: () => import('@/views/ywgl/supplier/freeze'),
        meta: { title: '供应商修改' },
        hidden: true
      },
    ]
  },
  {
    path: '/caigou',
    component: Layout,
    redirect: '/caigou/member',
    name: 'caigou',
    meta: { title: '采购管理', icon: 'user' },
    children: [
      {
        path: 'member',
        name: 'member',
        component: () => import('@/views/caigou/member/index'),
        meta: { title: '会员列表', icon: 'product-list' }
      },
      {
        path: 'memberAdd',
        name: 'memberAdd',
        component: () => import('@/views/caigou/member/add'),
        meta: { title: '会员增加' },
        hidden: true
      },
      {
        path: 'memberEdit',
        name: 'memberEdit',
        component: () => import('@/views/caigou/member/edit'),
        meta: { title: '会员修改' },
        hidden: true
      },
      {
        path: 'membertop',
        name: 'membertop',
        component: () => import('@/views/caigou/member/top_score'),
        meta: { title: '上分' },
        hidden: true
      },
      {
        path: 'order',
        name: 'order',
        component: () => import('@/views/caigou/order/index'),
        meta: { title: '委托订单', icon: 'product-list' }
      },
      {
        path: 'recharge',
        name: 'recharge',
        component: () => import('@/views/caigou/recharge/index'),
        meta: { title: '充值记录', icon: 'product-list' }
      },
      {
        path: 'withdraw',
        name: 'withdraw',
        component: () => import('@/views/caigou/withdraw/index'),
        meta: { title: '提款记录', icon: 'product-list' }
      },
      {
        path: 'query',
        name: 'query',
        component: () => import('@/views/caigou/query/index'),
        meta: { title: '地址查询', icon: 'product-list' }
      },
      {
        path: 'change',
        name: 'change',
        component: () => import('@/views/caigou/change/index'),
        meta: { title: '账变记录', icon: 'product-list' }
      },
    ]
  },
  {
    path: '/canshu',
    component: Layout,
    redirect: '/canshu/setting',
    name: 'canshu',
    meta: { title: '参数管理', icon: 'marker' },
    children: [
      {
        path: 'setting',
        name: 'setting',
        component: () => import('@/views/canshu/setting/index'),
        meta: { title: '网站参数', icon: 'product-list' }
      },
      {
        path: 'banned',
        name: 'banned',
        component: () => import('@/views/canshu/banned/index'),
        meta: { title: '国家黑名单', icon: 'product-list' }
      },
      {
        path: 'address',
        name: 'address',
        component: () => import('@/views/canshu/address/index'),
        meta: { title: '收款地址', icon: 'product-list' }
      },
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

