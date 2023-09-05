export default {
  path: 'filter',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'multi',
    component: () => import(/* webpackChunkName: "table-filter-example" */ '@/views/Table/Filter/Multi.vue'),
    meta: {
      title: '多行过滤器表格',
      icon: 'tool',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'filterType',
    component: () => import(/* webpackChunkName: "table-filter-example" */ '@/views/Table/Filter/FilterType.vue'),
    meta: {
      title: '过滤类型参考',
      icon: 'tool',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'all',
    component: () => import(/* webpackChunkName: "table-filter-example" */ '@/views/Table/Filter/All.vue'),
    meta: {
      title: '选择器加全选的过滤器表格(todo)',
      icon: 'tool'
    }
  }, {
    path: 'options',
    component: () => import(/* webpackChunkName: "table-filter-example" */ '@/views/Table/Filter/Options.vue'),
    meta: {
      title: '选择项与匹配项的options不同(todo)',
      icon: 'tool'
    }
  }],
  meta: {
    title: '过滤器',
    icon: ''
  }
}
