export default {
  path: 'upload',
  component: { render: (e) => e('router-view') },
  children: [{
    path: 'simple',
    component: () => import(/* webpackChunkName: "form-upload-example" */ '@/views/FormItem/Upload/Simple.vue'),
    meta: {
      title: '上传组件',
      icon: 'tool',
      docName: 'ansoDataformUpload'
    }
  }],
  meta: {
    title: '上传',
    icon: ''
  }
}
