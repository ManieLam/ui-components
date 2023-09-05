<template lang="pug">
.statesTab
  span.circle(:style='[circleColor, circleStyle]')
  span.statesLabel {{ label }}
</template>

<script>
export default {
  name: 'AnsoStates',
  /**
   * 状态规则组件
   * @props props参数
   * @prop {Object} type 组件提供两个可直接配置显示的状态，成功：success 失败: fail
   * @prop {String} color 状态标识颜色
   * @prop {String, Number} statesLabel 状态文本
   * @prop {Object} circleStyle 状态标识样式配置
   **/
  props: {
    type: String, // 成功：success 失败: fail
    color: String,
    statesLabel: [String, Number],
    circleStyle: {
      type: Object,
      default: () => ({
        height: '8px',
        width: '8px'
      })
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    typeOptions () {
      if (this.options && this.options.map) return this.options
      return [
        {
          type: 'success',
          color: 'green',
          statesLabel: '成功'
        },
        {
          type: 'fail',
          color: 'red',
          statesLabel: '失败'
        }
      ]
    },
    circleColor () {
      if (!this.type) return { 'background-color': this.color || '#eaeaea' }
      const opt = this.typeOptions.find((typeItem) => typeItem.type === this.type)
      return { 'background-color': opt ? opt.color : '' }
    },
    label () {
      if (!this.type) return this.statesLabel
      const opt = this.typeOptions.find((typeItem) => typeItem.type === this.type)
      return opt ? opt.statesLabel : ''
    }
  },
  data () {
    return {
      // typeOptions: [{
      //   type: 'success',
      //   color: 'green',
      //   statesLabel: '成功'
      // }, {
      //   type: 'fail',
      //   color: 'red',
      //   statesLabel: '失败'
      // }]
    }
  }
}
</script>

<style lang="sass" scoped>
.statesTab
  display: flex
  align-items: center
  .circle
    border-radius: 50%
    display: inline-block
    margin-right: 5px
    line-height: $--font-line-height-primary
  .statesLabel
    font-size: $--font-size-medium
</style>
