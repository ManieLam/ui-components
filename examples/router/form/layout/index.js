
import groupRouter from './group.js'
export default {
  path: 'layout',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '布局'
  },
  children: [{
    path: 'default',
    component: () => import(/* webpackChunkName: "form-layout-example" */ '@/views/Form/Layout/Default.vue'),
    meta: {
      title: '基础默认',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'inline',
    component: () => import(/* webpackChunkName: "form-layout-example" */ '@/views/Form/Layout/Inline.vue'),
    meta: {
      title: '内联式',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'grid',
    component: () => import(/* webpackChunkName: "form-layout-example" */ '@/views/Form/Layout/Grid.vue'),
    meta: {
      title: '网格式',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'row',
    component: () => import(/* webpackChunkName: "form-layout-example" */ '@/views/Form/Layout/Row.vue'),
    meta: {
      title: '栅格式',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'drawer',
    component: () => import(/* webpackChunkName: "form-layout-example" */ '@/views/Form/Layout/Drawer.vue'),
    meta: {
      title: '侧拉式',
      docName: 'ansoDataForm'
    }
  },
  groupRouter
  ]
}
