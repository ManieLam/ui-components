<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="simpleTable"
      :showIndex="true"
      :hasPage="false"
      :bigData="true"
      :settingButtonList="[]"
      :data="tableData"
      :columns="columns")
</template>

<script>
import { randomTableData } from './randomData'

export default {
  name: 'tableBasicSimple',
  components: {
  },
  data () {
    return {
      tableData: randomTableData(50000),
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
