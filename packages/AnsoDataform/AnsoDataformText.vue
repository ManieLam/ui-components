<template lang="pug">
component.form-tooltip(
  v-bind="tooltipObject"
  :is="isTooltip ? 'el-tooltip' : 'span'")
  .form-text(
    @click="handleClick(value)")
    span.iconStyle(v-if="icon")
      i(:class="['el-icon-' + icon]")
    AnsoInfoRender.anso-info-render(
      v-bind="field.form"
      :style="textStyle"
      :value="value"
      :field="field"
      :data="data")
</template>

<script>
/**
 * @module AnsoDataformText 纯文本
 * @author chenpy
 *   */
export default {
  name: 'AnsoDataformText',
  data () {
    return {
      tooltipDefault: {
        placement: 'top'
      }
    }
  },
  /**
   * 纯文本
   * @props props参数
   * @prop {String, Number, Object, Array, Set} value 表单控件的值
   * @prop {Object} data 整个表单值
   * @prop {Object} field 渲染控件字段配置,field中配合render使用
   * @prop {Object} textStyle 传入内容样式
   * @prop {String} icon 图标展示以及图标类名
   * @prop {Object} tooltip 提示性内容
   * @prop {Function} func 支持内容点击后传出参数，以便后续操作
  **/
  props: {
    value: {
      type: [String, Number, Object, Array, Set, Boolean],
      default: null
    },
    data: {
      type: Object,
      default: () => ({})
    },
    field: {
      type: Object,
      default: () => ({})
    },
    textStyle: {
      type: Object,
      default: () => ({})
    },
    icon: {
      type: String,
      default: ''
    },
    tooltip: {
      type: Object,
      default: () => ({})
    },
    func: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  computed: {
    isTooltip () { // 是否展示提示
      return !!Object.keys(this.tooltip).length
    },
    tooltipObject () {
      /**
       * 如果this.tooltip有传入对应提示内容喝其它参数，则更具传入内容变更
       * 内有则显示默认内容
       */
      return { ...this.tooltipDefault, ...this.tooltip }
    }
  },
  methods: {
    handleClick (value) {
      if (!this.func) return
      const funcProps = {
        text: this,
        value: value,
        data: this.data,
        field: this.field
      }
      this.func({ funcProps })
    }
  }
}
</script>
<style lang="sass" scoped>

.form-text
  display: inline-block
  .iconStyle
    margin-right: 10px
.anso-info-render
  color: $--color-text-primary
</style>
