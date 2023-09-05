<template lang="pug">
//- 大数据表格
.big-table(v-scroll='onScrollLeft', v-resize:debounce.200='init', :style='{ width: width + "px", height: height + "px" }')
  //- 表头
  .big-table-head(v-if='hasHeader')
    .big-table-th(
      v-for='col in showColumns',
      :key='col.name',
      :style='{ width: col.width + "px", height: rowHeight + "px", lineHeight: rowHeight + "px", textAlign: col.headerAlign }',
      :class='col.className'
    ) {{ col.label }}

  //- 表体
  .big-table-body(v-scroll='onScrollTop', ref='bigTableBody', :style='{ width: tbodyWidth == 0 ? "auto" : scrollLeft + tbodyWidth + "px" }')
    div(:style='{ height: scrollHeight + "px", float: "left" }')

    //- 行容器
    .big-table-row-box(v-if='showData.length', :style='{ marginTop: scrollTop + "px" }')
      //- 行
      .big-table-row(
        v-for='(item, ri) in showData',
        :key='item._idx',
        :class='getRowClassName(item, ri)',
        :style='getRowStyle(item, ri)',
        @click='(ev) => rowClick(item, ev)',
        @dblclick='(ev) => rowDblclick(item, ev)',
        @mouseenter='(ev) => rowMouseEnter(item, ev)'
      )
        //- 单元格
        .big-table-td(
          v-for='(col, ci) in showColumns',
          :key='item._idx + "-" + col.name',
          :class='getCellClassName(item, col, ri, ci)',
          :style='getCellStyle(item, col, ri, ci)',
          @click='(ev) => cellClick(item, col, item[col.name], ev)',
          @dblclick='(ev) => cellDblclick(item, col, item[col.name], ev)',
          @mouseenter='(ev) => cellMouseEnter(item, col, item[col.name], ev)'
        ) {{ renderResult(item, col) }}

    //- 空数据提示
    .big-table-body-empty(v-else) {{ emptyText }}

  //- 合计行
  .big-table-foot(v-if='showSummary')
    .big-table-th(
      v-for='(col, fidx) in showFoot',
      :key='col.name',
      :style='{ width: showColumns[fidx].width + "px", height: rowHeight + "px", lineHeight: rowHeight + "px" }'
    ) {{ col }}
</template>

<script>
import resize from 'vue-resize-directive'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import isFunction from 'lodash/isFunction'
import tableProps from 'packages/AnsoDatatable/plugins/tableProps'
import fixed from 'packages/AnsoDatatable/plugins/fixed'

