<template lang="pug">
  el-input-number.el-input-number(
    v-model="currentValue"
    v-bind="$attrs"
    v-on="$listeners"
    :controls="!!btnControls"
    :controls-position="btnControls")
</template>
<script>
/**
 * @module AnsoDataformNumber 数值输入框
 * @author chenpy
 *   */
export default {
  name: 'AnsoDataformNumber',
  /**
   * 数值输入框
   * @props props参数
   * @prop {String, Number} value 数值
   * @prop {String} triggerType 按钮位置类型, 默认为normal显示图标，数字两端
   **/
  props: {
    value: [String, Number],
    triggerType: {
      type: String,
      default: 'normal'
    }
  },
  data () {
    return {}
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        // console.log('触发num', val)
        this.$emit('input', val)
      }
    },
    btnControls () {
      return this.transformVal(this.triggerType)
    }
  },
  methods: {
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
