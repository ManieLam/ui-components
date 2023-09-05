<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="columnWidthTable"
      :data="tableData"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableColumnWidth',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: [{
        name: 'name',
        label: '120px',
        width: '120px'
      }, {

        name: 'position',
        label: '150',
        width: '150'
      }, {
        name: 'office',
        label: '160',
        width: 160
      }, {
        name: 'age',
        label: 'Age'
      }, {
        name: 'startDate',
        label: 'Start Date'
      }, {
        name: 'salary',
        label: 'Salary'
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
</style>
