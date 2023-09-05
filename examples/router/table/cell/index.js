import diyCellRouter from './diyCell.js'
import cellbuiltInRouter from './cellbuiltIn.js'
import event from './event.js'
export default {
  path: 'basic',
  component: { render: (e) => e('router-view') },
  children: [
    cellbuiltInRouter,
    diyCellRouter,
    event
  ],
  meta: {
    title: '单元格渲染',
    icon: ''
  }
}
