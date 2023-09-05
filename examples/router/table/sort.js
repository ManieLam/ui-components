export default {
  path: 'sort',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'defaultSort',
    component: () => import(/* webpackChunkName: "table-sort-example" */ '@/views/Table/Sort/DefaultSort.vue'),
    meta: {
      title: '指定默认列',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'multiSort',
    component: () => import(/* webpackChunkName: "table-sort-example" */ '@/views/Table/Sort/MultiSort.vue'),
    meta: {
      title: '多列',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '排序',
    icon: ''
  }
}
