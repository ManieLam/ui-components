<template lang="pug">
  .anso-table
    span 单击单元格, 体验表格单元格单击事件
    AnsoDatatable(
      keyName="eventTable"
      :data="tableData"
      :columns="columns"
      @cell-click="cellClick")
</template>

<script>
export default {
  name: 'event',
  components: {
  },
  data () {
    return {
      tableData: [{
        cell1: '第一行, 验证单元格点击',
        cell2: '第一行, 验证单元格点击'
      }, {
        cell1: '第二行, 验证单元格点击',
        cell2: '第二行, 验证单元格点击'
      }],
      columns: [{
        name: 'cell1',
        label: 'cell-1'
      }, {
        name: 'cell2',
        label: 'cell=2'
      }]
    }
  },
  methods: {
    cellClick (row, column, cell, event) {
      const { property } = column
      console.log(property)
      this.$message.success(`你点到了${property}字段, ${row[property]}的单击事件`)
      console.log(row, column, cell, event)
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  background-color: #fff
  width: 100%
  height: 100%
  span
    padding: 8px
</style>
