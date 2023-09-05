<template lang="pug">
.anso-table
  label 多选表格-部分不可勾选
  AnsoDatatable.mutiSelectTable(
    rowKey="name"
    keyName="ansoTable1"
    ref="ansoTable1"
    :reserveSelection="true"
    :isSelection="true"
    :grayNonselectableRow="true"
    :data="tableData"
    :columns="columns"
    :size="tableSize"
    :selectable="selectable"
    :settingButtonList="[]"
    @removeSelect="removeSelect"
    @addSelect="addSelect"
    @selectRow="selectRow"
    @selectAll="selectAll"
    @selectionChange="selectionChange")
  label 默认选中且不可修改
  AnsoDatatable.mutiSelectTable(
    rowKey="name"
    keyName="ansoTable3"
    ref="ansoTable3"
    :reserveSelection="true"
    :isSelection="true"
    :data="tableData"
    :columns="columns"
    :size="tableSize"
    :selectable="selectable"
    :settingButtonList="[]")
</template>

<script>
import basicData from '@/views/Table/Basic/data.json'
export default {
  name: 'tableMultiSelect',
  components: {
  },
  data () {
    return {
      tableData: basicData,
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
      }],
      tableSize: 'medium'
    }
  },
  methods: {
    selectRow (rows, row) {
      // console.log('selectRow:', rows, row)
    },
    removeSelect (rows, row) {
      // console.log('removeSelect:', rows, row)
    },
    addSelect (rows, row, index) {
      // console.log('addSelect:', rows, row, index)
    },
    selectAll (rows) {
      // console.log('selectAll:', rows)
    },
    selectionChange (rows) {
      // console.log('selectionChange:', rows)
    },
    selectable (row, index) {
      return row.age !== 61 && row.age !== 22
    },
    defaultSelected () {
      const selectedData1 = this.tableData.filter(data => data.age === 66 || data.age === 33)
      this.$refs.ansoTable1.toggleRowSelection(selectedData1, true)
      const selectedData3 = this.tableData.filter(data => data.age === 22 || data.age === 61)
      this.$refs.ansoTable3.toggleRowSelection(selectedData3, true)
    }
  },
  mounted () {
    this.defaultSelected()
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex-direction: column
  padding: 8px
  // background-color: #eee
  width: 100%
  height: 100%
  .mutiSelectTable+label
    margin-top: 8px
  .mutiSelectTable
    flex: 1
</style>
