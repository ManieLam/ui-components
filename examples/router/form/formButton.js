export default {
  path: 'formButton',
  component: { render: (e) => e('router-view') },
  meta: {
    title: '按钮操作'
  },
  children: [{
    path: 'button',
    component: () => import(/* webpackChunkName: "form-formButton-example" */ '@/views/Form/FormButton/Button.vue'),
    meta: {
      title: '按钮与表单',
      docName: 'ansoDataForm'
    }
  }]
}
