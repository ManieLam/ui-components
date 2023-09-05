export default {
  path: 'other',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'showPDF',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Other/ShowPDF.vue'),
    meta: {
      title: 'PDF在线展示'
      // docName: 'ansoDoubleColumnLayout'
    }
  }, {
    path: 'showOnline',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Other/ShowOnline.vue'),
    meta: {
      title: 'EXCEL, WORD在线展示'
      // docName: 'ansoDoubleColumnLayout'
    }
  }, {
    path: 'lodop',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Other/Lodop.vue'),
    meta: {
      title: '打印'
      // docName: 'ansoDoubleColumnLayout'
    }
  }, {
    path: 'states',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Other/States.vue'),
    meta: {
      title: '状态规则',
      docName: 'ansoStates'
    }
  }, {
    path: 'tinymce',
    component: () => import(/* webpackChunkName: "layout-example" */ '@/views/Other/Tinymce.vue'),
    meta: {
      title: '编辑器'
      // docName: 'ansoStates'
    }
  }],
  title: '其他',
  icon: ''
}
