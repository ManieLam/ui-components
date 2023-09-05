<template lang="pug">
  .anso-table
    div.title
      span 当前左侧固定列,表格属性defaultFixedLeft配置 {{leftFixed}}
      AnsoDataformSelect(v-model="defaultFixedLeft" :multiple="true" :options="columns")
      br
      span 当前右侧固定列,表格属性defaultFixedRight配置 {{rightFixed}}
      AnsoDataformSelect(v-model="defaultFixedRight" :multiple="true" :options="columns")
      br
      span(style="color:red") 操作示例时，请控制左右冻结列不要出现重复字段
    AnsoDatatable(
      v-if='isShow'
      ref="tableData"
      :data="tableData"
      :defaultFixedLeft="leftFixed"
      :defaultFixedRight="rightFixed"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Basic/data.json'
export default {
  name: 'tableColumnFixed',
  data () {
    return {
      isShow: true,
      defaultFixedLeft: ['name'],
      defaultFixedRight: ['position'],
      tableData: data,
      columns: [{
        name: 'name',
        value: 'name',
        label: 'Name',
        width: 200
      }, {
        name: 'position',
        value: 'position',
        label: 'Position',
        width: 200
      }, {
        name: 'office',
        value: 'office',
        label: 'Office',
        width: 200
      }, {
        name: 'age',
        value: 'age',
        label: 'Age',
        width: 200
      }, {
        name: 'startDate',
        value: 'startDate',
        label: 'Start Date',
        width: 200
      }, {
        name: 'salary',
        value: 'salary',
        label: 'Salary',
        width: 200
      }, {
        name: 'test1',
        value: 'test1',
        label: 'test1',
        width: 200
      }, {
        name: 'test2',
        value: 'test2',
        label: 'test2',
        width: 200
      }, {
        name: 'test3',
        value: 'test3',
        label: 'test3',
        width: 200
      }, {
        name: 'test4',
        value: 'test4',
        label: 'test4',
        width: 200
      }, {
        name: 'test5',
        value: 'test5',
        label: 'test5'
      }]
    }
  },
  watch: {
    defaultFixedLeft (value) {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    },
    defaultFixedRight (value) {
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    }
  },
  computed: {
    leftFixed () {
      return this.defaultFixedLeft
    },
    rightFixed () {
      return this.defaultFixedRight
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
  .title
    background: #fff
    line-height: 30px
    padding-left: 10px
</style>
