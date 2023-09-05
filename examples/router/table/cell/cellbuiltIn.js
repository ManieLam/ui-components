export default {
  path: 'cellbuiltIn',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'internalRender',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/CellbuiltIn/InternalRender.vue'),
    meta: {
      title: '内置渲染表格',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'emptyText',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/CellbuiltIn/EmptyText.vue'),
    meta: {
      title: '表格为空时提示',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'internalLink',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/CellbuiltIn/InternalLink.vue'),
    meta: {
      title: '点击表格内容跳转',
      docName: 'ansoDataTablePage'
    },
    hidden: true
  }, {
    path: 'externalLink',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/CellbuiltIn/ExternalLink.vue'),
    meta: {
      title: '点击表格内容打开外部连接',
      docName: 'ansoDataTablePage'
    },
    hidden: true
  }],
  meta: {
    title: '内置，数据映射',
    icon: ''
  }
}
