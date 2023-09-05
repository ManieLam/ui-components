<template lang='pug'>
el-table.dataform-body__table(
  size="small"
  ref="tableBody"
  :stripe="true"
  :border="true"
  :data="tableData"
  :select-on-indeterminate="false"
  @select="selectChange"
  @select-all="clearAllSelection")
  el-table-column(
    v-if="isSelect"
    type="selection"
    width="40"
    :selectable="getSelectable")
  slot(name="body-header",:formData="formData")
  el-table-column.body-column__table(
    v-for="(column, index) in selfColumn.static"
    v-show="field.form.visabled!==false"
    :key="`tableColumn_${index}`"
    :label="column.label")
    template(slot-scope="scope")
      span(:is-required="scope.$index|filterRequired(formFields, column.name)") {{scope.row[column.name]}}
  slot(name="body-footer",:formData="formData")
  //- 嵌套表单部分
  el-table-column.body-column__table(
    :label="selfColumn.form.label")
    template(slot-scope="scope")
      AnsoDataformItem.form-tablebody-item__inline(
        :key="formFields[scope.$index].name"
        :labelHidden="true"
        :field="formFields[scope.$index]"
        :formItemProp="formItemProp"
        v-model="formData[formFields[scope.$index].name]"
        v-on="$listeners"
        v-bind="$attrs"
        @onValueChange="onValueChange"
        @change="onHandleChange($event, scope)"
        @input="$emit('input', $event, field)")
</template>

<script>
/** */
import AnsoDataformItem from '../AnsoDataformItem'
// import check from './plugins/check'
export default {
  name: 'FormBodyCompared',
  // mixins: [check],
  components: {
    AnsoDataformItem
  },
  props: {
    isSelect: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true,
      default: () => ([])
    },
    formFields: {
      type: Array,
      required: true,
      default: () => ([])
    },
    tableData: {
      type: Array,
      default: () => ([])
    },
    formData: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      formItemProp: {
        'inline-message': true
      }
    }
  },
  filters: {
    filterRequired (index, column, colname) {
      if (colname !== 'title') return false
      const form = column[index].form || {}
      const rules = form.rules || []
      return rules.some(rule => rule.required)
    }
  },
  computed: {
    selfColumn () {
      return {
        static: this.columns.slice(0, this.columns.length - 1),
        form: this.columns[this.columns.length - 1]
      }
    }
  },
  methods: {
    // 针对联动数据被修改而不会触发element的change方法
    onValueChange (field, value, oldValue) {
      const scopeObj = this.tableData.reduce((res, list, index) => {
        if (list.name === field.name) {
          res.row = list
          res.$index = index
        }
        return res
      }, { row: {}, $index: 0 })
      this.onHandleChange(value, scopeObj)
    },
    // 重写element的change方法
    onHandleChange (value, scope) {
      const { row, $index } = scope
      // 增加内置的高亮多选框,标识已修改
      const hasChange = this.checkItemChange(row.origin, value)
      this.$emit('onChange', this.formFields[$index], value)
      this.$set(row, '__allowSelect', hasChange)
      this.$nextTick(() => {
        this.$refs.tableBody.toggleRowSelection(row, hasChange)
      })
    },
    checkItemChange (origin, change) {
      if (!origin && !change) return false
      return String(origin) !== String(change)
    },
    getSelectable (row, index) {
      return row.__allowSelect
    },
    selectChange (selection, row) {
      // console.log('selection:', selection)
      const isCurChange = selection.length > 0 && selection.indexOf(row) > -1
      // 已修改项允许取消勾选
      this.$set(row, '__allowSelect', isCurChange)
      if (!isCurChange) {
        // 取消单项修改恢复原值
        // this.$set(row, this.changekey, row.origin)
        this.$emit('resetField', row)
      }
    },
    clearAllSelection (selections) {
      // 取消所有项修改
      const rowDatas = selections && selections.length ? selections : this.$refs.tableBody.tableData
      this.$nextTick(() => {
        this.$refs.tableBody.clearSelection()
        rowDatas.map(selection => {
          this.$set(selection, '__allowSelect', false)
          this.$emit('resetField', selection)
        })
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.form-tablebody-item__inline
  display: flex
  margin: 0 auto
</style>
