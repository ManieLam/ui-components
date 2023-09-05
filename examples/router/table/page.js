export default {
  path: 'page',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'fontendPage',
    component: () => import(/* webpackChunkName: "table-page-example" */ '@/views/Table/Page/FontendPage.vue'),
    meta: {
      title: '页内分页',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'backendPage',
    component: () => import(/* webpackChunkName: "table-page-example" */ '@/views/Table/Page/BackendPage.vue'),
    meta: {
      title: '服务端分页',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '分页',
    icon: ''
  }
}
