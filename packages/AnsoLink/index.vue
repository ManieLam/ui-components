<template lang="pug">
.link-showType
  el-link(
    v-if="showType === 'text'"
    v-bind="$attrs"
    :disabled="disabled"
    :type="linkShowType"
    :underline="false"
    @click="goto"
    @contextmenu.native.prevent="goto")
    span(v-html="renderValue")
    AnsoIcon(v-if="icon" :icon="icon" :class="`el-icon--${iconAlign}`")
  el-button(
    v-else-if="showType === 'button'"
    v-bind="$attrs"
    :disabled="disabled"
    @click="goto"
    @contextmenu.native.prevent="goto")
    span(v-html="renderValue")
    AnsoIcon(v-if="icon" :icon="icon" :class="`el-icon--${iconAlign}`")
  el-image(
    v-else
    v-bind="$attrs"
    :title="renderValue"
    :class="disabled ? 'noCursor' : ''"
    @click="goto"
    @contextmenu.native.prevent="goto")
</template>
<script>
/**
 * @module AnsoLink 链接组件
 * @author chenpy
 *   */
import replace from 'lodash/replace'
import isFunction from 'lodash/isFunction'
export default {
  name: 'AnsoLink',
  /**
   * 超链接
   * @props props参数
   * @prop {Object} data 所有对象值，用于使用表格时传入行值，使用表单时传入整个表单值
   * @prop {String, Number} value 超链接文本值
   * @prop {String, Number, Function} linkLabel 自定义超链接文本值
   * @prop {String} linkShowType 超链接展示类型 primary / success / warning / danger / info
   * @prop {String} url 超链接跳转链接
   * @prop {String} openType 超链接打开的方式，传入current: 在当前页面刷新跳转, new：新标签页面打开
   * @prop {String} showType 超链接展示形式，支持图片image，文本text，按钮button形式
   * @prop {String} linkType 超链接类型，支持内部链接inside，单页面锚点链接anchor, 外部链接outside
   * @prop {String} icon 图标
   * @prop {String} iconAlign 图标位置，默认显示left, 需要icon传参类型为String才有效
   * @prop {Function, Boolean} func 提供超链接点击后的自定义操作方法，出参value: 当前值, data:所有值
   **/
  props: {
    data: Object,
    value: [String, Number],
    linkLabel: [String, Number, Function],
    linkShowType: {
      type: String,
      default: 'primary'
    },
    url: {
      type: String
    },
    openType: {
      type: String,
      default: 'new',
      validator: (value) => {
        return ['new', 'current'].indexOf(value) > -1
      }
    },
    showType: {
      type: String,
      default: 'text'
    },
    linkType: {
      type: String,
      default: 'outside',
      validator: (value) => {
        return ['inside', 'anchor', 'outside'].indexOf(value) > -1
      }
    },
    disabled: Boolean,
    icon: String,
    iconAlign: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['left', 'right'].indexOf(value) > -1
      }
    },
    func: {
      type: [Function, Boolean],
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    renderValue () {
      return isFunction(this.linkLabel) ? this.linkLabel(this.value, this.data) : this.value
    }
  },
  methods: {
    goto () {
      if (isFunction(this.func)) {
        this.func({ value: this.value, data: this.data })
        return
      }
      if (this.disabled) return
      if (this.linkType === 'anchor') {
        /* 找到锚点 */
        const anchorElement = document.getElementById(replace(this.url, '#', ''))
        /* 如果对应id的锚点存在，就跳转到锚点 */
        if (anchorElement) anchorElement.scrollIntoView()
        return
      }
      if (this.openType === 'current') window.location.href = this.url // 当前页
      else window.open(this.url) // 新窗口
    }
  }
}
</script>

<style lang="sass" scoped>
.el-icon--left
  float: left
  vertical-align: top
  margin-top: 5px
.link-showType
  display: inline-block
  width: auto
  text-decoration: $--link-text-decoration
  .el-link
    font-weight: normal
  .el-link.is-disabled
    color: $--color-text-placeholder !important
  .el-button
    font-weight: normal
    .el-icon--left
      margin-top: 0
  .el-image
    cursor: pointer
    width: 300px
    height: 200px
  .noCursor
    cursor: not-allowed
</style>
