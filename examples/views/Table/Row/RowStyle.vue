<template lang="pug">
  .anso-table
    AnsoDataform.form(
      v-model="formValue"
      ref="form"
      type="inline"
      :formFields="formFields"
      @onChange="onChange")
    AnsoDatatable(
      ref="RowStyleTable"
      keyName="RowStyleTable"
      v-bind="tableAttrs"
      :hasHeader="false"
      :hasFooter="false"
      :showIndex="true"
      :columns="columns")
</template>

<script>
import { data } from '@/views/Table/Tool/rowStyleData'
export default {
  name: 'tableToolRowStyle',
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
      columns: [{
        name: 'className',
        label: '类名',
        render: (value) => {
          return value ? value.join(',') : '-'
        }
      }, {
        name: 'remark',
        label: '备注'
      }],
      formValue: { type: 0 },
      formFields: [{
        name: 'type',
        label: '配置属性',
        form: {
          tag: 'radio',
          isVertical: true,
          options: [{
            label: ':rowClassName="["row-diy"]"',
            value: 0
          }, {
            label: ':rowClassName="rowClassName"',
            value: 1
          }, {
            label: ':rowStyle="{backgroundColor: "#909399"}"',
            value: 2
          }, {
            label: ':rowStyle="rowStyle"',
            value: 3
          }]
        }
      }],
      types: [{
        data: data.tableData2,
        rowClassName: ['row-diy']
      }, {
        data: data.tableData1,
        rowClassName: this.rowClassName
      }, {
        data: data.tableData3,
        rowStyle: { backgroundColor: '#909399' }
      }, {
        data: data.tableData4,
        rowStyle: this.rowStyle
      }]
    }
  },
  methods: {
    rowClassName (row, rowIndex) {
      return row.className
    },
    rowStyle ({ row, rowIndex }) {
      return row.id > 2 ? {
        backgroundColor: '#409EFF'
      } : {}
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
  .row-diy
    background-color: #409EFF
.form::v-deep
  .anso-dataform__body
    margin: 8px 0 0 8px
</style>
