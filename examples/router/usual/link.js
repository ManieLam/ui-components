export default {
  path: 'link',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Link/Simple.vue'),
    meta: {
      title: '超链接',
      icon: 'tool',
      docName: 'ansoLink'
    }
  }],
  meta: {
    title: '超链接',
    icon: ''
  }
}
