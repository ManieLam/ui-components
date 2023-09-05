export default {
  path: 'tableHeader',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'multiHeader',
    component: () => import(/* webpackChunkName: "table-tableHeader-example" */ '@/views/Table/TableHeader/MultiHeader.vue'),
    meta: {
      title: '多级表头',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '表头',
    icon: ''
  }
}
