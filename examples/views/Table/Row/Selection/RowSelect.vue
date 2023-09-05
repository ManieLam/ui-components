<template lang="pug">
  .anso-table
    label 单选表格
    AnsoDatatable(
      rowKey="name"
      keyName="table1"
      ref="table1"
      :settingButtonList="[]"
      :data="tableData"
      :columns="columns"
      :highlightClickRow="true"
      :grayNonselectableRow="true"
      @rowClick="rowClick"
      @currentChange="currentChange"
      :selectable="selectable")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableRowSelect',
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
    rowClick (row, column, event) {
      console.log('rowClick:', row, column, event)
    },
    currentChange (curRow, oldRow) {
      console.log('currentChange:', curRow, oldRow)
    },
    selectable (row, index) {
      return row.age !== 22
    },
    setCurRow () {
      const result = this.tableData.find(data => data.name === 'T. Nixon')
      this.$refs.table1.setCurrentRow(result)
    }
  },
  mounted () {
    this.setCurRow()
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
