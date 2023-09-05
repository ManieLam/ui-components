export default {
  path: 'icon',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '图标库',
    docName: 'ansoDataTablePage'
  },
  children: [{
    path: 'colorfulIcon',
    component: () => import(/* webpackChunkName: "table-usual-example" */ '@/views/Usual/Icon/ColorfulIcon.vue'),
    meta: {
      title: '多色icon',
      docName: 'ansoDataTablePage'
    }
  }]
}
