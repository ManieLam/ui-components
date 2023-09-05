<template lang="pug">
el-radio-group(
  v-bind="$attrs"
  v-on="$listeners"
  v-model="currentValue"
  :class="isVertical ? 'vertical' : ''")
  component(
    :is="isButton ? 'el-radio-button' : 'el-radio'"
    :class="!isBorder ? 'radio_normal' : ''"
    v-for="(radio, index) in options"
    v-bind="radio"
    :key="radio.index"
    :border="isBorder"
    :label="radio.value") {{radio.label}}
</template>
<script>
/**
 * @module AnsoDataformRadio 单选框
 * @author chenpy
 *   */
export default {
  name: 'AnsoDataformRadio',
  /**
   * 单选框
   * @props props参数
   * @prop {Array} options 单选框组，以多个单选框配置为对象
   * @prop {Boolean} isVertical 单选框组是否垂直显示
   * @prop {Boolean} isButton 单选组合,按钮组方式呈现
   * @prop {Boolean} isBorder 单选是否显示边框,如将单选框设置成按钮组isButton = true，则设置无效
   **/
  props: {
    value: [String, Number, Array],
    options: {
      type: Array,
      default: () => ([])
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    isButton: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
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
    }
  },
  filters: {}
}
</script>

<style lang="sass" scoped>
.el-radio-group
  .el-radio.radio_normal
    margin: 5px 30px 5px 0
  ::v-deep .el-radio__label
    font-weight: normal
  ::v-deep .el-radio__inner
    width: 16px
    height: 16px
  ::v-deep .el-radio__input.is-checked
    .el-radio__inner
      border-color: #1890FF
      background: #fff
      &:after
        background: #1890FF
        width: 7px
        height: 7px
  ::v-deep .el-radio__input.is-disabled.is-checked
    .el-radio__inner
      border-color: #d1d1d1
      background: #ebebeb
      &:after
        background: #b0b0b0
        width: 7px
        height: 7px
.el-radio-group.vertical
  display: flex
  flex-direction: column
  .el-radio-button
    border-left: 1px solid #D9D9D9
    border-radius: 2px 0 0 2px
</style>
<style scoped>
.el-radio-group.vertical >>> .el-radio-button__inner {
  border-left: none;
  border-radius: 0
}
.el-radio-group >>> .el-radio__label {
  padding-left: 8px
}

</style>
