export default {
  path: 'server',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'severConfig',
    component: () => import(/* webpackChunkName: "table-server-example" */ '@/views/Table/Server/SeverConfig.vue'),
    meta: {
      title: '服务器通讯配置',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'allData',
    component: () => import(/* webpackChunkName: "table-server-example" */ '@/views/Table/Server/AllData.vue'),
    meta: {
      title: '请求全部数据',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'someData',
    component: () => import(/* webpackChunkName: "table-server-example" */ '@/views/Table/Server/SomeData.vue'),
    meta: {
      title: '数据重载',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '服务器通讯',
    icon: ''
  }
}
