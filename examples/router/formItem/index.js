import inputRouter from './input.js'
import selectRouter from './select.js'
import sliderRouter from './slider.js'
import transferRouter from './transfer.js'
import uploadRouter from './upload.js'

export default {
  path: 'formItem',
  component: { render: (e) => e('router-view') },
  children: [
    inputRouter,
    selectRouter,
    sliderRouter,
    uploadRouter,
    transferRouter
  ],
  title: '数据录入',
  icon: ''
}
