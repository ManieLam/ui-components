<template lang='pug'>
el-form.anso-dataform__group(
  v-bind="$attrs"
  :key="formkey"
  :ref="refname"
  :id="keyName"
  :model="formData"
  :rules="rules"
  :label-width="labelWidthVal"
  :label-position="labelPosition"
  :is-fixedbtn="buttonFixed")
  .anso-dataform-group__content
    .anso-dataform-group__formitem(
      v-for="(fieldgroup, index) in groupForm"
      :key="`group_form_${index}`"
      :id="`${keyName}-groupitem-${index}`"
      :class="`anso-dataform-group__${styleType}`")
      slot(:name="`group${index}-label`")
        .form-group-label(
          :class="{'is-accordion': groupAccordion}"
          @click.prevent="toggleCollapse(index)")
          i(
            v-if="groupAccordion"
            :class="openGroups[index] ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
            style="margin-right: 8px")
          span.form-group-label__text {{groupTitle[index]}}
      .anso-dataform__body(:is-hide="groupAccordion && !openGroups[index]" :type="groupTypeDefault[index]")
        slot(:name="`group${index}`")
          FormBody(
            ref="formBody"
            v-bind="$attrs"
            :keyName="keyName"
            :type="groupTypeDefault[index]"
            :labelWidth='labelWidthVal'
            :labelPosition="labelPosition"
            :scopedSlots="$scopedSlots|filterSlot(index)"
            :formData="formData"
            :formProps="_props"
            :columns="fieldColumns"
            :formFields="fieldgroup"
            :colspanNum="colspanNum"
            @onValueChange="onChangeField")
            template(#body-header)
              slot(:name="`group${index}-header`")
            template(#body-footer)
              slot(:name="`group${index}-footer`")
  .anso-dataform-group__footer(:class="{'button-align__fixed': buttonFixed}")
    AnsoButtonGroup(
      v-for="(position, index) in formBtnsKey"
      :key="position"
      :formName="`groupForm_${position}`"
      :keyName="`${keyName}-${position}`"
      :buttonList="formButtonList[position]"
      :formValidate="formValidate"
      :data="formData")
</template>

<script>
/** */
// TODO 上传组件单独出emit,需要到上传组件中添加出餐入参一致的配置
import FormBody from './FormBody'
import AnsoButtonGroup from 'packages/AnsoButtonGroup'
import formCommon from './mixins/formCommon.js'
import { keyBy } from 'lodash'
export default {
  name: 'AnsoDataformGroup',
  mixins: [formCommon],
  components: {
    FormBody,
    AnsoButtonGroup
  },
  props: {
    // 字段分组
    groupSplit: {
      type: Array,
      required: true,
      default: () => ([])
    },
    // 分组类型：可选row,grid,default
    groupType: {
      type: [String, Array]
    },
    // 分组表现方式：default->默认风琴式开合；block -> 块 ； border -> 简单边框
    styleType: {
      type: String,
      default: 'default',
      validator: (value) => {
        return ['block', 'border', 'default'].indexOf(value) > -1
      }
    },
    // 分组小组标题
    groupTitle: {
      type: Array,
      required: true,
      default: () => ([]),
      validator: (titleArr) => {
        return titleArr.every(value => {
          if (typeof value === 'string') return !!value
          if (value instanceof Object) return value.icon || value.label
        })
      }
    },
    buttonFixed: {
      type: Boolean,
      default: true
    },
    buttonAlign: {
      type: String,
      default: 'right',
      validator: (value) => {
        return ['center', 'left', 'right'].indexOf(value) > -1
      }
    },
    keyName: {
      type: String,
      default: () => {
        // keyName与id属性相关
        return `ansoFormGroup-${Math.floor(Math.random() * 100)}` // 防止keyName没有设置的情况下，id重复，目测不会出现问题
        // return 'ansoform'
      }
    }
  },
  filters: {
    filterSlot (scopedSlots, index) {
      const regexp = `group${index}`
      return Object.entries(scopedSlots).reduce((slots, [key, value]) => {
        return new RegExp(regexp).test(key) ? { ...slots, [key.replace(`${regexp}-`, '')]: value } : slots
      }, {})
    }
  },
  data () {
    return {
      refname: 'dataformGroup',
      openGroups: Array.from({ length: this.groupSplit.length }, () => { return true }),
      formTempBtns: this.buttonList
    }
  },
  computed: {
    groupAccordion () {
      return this.styleType === 'default'
    },
    fieldRegister () {
      return keyBy(this.formFields, 'name')
    },
    groupForm () {
      return this.groupSplit.map(group => {
        return group.map(field => this.fieldRegister[field])
      })
    },
    groupTypeDefault () {
      return this.groupSplit.map((group, index) => {
        return this.groupType instanceof Array ? this.groupType[index] : this.groupType
      })
    },
    formButtonList () {
      // return this.buttonList.map(button => ({
      //   ...button,
      //   formData: Object.assign(this.value, this.formData)
      // }))
      const formData = { ...this.value, ...this.formData }
      return this.buttonList.reduce((res, btn) => {
        const button = {
          ...btn,
          formData
        }
        const position = btn.position || this.buttonAlign // 分组按钮组默认居右
        res[position] = [...res[position], button]
        return res
      }, { left: [], center: [], right: [] })
    },
    formBtnsKey () {
      return Object.keys(this.formButtonList)
    }
  },
  methods: {
    toggleCollapse (index) {
      if (this.styleType === 'default') {
        this.$set(this.openGroups, index, !this.openGroups[index])
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang='sass' scoped>
// -- 分组标题 start --
.anso-dataform-group__block, .anso-dataform-group__border
  border: 1px solid #e7e6e6
  margin: 10px
  .form-group-label
    padding: 0 5px
    background-color: #ffffff
    cursor: pointer
.anso-dataform-group__border
  position: relative
  margin-top: 20px
  .form-group-label
    position: absolute
    display: inline-block
    left: 13px
    top: -12px
.anso-dataform-group__block
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 10%)
  border-radius: 5px
  overflow: hidden
  .form-group-label
    padding: 0 10px
    font-weight: bold
    font-size: 14px
    line-height: 40px
    &:not(:empty)
      border-bottom: 1px solid #e7e6e6
.form-group-label.is-accordion
  height: 50px
  line-height: 50px
  background: rgba(0,0,0,0.02)
  border: 1px solid rgba(0,0,0,0.05)
  padding: 0 1.2rem
  cursor: pointer
// -- 分组标题 end --
.anso-dataform__body
  margin: $--form-vertical-margin 24px
  &[is-hide='true']
    display: none
/* 整体group布局 start */
.anso-dataform__group[is-fixedbtn]
  // display: flex
  // flex-direction: column
  // height: 100%
  // overflow: hidden
  .anso-dataform-group__content
    flex: 1
    overflow: auto
.anso-dataform-group__footer
  display: flex
  justify-content: space-between
/* 整体group布局 end */
</style>
