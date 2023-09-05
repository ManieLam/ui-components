<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="simpleTable"
      :hasHeader="false"
      :hasFooter="false"
      :data="tableData"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Basic/data.json'

export default {
  name: 'tableBasicSimple',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: [{
        name: 'name',
        label: 'Name'
      }, {
        name: 'position',
        label: 'Position'
      }, {
        name: 'office',
        label: 'Office'
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
  },
  methods: {
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
