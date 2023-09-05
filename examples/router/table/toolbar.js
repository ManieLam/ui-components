export default {
  path: 'tool',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'refresh',
    component: () => import(/* webpackChunkName: "table-tool-example" */ '@/views/Table/Tool/Refresh.vue'),
    meta: {
      title: '刷新',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'download',
    component: () => import(/* webpackChunkName: "table-tool-example" */ '@/views/Table/Tool/Download.vue'),
    meta: {
      title: '下载',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'lineHeightSetter',
    component: () => import(/* webpackChunkName: "table-tool-example" */ '@/views/Table/Tool/LineHeightSetter.vue'),
    meta: {
      title: '行高设置',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'columnFilter',
    component: () => import(/* webpackChunkName: "table-tool-example" */ '@/views/Table/Tool/ColumnFilter.vue'),
    meta: {
      title: '列设置',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '工具栏',
    icon: ''
  }
}
