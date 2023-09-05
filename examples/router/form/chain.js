export default {
  path: 'chain',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '联动'
  },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-chain-example" */ '@/views/Form/Chain/Simple.vue'),
    meta: {
      title: '1对n,n对1联动',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'linkage',
    component: () => import(/* webpackChunkName: "form-chain-example" */ '@/views/Form/Chain/Linkage.vue'),
    meta: {
      title: '链式联动',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'compareLinkage',
    component: () => import(/* webpackChunkName: "form-chain-example" */ '@/views/Form/Chain/CompareLinkage.vue'),
    meta: {
      title: '对比表单字段联动',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'async',
    component: () => import(/* webpackChunkName: "form-chain-example" */ '@/views/Form/Chain/Async.vue'),
    meta: {
      title: '异步',
      docName: 'ansoDataForm'
    }
  }, {
    path: 'cricle',
    component: () => import(/* webpackChunkName: "form-chain-example" */ '@/views/Form/Chain/Cricle.vue'),
    meta: {
      title: '循环',
      docName: 'ansoDataForm'
    }
  }]
}
