import expandRouter from './expand.js'
import selectionRouter from './selection.js'
import summaryRouter from './summary.js'
export default {
  path: 'row',
  component: { render: (e) => e('router-view') },
  children: [
    expandRouter,
    selectionRouter,
    summaryRouter,
    {
      path: 'innerTable',
      component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/InnerTable.vue'),
      meta: {
        title: '行嵌套自定义',
        docName: 'ansoDataTablePage'
      }
    }, {
      path: 'rowStyle',
      component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/RowStyle.vue'),
      meta: {
        title: '行自定义',
        docName: 'ansoDataTablePage'
      }
    }
  ],
  meta: {
    title: '行',
    icon: ''
  }
}
