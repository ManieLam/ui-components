export default {
  path: 'validate',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '校验'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-validate-example" */ '@/views/Form/Validate/Simple.vue'),
    meta: {
      title: '基础',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'setting',
    component: () => import(/* webpackChunkName: "form-validate-example" */ '@/views/Form/Validate/Setting.vue'),
    meta: {
      title: '内置正则规则',
      docName: 'ansoDataForm'
    }
  }
  // {
  //   path: 'mutil',
  //   component: () => import(/* webpackChunkName: "form-validate-simple" */ '@/views/Form/Validate/Simple.vue'),
  //   meta: {
  //     title: '验证多个表单(todo)',
  //     docName: 'ansoDataForm'
  //   }
  // }
  ]
}
