// import basicRouter from './basic.js'
import filterRouter from './filter.js'
import serverRouter from './server.js'
// import expandRouter from './expand.js'
// import toolRouter from './tool.js'
import bigDataRouter from './bigData.js'
import treeRouter from './tree.js'

import columnRouter from './column'
import rowRouter from './row'
import cellRouter from './cell'
import tableHeaderRouter from './tableHeader.js'
import pageRouter from './page.js'
import sortRouter from './sort.js'
import customRouter from './custom.js'
import toolbarRouter from './toolbar.js'

export default {
  path: 'table',
  component: { render: (e) => e('router-view') },
  children: [
    {
      path: 'styleTable',
      component: () => import(/* webpackChunkName: "table-simple-example" */ '@/views/Table/StyleTable.vue'),
      meta: {
        title: '设计稿表格',
        docName: 'ansoDataTablePage'
      }
    },
    {
      path: 'complex',
      component: () => import(/* webpackChunkName: "table-complex-example" */ '@/views/Table/Complex.vue'),
      meta: {
        title: '综合表格',
        docName: 'ansoDataTablePage'
      }
    },
    {
      path: 'simple',
      component: () => import(/* webpackChunkName: "table-simple-example" */ '@/views/Table/Simple.vue'),
      meta: {
        title: '基础简单',
        docName: 'ansoDataTablePage'
      }
    },
    serverRouter,
    columnRouter,
    rowRouter,
    cellRouter,
    tableHeaderRouter,
    pageRouter,
    sortRouter,
    filterRouter,
    toolbarRouter,
    treeRouter,
    customRouter,
    bigDataRouter
  ],
  title: '表格',
  icon: ''
}
