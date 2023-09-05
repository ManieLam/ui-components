export default {
  /**
   * 时间/日期选择器
   * @props props参数
   * @prop {String， Array} icon 按钮设置
   * @prop {String} iconAlign 按钮设置位置，默认显示left, 需要icon传参类型为String才有效
  **/
  data () {
    return {
      DEFAULT_CLEAR_ICON: 'el-icon-circle-close'
    }
  },
  props: {
    icon: [String, Array],
    iconAlign: {
      type: String,
      default: 'left'
    }
  },
  computed: {
    prefixIcon () {
      if (!this.icon) return this.DEFAULT_PREFIX_ICON
      if (this.icon.constructor === String) {
        return this.iconAlign === 'left' ? `el-icon-${this.icon}` : this.DEFAULT_PREFIX_ICON
      }
      const icon = this.icon.find(item => { return item.align === 'left' })
      return icon ? `el-icon-${icon.type}` : this.DEFAULT_PREFIX_ICON
    },
    clearIcon () {
      if (!this.icon) return this.DEFAULT_CLEAR_ICON
      if (this.icon.constructor === String) {
        return this.iconAlign === 'right' ? `el-icon-${this.icon}` : this.DEFAULT_CLEAR_ICON
      }
      const icon = this.icon.find(item => { return item.align === 'right' })
      return icon ? `el-icon-${icon.type}` : this.DEFAULT_CLEAR_ICON
    }
  },
  watch: {},
  methods: {}
}
