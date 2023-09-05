<template lang="pug">
  .anso-table
    AnsoDataform.form(
      v-model="formValue"
      ref="form"
      type="inline"
      :formFields="formFields"
      @onChange="onChange")
    AnsoDatatable(
      ref="CellStyleTable"
      keyName="CellStyleTable"
      v-bind="tableAttrs"
      :hasHeader="false"
      :hasFooter="false"
      :showIndex="true"
      :data="data"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Tool/data.json'
import columns from '@/views/Table/Tool/columns.js'
export default {
  name: 'tableToolCellStyle',
  components: {
  },
  computed: {
    tableAttrs () {
      const { type } = this.formValue
      return this.types[type]
    }
  },
  data () {
    return {
      columns,
      data,
      formValue: { type: 0 },
      formFields: [{
        name: 'type',
        label: '配置属性',
        form: {
          tag: 'radio',
          isVertical: true,
          options: [{
            label: 'cellClassName="cell-brand"',
            value: 0
          }, {
            label: ':cellClassName="cellClassName"',
            value: 1
          }, {
            label: ':cellStyle="{backgroundColor: "#909399", color: "#fff"}"',
            value: 2
          }, {
            label: ':cellStyle="cellStyle"',
            value: 3
          }]
        }
      }],
      types: [{
        cellClassName: 'cell-brand'
      }, {
        cellClassName: this.cellClassName
      }, {
        cellStyle: { backgroundColor: '#606266', color: '#fff' }
      }, {
        cellStyle: this.cellStyle
      }]
    }
  },
  methods: {
    cellClassName ({ row, column, rowIndex, columnIndex }) {
      return column.label === 'Age' ? this.diffAge(row.age) : ''
    },
    diffAge (age) {
      switch (true) {
        case age > 60:
          return 'cell-danger'
        case age > 40:
          return 'cell-warning'
        case age > 25:
          return 'cell-brand'
        default:
          return 'cell-success'
      }
    },
    cellStyle ({ row, column, rowIndex, columnIndex }) {
      return column.label === 'Age' ? {
        backgroundColor: '#606266',
        color: '#fff'
      } : ''
    },
    onChange ({ values }) {
      this.formValue = values
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  width: 100%
  height: 100%
.anso-table::v-deep
  .cell-success
    background-color: #67C23A
  .cell-warning
    background-color: #E6A23C
  .cell-danger
    background-color: #F56C6C
  .cell-brand
    background-color: #409EFF
.form::v-deep
  .anso-dataform__body
    margin: 8px 0 0 8px
</style>
