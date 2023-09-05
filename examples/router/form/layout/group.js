export default {
  path: 'group',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '分组表单'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-group" */ '@/views/Form/Layout/Group/Simple.vue'),
    meta: {
      title: '默认分组表单',
      docName: 'ansoDataformGroup'
    }
  }, {
    path: 'border',
    component: () => import(/* webpackChunkName: "form-group" */ '@/views/Form/Layout/Group/Border.vue'),
    meta: {
      title: '简约式分组表单',
      docName: 'ansoDataformGroup'
    }
  }, {
    path: 'block',
    component: () => import(/* webpackChunkName: "form-group" */ '@/views/Form/Layout/Group/Block.vue'),
    meta: {
      title: '块式分组表单',
      docName: 'ansoDataformGroup'
    }
  }, {
    path: 'complex',
    component: () => import('@/views/Form/Layout/Group/Complex.vue'),
    meta: {
      title: '复杂分组表单',
      docName: 'ansoDataformGroup'
    }
  }]
}
