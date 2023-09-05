export default {
  path: 'summary',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'summaryFont',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Summary/SummaryFont.vue'),
    meta: {
      title: '表尾合计行',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'summaryFontDIY',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Summary/SummaryFontDIY.vue'),
    meta: {
      title: '表尾合计行-自定义',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'summaryBack',
    component: () => import(/* webpackChunkName: "table-row-example" */ '@/views/Table/Row/Summary/SummaryBack.vue'),
    meta: {
      title: '表尾合计行（服务端分页）',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '合计行, 表尾自定义',
    icon: ''
  }
}