export default {
  name: 'AnsoBigDatatable',
  mixins: [tableProps, fixed],
  directives: {
    resize,
    // 滚动条指令, 用于获取
    scroll: {
      bind: function (el, binding) {
        el.addEventListener('scroll', function (ev) {
          binding.value(ev.target.scrollTop, ev.target.scrollLeft)
        })
      }
    }
  },
  props: {
    // 宽度
    width: {
      type: Number,
      default: -1
    },
    // 高度
    height: {
      type: Number,
      default: -1
    },
    // 行高
    rowHeight: {
      type: Number,
      default: 25
    },
    showSummary: {
      type: Boolean,
      default: false
    },
    summaryMethod: {
      type: Function
    }
  },
  computed: {
    theData () {
      let data2 = this.data || []

      // 添加序号
      data2 = data2.map((t, i) => {
        return {
          ...t,
          _idx: i + 1
        }
      })

      return data2
    },
    // 滚动宽度
    scrollWidth () {
      return this.showColumns.reduce((sum, n) => sum + n.width, 0)
    },
    // 滚动高度
    scrollHeight () {
      return (this.theData.length + 1) * this.rowHeight
    },
    // 表格真实显示的列
    showColumns () {
      let columns2 = []

      // 显示序号列
      if (this.showIndex) {
        columns2 = [
          {
            name: '_idx',
            label: this.indexColumnName,
            width: 60
          },
          ...this.columns
        ]
      }

      columns2 = columns2.map((t) => {
        return {
          ...t,
          width: t.width || 300 // 300-演示宽度
        }
      })

      return columns2
    },
    // 表体真实显示的内容
    showData () {
      const start = Number.parseInt(this.scrollTop / this.rowHeight)
      return this.theData.slice(start, start + this.rowNumber)
    },
    // 显示合计行
    showFoot () {
      let foots = []
      let sumFn = this.getSummaries
      if (isFunction(this.summaryMethod)) {
        sumFn = this.summaryMethod
      }
      foots = sumFn({
        columns: this.showColumns.map((t) => {
          return {
            ...t,
            property: t.name
          }
        }),
        data: this.theData
      })
      return foots
    }
  },
  watch: {
    rowHeight (val) {
      this.rowNumber = Number.parseInt(this.tbodyHeight / val)
    }
  },
  data () {
    return {
      // 表体宽度
      tbodyWidth: 0,
      // 表体高度
      tbodyHeight: 600,
      // 滚动条垂直位置
      scrollTop: 0,
      // 滚动条水平位置
      scrollLeft: 0,
      // 表格的行的数量
      rowNumber: 10,
      // 本地数据, 需配合 resource 请求接口获得
      allTableData: [],
      // 高亮行对象
      highRow: {
        key: 'id',
        value: '0'
      }
    }
  },
  mounted () {
    this.init()
  },
  activated () {
    this.init()
  },
  methods: {
    init () {
      this.tbodyWidth = 0
      this.$nextTick(() => {
        const tw = this.$refs.bigTableBody.offsetWidth
        const th = this.$refs.bigTableBody.offsetHeight

        // 设置表体的宽高度
        this.tbodyWidth = Math.min(tw, this.scrollWidth)
        this.tbodyHeight = th

        // 设置表格的行数
        this.rowNumber = Math.ceil(this.tbodyHeight / this.rowHeight)

        this.onScrollTop(0)
      })
    },
    // 供外部联动使用的
    setHighRow (row, key = 'id') {
      const idx = this.theData.findIndex((t) => t[key] === row[key])
      if (idx > -1) {
        this.highRow.key = key
        this.highRow.value = row[key]
        this.onScrollTop(idx * this.rowHeight)
        this.$refs.bigTableBody.scrollTop = this.scrollTop
      }
    },

    // 当某个单元格被点击时会触发该事件
    cellClick (row, col, cell, ev) {
      this.$emit('cellClick', row, col, cell, ev)
    },
    // 当某个单元格被双击时会触发该事件
    cellDblclick (row, col, cell, ev) {
      this.$emit('cellDblclick', row, col, cell, ev)
    },
    // 当单元格 hover 进入时会触发该事件
    cellMouseEnter (row, col, cell, ev) {
      this.$emit('cellMouseEnter', row, col, cell, ev)
    },

    // 当某一行被点击时会触发该事件
    rowClick (row, ev) {
      // 内置功能, 选中行
      this.highRow.value = row[this.highRow.key]

      // 外发事件
      this.$emit('rowClick', row, ev)
    },
    // 当某一行被双击时会触发该事件
    rowDblclick (row, ev) {
      this.$emit('rowDblclick', row, ev)
    },
    // 当某一行 hover 进入时会触发该事件
    rowMouseEnter (row, ev) {
      this.$emit('rowMouseEnter', row, ev)
    },

    // 获取数据行的样式名(合并内置样式名)
    getRowClassName (row, rowIndex) {
      const baseClass = this.highRow.value === row[this.highRow.key] ? 'active' : ''
      if (isFunction(this.rowClassName)) {
        const result = this.rowClassName({ row, rowIndex })
        if (result && isArray(result)) {
          return result.push(baseClass)
        } else {
          return baseClass
        }
      } else if (isArray(this.rowClassName)) {
        return this.rowClassName.push(baseClass)
      } else {
        return baseClass
      }
    },
    // 获取单元格的样式名
    getCellClassName (row, column, rowIndex, columnIndex) {
      if (isFunction(this.cellClassName)) {
        return this.cellClassName({ row, column, rowIndex, columnIndex })
      } else if (isArray(this.cellClassName)) {
        return this.cellClassName.join(' ')
      }
    },
    // 获取数据行的样式
    getRowStyle (row, rowIndex) {
      if (isFunction(this.rowStyle)) {
        return this.rowStyle({ row, rowIndex })
      } else {
        return this.rowStyle
      }
    },
    // 获取单元格的样式(合并内置样式)
    getCellStyle (row, column, rowIndex, columnIndex) {
      const baseStyle = { width: column.width + 'px', height: this.rowHeight + 'px', lineHeight: this.rowHeight + 'px', textAlign: column.align }

      if (isFunction(this.cellStyle)) {
        const result = this.cellStyle({ row, column, rowIndex, columnIndex })
        if (result && isArray(result)) {
          return result.push(baseStyle)
        } else if (result && isObject(result)) {
          return Object.assign(result, baseStyle)
        } else {
          return baseStyle
        }
      } else if (isObject(this.cellStyle)) {
        return [baseStyle, this.cellStyle]
      } else {
        return baseStyle
      }
    },

    // 垂直滚动事件
    onScrollTop (scrollTop, scrollLeft) {
      if (scrollTop + this.tbodyHeight < this.scrollHeight) {
        this.scrollTop = scrollTop
      } else {
        this.scrollTop = this.scrollHeight - this.tbodyHeight
        this.$refs.bigTableBody.scrollTop = this.scrollTop
      }
    },
    // 水平滚动事件
    onScrollLeft (scrollTop, scrollLeft) {
      this.scrollLeft = scrollLeft
    },

    // 值渲染
    renderResult (row, col) {
      const field = this.columnsObject[col.name]
      if (field) {
        return field.renderFormat(row[field.name], field, row)
      } else {
        return row[col.name]
      }
    },

    // 默认合计方法
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '合计'
          return
        }
        const values = data.map((item) => Number(item[column.property]))
        if (!values.every((value) => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => (!isNaN(Number(curr)) ? prev + curr : prev), 0)
        } else {
          sums[index] = ''
        }
      })
      return sums
    },

    tableDoLayout () {}
  }
}
</script>

