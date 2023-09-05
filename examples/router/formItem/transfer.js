export default {
  path: 'transfer',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-transfer-example" */ '@/views/FormItem/Transfer/Simple.vue'),
    meta: {
      title: '穿梭框',
      icon: 'tool',
      docName: 'ansoDataformTransfer'
    }
  }],
  meta: {
    title: '穿梭框',
    icon: ''
  }
}
