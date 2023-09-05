<template lang="pug">
  RangeFormItem.num-range-row(
    v-clickoutside="blur"
    :connect="connect"
    :inline="isInline")
    el-input(
      slot="start"
      clearable
      :style="widthStyle"
      v-bind="$attrs"
      :id="$attrs.id+'-start'"
      v-model="currentValueStart")
    el-input(
      slot="end"
      clearable
      :style="widthStyle"
      v-bind="$attrs"
      :id="$attrs.id+'-end'"
      v-model="currentValueEnd")
</template>

<script>
// import { isEmpty } from 'lodash'
import RangeFormItem from './RangeFormItem'
const clickoutside = {
  bind (el, binding, vnode) { // 初始化指令
    function documentHandler (e) {
      if (e.target.classList.contains('el-icon-circle-close')) return false
      if (el.contains(e.target)) return false // 这里判断点击的元素是否是本身，是本身，则返回
      // 判断指令中是否绑定了函数
      if (binding.expression) binding.value(e) // 如果绑定了函数 则调用那个函数，此处binding.value就是blur方法
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__rangeClickOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) { // 解除事件监听
    document.removeEventListener('click', el.__rangeClickOutside__)
    delete el.__rangeClickOutside__
  }
}
export default {
  name: 'AnsoDataformTextRange',
  /**
   * 范围输入框
   * @props props参数
   * @prop {Array} value 值
   * @prop {String} connect 连接符号
   * @prop {String, Number} width 输入控件展示长度
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
    width: {
      type: [String, Number],
      default: '100%'
    }
  },
  components: {
    RangeFormItem
  },
  directives: { clickoutside }, // 点击组件外部，模拟整个组件blur
  // data () {
  //   return {
  //     blurType: 'start' // 失去焦点之前的操作
  //   }
  // },
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
        const valRange = this.transformVal(val, this.currentValueEnd)
        this.$emit('input', valRange)
      }
    },
    currentValueEnd: {
      get () {
        const value = this.isNull(this.value) ? [] : this.value
        return value[1]
      },
      set (val) {
        const valRange = this.transformVal(this.currentValueStart, val)
        this.$emit('input', valRange)
      }
    }
  },
  methods: {
    isNull (val) {
      return val === null || val === undefined || val === ''
    },
    /**
     * @name transformVal
     * @description 转换输出值的格式
     * @param {Number, String} start 起始值
     * @param {Number, String} end 结束值
     * @return {String} type 当前转换得是哪个值
    */
    transformVal (start, end, type = 'start') {
      const startVal = start || undefined
      const endVal = end || undefined
      const valRange = [startVal, endVal]
      if (valRange.every(valItem => this.isNull(valItem))) return null // 如果两个值都为空，则返回null
      else return valRange
    }
    // start () {
    //   this.blurType = 'start'
    // },
    // end () {
    //   this.blurType = 'end'
    // },
    /**
     * @name blur
     * @description 点击元素外部后值的相对应操作
     * @var {Number, String} start 起始值
     * @var {Number, String} end 结束值
    */
    // blur () {
    //   if (isEmpty(this.value)) return
    //   if (this.value.some(valItem => this.isNull(valItem))) return
    //   // 需要两个值都存在才会进入判断
    //   const start = this.value[0]
    //   const end = this.value[1]
    //   if (start > end) { // 如果起始值大于结束值
    //     if (this.blurType === 'start') this.currentValueStart = end // 如果是在输入起始值后blur，则变更起始值 = 刚刚输入的结束值
    //     else this.currentValueEnd = start // 如果是在输入结束值后blur，则变更结束值 = 刚刚输入的起始值
    //   }
    // }
  }
}
</script>
