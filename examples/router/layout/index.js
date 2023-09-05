import doubleColumnLayoutRouter from './doubleColumnLayout.js'

export default {
  path: 'layout',
  component: { render: (e) => e('router-view') },
  children: [
    doubleColumnLayoutRouter
  ],
  title: '布局',
  icon: ''
}
