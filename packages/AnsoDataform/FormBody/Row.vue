<template lang='pug'>
.dataform-body__row(
  :isCollapse="isCollapse"
  v-resize:debounce:50="onResizeWindow")
  el-row(:gutter="gutter")
    slot(name="body-header",:formData="formData")
    el-col(
      v-for="(field, colindex) in fieldGroup"
      v-show="field.form.visabled!==false"
      :key="colindex"
      :span="field.form|singleCol(defaultFieldSpan, columnCount)"
      :is-collapse="colindex+1 > maxRow && isCollapse")
      //- :span="field|singleCol(defaultFieldSpan, colspanNum, fieldRow, colindex)")
      slot(
        :name="field.name"
        :field="field"
        :data.sync="formData")
        AnsoDataformItem.grid-form-item(
          v-model="formData[field.name]"
          v-on="$listeners"
          v-bind="$attrs"
          :field="field"
          :full="formData"
          @change="$emit('onChange', field, $event)")
    slot(name="body-footer",:formData="formData")
</template>

<script>
/**
 * @module AnsoDataformBodyGrid
 * @description 表单内容体，栅栏格式，一般配合AnsoDataform等form系列组件。
 * @author linmn
 */
import AnsoDataformItem from '../AnsoDataformItem'
import resize from 'vue-resize-directive'
export default {
  name: 'FormBodyRow',
  components: {
    AnsoDataformItem
  },
  props: {
    formFields: {
      type: Array,
      required: true,
      default: () => ([])
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    /* 当前是否展开所有的收缩行 ，收缩：true */
    isCollapse: {
      type: Boolean,
      default: false
    },
    inline: {
      type: Boolean,
      default: false
    },
    /* 默认最大的列数，当自动计算的列数超过此列数，则取该值，当最大列数超过3会出现排列不能完整一行的情况，所以设置需谨慎 */
    // maxColnum: {
    //   type: Number,
    //   default: 3,
    //   validator: (value) => {
    //     return value <= 24 && value >= 3
    //   }
    // },
    /* 默认总列数，不可超24 */
    defaultColNum: {
      type: Number,
      default: 3,
      validator: (value) => {
        return value <= 24
      }
    },
    /* 是否自适应列数 */
    isAutoColumn: {
      type: Boolean,
      default: true
    },
    /* 设置表单行的情况 */
    maxRow: Number,
    /* 默认栅格间隔 */
    gutter: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {
      /* 整个row-form-body宽度及高度 */
      dataformBody: { width: null, height: null },
      /* 自动计算的默认总列数 */
      autoTotalColumn: null,
      /* 默认input宽度+label宽度 */
      minFieldWidth: 335
      /* 默认单字段占比，含xs/sm/md/lg */
      // defaultFieldSpan: {}
    }
  },
  directives: {
    resize
  },
  filters: {
    singleCol (fieldForm, defaultFieldSpan, maxColnum) {
      /* 获取单字段占比
      * fieldForm.colSpan: 自定义单字段占比，不可超最大列数maxColnum
      * defaultFieldSpan: 默认字段占比
      */
      if (!fieldForm.colSpan) return defaultFieldSpan
      const minSpan = fieldForm.colSpan > maxColnum ? maxColnum : fieldForm.colSpan
      return defaultFieldSpan * minSpan
    }
  },
  computed: {
    /* 计算列数 */
    columnCount () {
      return this.isAutoColumn ? this.autoTotalColumn : this.defaultColNum
    },
    /* 默认每个字段占比 */
    defaultFieldSpan () {
      return Math.ceil(24 / this.columnCount)
    },
    fieldGroup () {
      if (this.isCollapse) {
        const endFlag = this.columnCount > 1 ? this.columnCount : 1
        return this.formFields.slice(0, endFlag)
      } else return this.formFields
    }
  },
  methods: {
    onResizeWindow (el) {
      if (!this.isAutoColumn) return
      this.$set(this.dataformBody, 'width', Math.floor(el.clientWidth))
      this.$set(this.dataformBody, 'height', Math.floor(el.clientHeight))
      // 自动计算的应该有的总列数 = 总宽度/默认字段长度
      const totalCol = Math.floor(Math.floor(el.clientWidth) / this.minFieldWidth)
      // 最小列数：字段数与宽度应排字段数对比，充分填充，防止多余空白反而导致字段表单过短
      // const minCol = this.formFields.length > totalCol ? totalCol : this.formFields.length
      // console.info('minCol:', minCol)
      // 自动计算的列数
      this.autoTotalColumn = totalCol
      /* 如果直接等于totalCol，minFieldWidth不等于340时，totalCol超过3会出现排列不能完整一行的情况，所以设置需谨慎  */
      // this.autoTotalColumn = totalCol > this.maxColnum ? this.maxColnum : totalCol
    }
  }
}
</script>

<style lang='sass' scoped>
.dataform-body__row[isCollapse="true"]
  flex: 1
  .el-row
    align-items: center
.el-row .el-col
  padding-left: 0
  padding-right: 0
  display: inline-block
  vertical-align: top
  float: none
.grid-form-item
  display: flex
</style>
