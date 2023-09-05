export default {
  path: 'button',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Simple.vue'),
    meta: {
      title: '简单按钮',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }, {
    path: 'icon',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Icon.vue'),
    meta: {
      title: '图标按钮',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }, {
    path: 'text',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Text.vue'),
    meta: {
      title: '文字按钮',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }, {
    path: 'badge',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Badge.vue'),
    meta: {
      title: '徽标按钮',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }, {
    path: 'tooltip',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Tooltip.vue'),
    meta: {
      title: '按钮提示',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }, {
    path: 'group',
    component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Button/Group.vue'),
    meta: {
      title: '按钮组',
      icon: 'tool',
      docName: 'ansoButtonGroup'
    }
  }],
  meta: {
    title: '按钮',
    icon: ''
  }
}
