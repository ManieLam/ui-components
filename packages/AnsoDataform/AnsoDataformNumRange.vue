<template lang="pug">
  RangeFormItem.num-range-row(
    :content="connect"
    :inline="isInline")
    el-input-number(
      slot="start"
      :style="widthStyle"
      v-bind="$attrs"
      v-model="currentValueStart"
      :id="$attrs.id+'-start'"
      :min="startRange.min",
      :max="startRange.max"
      :controls="!!btnControls"
      :controls-position="btnControls")
    el-input-number(
      slot="end"
      :style="widthStyle"
      v-bind="$attrs"
      v-model="currentValueEnd"
      :id="$attrs.id+'-end'"
      :min="endRange.min",
      :max="endRange.max"
      :controls="!!btnControls"
      :controls-position="btnControls")
</template>

<script>
import RangeFormItem from './RangeFormItem'
export default {
  name: 'AnsoDataformNumRange',
  /**
   * 数值范围输入框
   * @props props参数
   * @prop {Array} value 数值
   * @prop {String} connect 连接符号
   * @prop {Number} min 数值范围输入框, 设置允许的最小值
   * @prop {Number} max 数值范围输入框, 设置允许的最大值
   * @prop {String} triggerType 按钮位置类型, 默认为stack显示符号堆积再右侧
   **/
  components: {
    RangeFormItem
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    connect: {
      type: String,
      default: '-'
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    min: Number,
    max: Number,
    triggerType: {
      type: String,
      default: 'stack'
    }
  },
  data () {
    return {
    }
  },
  computed: {
    isInline () {
      return this.$attrs.formAttrs?.type === 'inline'
    },
    widthStyle () { // 支持配置范围输入框两个输入框的宽度
      const width = this.width.constructor === String ? this.width : `${this.width}px`
      return { width: width }
    },
    currentValueStart: {
      get () {
        const value = this.isNull(this.value) ? [] : this.value
        return value[0]
      },
      set (val) {
        const originValue = [val, this.currentValueEnd]
        const value = originValue.every(item => this.isNull(item)) ? null : originValue
        this.$emit('input', value)
      }
    },
    currentValueEnd: {
      get () {
        const value = this.isNull(this.value) ? [] : this.value
        return value[1]
      },
      set (val) {
        const originValue = [this.currentValueStart, val]
        const value = originValue.every(item => this.isNull(item)) ? null : originValue
        this.$emit('input', value)
      }
    },
    startRange () {
      // 起始输入框的范围，最小值为this.min，最大值为结束输入框的值或者是this.max
      return {
        min: this.min,
        max: this.currentValueEnd || this.max
      }
    },
    endRange () {
      // 结束输入框的范围，最小值为起始输入框的值或者是this.min，最大值为this.max
      return {
        min: this.currentValueStart || this.min,
        max: this.max
      }
    },
    btnControls () {
      return this.transformVal(this.triggerType)
    }
  },
  methods: {
    isNull (val) {
      return val === null || val === undefined || val === ''
    },
    transformVal (val) {
      const _Status = [
        { type: 'normal', value: '-' },
        { type: 'none', value: null },
        { type: 'stack', value: 'right' }
      ]
      const option = _Status.find(item => item.type === val)
      return option ? option.value : val
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
