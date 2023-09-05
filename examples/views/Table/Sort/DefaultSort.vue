<template lang="pug">
  .anso-table
    label 默认排序表格: age倒序
    AnsoDatatable(
      :data="tableData"
      :columns="columns"
      :defaultSortBy="defaultSortData")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableDefaultSort',
  data () {
    return {
      tableData: data,
      columns: [{
        name: 'name',
        label: 'Name',
        sortable: true
      }, {
        name: 'position',
        label: 'Position',
        sortable: true
      }, {
        name: 'office',
        label: 'Office',
        sortable: true
      }, {
        name: 'age',
        label: 'Age',
        sortable: true
      }, {
        name: 'startDate',
        label: 'Start Date',
        sortable: true
      }, {
        name: 'salary',
        label: 'Salary',
        sortable: true
      }],
      defaultSortData: [{
        prop: 'age',
        order: 'descending'
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
  background-color: #eee
  width: 100%
  height: 100%
  label
    margin-bottom: 8px
</style>
