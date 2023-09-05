<template lang="pug">
  .anso-table_summary
    AnsoDatatable(
      keyName="summaryBack"
      resource="/api/common/list"
      show-summary
      :serverSide="true"
      :settingButtonList="[]"
      :columns="columns")
</template>

<script>
/**
 * @name 表尾合计行
 */
// import { columns } from './setRandomData'

export default {
  name: 'tableSummaryBack',
  components: {
  },
  data () {
    return {
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
      }]
    }
  },
  methods: {
    getSummaries () {
      return ['合计']
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_summary
  display: flex
  flex: 1
  flex-direction: column
  padding: 8px
  background-color: #eee
  width: 100%
  height: 100%
</style>
