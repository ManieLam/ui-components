export default {
  path: 'columnManagement',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'columnManagement',
    component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/ColumnManagement/ColumnManagement.vue'),
    meta: {
      title: '列管理器（隐藏、排序、悬浮）',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'hideColumn',
    component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/ColumnManagement/HideColumn.vue'),
    meta: {
      title: '列过滤器表格',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '列过滤器',
    icon: ''
  }
}
