import columnManagementRouter from './columnManagement.js'
import numRouter from './num.js'
export default {
  path: 'column',
  component: { render: (e) => e('router-view') },
  children: [
    columnManagementRouter,
    numRouter,
    {
      path: 'operation',
      component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/Operation.vue'),
      meta: {
        title: '操作栏',
        docName: 'ansoDataTablePage'
      }
    }, {
      path: 'columnWidth',
      component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/ColumnWidth.vue'),
      meta: {
        title: '列宽度调整',
        docName: 'ansoDataTablePage'
      }
    }, {
      path: 'columnFixed',
      component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/ColumnFixed.vue'),
      meta: {
        title: '冻结列',
        docName: 'ansoDataTablePage'
      }
    }, {
      path: 'columnStyle',
      component: () => import(/* webpackChunkName: "table-column-example" */ '@/views/Table/Column/ColumnStyle.vue'),
      meta: {
        title: '列自定义',
        docName: 'ansoDataTablePage'
      }
    }
  ],
  meta: {
    title: '列',
    icon: ''
  }
}
