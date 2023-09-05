export default {
  path: 'input',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-input-example" */ '@/views/FormItem/Input/Simple.vue'),
    meta: {
      title: '文本输入',
      icon: 'tool',
      docName: 'ansoDataformInput'
    }
  }, {
    path: 'textarea',
    component: () => import(/* webpackChunkName: "form-input-example" */ '@/views/FormItem/Input/Textarea.vue'),
    meta: {
      title: '多行文本输入',
      icon: 'tool',
      docName: 'ansoDataformInput'
    }
  }, {
    path: 'stringRande',
    component: () => import(/* webpackChunkName: "form-input-example" */ '@/views/FormItem/Input/StringRande.vue'),
    meta: {
      title: '字符串范围输入框',
      icon: 'tool',
      docName: 'ansoDataformTextRange'
    }
  }, {
    path: 'number',
    component: () => import(/* webpackChunkName: "form-input-example" */ '@/views/FormItem/Input/Number.vue'),
    meta: {
      title: '数字输入',
      icon: 'tool',
      docName: 'ansoDataformNumber'
    }
  }, {
    path: 'numRange',
    component: () => import(/* webpackChunkName: "form-input-example" */ '@/views/FormItem/Input/NumRange.vue'),
    meta: {
      title: '数字范围输入',
      icon: 'tool',
      docName: 'ansoDataformNumRange'
    }
  }],
  meta: {
    title: '输入',
    icon: ''
  }
}
