<template lang="pug">
  .anso-table
    label 多列排序表格,可点击表格字段排序,查看表格多列排序顺序和效果（descending：倒序 | ascending：正序）
    ul
      li(
        v-for="(data, index) in sortText"
        :key="index") {{data}}
    AnsoDatatable(
      ref="tableMultiSort"
      :data="tableData"
      :columns="columns"
      :defaultSortBy="defaultSortData")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableMultiSort',
  components: {
  },
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
      }, {
        prop: 'name',
        order: 'ascending'
      }],
      isMounted: null,
      sortText: null
    }
  },
  watch: {
    'isMounted.sortBy' (val) {
      // console.log(val)
      this.sortText = val.map((sortItem, index) => {
        return `第${index + 1}排序, ${sortItem.prop}字段：${sortItem.order}`
      })
    }
  },
  mounted () {
    this.isMounted = this.$refs.tableMultiSort
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
  label
    padding: 8px
  p
    margin: 0 0 8px 0
</style>
