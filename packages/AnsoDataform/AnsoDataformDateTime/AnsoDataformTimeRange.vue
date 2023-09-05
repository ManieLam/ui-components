<template lang="pug">
RangeFormItem.timeRange(
  :connect="connect"
  :inline="isInline")
  component(
    slot="start"
    :style="widthStyle"
    :is="isFixed ? 'el-time-select' : 'el-time-picker'"
    v-bind="$attrs"
    :id="$attrs.id+'-start'"
    popper-class="popperPanel"
    value-format="timestamp"
    v-model="currentValueStart"
    :picker-options="pickerOptionsStart"
    :prefix-icon="prefixIcon"
    :clear-icon="clearIcon"
    :is-range="false")
  component(
    slot="end"
    :style="widthStyle"
    :is="isFixed ? 'el-time-select' : 'el-time-picker'"
    v-bind="$attrs"
    :id="$attrs.id+'-end'"
    popper-class="popperPanel"
    value-format="timestamp"
    v-model="currentValueEnd"
    :picker-options="pickerOptionsEnd"
    :prefix-icon="prefixIcon"
    :clear-icon="clearIcon"
    :is-range="false")
</template>

<script>
/**
 * @module AnsoDataformTimeRange 时间范围选择器
 * @author chenpy
 *   */
import day from 'dayjs'
import split from 'lodash/split'
import iconMixin from './iconMixin.js'
import RangeFormItem from '../RangeFormItem'
export default {
  name: 'AnsoDataformTimeRange',
  mixins: [iconMixin],
  components: {
    RangeFormItem
  },
  /**
   * 时间范围选择器
   * @props props参数
   * @prop {Array} value 值
   * @prop {String} connect 连接符号
   * @prop {Boolean} isFixed 是否为固定时间选择器
   * @prop {Object} pickerOptions 时间范围选择器控制限制
  **/
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    connect: {
      type: String,
      default: '-'
    },
    isFixed: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '100%'
    },
    pickerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      DEFAULT_PREFIX_ICON: 'el-icon-time'
    }
  },
  computed: {
    isInline () {
      return this.$attrs.formAttrs?.type === 'inline'
    },
    widthStyle () {
      const width = this.width.constructor === String ? this.width : `${this.width}px`
      return { width: width }
    },
    currentValueStart: {
      get () {
        const value = this.isNull(this.value) ? [] : this.value
        return value[0]
      },
      set (val) {
        const value = !this.currentValueEnd && !val ? null : [val, this.currentValueEnd]
        this.$emit('input', value)
      }
    },
    currentValueEnd: {
      get () {
        const value = this.isNull(this.value) ? [] : this.value
        return value[1]
      },
      set (val) {
        const value = !this.currentValueStart && !val ? null : [this.currentValueStart, val]
        this.$emit('input', value)
      }
    },
    pickerOptionsStart () {
      if (this.isFixed) return this.selectConvertSize()
      else return this.pickerConvertSize()
    },
    pickerOptionsEnd () {
      if (this.isFixed) return this.selectConvertSize('end')
      else return this.pickerConvertSize('end')
    }
  },
  methods: {
    isNull (val) {
      return val === null || val === undefined || val === ''
    },
    /**
     * @name selectConvertSize
     * @description 固定时间选择器，限制固定时间范围大小值
     * @param {String} type 时间范围限制的控件，起始：'start'， 结束：'end'
     * @var {String} this.pickerOptions.minTime 整个时间范围选择器限制, 最小时间
     * @var {String} this.pickerOptions.maxTime 整个时间范围选择器限制, 最大时间
     * @return {Object} pickerOptionsEnd 时间范围限制控件（结束框）的时间控制范围
     * @return {Object} pickerOptionsStart 时间范围限制控件（开始框）的时间控制范围
    */
    selectConvertSize (type = 'start') {
      /**
       * 如果有传入minTime, maxTime，且未选择内容，则currentValueStart，currentValueEnd都不限制不可超过传入的大小值
       * 如果currentValueStart，currentValueEnd存在有值，在传入大小值前提下
       * currentValueStart限制了pickerOptionsEnd的最小值
       * currentValueEnd限制了pickerOptionsStart的最大值
      */
      const { minTime, maxTime } = this.pickerOptions
      const min = minTime || '00:00'
      if (type === 'start') {
        return {
          ...this.pickerOptions,
          minTime: min,
          maxTime: this.currentValueEnd || maxTime
        }
      } else {
        return {
          ...this.pickerOptions,
          minTime: this.currentValueStart || min,
          maxTime: maxTime
        }
      }
    },
    /**
     * @name pickerConvertSize
     * @description 限制任意时间选择器，限制固定时间范围大小值
     * @param {String} type 时间范围限制的控件，起始：'start'， 结束：'end'
     * @var {String} this.pickerOptions.selectableRange 整个选择器限制范围, 限只可传入字符串，及为限制一个时间段可选
     * @var {String} selecRange[0] 时间限制初始值 || '00:00:00'
     * @var {String} selecRange[1] 时间限制结束值 || '23:59:59'
     * @return {Object} pickerOptionsEnd 时间范围限制控件（结束框）的时间控制范围
     * @return {Object} pickerOptionsStart 时间范围限制控件（开始框）的时间控制范围
    */
    pickerConvertSize (type = 'start') {
      /**
       * 如果有传入selectableRange，且未选择内容，则currentValueStart，currentValueEnd都不限制不可超过传入的selectableRange值
       * 如果currentValueStart，currentValueEnd存在有值，在传入大小值前提下
       * currentValueStart限制了pickerOptionsEnd的最小值
       * currentValueEnd限制了pickerOptionsStart的最大值
      */
      const { selectableRange } = this.pickerOptions
      const selecRange = split(selectableRange, ' - ', 2) // 数组格式的默认选择范围
      const defaultStart = selecRange[0] || '00:00:00'
      const defaultEnd = selecRange[1] || '23:59:59'
      if (type === 'start') {
        // 起始的可选择范围：如果范围结束框已经存在值，则起始框的最大值是结束框的值
        const currentEnd = this.currentValueEnd ? this.changeFormat(this.currentValueEnd) : defaultEnd
        const max = currentEnd || defaultEnd
        return {
          ...this.pickerOptions,
          selectableRange: `${defaultStart} - ${max}`
        }
      } else {
        // 结束框的可选择范围：范围起始框已经存在值，则结束框的最小值是起始框的值
        const currentStart = this.currentValueStart ? this.changeFormat(this.currentValueStart) : defaultStart
        const min = currentStart || defaultStart
        return {
          ...this.pickerOptions,
          selectableRange: `${min} - ${defaultEnd}`
        }
      }
    },
    /**
     * @name changeFormat
     * @description 转换时间格式
     * @param {String, Array, Number, Date} value 传入时间类型值
     * @param {String} type 需要转换出去展示的格式
     * @returns {String} 返回值为转化好的时间格式
    */
    changeFormat (value, type = 'HH:mm:ss') {
      return day(value).format(type)
    }
  }
}
</script>
