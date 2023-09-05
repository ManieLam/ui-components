import InfoRenderFiles from './InfoRenderFiles'
import { resultRender } from './render'
import { isElIcon } from '../utils/common'
export default {
  name: 'AnsoInfoRender',
  components: {
    InfoRenderFiles
  },
  props: {
    field: {
      type: Object
    },
    value: {
      type: [String, Number, Array, Boolean],
      default: null
    },
    data: {
      type: Object
    }
  },
  data () {
    return {
      createElement: null
    }
  },
  computed: {
    showAnsoIcon () {
      return !isElIcon(this.value)
    },
    result () {
      const renderAction = resultRender(this.field)
      return typeof renderAction === 'function' ? renderAction(this.value, this.field, this.data, this.createElement) : this.value
    },
    componentNode () {
      return {
        file: {
          tag: InfoRenderFiles,
          attrs: { images: this.value, ...this.field.render }
        },
        link: {
          tag: 'AnsoLink',
          attrs: { value: this.value, data: this.data, ...this.field.render }
        },
        icon: {
          tag: 'AnsoIcon',
          // tag: this.showAnsoIcon ? 'AnsoIcon' : 'i',
          attrs: { class: [this.value], icon: this.value, ...this.field.render }
        }
      }
    }
  },
  render (h) {
    this.createElement = h
    const type = this.field && this.field.render && this.field.render.type ? this.field.render.type : null
    const renderTag = type ? this.componentNode[type] : null
    if (renderTag) {
      return h(renderTag.tag, { props: renderTag.attrs })
    } else if (this.field.html) {
      const isString = typeof this.result === 'string'
      if (isString) {
        return h('div', {
          staticClass: 'render-cell__html', // 允许外部支持通过class自定义样式
          domProps: { innerHTML: this.result }
        })
      } else {
        return this.result
      }
    } else {
      return h('span', this.result)
    }
  }
}
