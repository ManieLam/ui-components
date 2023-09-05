<template lang="pug">
  el-form.anso-dataform(
    v-bind="$attrs"
    :key="formkey"
    :ref="refname"
    :model="formData"
    :rules="rules"
    :inline="inline"
    :collapsable="isCollapse"
    :label-width="labelWidthVal"
    :label-position="labelPosition"
    :is-fixedbtn="buttonFixed"
    :id="keyName"
    :validate-on-rule-change="false")
    FormBody.anso-dataform__body(
      ref="formBody"
      v-bind="$attrs"
      :keyName="keyName"
      :formData="formData"
      :columns="fieldColumns"
      :formFields="formFields"
      :colspanNum="colspanNum"
      :inline="inline"
      :type="layoutConfig.type"
      :formProps="_props"
      :maxRow="layoutConfig.maxRow"
      :labelPosition="labelPosition"
      :isCollapse="isCollapse"
      :isCollapseBtns="isCollapseBtns"
      :scopedSlots="$scopedSlots"
      :labelWidth='labelWidthVal'
      :labelHidden="formLabelHidden"
      @onValueChange="onChangeField")
      template(v-slot:body-header="{formData}")
        slot(name="body-header",:formData="formData")
      template(v-slot:body-footer="{formData}")
        slot(name="body-footer",:formData="formData")
      template(#form-buttonList)
        el-form-item.dataform-button-item(
          v-if="buttonList.length"
          :is-button="true"
          :is-collapse="isCollapse"
          :class="{ 'nobutton': buttonList.length === 0, 'button-align__fixed': buttonFixed }"
          :is-multi="isMultiBtns"
          :data-group-num="formBtnsKey.length"
          :label-width="type && type !== 'default' ? '0' : labelWidthVal")
          slot(name="dataform-button-left")
          AnsoButtonGroup.dataform-button__inline(
            v-if="inline || isCollapseBtns"
            formName="dataform"
            :keyName="`${keyName}-collapsable`"
            class="button-align__right"
            :buttonList="formButtonList"
            :formValidate="formValidate"
            :data="formData")
          AnsoButtonGroup.dataform-button(
            v-else
            v-for="(position, index) in formBtnsKey"
            :key="position"
            :keyName="`${keyName}-${position}btn`"
            :class="`button-align__${position}`"
            :position="position"
            :formName="`groupForm_${position}`"
            :buttonList="formButtonList[position]"
            :formValidate="formValidate"
            :data="formData")
</template>

<script>
/**
 * @module AnsoDataform 传统表单
 * @description 除了el-form的常规属性，还支持以下：
 * */
// TODO 上传组件单独出emit,需要到上传组件中添加出餐入参一致的配置
import AnsoButtonGroup from '../AnsoButtonGroup'
import AnsoDataformItem from './AnsoDataformItem'
import FormBody from './FormBody'
import formCommon from './mixins/formCommon.js'
import inline from './mixins/inline.js'
import buttonList from './mixins/buttonList.js'

export default {
  name: 'AnsoDataform',
  mixins: [formCommon, inline, buttonList],
  components: {
    AnsoButtonGroup,
    AnsoDataformItem,
    FormBody
  },
  props: {
    keyName: {
      type: String,
      default: () => {
        // keyName与id属性相关
        return `ansoForm-${Math.floor(Math.random() * 100)}` // 防止keyName没有设置的情况下，id重复，目测不会出现问题
        // return 'ansoform'
      }
    },
    type: {
      type: String,
      validator: (value) => {
        return ['default', 'row', 'grid', 'inline'].indexOf(value) > -1
      }
    },
    collapsable: {
      type: Boolean,
      default: false
    },
    maxRow: Number
  },
  data () {
    return {
      refname: 'dataform',
      slotRender: {}
    }
  },
  filters: {
    transBtnStyle (align) {
      return {
        textAlign: align
      }
    }
  },
  computed: {
    layoutConfig () {
      if (!this.type || this.type !== 'inline') {
        return {
          type: this.type,
          // colspanNum: this.colspanNum,
          maxRow: this.maxRow
        }
      }
      return {
        type: 'default',
        // todo： 计算当前宽度可以显示多少列
        // colspanNum: 4,
        maxRow: 1
      }
    }
  },
  mounted () {
    this.$refs[this.refname].$el.addEventListener('keydown', this.tabEventIntercept, true)
  },
  beforeDestroy () {
    this.$refs[this.refname].$el.removeEventListener('keydown', this.tabEventIntercept)
  },
  methods: {
    // WHV3-1919 解决方案: 收缩时阻止 tab 事件
    tabEventIntercept (ev) {
      // 仅拦截 tab 键
      if (ev.keyCode === 9) {
        const formDom = ev.path.find(t => { if (t.tagName === 'FORM' && t.getAttribute('collapsable') === 'true' && t.className.indexOf('anso-dataform') > -1) return true })
        if (formDom) {
          ev.returnValue = false
          ev.stopImmediatePropagation()
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.dataform-button-item.nobutton
  display: none
.dataform-button-item
  margin-bottom: 0
// .dataform-button-item[is-button]
//   margin-right: 0
//   padding-right: 0
.form-upload
  text-align: left
/* 行内表单 */
.anso-dataform.el-form--inline
  display: flex
  justify-content: space-between
  // 使用errorTopTip的属性不需要margin-bottom
  &[errortoptip]
    ::v-deep .el-form-item
      margin-bottom: 8px
  ::v-deep .form-body__container
    flex: 1
  .dataform-button-item
    // ::v-deep
    //   .el-button--text[label="收起"]
    //     svg
    //       transform: rotateX(-180deg)
    &:not([is-collapse])
      display: block
      ::v-deep .el-form-item__content
        display: block
.dataform-button__inline
  ::v-deep .anso-icon[iscollapse='true']
    transform: rotateX(180deg)
    // max-width: 20%
/* 固定底部按钮组样式 */
.anso-dataform[is-fixedbtn]
  display: flex
  flex-direction: column
  // height: 100%
  overflow: hidden
  .anso-dataform__body
    flex: 1
    overflow: auto
.dataform-button-item.el-form-item
  // padding-right: 24px
  // margin-right: $--margin-primary
  &[is-multi] ::v-deep .el-form-item__content
    display: grid
  &[data-group-num='2'] ::v-deep .el-form-item__content
    grid-template-columns: 0px repeat(2, 1fr)
  &[data-group-num='3'] ::v-deep .el-form-item__content
    grid-template-columns: 0px repeat(3, 1fr)
  // .button-align__fixed
  //   ::v-deep .el-form-item__content
  //     display: flex
  //     justify-content: space-between

</style>
<style scoped>
.anso-dataform >>> .el-form-item__label {
  overflow-wrap: break-word
}
/* .dataform-button-item[is-multi] >>> .el-form-item__content {
  display: grid;
  grid-template-columns: 0px repeat(attr(data-group-num), 1fr)
} */
</style>
