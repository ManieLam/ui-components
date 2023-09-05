export default {
  path: 'other',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'bigData',
    component: () => import(/* webpackChunkName: "table-bigData-example" */ '@/views/Table/Other/BigData.vue'),
    meta: {
      title: '虚拟模式滚动',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'bigTable',
    component: () => import(/* webpackChunkName: "table-bigData-example" */ '@/views/Table/Other/BigTable.vue'),
    meta: {
      title: '大数据表格',
      docName: 'ansoBigDatatable'
    }
  }, {
    path: 'bigTableAndChart',
    component: () => import(/* webpackChunkName: "table-bigData-example" */ '@/views/Table/Other/BigTableAndChart.vue'),
    meta: {
      title: '表格联动图表',
      docName: 'ansoBigDatatable'
    }
  }],
  meta: {
    title: '大数据',
    icon: ''
  }
}
