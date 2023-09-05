export default {
  path: 'compared',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '对比性'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-compared-example" */ '@/views/Form/Compared/Simple.vue'),
    meta: {
      title: '简单对比表单',
      docName: 'ansoDataformCompared'
    }
  }]
}
