<template lang="pug">
  .anso-table
    div.title
      AnsoIcon(icon="lieshezhi")
      span  列过滤器,表格工具栏默认工具，可以通过操作它，点击拖拽列设置的表格列项，起到（隐藏、排序、悬浮）列的效果
      br
      span 当前左侧固定列 {{fixedLeft}}
      br
      span 当前右侧固定列 {{fixedRight}}
      br
      span 当前可见列和当前列排序顺序 {{visibleList}}
    AnsoDatatable(
      ref="tableData"
      :data="tableData"
      :defaultFixedLeft="defaultFixedLeft"
      :defaultFixedRight="defaultFixedRight"
      :defaultVisibleList="defaultVisibleList"
      :defaultColumnList="defaultColumnList"
      :columns="columns"
      @columnDate="columnDate")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableHideColumn',
  data () {
    return {
      defaultFixedLeft: ['name'],
      defaultFixedRight: ['position'],
      defaultVisibleList: ['name', 'office', 'age', 'startDate', 'salary', 'test1', 'test2', 'test3', 'position'],
      defaultColumnList: ['name', 'position', 'office', 'age', 'startDate', 'salary', 'test1', 'test2', 'test3', 'test4', 'test5'],
      tableData: data,
      columns: [{
        name: 'name',
        label: 'Name',
        width: 200
      }, {
        name: 'position',
        label: 'Position',
        width: 200
      }, {
        name: 'office',
        label: 'Office',
        width: 200
      }, {
        name: 'age',
        label: 'Age',
        width: 200
      }, {
        name: 'startDate',
        label: 'Start Date',
        width: 200
      }, {
        name: 'salary',
        label: 'Salary',
        width: 200
      }, {
        name: 'test1',
        label: 'test1',
        width: 200
      }, {
        name: 'test2',
        label: 'test2',
        width: 200
      }, {
        name: 'test3',
        label: 'test3',
        width: 200
      }, {
        name: 'test4',
        label: 'test4',
        width: 200
      }, {
        name: 'test5',
        label: 'test5'
      }],
      filterValue: {
        isHide: ['position']
      },
      fixedLeft: ['name'],
      fixedRight: ['position'],
      visibleList: ['name', 'office', 'age', 'startDate', 'salary', 'test1', 'test2', 'test3', 'position']
    }
  },
  methods: {
    onValueChange (array) {
      this.columns = this.columns.map(({ name, label, hide }) => {
        return {
          name,
          label,
          hide: array.includes(name)
        }
      })
    },
    columnDate (data) {
      const { visibleList, fixedLeft, fixedRight } = data
      this.fixedLeft = fixedLeft
      this.fixedRight = fixedRight
      this.visibleList = visibleList
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
  ::v-deep .icon-lieshezhi
    color: #1890FF
  .title
    background: #fff
    line-height: 30px
    padding-left: 10px
</style>
