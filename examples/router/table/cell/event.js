export default {
  path: 'event',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'click',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/Event/Click.vue'),
    meta: {
      title: '单元格单击',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'dbclick',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/Event/Dbclick.vue'),
    meta: {
      title: '单元格双击',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '事件',
    icon: ''
  }
}
