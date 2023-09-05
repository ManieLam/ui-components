export default {
  path: 'num',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'columnNumBack',
    component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/Num/ColumnNumBack.vue'),
    meta: {
      title: '序号列（服务端分页时连续）(todo)',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'columnNumFont',
    component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/Num/ColumnNumFont.vue'),
    meta: {
      title: '序号列（页内分页时连续）',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '序号列',
    icon: ''
  }
}
