import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import { routeDataFormat } from '@/utils/routeDataFormat.js'

import layoutRouter from './layout'
import usualRouter from './usual'
import formItemRouter from './formItem'
import formRouter from './form'
import tableRouter from './table'
import otherRouter from './other'

Vue.use(Router)

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "appFrame" */ '@/views/App/AppFrame'),
      children: [
        {
          path: 'index',
          name: 'index',
          component: () => import('@/views/Home'),
          meta: {
            title: '快速使用',
            icon: 'el-icon-s-opportunity'
          }
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('@/views/About'),
          meta: {
            title: '快速使用(组件库开发者)',
            icon: 'el-icon-s-opportunity'
          },
          hidden: true
        },
        layoutRouter,
        usualRouter,
        formItemRouter,
        formRouter,
        tableRouter,
        otherRouter,
        {
          path: '*',
          hidden: true,
          component: () => import('@/views/Help/404')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.fullPath === '/') {
    next({ path: 'index' })
  } else {
    const routeData = routeDataFormat(from)
    store.commit('tagsView/ADD_LAST_VISITED_VIEW', routeData)
    next()
  }
})

export default router
