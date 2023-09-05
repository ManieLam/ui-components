export default {
  path: 'diyCell',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'DIYrender',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/DiyCell/DIYrender.vue'),
    meta: {
      title: '自定义渲染表格',
      docName: 'ansoDataTablePage'
    }
  }, {
    path: 'cellStyle',
    component: () => import(/* webpackChunkName: "table-cell-example" */ '@/views/Table/Basic/DiyCell/CellStyle.vue'),
    meta: {
      title: '单元格自定义样式',
      docName: 'ansoDataTablePage'
    }
  }],
  meta: {
    title: '插槽, 自定义',
    icon: ''
  }
}
