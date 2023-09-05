<template lang="pug">
el-slider(
  v-model="currentValue"
  v-bind="$attrs"
  v-on="$listeners"
  :marks="marks"
  :height="height"
  :show-tooltip="isTooltip"
  :format-tooltip="formatTooltip")
</template>

<script>
/**
 * @module AnsoDataformSlider 滑块
 * @author chenpy
 *   */
import keyBy from 'lodash/keyBy'
export default {
  name: 'AnsoDataformSlider',
  props: {
    value: [Array, Number],
    options: {
      type: Array,
      default: () => ([])
    },
    height: {
      type: String,
      default: '200px'
    },
    tooltip: {
      type: [Boolean, Function],
      default: true
    }
  },
  data () {
    return {
    }
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
    marks () { // 设置 marks 属性可以展示标记
      const options = this.options.reduce((res, item) => {
        const color = item.color ? item.color : '#000'
        // fontlable,使用html标签
        const label = item.fontlable ? this.$createElement(item.fontlable, item.label) : item.label
        const itemObj = {
          value: item.value,
          style: { color },
          label
        }
        res.push(itemObj)
        return res
      }, [])
      return keyBy(options, 'value')
    },
    isTooltip () { // 是否展示提示
      if (!this.tooltip) return this.tooltip
      else return true
    }
  },
  methods: {
    formatTooltip (val) {
      // 设置提示语格式
      if (this.tooltip.constructor !== Boolean && this.tooltip) return this.tooltip(val)
      else return null
    }
  }
}
</script>

<style lang="sass" scoped>
.el-slider
  min-width: 300px
  display: inline-block
  ::v-deep .el-slider__runway.disabled
    .el-slider__bar
      background-color: #d9d9d9
</style>
