export default {
  path: 'label',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '文本标签，辅助'
  },
  children: [{
    path: 'label',
    component: () => import(/* webpackChunkName: "form-label-example" */ '@/views/Form/Label/Label.vue'),
    meta: {
      title: '文本标签与表单',
      docName: 'ansoDataForm'
    }
  }]
}
