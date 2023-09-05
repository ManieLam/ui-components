import Vue from 'vue'
import Element from 'element-ui'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import Anso from '../../packages/index.js'
import { resourceConfig, transformRequest } from '@/utils/apiFormat'
// import 'element-ui/lib/theme-chalk/index.css'
// import 'assets/elTheme/theme/index.css'
import 'assets/eleTheme/index.css'

Vue.use(Viewer)
Vue.use(Element)
// 初始化anso-ui
Vue.use(Anso, {
  // 表格初始化选项
  table: {
    resourceConfig: {
      type: Function,
      default: resourceConfig
    },
    transformRequest: {
      type: Function,
      default: transformRequest
    }
  },
  ansoStates: {
    options: {
      type: Array,
      default: () => [
        {
          type: 'success',
          color: 'green',
          statesLabel: '成功！'
        },
        {
          type: 'fail',
          color: 'red',
          statesLabel: '失败~'
        }
      ]
    }
  }
})
