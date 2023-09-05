/**
 * @defaultColumnList {Array} 表格所有列（不配置时，则展示columns配置的所有列）
 * @defaultFixedLeft {Array} 表格默认左固定列
 * @defaultFixedRight {Array} 表格默认右固定列
 * @defaultVisibleList {Array} 表格默认展示列
 */
export default {
  props: {
    defaultColumnList: {
      type: Array
    },
    defaultFixedLeft: {
      type: Array,
      default: () => []
    },
    defaultFixedRight: {
      type: Array,
      default: () => []
    },
    defaultVisibleList: {
      type: Array
    }
  },
  data () {
    const columnList = this.columns.map(({ name }) => name)
    return {
      columnList: this.defaultColumnList || columnList,
      fixedLeft: this.defaultFixedLeft,
      fixedRight: this.defaultFixedRight,
      visibleList: this.defaultVisibleList || columnList,
      // 列设置展示
      showColumnFilter: false
    }
  },
  filters: {
    fixedFilter (name, fixedLeft, fixedRight) {
      return fixedLeft.includes(name) ? 'left' : fixedRight.includes(name) ? 'right' : false
    }
  },
  methods: {
    visibleFilter (name) {
      return this.visibleList.includes(name)
    },
    // 获取列配置
    setColumnData ({ columnList, fixedLeft, fixedRight, visibleList }) {
      this.columnList = columnList
      this.fixedLeft = fixedLeft
      this.fixedRight = fixedRight
      this.visibleList = visibleList
      this.closeColumnFilter()
      this.tableDoLayout()
    },
    closeColumnFilter () {
      this.showColumnFilter = false
    }
  }
}
