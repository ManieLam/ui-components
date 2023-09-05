export default {
  path: 'custom',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'top',
    component: () => import(/* webpackChunkName: "table-custom-example" */ '@/views/Table/Custom/Top.vue'),
    meta: {
      title: '自定义表格顶部',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'bottom',
    component: () => import(/* webpackChunkName: "table-custom-example" */ '@/views/Table/Custom/Bottom.vue'),
    meta: {
      title: '自定义表格底部',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'filter',
    component: () => import(/* webpackChunkName: "table-custom-example" */ '@/views/Table/Custom/Filter.vue'),
    meta: {
      title: '自定义过滤器',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '自定义',
    icon: ''
  }
}
