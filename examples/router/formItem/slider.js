export default {
  path: 'slider',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-slider-example" */ '@/views/FormItem/Slider/Simple.vue'),
    meta: {
      title: '滑块选项',
      icon: 'tool',
      docName: 'ansoDataformSlider'
    }
  }],
  meta: {
    title: '滑块',
    icon: ''
  }
}
