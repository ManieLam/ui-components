
export default {
  path: 'show',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '纯展示/禁用'
  },
  children: [{
    path: 'text',
    component: () => import(/* webpackChunkName: "form-show-example" */ '@/views/Form/Show/Text.vue'),
    meta: {
      title: '基础默认',
      icon: 'tool',
      docName: 'ansoDataformText'
    }
  }, {
    path: 'group',
    component: () => import(/* webpackChunkName: "form-show-example" */ '@/views/Form/Show/Group.vue'),
    meta: {
      title: '综合',
      docName: 'ansoDataForm'
    }
  }]
}
