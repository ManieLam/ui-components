<template lang="pug">
.anso-table
  span.chooseType 请选择需要查看的过滤类型
    AnsoDataformSelect.chooseselect(v-model='filterItem', :options="options")
    br
    span 配置有关于表单的相关内容： {{choosefilterFields[0].form}}
    br
  span.chooseType 设置当前列的过滤类型 （请在合理的范围内变更示例）
    AnsoDataformSelect.chooseselect(v-model='filtertypeValue', :options="filtertypeoptions")
    br
    span(style="color:red") 示例是方便展示相对应的过滤类型的效果，请在合理的范围内变更过滤类型
  hr
  AnsoDatatable(
    v-if="isFilterType"
    keyName="FilterType"
    ref="FilterType"
    :data="tableData"
    :filterFields="choosefilterFields"
    :columns="choosecolumns"
    :grayNonselectableRow="true")
</template>

<script>
import data4filter from './filterTableData'
import { keyBy, cloneDeep } from 'lodash'
export default {
  name: 'filterType',
  components: {
  },
  data () {
    return {
      filterItem: 'name',
      isFilterType: true,
      filtertypeValue: null,
      filtertypeoptions: [{
        label: 'eq: 等于',
        value: 'eq'
      }, {
        label: 'like: 类似',
        value: 'like'
      }, {
        label: 'in: 包含',
        value: 'in'
      }, {
        value: 'dates',
        label: 'dates：日期时间'
      }, {
        label: 'range：范围选择器控制范围',
        value: 'range'
      }],
      filterFields: [{
        name: 'name',
        label: 'input精确搜索: 默认eq',
        form: {
          tag: 'input',
          filterType: 'eq'
        }
      }, {
        name: 'position',
        label: 'input模糊搜索: like',
        form: {
          tag: 'input',
          filterType: 'like'
        }
      }, {
        name: 'office',
        label: 'select单选搜索: 默认eq',
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
        label: 'select多选搜索: 默认in',
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
        name: 'money',
        label: 'numberRange范围搜索: 默认range',
        form: {
          tag: 'numberRange'
        }
      }, {
        name: 'age',
        label: 'numberRange范围搜索: 默认range',
        form: {
          tag: 'textRange'
        }
      }, {
        name: 'startDate',
        label: 'daterange日期范围搜索: 默认dates',
        value: 'dates',
        form: {
          tag: 'date',
          dateType: 'daterange'
        }
      }, {
        name: 'endDate',
        label: 'datetimerange日期时间范围搜索: 默认dates',
        form: {
          tag: 'date',
          dateType: 'datetimerange'
        }
      }, {
        name: 'monthDate',
        label: 'monthrange月份范围搜索: 默认dates',
        form: {
          tag: 'date',
          dateType: 'monthrange'
        }
      }, {
        name: 'sex',
        label: 'radio单选搜索: 默认eq',
        form: {
          tag: 'radio',
          options: [
            { label: '男', value: 0 },
            { label: '女', value: 1 }
          ]
        }
      }, {
        name: 'hobby',
        label: 'checkbox多选搜索: 默认eq',
        form: {
          tag: 'checkbox',
          options: [
            { label: '马术', value: 1 },
            { label: '高尔夫', value: 2 },
            { label: '击剑', value: 3 }
          ]
        }
      }, {
        name: 'classification',
        label: '行业',
        form: {
          tag: 'cascader',
          showAllLevels: false,
          multiple: true,
          // collapseTags: false,
          options: [
            {
              value: 1,
              label: '农、林、牧、渔业',
              parentId: 0
            },
            {
              value: 2,
              label: '采矿业',
              parentId: 1
            },
            {
              value: 3,
              label: '制造业',
              parentId: 1
            },
            {
              value: 22,
              label: '林业',
              parentId: 1
            },
            {
              value: 23,
              label: '畜牧业',
              parentId: 1
            },
            {
              value: 24,
              label: '渔业',
              parentId: 1
            },
            {
              value: 25,
              label: '农、林、牧、渔专业及辅助性活动',
              parentId: 1
            }
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
        name: 'money',
        label: 'numberRange范围搜索',
        render: (value, field, data) => {
          return `${value}`
        }
      }, {
        name: 'age',
        label: 'textRange范围搜索',
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
      }, {
        name: 'classification',
        label: '行业',
        form: {
          tag: 'cascader',
          showAllLevels: false,
          multiple: true,
          // collapseTags: false,
          options: [
            {
              value: 1,
              label: '农、林、牧、渔业',
              parentId: 0
            },
            {
              value: 2,
              label: '采矿业',
              parentId: 1
            },
            {
              value: 3,
              label: '制造业',
              parentId: 1
            },
            {
              value: 22,
              label: '林业',
              parentId: 1
            },
            {
              value: 23,
              label: '畜牧业',
              parentId: 1
            },
            {
              value: 24,
              label: '渔业',
              parentId: 1
            },
            {
              value: 25,
              label: '农、林、牧、渔专业及辅助性活动',
              parentId: 1
            }
          ]
        }
      }],
      options: [{
        label: 'input精确搜索: 默认eq',
        value: 'name'
      }, {
        label: 'input模糊搜索: 配置filterType: like',
        value: 'position'
      }, {
        label: 'select单选搜索: 默认eq',
        value: 'office'
      }, {
        value: 'job',
        label: 'select多选搜索: 默认in'
      }, {
        label: 'numberRange范围搜索: 默认range',
        value: 'money'
      }, {
        label: 'textRange范围搜索: 默认range',
        value: 'age'
      }, {
        label: 'daterange日期范围搜索: 默认dates',
        value: 'startDate'
      }, {
        value: 'endDate',
        label: 'datetimerange日期时间范围搜索: 默认dates'
      }, {
        value: 'monthDate',
        label: 'monthrange月份范围搜索: 默认dates'
      }, {
        value: 'sex',
        label: 'radio单选搜索: 默认eq'
      }, {
        value: 'hobby',
        label: 'checkbox多选搜索: 默认eq'
      }, {
        value: 'classification',
        label: 'cascader 多选'
      }]
    }
  },
  computed: {
    choosefilterFields () {
      const config = cloneDeep(this.filterFields)
      const itemObject = keyBy(config, 'name')[this.filterItem]
      console.log(itemObject)
      const data = {
        label: `当前过滤类型已变更为: ${this.filtertypeValue}`,
        form: {
          ...itemObject.form,
          filterType: this.filtertypeValue
        }
      }
      // console.log([{...itemObject, ...data}], [keyBy(config, 'name')[this.filterItem]])
      return this.filtertypeValue ? [{ ...itemObject, ...data }] : [keyBy(config, 'name')[this.filterItem]]
    },
    choosecolumns () {
      const config = cloneDeep(this.columns)
      return [keyBy(config, 'name')[this.filterItem]]
    }
  },
  watch: {
    filterItem (value) {
      this.isFilterType = false
      this.$nextTick(() => {
        this.isFilterType = true
      })
    }
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
  .chooseType
    padding: 8px
    background: #fff
    padding-bottom: 20px
    .chooseselect
      width: 450px
      padding-bottom: 8px
</style>