<style lang="sass" scoped>
.big-table
  flex: 1
  display: flex
  overflow-x: auto
  overflow-y: hidden
  flex-direction: column
  color: #333
  font-size: 14px
  border: 1px solid #EBEEF5
  background-color: #fff

  .big-table-head
    display: flex
    background-color: #fff

    .big-table-th
      flex: none
      text-align: center
      overflow: hidden
      border-right: 1px solid #EBEEF5
      border-bottom: 1px solid #EBEEF5
      background-color: #F2F2F2

  .big-table-body
    flex: 1
    overflow-x: hidden
    overflow-y: auto
    border-right: 1px solid #EBEEF5

    .big-table-row-box

      .big-table-row
        display: flex

        &:hover
          background-color: #F5F5F5

        &.active
          background-color: #C6E2FF

        .big-table-td
          flex: none
          text-align: center
          overflow: hidden
          border-right: 1px solid #EBEEF5
          border-bottom: 1px solid #EBEEF5
          padding: 2px

    .big-table-body-empty
      color: #8c8c8c
      font-size: 16px
      width: 100%
      height: 100%
      display: flex
      justify-content: center
      align-items: center

  .big-table-foot
    display: flex
    background-color: #fff

    .big-table-th
      flex: none
      text-align: center
      overflow: hidden
      border-right: 1px solid #EBEEF5
      background-color: #F2F2F2
</style>
