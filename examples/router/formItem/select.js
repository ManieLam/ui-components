import cascaderRouter from './cascader.js'
export default {
  path: 'select',
  component: { render: (e) => e('router-view') },
  children: [cascaderRouter, {
    path: 'Radio',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Radio.vue'),
    meta: {
      title: '单选',
      icon: 'tool',
      docName: 'ansoDataformRadio'
    }
  }, {
    path: 'Checkbox',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Checkbox.vue'),
    meta: {
      title: '多选',
      icon: 'tool',
      docName: 'ansoDataformCheckbox'
    }
  }, {
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Simple.vue'),
    meta: {
      title: '下拉选择',
      icon: 'tool',
      docName: 'ansoDataformSelect'
    }
  }, {
    path: 'Switch',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Switch.vue'),
    meta: {
      title: '开关选择',
      icon: 'tool',
      docName: 'ansoDataformSwitch'
    }
  }, {
    path: 'Time',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Time.vue'),
    meta: {
      title: '时间选择',
      icon: 'tool',
      docName: 'ansoDataformTime'
    }
  }, {
    path: 'Date',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Date.vue'),
    meta: {
      title: '日期选择',
      icon: 'tool',
      docName: 'ansoDataformDate'
    }
  }, {
    path: 'TimeRange',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/TimeRange.vue'),
    meta: {
      title: '时间范围选择',
      icon: 'tool',
      docName: 'ansoDataformTimeRange'
    }
  }, {
    path: 'Tree',
    component: () => import(/* webpackChunkName: "form-select-example" */ '@/views/FormItem/Select/Tree.vue'),
    meta: {
      title: '树形选择',
      icon: 'tool',
      docName: 'ansoDataformTree'
    }
  }],
  meta: {
    title: '选择器',
    icon: ''
  }
}
