<template lang="pug">
.anso-table
  label 序号列（页内分页时连续）
  AnsoDatatable(
    keyName="indextable"
    ref="indextable"
    :showIndex="true"
    :data="tableData"
    :columns="columns"
    :operateButtonList="operateButtonList")
</template>

<script>
import data from '@/views/Table/Tool/data.json'
import columns from '@/views/Table/Tool/columns.js'
import cloneDeep from 'lodash/cloneDeep'
import remove from 'lodash/remove'

export default {
  name: 'tableColumnNumFont',
  data () {
    return {
      tableData: cloneDeep(data),
      columns: columns,
      operateButtonList: [{
        name: 'delete',
        type: 'text',
        label: '删除',
        func: ({ row }) => {
          remove(this.tableData, (rowData) => {
            return rowData.name === row.name
          })
          this.$nextTick(() => {
            this.$refs.indextable.reRenderTableData()
          })
        }
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  padding: 8px
  background-color: #eee
  width: 100%
  height: 100%
  label
    margin-bottom: 8px
</style>
