<template lang="pug">
.anso-table_multi
  AnsoDatatable(
    keyName="multiFilterTable"
    ref="multiFilterTable"
    :data="tableData"
    :filterFields="filterFields"
    :columns="columns"
    :grayNonselectableRow="true")
    div(slot="column-name",slot-scope="scope") {{scope.value}}
    div(slot="column-age",slot-scope="scope") {{scope.value}}
</template>

<script>
import data4filter from './filterTableData'
export default {
  name: 'tableFilterMulti',
  components: {
  },
  data () {
    return {
      filterFields: [{
        name: 'name',
        label: 'input精确搜索',
        form: {
          tag: 'input',
          filterType: 'eq'
        }
      }, {
        name: 'position',
        label: 'input模糊搜索',
        form: {
          tag: 'input',
          filterType: 'like'
        }
      }, {
        name: 'office',
        label: 'select单选搜索',
        form: {
          tag: 'select',
          clearable: true,
          options: [
            { label: '衡水', value: 'hs' },
            { label: '咸宁', value: 'xn' },
            { label: '许昌', value: 'xc' }
          ]
        }
      }, {
        name: 'job',
        label: 'select多选搜索',
        form: {
          tag: 'select',
          multiple: true,
          clearable: true,
          options: [
            { label: '学生', value: 0 },
            { label: '教师', value: 1 },
            { label: '校长', value: 2 },
            { label: '程序员', value: 3 },
            { label: '医生', value: 4 },
            { label: '歌手', value: 5 },
            { label: '记者', value: 6 }
          ]
        }
      }, {
        name: 'age',
        label: 'numberRange范围搜索',
        form: {
          tag: 'numberRange'
        }
      }, {
        name: 'startDate',
        label: 'daterange日期范围搜索',
        form: {
          tag: 'date',
          dateType: 'daterange'
        }
      }, {
        name: 'endDate',
        label: 'datetimerange日期时间范围搜索',
        form: {
          tag: 'date',
          dateType: 'datetimerange'
        }
      }, {
        name: 'monthDate',
        label: 'monthrange月份范围搜索',
        form: {
          tag: 'date',
          dateType: 'monthrange'
        }
      }, {
        name: 'sex',
        label: 'radio单选搜索',
        form: {
          tag: 'radio',
          options: [
            { label: '男', value: 0 },
            { label: '女', value: 1 }
          ]
        }
      }, {
        name: 'hobby',
        label: 'checkbox多选搜索',
        form: {
          tag: 'checkbox',
          options: [
            { label: '马术', value: 1 },
            { label: '高尔夫', value: 2 },
            { label: '击剑', value: 3 }
          ]
        }
      }],
      tableData: data4filter,
      columns: [{
        name: 'name',
        label: 'input精确搜索'
      }, {
        name: 'position',
        label: 'input模糊搜索'
      }, {
        name: 'office',
        label: 'select单选搜索',
        render: { type: 'select' },
        options: [
          { label: '衡水', value: 'hs' },
          { label: '咸宁', value: 'xn' },
          { label: '许昌', value: 'xc' }
        ]
      }, {
        name: 'job',
        label: 'select多选搜索',
        render: { type: 'select' },
        options: [
          { label: '学生', value: 0 },
          { label: '教师', value: 1 },
          { label: '校长', value: 2 },
          { label: '程序员', value: 3 },
          { label: '医生', value: 4 },
          { label: '歌手', value: 5 },
          { label: '记者', value: 6 }
        ]
      }, {
        name: 'age',
        label: 'numberRange范围搜索',
        render: (value, field, data) => {
          return `${value}岁`
        }
      }, {
        name: 'startDate',
        label: 'daterange日期范围搜索',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD'
        }
      }, {
        name: 'endDate',
        label: 'datetimerange日期时间范围搜索',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD HH:mm:ss'
        }
      }, {
        name: 'monthDate',
        label: 'monthrange月份范围搜索',
        render: {
          type: 'time',
          timeType: 'YYYY-MM'
        }
      }, {
        name: 'sex',
        label: 'radio单选搜索',
        render: { type: 'select' },
        options: [
          { label: '男', value: 0 },
          { label: '女', value: 1 }
        ]
      }, {
        name: 'hobby',
        label: 'checkbox多选搜索',
        render: { type: 'multiselect' },
        options: [
          { label: '马术', value: 1 },
          { label: '高尔夫', value: 2 },
          { label: '击剑', value: 3 }
        ]
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_multi
  display: flex
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
