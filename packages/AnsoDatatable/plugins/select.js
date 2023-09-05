// 表格单选、多选
import { find, isEmpty } from 'lodash'
import isFunction from 'lodash/isFunction'
/**
 * @rowKey {String} 行数据的key, 开启单选、多选、树表格、展开行表格时必填！！
 * @isSelection {Boolean} 多选开关
 * @reserveSelection {Boolean} 数据更新之后保留之前选中的数据开关
 * @highlightClickRow {Boolean} 单选-高亮当前选中行开关
 * @grayNonselectableRow {Boolean} 变灰不可选择行开关
 */
export default {
  props: {
    rowKey: {
      type: String,
      default: 'id'
    },
    isSelection: {
      type: Boolean,
      default: false
    },
    reserveSelection: {
      type: Boolean,
      default: true
    },
    highlightClickRow: {
      type: Boolean,
      default: false
    },
    grayNonselectableRow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      // 多选表格选中数据
      selectedTableDatas: [],
      // 单选表格选中数据
      currentRow: {}
    }
  },
  computed: {
    // 已勾选数
    selectedNum () {
      return this.selectedTableDatas.length
    }
  },
  methods: {
    tableRowClassName ({ row, rowIndex }) {
      return this.handleClassName(row, rowIndex)
    },
    handleClassName (row, rowIndex) {
      const greyType = this.grayNonselectableRow ? this.getGrayRowType(row, rowIndex) : []
      const className = isFunction(this.rowClassName) ? this.rowClassName(row, rowIndex) : this.rowClassName || []
      return [...greyType, ...className]
    },
    getGrayRowType (row, rowIndex) {
      const { selectable } = this.$refs.table.$attrs
      return selectable && !selectable(row, rowIndex) ? ['row-info', 'row-disabled'] : []
    },
    // 多选表格-清空所有已选中数据
    clearSelection () {
      this.$refs.table.clearSelection()
    },
    // 多选表格-勾选/取消勾选数据时触发该事件
    getSelectRow (rows, row) {
      this.$emit('selectRow', rows, row)
      const index = rows.findIndex(item => item === row)
      index === -1 ? this.$emit('removeSelect', rows, row) : this.$emit('addSelect', rows, row, index)
      // this.$nextTick(() => { // TODO 树表格多选
      //   if (this.isTree) this.treeToggleEvent(rows, row)
      // })
    },
    // 多选表格-勾选数据发生改变时触发该事件 TODO 树表格事件
    selectionChange (rows) {
      this.selectedTableDatas = rows
      // this.selectedTableDataKeys = rows.map(item => item[this.rowKey])
      // console.log('selectionChange', rows)
      this.$emit('selectionChange', rows)
    },
    // 多选表格-点击全选框时触发该事件
    selectAll (rows) {
      this.$emit('selectAll', rows)
      // if (!this.isTree) return // TODO 树表格多选
      // this.$nextTick(() => this.treeSelectAllEvent(rows))
    },
    /**
     * @name 多选表格-改变数据选中状态
     * @param {Array} row 需要改变选中状态的数据
     * @param {Boolean} selected 选中状态
     */
    toggleRowSelection (rows = [], selected = true) {
      this.$nextTick(() => rows.map(row => this.$refs.table.toggleRowSelection(row, selected)))
    },
    // 单选表格-表格的当前行发生变化的时候会触发该事件
    currentChange (curRow, oldRow) {
      if (this.isDisabledRow(curRow)) {
        this.setCurrentRow(oldRow)
        return // 置灰点击无效
      }
      this.currentRow = curRow
      this.$emit('currentChange', curRow, oldRow)
    },
    rowClick (row, column, event) {
      if (this.isDisabledRow(row)) return // 置灰点击无效
      this.$emit('rowClick', row, column, event)
    },
    rowDblClick (row, column, event) {
      if (this.isDisabledRow(row)) return // 置灰点击无效
      this.$emit('rowDblClick', row, column, event)
    },
    isDisabledRow (row) { // 判断当前行是否不可选
      const { selectable } = this.$refs.table.$attrs
      return !isEmpty(row) && selectable && !selectable(row)
    },
    /**
     * @name 单选表格-改变当前选中状态
     * @param {Object} curRow 需要选中的行数据（若无传选中行数据，则是取消选中已选择数据）
     */
    setCurrentRow (curRow) {
      if (!curRow) this.$refs.table.setCurrentRow()
      const findResult = find(this.toberenderTableData, curRow)
      if (findResult) this.$refs.table.setCurrentRow(curRow)
    }
  }
}
