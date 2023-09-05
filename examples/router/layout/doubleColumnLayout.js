export default {
  path: 'doubleColumnLayout',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'row',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Layout/DoubleColumnLayout/Row.vue'),
    meta: {
      title: '横向显示',
      docName: 'ansoDoubleColumnLayout'
    }
  }, {
    path: 'column',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Layout/DoubleColumnLayout/Column.vue'),
    meta: {
      title: '纵向显示',
      docName: 'ansoDoubleColumnLayout'
    }
  }],
  meta: {
    title: '分栏'
  }
}
