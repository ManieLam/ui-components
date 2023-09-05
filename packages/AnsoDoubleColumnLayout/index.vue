<template lang="pug">
  .double-layout(
    ref='doubleLayout'
    :class="`double-${direction}-layout`"
    :style="{flexDirection: direction}"
    v-moveOutside="dragClose"
    @mousemove="move"
    @mouseup="up")
    div.double-layout-main(:style="mainStyle")
      .layout-main(ref='layoutMain')
        slot(name="main")
        div.double-layout-btn.el-button.is-plain(
          :class="`double-layout-${mainBtnDirection}Btn`"
          @click="handleClickMainBtn")
          span(:class="`el-icon-caret-${mainBtnDirection}`")
    span.dragInterval(
      onselectstart="return false"
      @mousedown="down"
      :style="dragStyle")
    div.double-layout-sub(:style="subStyle")
      .layout-sub(ref='layoutSub')
        slot(name="sub")
        div.double-layout-btn.el-button.is-plain(
          :class="`double-layout-${subBtnDirection}Btn`"
          @click="handleClickSubBtn")
          span(:class="`el-icon-caret-${subBtnDirection}`")
</template>

<script>
import { capitalize, debounce } from 'lodash'
const directionList = ['row', 'column']
const arrowList = ['left', 'right', 'top', 'bottom']
/**
 * @module AnsoDoubleColumnLayout
 * 双栏布局组件
*/
const moveOutside = {
  bind (el, binding, vnode) { // 初始化指令
    function documentHandler (e) {
      if (el.contains(e.target)) return false // 这里判断点击的元素是否是本身，是本身，则返回
      // 判断指令中是否绑定了函数
      if (binding.expression) binding.value(e) // 如果绑定了函数 则调用那个函数，此处binding.value就是dragClose方法
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    el.__layoutMoveOutside__ = documentHandler
    document.addEventListener('click', documentHandler)
  },
  unbind (el, binding) { // 解除事件监听
    document.removeEventListener('click', el.__layoutMoveOutside__)
    delete el.__layoutMoveOutside__
  }
}
export default {
  name: 'AnsoDoubleColumnLayout',
  props: {
    // 分栏状态：main只显示主栏，both显示两栏，sub只显示次栏
    value: {
      type: String,
      validator: (value) => ['main', 'both', 'sub'].includes(value),
      default: 'both'
    },
    // 分栏方向
    direction: {
      type: String,
      validator: (value) => directionList.includes(value),
      default: 'row'
    },
    // 主栏大小
    mainGrow: {
      type: Number,
      default: 1
    },
    // 次栏大小
    subGrow: {
      type: Number,
      default: 1
    },
    // 拖拽分栏最小值占百分比
    'drag-minRatio': {
      type: String,
      default: '15%',
      validator: (value) => Number(value.replace('%', '')) < 50
    }
  },
  directives: { moveOutside }, // 自定义组件外部事件
  data () {
    return {
      ifDrag: false,
      mainRatio: this.mainGrow / (this.mainGrow + this.subGrow),
      subRatio: this.subGrow / (this.mainGrow + this.subGrow),
      param: {},
      pageX: '',
      pageY: ''
    }
  },
  computed: {
    minValue () {
      return Number(this.dragMinRatio.replace('%', '')) / 100 // 最小内容大小
    },
    isRow () { // 是否为横向展示
      return ['row'].includes(this.direction)
    },
    // 计算主栏占位
    mainStyle () {
      const mainPercent = this.mainRatio * 100
      const isMain = this.value === 'main' ? '100%' : `${mainPercent}%`
      const percent = this.value !== 'sub' ? isMain : 0
      return {
        display: this.value !== 'sub' ? 'flex' : 'none',
        ...this.isRow ? { width: percent } : { height: percent }
      }
    },
    // 计算次栏占位
    subStyle () {
      const subPercent = this.subRatio * 100
      const isSub = this.value === 'sub' ? '100%' : `${subPercent}%`
      const percent = this.value !== 'main' ? isSub : 0
      return {
        display: this.value !== 'main' ? 'flex' : 'none',
        ...this.isRow ? { width: percent } : { height: percent }
      }
    },
    dragStyle () {
      return {
        display: this.value !== 'both' ? 'none' : 'block'
      }
    },
    // 计算主栏按钮方向
    mainBtnDirection () {
      const index = this.isRow ? 0 : 2
      return arrowList[index]
    },
    // 计算次栏按钮方向
    subBtnDirection () {
      const index = this.isRow ? 1 : 3
      return arrowList[index]
    }
  },
  methods: {
    // 主栏按钮事件
    handleClickMainBtn () {
      this.value === 'main' ? this.setState('both') : this.setState('sub')
    },
    // 次栏按钮事件
    handleClickSubBtn () {
      this.value === 'sub' ? this.setState('both') : this.setState('main')
    },
    // 状态改变事件
    setState (state) {
      this.$emit('input', state)
    },
    down (event) { // 按下鼠标
      this.ifDrag = true
      this.pageX = event.pageX
      this.pageY = event.pageY
    },
    move: debounce(function (event) { // 移动
      if (this.ifDrag) {
        const type = this.isRow ? 'width' : 'height'
        const axial = this.isRow ? 'X' : 'Y' // 轴向
        const moveValue = event[`page${axial}`] - this[`page${axial}`]
        this.mainRatio = (this.param[`main${capitalize(type)}`] + moveValue) / this.param[type]
        this.subRatio = (this.param[`sub${capitalize(type)}`] - moveValue) / this.param[type]
        if (this.mainRatio < this.minValue || this.subRatio < this.minValue) { // 限制最小比例
          /**
           * 判断主栏比例是否小于副栏，是如果是赋值最小比例值，如果不是赋值1-最小比例
           * 副栏比例值是：1 - 主栏比例值
           */
          this.mainRatio = this.mainRatio < this.subRatio ? this.minValue : 1 - this.minValue
          this.subRatio = 1 - this.mainRatio
        }
      }
    }),
    up (event) { // 释放
      this.ifDrag = false
      this.setValue()
    },
    setValue () {
      // 重新定义组件内容
      const type = this.isRow ? 'width' : 'height'
      this.$set(this.param, `main${capitalize(type)}`, this.mainRatio * this.param[type])
      this.$set(this.param, `sub${capitalize(type)}`, this.subRatio * this.param[type])
    },
    dragClose () { // 移出分栏后，取消move事件
      this.ifDrag = false
      this.setValue()
    },
    init () {
      this.param = {
        width: this.$refs.doubleLayout.offsetWidth - 10,
        height: this.$refs.doubleLayout.offsetHeight - 10,
        mainWidth: this.$refs.layoutMain.offsetWidth,
        mainHeight: this.$refs.layoutMain.offsetHeight,
        subWidth: this.$refs.layoutSub.offsetWidth,
        subHeight: this.$refs.layoutSub.offsetHeight
      }
    }
  },
  mounted () {
    this.init() // 初始化获取相关数据
  }
}
</script>
<style lang="sass" scoped>
.double-row-layout
  .dragInterval
    min-width: 8px
    width: 8px
    cursor: col-resize
    background: transparent
  .double-layout-main,.double-layout-sub
    flex-direction: column
    // .layout-main
    //   padding-right: 8px
    // .layout-sub
    //   padding-left: 8px
.double-column-layout
  .dragInterval
    min-height: 8px
    height: 8px
    cursor: row-resize
    background: transparent
  .double-layout-main,.double-layout-sub
    flex-direction: row
    // .layout-main
    //   padding-bottom: 8px
    // .layout-sub
    //   padding-top: 8px
.double-layout
  width: 100%
  height: 100%
  display: flex
  flex: 1
  overflow: hidden
  .double-layout-main,.double-layout-sub
    display: flex
    position: relative
    box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.05)
    align-items: stretch
    overflow: hidden
  .layout-main, .layout-sub
    position: relative
    flex: 1
    background: #fff
    display: flex
    overflow: hidden
    .double-layout-btn
      position: absolute
      padding: 0
      box-sizing: inherit
      z-index: 998
      color: #fff
      display: flex
      width: 33px
      height: 33px
      border-radius: 33px
      border: 1px solid #e5e5e5
      background-color: #fff
      &:hover
        border-color: #3171F2
        span
          color: #3171F2
    .double-layout-leftBtn,
    .double-layout-rightBtn
      top: 50%
      transform: translate(0, -50%)
      span
        color: #8c8c8c
        font-size: 16px
        // margin-top: 7px
    .double-layout-topBtn,
    .double-layout-bottomBtn
      left: 50%
      transform: translate(-50%, 0)
      span
        color: #8c8c8c
        font-size: 16px
        // margin-left: 7px
    .double-layout-leftBtn
      right: 0
      transform: translate(50%, -50%)
      span
        margin-left: -5px
    .double-layout-rightBtn
      left: 0
      transform: translate(-50%, -50%)
      span
        margin-left: 5px
    .double-layout-topBtn
      bottom: 0
      transform: translate(-50%, 50%)
      span
        margin-top: -7px
    .double-layout-bottomBtn
      top: 0
      transform: translate(-50%, -50%)
      span
        margin-top: 3px
</style>

<style scoped>
</style>
