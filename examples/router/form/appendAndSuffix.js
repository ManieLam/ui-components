export default {
  path: 'appendAndSuffix',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '前置、后置、自定义'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-appendAndSuffix-example" */ '@/views/Form/AppendAndSuffix/Simple.vue'),
    meta: {
      title: '基础表单插槽使用',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'group',
    component: () => import(/* webpackChunkName: "form-appendAndSuffix-example" */ '@/views/Form/AppendAndSuffix/Group.vue'),
    meta: {
      title: '表单分组插槽使用',
      docName: 'ansoDataformGroup'
    }
  // }, {
  //   path: 'slotPanel',
  //   component: () => import(/* webpackChunkName: "form-appendAndSuffix-example" */ '@/views/Form/AppendAndSuffix/SlotPanel.vue'),
  //   meta: {
  //     title: '插槽嵌套',
  //     docName: 'ansoDataForm'
  //   }
  }]
}
