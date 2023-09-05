import buttonRouter from './button.js'
import iconRouter from './icon.js'
import linkRouter from './link.js'
export default {
  path: 'usual',
  component: { render: (e) => e('router-view') },
  children: [
    buttonRouter,
    iconRouter,
    linkRouter,
    {
      path: 'message',
      component: () => import(/* webpackChunkName: "form-usual-example" */ '@/views/Usual/Message/index.vue'),
      meta: {
        title: '信息弹窗',
        icon: 'tool'
      }
    }
  ],
  title: '通用',
  icon: ''
}
