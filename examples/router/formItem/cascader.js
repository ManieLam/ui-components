export default {
  path: 'cascader',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '级联选择'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-cascader-example" */ '@/views/FormItem/Select/Cascader/Simple.vue'),
    meta: {
      title: '简单级联选择器',
      docName: 'ansoDataformCascader'
    }
  }, {
    path: 'panel',
    component: () => import(/* webpackChunkName: "form-cascader-example" */ '@/views/FormItem/Select/Cascader/Panel.vue'),
    meta: {
      title: '级联选择器面板',
      docName: 'ansoDataformCascader'
    }
  }]
}
