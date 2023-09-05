export default {
  path: 'tree',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'page',
    component: () => import(/* webpackChunkName: "table-tree-example" */ '@/views/Table/Tree/Page.vue'),
    meta: {
      title: '页内加载',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'serve',
    component: () => import(/* webpackChunkName: "table-tree-example" */ '@/views/Table/Tree/Serve.vue'),
    meta: {
      title: '服务端加载',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'load',
    component: () => import(/* webpackChunkName: "table-tree-example" */ '@/views/Table/Tree/Load.vue'),
    meta: {
      title: '懒加载',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'complex',
    component: () => import(/* webpackChunkName: "table-tree-example" */ '@/views/Table/Tree/Complex.vue'),
    meta: {
      title: '综合',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '树状',
    icon: ''
  }
}
