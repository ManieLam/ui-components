<template lang="pug">
.anso-table
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
    :border="false"
    :operateBorder="false"
    :grayNonselectableRow="true"
    operationWidth="120"
    :settingButtonList="settingButtonList"
    :operateButtonList="operateButtonList"
    :toolbarButtonList="toolbarButtonList"
    @changeFilterBy="changeFilterBy")
</template>

<script>
// 综合表格
import data from '@/views/Table/Basic/complexTableData.json'
import cloneDeep from 'lodash/cloneDeep'
import { officeRelation } from '@/views/Table/Basic/complexConfig'

export default {
  name: 'tableBasicComplex',
  data () {
    return {
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
          tag: 'textRange'
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
        align: 'left',
        label: '居住地址'
      }, {
        name: 'office',
        label: '工作城市',
        align: 'left',
        options: officeRelation,
        render: {
          type: 'select'
        }
      }, {
        name: 'age',
        label: 'Age',
        sortable: true,
        align: 'left',
        render: (value, field, data) => {
          return `${value}岁`
        }
      }, {
        name: 'job',
        label: '职务',
        align: 'left',
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
        align: 'left',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD'
        }
      }, {
        name: 'salary',
        align: 'left',
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
        // showabled: (row) => {
        //   return Boolean(row.age % 3)
        // },
        visabled: (row) => {
          return Boolean(row.age % 3)
        },
        func: (button, row) => {
          const index = this.tableData.indexOf(row)
          this.tableData.splice(index, 1)
        }
      }, {
        label: '详情',
        name: 'detail',
        type: 'text',
        textType: 'primary',
        func: (button, row) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(10000)
            }, 1000)
          }).then(res => {
          })
        }
      }],
      // 表格工具栏配置
      toolbarButtonList: [{
        label: '新增',
        name: 'add',
        type: 'primary',
        icon: 'jia',
        specsSize: '14px',
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
        specsSize: '14px',
        func: () => {
        }
      },
      {
        label: '更多操作',
        name: 'more',
        icon: 'xiala',
        iconAlign: 'right',
        specsSize: '14px',
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
        icon: 'sousuo',
        specsSize: '20px',
        tooltip: {
          content: '搜索',
          placement: 'top'
        },
        func: (button) => {
        }
      }],
      // 以下是表单配置
      formTitle: '',
      drawer: false,
      formData: {},
      initFormData: {},
      formFields: [{
        name: 'name',
        label: '姓名',
        form: {
          tag: 'input',
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'position',
        label: '居住地址',
        form: {
          tag: 'input',
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'office',
        label: '工作城市',
        form: {
          tag: 'select',
          clearable: true,
          options: officeRelation,
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'age',
        label: '年龄',
        form: {
          tag: 'number',
          rules: [{ required: true, message: '必填' }]
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
          ],
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'salary',
        label: '薪资',
        form: {
          tag: 'number',
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'startDate',
        label: '入职日期',
        form: {
          tag: 'date',
          rules: [{ required: true, message: '必填' }]
        }
      }],
      formButtonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (form) => {
          return this.formTitle === '编辑' ? this.editData(form) : this.addData(form)
        }
      }, {
        label: '重置',
        func: () => {
          this.resetForm()
        }
      }]
    }
  },
  methods: {
    changeFilterBy (filterBy) {
      console.log('filterBy:', filterBy)
    }
  },
  mounted () {
  },
  created () {
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
  .drawer
    ::v-deep
      .el-drawer__header
        margin: 0
  .drawerForm
    padding: 0 20px
    ::v-deep
      .el-form-item
        margin: 8px 0
</style>
