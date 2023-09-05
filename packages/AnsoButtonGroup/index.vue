<template lang="pug">
  component(:is="isGroup ? 'el-button-group' : 'div'",:class="[isVertical ? 'vertical' : 'horizon', isInterval ? 'interval' : 'noInterval']",:id="keyName")
    el-badge(
      v-for="(button, index) in buttonList"
      v-if="filterShowAble(button.showabled,data)"
      v-bind="button.badge"
      :key="button.name"
      :is-visabled="filterShowAble(button.visabled,data)"
      :class="[needDivider ? `divider--${dividerDirection}`: '']")
      component.buttonItem(
        :is="button.tooltip ? 'el-tooltip' : 'span'"
        v-bind="button.tooltip")
        span(v-if="button.tooltip",slot="content",v-html="button.tooltip.content")
        AnsoDropButtonItem(
          v-if="button.dropdownButtons"
          v-bind="button"
          :data="data"
          :keyName="keyName"
          :id="idRuleFormat(keyName, button)"
          :formValidate="formValidate")
        AnsoButtonItem(
          v-else
          v-bind="button"
          :data="data"
          :id="idRuleFormat(keyName, button)"
          :formValidate="formValidate")
</template>
<script>
/**
 * @module AnsoButtonGroup 按钮组
 * @author chenkj
 *   */
import AnsoButtonInfo from './AnsoButtonInfo'
import AnsoButtonItem from './AnsoButtonItem'
import AnsoDropButtonItem from './AnsoDropButtonItem'
import idRuleMixin from './idRuleMixin'

export default {
  name: 'AnsoButtonGroup',
  mixins: [idRuleMixin],
  components: {
    AnsoButtonInfo,
    AnsoButtonItem,
    AnsoDropButtonItem
  },
  /**
   * 按钮组，Array，包含多个button单元对象
   * @example
   * [{...el-button, label: '', func: () => {}}]
   * @props props参数
   * @prop {Boolean} isGroup 是否以按钮组的方式出现
   * @prop {Boolean} isVertical 按钮组是否垂直显示（前提是isGroup为true）
   * @prop {Boolean} isInterval 按钮间是否存在间隔（前提是isGroup为true && needDivider为false）
   * @prop {Boolean} needDivider 按钮组是否需要分割线
   * @prop {Boolean} dividerDirection 分割线方向(horizontal/vertical)
   * @prop {Array} buttonList 按钮组，以多个按钮配置为对象
   * @prop {Function} formValidate 表单验证函数
   * @prop {Object} data disabled/showabled/func补充的回调参数
   **/
  props: {
    isGroup: {
      type: Boolean,
      default: false
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    isInterval: {
      type: Boolean,
      default: true
    },
    needDivider: {
      type: Boolean,
      default: false
    },
    dividerDirection: {
      type: String,
      default: 'vertical'
    },
    buttonList: {
      type: Array,
      default: () => ([])
    },
    formValidate: {
      type: Function
    },
    data: {
      type: Object,
      default: () => ({})
    },
    keyName: {
      type: String,
      default: () => {
        return `ansoBtns-${Math.floor(Math.random() * 100)}`
      }
    }
  },
  methods: {
    filterShowAble: (func, data) => func instanceof Function ? func(data) : func !== false
  }
}
</script>

<style lang="sass" scoped>
.el-badge::v-deep
  .buttonItem
    display: flex
    align-items: center
    vertical-align: middle
    justify-content: center
  .el-badge__content
    z-index: $--zindex-middle
    line-height: unset
.el-badge+.el-badge
  margin-left: 8px
.el-badge+.divider--vertical
  margin-left: 18px
.el-badge:not([is-visabled])
  opacity: 0
  pointer-events: none
  cursor: default
.el-button-group
  .el-badge+.el-badge
    // margin-left: 0px
// 添加水平无间隔样式
.el-button-group.horizon.noInterval
  .el-badge+.el-badge
    margin-left: 0px
  .el-badge
    .el-button
      border-radius: 0
      border-left-color: rgba(255,255,255,.5)
      border-right-color: rgba(255,255,255,.5)
  .el-badge:first-child
    .el-button
      border-left-color: transparent
      border-top-left-radius: $--border-radius-small
      border-bottom-left-radius: $--border-radius-small
  .el-badge:last-child
    .el-button
      border-right-color: transparent
      border-top-right-radius: $--border-radius-small
      border-bottom-right-radius: $--border-radius-small
  .el-badge
    .el-button.el-button--default
      border: 1px solid #d9d9d9
// 添加垂直无间隔样式
.el-button-group.vertical.noInterval
  .el-badge+.el-badge
    margin-left: 0px
    margin-top: 0px
  .el-badge
    .el-button
      border-radius: 0
      border-top-color: rgba(255,255,255,.5)
      border-bottom-color: rgba(255,255,255,.5)
  .el-badge:first-child
    .el-button
      border-top-color: transparent
      border-top-left-radius: $--border-radius-small
      border-top-right-radius: $--border-radius-small
  .el-badge:last-child
    .el-button
      border-top-color: transparent
      border-bottom-right-radius: $--border-radius-small
      border-bottom-left-radius: $--border-radius-small
  .el-badge
    .el-button.el-button--default
      border: 1px solid #d9d9d9
// 全部清空按钮组原本的左右边框样式
.el-button-group.horizon, .el-button-group.vertical
  .el-button:last-child
    border-left-color: transparent
  .el-button:first-child
    border-left-color: transparent
    border-right-color: transparent
  .el-button.el-button--default
    border: 1px solid #d9d9d9
.vertical
  display: inline-block
  .el-badge+.el-badge
    margin-left: 0px
    margin-top: 8px
  .el-badge
    display: block
  .el-button
    width: 100%
.divider--vertical+.divider--vertical:before
  content: ""
  display: inline-block
  width: 1px
  height: 1em
  margin: 0 8px
  vertical-align: middle
  background-color: #d9d9d9
  position: absolute
  left: -10px
  top: 0
  bottom: 0
  margin: auto
.divider--horizontal+.divider--horizontal:before
  content: ''
  display: block
  height: 1px
  width: 80%
  margin: 8px auto
  background-color: #d9d9d9
.divider--horizontal+.divider--horizontal::v-deep
  .el-badge__content
    top: 10px
</style>
