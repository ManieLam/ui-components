export default {
  path: 'event',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '事件'
  },
  children: [{
    path: 'reset',
    component: () => import(/* webpackChunkName: "form-event-example" */ '@/views/Form/Event/Reset.vue'),
    meta: {
      title: '重置',
      docName: 'ansoDataForm'
    }
  }]
}
