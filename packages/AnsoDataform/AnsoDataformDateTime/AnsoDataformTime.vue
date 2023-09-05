<template lang="pug">
div
  component(
    :is="isFixed ? 'el-time-select' : 'el-time-picker'"
    value-format="timestamp"
    popper-class="popperPanel"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue"
    :is-range="false"
    :prefix-icon="prefixIcon"
    :clear-icon="clearIcon")
</template>

<script>
/**
 * @module AnsoDataformTime 时间选择器
 * @author chenpy
 *   */
import iconMixin from './iconMixin.js'
export default {
  name: 'AnsoDataformTime',
  mixins: [iconMixin],
  /**
   * 时间选择器
   * @props props参数
   * @prop {String, Array, Number} value 值
   * @prop {Boolean} isFixed 是否为固定时间选择器
   * @prop {String} dataFormat 获取后端的值以及提交给后端的值的格式
  **/
  data () {
    return {
      DEFAULT_PREFIX_ICON: 'el-icon-time'
    }
  },
  props: {
    value: [String, Array, Number],
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.formatValue(this.value)
      },
      set (val) {
        this.$emit('input', this.formatValue(val))
      }
    }
  },
  methods: {
    /**
     * @name formatValue
     * @description 转换时间格式
     * @param {String, Array, Number, Date} val 传入时间值
     * @param {Boolean} this.isFixed 是否为固定时间选择器
     * @returns {String} 返回值为转化好的时间戳格式
    */
    formatValue (val) {
      if (!val) return null
      if (this.isFixed) return val
      else return this.convertFormat(val)
    },
    /**
     * @name convertFormat
     * @description 转换为时间戳格式
     * @param {String, Array, Number, Date} val 传入时间格式
     * @returns {String} 返回值为转化好的时间戳格式
    */
    convertFormat (val) {
      return val.valueOf()
    }
  }
}
</script>

<style lang="sass" scoped>
</style>
