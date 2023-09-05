<template lang="pug">
el-transfer.transfer(
  ref="transfer"
  :class="`btn-${button.direction}`"
  v-bind="$attrs"
  v-model="currentValue"
  :filterable="isFilter"
  :filter-method="filterMethod"
  :data="defaultGroup"
  :props="props"
  :button-texts="button.text")
</template>

<script>
/**
 * @module AnsoDataformTransfer 穿梭框
 * @author chenpy
 *   */
import PinyinMatch from 'pinyin-match'
export default {
  name: 'Transfer',
  data () {
    return {}
  },
  /**
   * 穿梭框
   * @props props参数
   * @prop {Array} value 表单控件的值
   * @prop {Array} options Transfer的数据源
   * @prop {String} valuekey 传入的value的key
   * @prop {String} labelkey 传入的label的key
   * @prop {Object} button 自定义按钮, text, icon, direction(vertical and horizontal)
   * @prop {Array} disabled 支持传入option数据存在置灰选项，也同样支持传入disabled数组供于组件判断某选项置灰,优先级高于options
   * @prop {Boolean, Function} filterable Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则
  **/
  props: {
    value: Array,
    options: {
      type: Array,
      required: true,
      default: () => ([])
    },
    valuekey: {
      type: String,
      default: 'value'
    }, // 传入的value的key
    labelkey: {
      type: String,
      default: 'label'
    }, // 传入的label的key
    button: {
      type: Object,
      default: () => ({
        text: [],
        icon: ['el-icon-arrow-left', 'el-icon-arrow-right'],
        direction: 'vertical'
      })
    },
    disabled: {
      type: Array,
      default: () => ([])
    },
    filterable: [Boolean, Function]
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    defaultGroup () {
      return this.options.map(item => {
        const isDiasbled = this.disabled.some(disabledItem => disabledItem === item[this.valuekey])
        return {
          ...item,
          disabled: item.disabled || isDiasbled
        }
      })
    },
    props () { // 使用props 属性为 key 和 label 设置别名
      return {
        key: this.valuekey,
        label: this.labelkey
      }
    },
    isFilter () {
      if (this.filterable.constructor === Boolean) return this.filterable
      else return true
    }
  },
  methods: {
    /**
     * @name initTransferIcon
     * @description 初始化穿梭框的可供点击左右穿梭的icon展示
     * @param {Array} icon 传入的左右按钮的样式，支持element和iconfont两种icon样式
    */
    initTransferIcon (icon) { // 根据按钮button.icon配置对应的icon
      const leftButton = this.$refs.transfer.$children[1].$el
      const rightButton = this.$refs.transfer.$children[2].$el
      const leftIcon = icon[0] && this.isElementIcon(icon[0]) ? icon[0] : `icon-${icon[0]} iconfont`
      const rightIcon = icon[1] && this.isElementIcon(icon[1]) ? icon[1] : `icon-${icon[1]} iconfont`
      leftButton.getElementsByTagName('i')[0].className = leftIcon
      rightButton.getElementsByTagName('i')[0].className = rightIcon
    },
    isElementIcon (icon) { // 判断是否为element的图标
      return icon.indexOf('el-icon-') !== -1
    },
    /**
     * @name filterMethod
     * @description 穿梭框中搜索框支持过滤数据
     * @param {String} query 搜索框输入值，关键字
     * @param {Object} item Transfer的数据源的每个对象值
     * @return {Boolean} 返回值为true，element会自动过滤出相对应的数据
    */
    filterMethod (query, item) {
      // 检索默认支持关键字，拼音检索
      if (!query) return true
      if (this.filterable.constructor === Boolean) return !!PinyinMatch.match(item.label, query)
      else return this.filterable({ query, item })
    }
  },
  mounted () {
    if (this.button && this.button.icon) this.initTransferIcon(this.button.icon)
  }
}
</script>
<style lang="sass" scoped>
.transfer
  max-height: 232px
  ::v-deep .el-transfer-panel
    width: 176px
  ::v-deep .el-transfer-panel__body
    height: 192px
    .el-transfer-panel__list.is-filterable
      height: 148px
    .el-transfer-panel__list
      height: 192px
      .el-checkbox.el-transfer-panel__item
        font-weight: normal
    .el-transfer-panel__filter
      margin: 10px
      .el-input__inner
        border-radius: 0
        padding-right: 10px
        padding-left: 10px
      .el-input__prefix
        left: unset
        right: 5px
    .el-icon-search, .el-icon-circle-close
      margin-left: 0
      line-height: 33px
  ::v-deep .el-transfer__buttons
    // min-width: 140px
    padding: 0 8px
    .el-transfer__button:first-child
      margin-bottom: 5px
    button
      padding: 4px 5px
    .is-disabled
      background-color: #dcdfe6
      border-color: #dcdfe6
  ::v-deep .el-button [class*=el-icon-]+span
    margin-left: 0
.btn-vertical
  ::v-deep .el-transfer__buttons
    // min-width: 0
    button
      padding: 4px 5px
      display: block
    .el-transfer__button:first-child, .el-transfer__button:nth-child(2)
      span
        span
          margin-left: 5px
          margin-right: 5px
    .el-transfer__button:first-child
      margin-right: 0
    .el-transfer__button:nth-child(2)
      margin-left: 0
</style>
