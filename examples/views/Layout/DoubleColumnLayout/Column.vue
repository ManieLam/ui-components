<template lang="pug">
AnsoDoubleColumnLayout(
  direction="column"
  v-model="show")
  .wrapper-list(slot="main")
    AnsoDatatable(
      rowKey="name"
      keyName="synthesisTable"
      ref="synthesisTable"
      :showIndex="true"
      :data="tableData"
      :filterFields="filterFields"
      :defaultSortBy="defaultSortBy"
      :columns="columns"
      :defaultPageSize="25"
      :pageSizes="[25, 50, 100, 200]"
      :reserveSelection="true"
      :isSelection="true"
      :grayNonselectableRow="true"
      :settingButtonList="settingButtonList"
      :operateButtonList="operateButtonList"
      :toolbarButtonList="toolbarButtonList")
  .wrapper-list(slot="sub")
    AnsoDatatable(
      rowKey="names"
      keyName="synthesisTables"
      ref="synthesisTables"
      :showIndex="true"
      :data="tableData"
      :filterFields="filterFields"
      :defaultSortBy="defaultSortBy"
      :columns="columns"
      :defaultPageSize="25"
      :pageSizes="[25, 50, 100, 200]"
      :reserveSelection="true"
      :isSelection="true"
      :grayNonselectableRow="true"
      :settingButtonList="settingButtonList"
      :operateButtonList="operateButtonList"
      :toolbarButtonList="toolbarButtonList")
</template>

<script>
import remove from 'lodash/remove'
import cloneDeep from 'lodash/cloneDeep'
import data from '@/views/Table/Basic/complexTableData.json'
import { officeRelation } from '@/views/Table/Basic/complexConfig'
export default {
  name: 'column',
  data () {
    return {
      show: 'both',
      // 搜索表单字段配置
      filterFields: [{
        name: 'name',
        label: '姓名',
        form: {
          tag: 'input'
        }
      }, {
        name: 'position',
        label: '居住地址',
        form: {
          tag: 'input',
          filterType: 'like'
        }
      }, {
        name: 'office',
        label: '工作城市',
        form: {
          tag: 'select',
          multiple: true,
          clearable: true,
          options: officeRelation
        }
      }, {
        name: 'age',
        label: '年龄',
        form: {
          tag: 'numberRange'
        }
      }, {
        name: 'job',
        label: '职务',
        form: {
          tag: 'select',
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
        name: 'salary',
        label: '薪资',
        form: {
          tag: 'numberRange'
        }
      }, {
        name: 'startDate',
        label: '入职日期',
        form: {
          tag: 'date',
          dateType: 'daterange'
        }
      }],
      // 表格数据
      tableData: data,
      // 表格字段配置
      columns: [{
        name: 'name',
        label: '姓名',
        align: 'left',
        sortable: true
      }, {
        name: 'position',
        label: '居住地址'
      }, {
        name: 'office',
        label: '工作城市',
        align: 'right',
        options: officeRelation,
        render: {
          type: 'select'
        }
      }, {
        name: 'age',
        label: 'Age',
        sortable: true,
        render: (value, field, data) => {
          return `${value}岁`
        }
      }, {
        name: 'job',
        label: '职务',
        options: [
          { label: '学生', value: 0 },
          { label: '教师', value: 1 },
          { label: '校长', value: 2 },
          { label: '程序员', value: 3 },
          { label: '医生', value: 4 },
          { label: '歌手', value: 5 },
          { label: '记者', value: 6 }
        ],
        render: {
          type: 'select'
        }
      }, {
        name: 'startDate',
        label: '入职日期',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD'
        }
      }, {
        name: 'salary',
        label: '年薪'
      }],
      // 表格默认排序配置
      defaultSortBy: [{
        prop: 'age',
        order: 'descending'
      }],
      // 表格操作列配置
      operateButtonList: [{
        label: '编辑',
        name: 'edit',
        type: 'text',
        textType: 'primary',
        disabled: (row) => {
          return Boolean(row.age % 2)
        },
        func: (button, row) => {
          this.formTitle = '编辑'
          this.formData = cloneDeep(row)
          this.initFormData = cloneDeep(row)
          this.drawer = true
        }
      }, {
        label: '删除',
        name: 'delete',
        type: 'text',
        textType: 'primary',
        showabled: (row) => {
          return Boolean(row.age % 3)
        },
        func: (button, row) => {
          console.log(row)
          remove(this.tableData, (data) => {
            return data.name === row.name
          })
          this.refreshTable()
        }
      }, {
        label: '详情',
        name: 'detail',
        type: 'text',
        textType: 'primary',
        func: (button, row) => {
          console.log(row)
        }
      }],
      // 表格工具栏配置
      toolbarButtonList: [{
        label: '新增',
        name: 'add',
        type: 'primary',
        icon: 'jia',
        func: (button) => {
          this.formTitle = '新增'
          this.formData = {}
          this.initFormData = {}
          this.drawer = true
        }
      },
      {
        label: '批量新增',
        name: 'multiAdd',
        type: 'primary',
        icon: 'jia',
        func: () => {
        }
      },
      {
        label: '更多操作',
        name: 'more',
        icon: 'xiala',
        iconAlign: 'right',
        dropdownButtons: [{
          label: '批量编辑',
          name: 'multiEdit',
          func: () => {}
        }, {
          label: '批量删除',
          name: 'multiDelete',
          func: () => {}
        }]
      }],
      // 表格设置栏配置
      settingButtonList: ['refresh', 'download', 'lineHeightSetter', 'columnFilter', {
        name: 'search',
        type: 'text',
        textType: 'info',
        specsSize: '20px',
        icon: 'sousuo',
        tooltip: {
          content: '搜索',
          placement: 'top'
        },
        func: (button) => {
        }
      }]
    }
  }
}
</script>

<style lang="sass" scoped>
// .doubleColumnLayout
//   // width: 100%
//   // height: 100%
.wrapper-list
  width: 100%
  height: 100%
  overflow: hidden
  padding: 24px
  .tableData
    display: inline-block
    width: 100%
    height: 100%
</style>
