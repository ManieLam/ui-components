export default {
  path: 'selection',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'checkbox',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Selection/Checkbox.vue'),
    meta: {
      title: '多选模式',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'rowSelect',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Selection/RowSelect.vue'),
    meta: {
      title: '单选模式',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '行选择',
    icon: ''
  }
}
