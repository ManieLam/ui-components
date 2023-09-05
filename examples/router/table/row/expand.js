export default {
  path: 'expand',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Expand/Simple.vue'),
    meta: {
      title: '行扩展表格',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'click',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Expand/Click.vue'),
    meta: {
      title: '按钮点击展开',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '行扩展',
    icon: ''
  }
}
