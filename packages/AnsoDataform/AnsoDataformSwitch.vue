<template lang="pug">
component(
  :is="isTooltip ? 'el-tooltip' : 'span'"
  :content="'当前值为: ' + currentValue")
  el-switch(
    :class="{'inlineText': isInline, 'size-sm': size === 'sm'}"
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue"
    :disabled="disabled || loading"
    :active-color="switchParam.activeColor"
    :inactive-color="switchParam.inactiveColor"
    :active-text="switchParam.activeText"
    :inactive-text="switchParam.inactiveText"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    @click.native="handleClick(currentValue)"
    @change="handleChange")
</template>

<script>
/**
 * @module AnsoDataformSwitch 开关
 * @author chenpy
 *   */
import { isPromise } from 'packages/utils/common'
export default {
  name: 'AnsoDataformSwitch',
  /**
   * 开关选框
   * @props props参数
   * @prop {Boolean, String, Number} value 开关框值
   * @prop {Boolean} disabled 是否置灰
   * @prop {String} size 尺寸
   * @prop {Array} options 传入数据,传入数据的值必须与activeType相对应，才可以匹配出正确的文字颜色
   * @prop {String} activeType 传入值类型,可选值有number、boolean、string，默认值为boolean
   * @prop {Boolean} isTooltip 是否展示提示性语句
   * @prop {Boolean} isInline 文字描述展示，是否显示再按钮内，需要配合switch 的宽度width,设置显示
   * @prop {Function} func 支持开关按钮点击后的异步回调
  **/
  data () {
    return {
      // defualtValue: this.value,
      loading: false
    }
  },
  props: {
    value: [Boolean, String, Number],
    size: {
      type: String,
      default: 'lg',
      validator: (value) => {
        return ['lg', 'sm'].includes(value)
      }
    },
    options: {
      type: Array,
      default: () => ([])
    },
    activeType: {
      type: String,
      default: 'boolean'
    },
    isTooltip: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    isInline: {
      type: Boolean,
      default: false
    },
    func: {
      type: Function,
      default: () => {
        return false
      }
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
    activeValue () { // switch 打开时的值
      return this.convertType(this.activeType).activeValue
    },
    inactiveValue () { // switch 关闭时的值
      return this.convertType(this.activeType).inactiveValue
    },
    switchParam () { // switsh 其它参数值，基于activeType传入值类型来输出options数据中对应参数
      const activeText = this.option(this.activeValue)
      const inactiveText = this.option(this.inactiveValue)
      const activeColor = this.option(this.activeValue, 'color')
      const inactiveColor = this.option(this.inactiveValue, 'color')
      return {
        activeText,
        inactiveText,
        activeColor,
        inactiveColor
      }
    }
  },
  methods: {
    handleClick (value) {
      if (this.disabled) return
      // 支持异步调用
      const funcProps = {
        switch: this,
        data: value
      }
      const f = this.func({ funcProps })
      if (isPromise(f)) {
        this.currentValue = !value
        this.loading = true
        f.then((data) => {
          this.currentValue = data
          this.loading = false
        })
      }
    },
    handleChange (value) {
      this.currentValue = value
    },
    /**
     * @name convertType
     * @description 切换开关选框的输出值类型
     * @param {String} val 传入值类型,可选值有number、boolean、string，默认值为boolean
     * @return {Object} 返回根据组件传入的传出值类型，筛选出相对应的对象，供element，参数属性使用
    */
    convertType (val) {
      // active-value打开时的值
      // inactive-value关闭时的值
      const _Status = [
        { type: 'boolean', activeValue: true, inactiveValue: false },
        { type: 'string', activeValue: '1', inactiveValue: '0' },
        { type: 'number', activeValue: 1, inactiveValue: 0 }
      ]
      const option = _Status.find(item => item.type === val)
      return option
    },
    option (val, type = 'label') { // 传入值找出相对应的label
      const option = this.options.find(item => { return val === item.value })
      return option ? option[type] : null
    }
  }
}
</script>

<style lang="sass" scoped>
.el-switch.inlineText
  position: relative
</style>
<style scoped>
.inlineText >>> .el-switch__label {
  position: absolute;
  display: none
}
.inlineText >>> .el-switch__label.is-active {
  color: #ffffff;
  z-index: 9;
  display: block
}
.inlineText >>> .el-switch__label--left {
  right: 10px;
  margin-right: 0
}
.inlineText >>> .el-switch__label--right {
  left: 10px;
  margin-left: 0
}
.size-sm >>> .el-switch__core {
  height: 16px;
  width: 34px
}
.size-sm >>> .el-switch__core:after {
  width: 12px;
  height: 12px
}
.size-sm.is-checked >>> .el-switch__core::after {
  margin-left: -13px
}
</style>
