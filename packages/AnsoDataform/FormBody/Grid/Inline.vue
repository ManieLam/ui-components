<template lang='pug'>
.dataform-body__grid(:style="gridBoxStyle")
  slot.grid-inline-item(
    name="body-header"
    :formData="formData")
  .grid-inline-item(
    v-for="(field, rIndex) in formFields"
    v-show="field.form.visabled!==false"
    :key="`field_${field.name}_${rIndex}`"
    :is-border="border"
    :style="setSpans(field)")
    div.inline-cell(
      v-if="field.form.visabled!==false"
      :no-label="columns[field.name].form.labelHidden"
      :is-required="showRequireFlag(field)")
      label.el-form-item__label {{columns[field.name].label}}
    div.inline-cell
      slot(
        :name="field.name"
        :field="field"
        :data.sync="formData")
      AnsoDataformItem(
        v-model="formData[field.name]"
        v-on="$listeners"
        v-bind="$attrs"
        :field="field"
        :key="field.name"
        :full="formData"
        :errorToptip="errorToptip"
        @change="$emit('onChange', field, $event)")
  slot.grid-inline-item(
    name="body-footer"
    :data.sync="formData")
</template>

<script>
/** */
import { uniq } from 'lodash'
import AnsoDataformItem from 'packages/AnsoDataform/AnsoDataformItem'
export default {
  name: 'InlineGrid',
  components: {
    AnsoDataformItem
  },
  props: {
    gridFlow: {
      type: String,
      default: 'row',
      validator (value) {
        return ['column', 'row'].indexOf(value) > -1
      }
    },
    border: {
      type: Boolean,
      default: true
    },
    formFields: {
      type: Array,
      default: () => ([])
    }, // 接收一个一维数组
    gridspanNum: {
      type: [Number, String],
      default: 3
    }, // 列数
    columns: {
      type: Object,
      default: () => ({})
    }, // 字段解释
    formData: {
      type: Object,
      default: () => ({})
    }, // 默认表单传值
    errorToptip: {
      type: Boolean,
      default: true
    } // 网格式表单默认为显示toptip,防止特殊情况，不可以直接写死
  },
  data () {
    return {}
  },
  computed: {
    gridBoxStyle () {
      const name = this.gridFlow === 'column' ? 'rows' : 'columns'
      return {
        [`grid-template-${name}`]: `repeat(${this.maxColspan}, 1fr)`,
        'grid-auto-flow': this.gridFlow
      }
    },
    maxSpans () {
      const rowValue = this.formFields.filter(item => item.form && item.form.rowSpan).map(item => item.form.rowSpan)
      const colValue = this.formFields.filter(item => item.form && item.form.colSpan).map(item => item.form.colSpan)
      return {
        row: this.findMaxNum(uniq(rowValue)),
        col: this.findMaxNum(uniq(colValue))
      }
    },
    maxColspan () {
      return this.gridspanNum >= this.maxSpans.col ? this.gridspanNum : this.maxSpans.col
    }
  },
  // filters: {
  //   filterRequired (rules) {
  //     if (!rules) return null
  //     return rules.some(rule => rule.required)
  //   }
  // },
  methods: {
    showRequireFlag (field) {
      return !this.$attrs.readOnly && field?.form?.rules?.some(rule => rule.required)
    },
    findMaxNum (list) {
      return list.reduce((res, num) => {
        return num >= res ? num : res
      }, 0)
    },
    setSpans (field) {
      const { rowSpan, colSpan, labelHidden } = field.form
      const spanSetting = {}
      if (!rowSpan && !colSpan) {
        // const labelWidth = isNil(form.labelWidth) || labelHidden ? this.labelWidth : (form.labelWidth ? form.labelWidth : formLabelWidth)
        spanSetting['grid-template-columns'] = labelHidden ? '2fr' : '1fr 2fr'
        return spanSetting
      }
      // 行合并
      if (rowSpan) {
        spanSetting['grid-row'] = `span ${rowSpan}`
      }
      // 列合并
      if (colSpan) {
        const lableWidth = Math.abs(1 - (colSpan * 3)) // 求剩余块数占总数的几分之几
        spanSetting['grid-column'] = colSpan > this.maxColspan ? `span ${this.maxColspan}` : `span ${colSpan}`
        spanSetting['grid-template-columns'] = labelHidden ? '2fr' : `1fr ${lableWidth}fr`
      }
      return spanSetting
    }
  }
}
</script>

<style lang='sass' scoped>
.dataform-body__grid
  display: grid
  grid-template-columns: repeat(2, 1fr)
  margin: $--form-vertical-margin 0
  .grid-inline-item
    display: grid
    // grid-template-columns: minmax(100px, 1fr) minmax(100px, 2fr) // 需要加入colspans修改
    // grid-template-columns: 1fr 2fr
    justify-items: center
    align-items: center
    &[is-border]
      border: 1px solid $--form-divider-border-color
      margin-left: -1px
      margin-top: -1px
  .inline-cell
    display: grid
    width: 100%
    height: 100%
    align-items: center
    // justify-items: center
    overflow: hidden
    word-break: break-word
    // text-align: center
    background: $--form-label-background
    &[no-label]
      display: none
    &:nth-child(2)
      background: $--form-content-background
      border-left: 1px solid $--form-divider-border-color
.dataform-body__grid:not([readOnly]) .inline-cell
  padding: $--formItem-space $--padding-size-medium

/* 表单-网格式，行高 32px，基础控件高度 24px */
.dataform-body__grid:not([readOnly])
  .inline-cell
    min-height: 32px
    line-height: 32px
    padding-top: 4px
    padding-bottom: 4px
</style>

<style scoped>
/* 表单-网格式，行高 32px，基础控件高度 24px */
.dataform-body__grid:not([readOnly]) >>> .el-button,
.dataform-body__grid:not([readOnly]) >>> .el-radio-group,
.dataform-body__grid:not([readOnly]) >>> .el-checkbox-group,
.dataform-body__grid:not([readOnly]) >>> .el-input .el-input__inner {
  font-size: 14px;
  height: 24px;
  line-height: 24px;
}
.dataform-body__grid:not([readOnly]) >>> .el-radio.radio_normal {
  margin-top: 0;
  margin-bottom: 0;
}
.dataform-body__grid:not([readOnly]) >>> .el-input .el-input__icon {
  line-height: 1;
}
.dataform-body__grid:not([readOnly]) >>> .el-input-number:not(.is-controls-right) .el-input-number__decrease,
.dataform-body__grid:not([readOnly]) >>> .el-input-number:not(.is-controls-right) .el-input-number__increase {
  top: 2px;
  height: 22px;
  line-height: 22px;
}
.dataform-body__grid:not([readOnly]) >>> .el-input-number.is-controls-right .el-input-number__decrease {
  bottom: 2px;
  height: 11px;
  line-height: 11px;
}
.dataform-body__grid:not([readOnly]) >>> .el-input-number.is-controls-right .el-input-number__increase {
  top: 2px;
  height: 11px;
  line-height: 11px;
}

/* 星号放右边 */
.dataform-body__grid .inline-cell[is-required] >>> .el-form-item__label:before {
  display: inline !important;
  content: '*';
  color: #FF4D4F;
  margin-right: 2px;
}
.dataform-body__grid >>> .el-form-item__label:after {
  display: none;
}
</style>
