<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="simpleTable"
      :hasPage="false"
      :settingButtonList="['lineHeightSetter', 'columnFilter']"
      :data="tableData"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Basic/data.json'

export default {
  name: 'tableMultiHeader',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: [{
        name: 'name',
        label: 'Name',
        width: 150,
        sortable: true
      }, {
        name: 'position',
        label: 'Position',
        width: 150,
        sortable: true
      }, {
        name: 'test',
        label: 'test',
        width: 240,
        innerColumns: [{
          name: 'test2',
          label: 'test2',
          innerColumns: [{
            name: 'test1',
            label: 'test1',
            sortable: true
          }, {
            name: 'office',
            label: 'office',
            width: 150,
            sortable: true
          }]
        }, {
          name: 'age',
          label: 'Age',
          sortable: true
        }]
      }, {
        name: 'startDate',
        label: 'Start Date',
        width: 150,
        sortable: true
      }, {
        name: 'salary',
        label: 'Salary',
        width: 150,
        sortable: true
      },
      { name: 'a1', label: 'a1', sortable: true },
      { name: 'a2', label: 'a2', sortable: true },
      { name: 'a3', label: 'a3', sortable: true },
      { name: 'a4', label: 'a4', sortable: true },
      { name: 'a5', label: 'a5', sortable: true },
      { name: 'a6', label: 'a6', sortable: true }
      ]
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
  padding: 8px
  background-color: #eee
  width: 100%
  height: 100%
</style>
