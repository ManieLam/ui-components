<template lang="pug">
  .datatable-main(:id="`${keyName}-table-wrap`")
    slot(name="perpend")
    slot(name="header")
      .datatablepage-header
        slot(name="filter")
          .datatablepage-filter-wrapper(
            v-if="filterFields.length")
            slot(name="filter-header")
            AnsoDataform.datatablepage-filter(
              ref="filterForm"
              type="inline"
              :keyName="`${keyName}-filter`"
              :collapsable="true"
              :value="filterBy"
              :formFields="filterFields"
              :buttonList="filterButtonList"
              :collapseAllMultiTags="true"
              @collapseClick="filterFormCollapse")
              template(v-slot:body-header="{formData}")
                slot(name="filter-left",:formData="formData")
              template(v-slot:body-footer="{formData}")
                slot(name="filter-right",:formData="formData")
            slot(name="filter-footer")
    .datatable-table-wrapper
      slot(name="prep")
        slot(name="prep-header")
        .datatablepage-prep(v-if="hasHeader")
          slot(name="filter-info-left")
          slot(name="filter-info")
            .datatablepage-filter-info(v-show="filterByArray.length")
              | 筛选：
              el-tag(
                v-for="filter in filterByArray"
                :key="`filter-${filter.key}`"
                size="small"
                type="info"
                effect="plain"
                closable
                @close="filterFormRemove(filter.key)") {{filter.value | renderTag(filterFieldsObject[filter.key].form)}}
          slot(name="filter-info-right")
          slot(name="toolbar-left")
          slot(name="toolbar")
            .datatablepage-toolbar(v-if="renderToolbarButtonList.length")
              AnsoButtonGroup(:keyName="`${keyName}-toolbar`", :buttonList="renderToolbarButtonList")
          slot(name="toolbar-divider")
            .datatablepage-prep-hack(v-if="renderToolbarButtonList.length && renderSettingButtonList.length")
              el-divider(direction="vertical")
          slot(name="setting")
            .datatablepage-setting(v-if="renderSettingButtonList.length")
              AnsoButtonGroup(:keyName="`${keyName}-setting`",:buttonList="renderSettingButtonList")
          slot(name="toolbar-right")
        slot(name="prep-footer")
      el-table.datatable-table(
        :class="{'noBorder': !border}"
        ref="table"
        v-bind="$attrs"
        v-on="$listeners"
        v-loading="loading"
        v-resize:debounce.1000="getTableHeight"
        element-loading-text="加载中..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.3)"
        element-loading-custom-class="loading-customClass"
        :height="height"
        :id="keyName"
        :row-key="rowKey"
        :data="resultrenderTableData"
        :size="size"
        :border="border"
        :default-sort="defaultSortBy[0]"
        :empty-text="defaultEmptyText"
        :row-class-name="tableRowClassName"
        :row-style="rowStyle"
        :cell-class-name="cellClassName"
        :cell-style="cellStyle"
        :highlight-current-row="highlightClickRow"
        :load="lazyTreeLoad"
        :tree-props="{children: childrenKey, hasChildren: hasChildrenKey}"
        :expand-row-keys="renderExpandRowKeys"
        :default-expand-all="expandAll"
        :header-cell-class-name="handleTheadAddClass"
        @select="getSelectRow"
        @select-all="selectAll"
        @selection-change="selectionChange"
        @current-change="currentChange"
        @row-click="rowClick"
        @row-dblclick="rowDblClick"
        @expand-change="expandChange"
        @sort-change="sortChange")
        el-table-column(
          v-if="isSelection"
          class-name="selectBox"
          type="selection"
          :width="selectionWidth"
          row-key="id"
          :fixed="true"
          :reserve-selection="reserveSelection"
          :selectable="$attrs.selectable")
        el-table-column(
          v-if="isExpand"
          type="expand")
          template(slot-scope="scope")
            slot(
              name="col-expand"
              :row="scope.row")
        slot(name="left")
        el-table-column(
          v-if="showIndex"
          type="index"
          :fixed="fixedLeft.length>0?'left':false"
          width="50"
          :label="indexColumnName"
          :index="columnIndex")
        TableColumn(
          v-for="(name,index) in columnList"
          v-if="visibleFilter(name)"
          :key="`${keyName}-table-column-${name}`"
          :name="name"
          :keyName="`${keyName}-table-column-${name}`"
          :columnsObject="columnsObject"
          :showOverflowTooltip="showOverflowTooltip"
          :fixed="name|fixedFilter(fixedLeft, fixedRight)")
          template(:slot="`column-${name}-header`", slot-scope="scope")
            slot(:name="`column-${name}-header`", :column="scope.column")
          template(:slot="`column-${name}`", slot-scope="scope")
            slot(:name="`column-${name}`", :column="scope.column", :row="scope.row", :value="scope.value")
        slot
        el-table-column(
          v-if="renderOperateButtonList.length"
          label="操作"
          fixed="right"
          class-name="operation-column"
          :width="operationWidth")
          template(slot="header",slot-scope="scope")
            slot(name="operate")
              span 操作
          template(slot-scope="scope")
            .datatablepage-operate
              AnsoButtonGroup(
                :needDivider="operateBorder"
                :buttonList="renderOperateButtonList"
                :data="scope.row"
                :keyName="`${keyName}-column-operation`")
        slot(name="right")
      slot(name="footer")
        .datatablepage-footer(
          :id="`${keyName}-footer`"
          v-if="hasFooter")
          slot(name="info")
            .datatablepage-info
              .selected-info(v-if="isSelection") 已选择#[strong.select-num {{selectedNum}}]项
          slot(name="pagination")
            el-pagination.datatablepage-pagination(
              v-if="hasPage"
              :pager-count="pagerCount"
              @size-change="pageSizeChange"
              @current-change="pageIndexChange"
              :current-page.sync="pageIndex"
              :page-sizes="pageSizes"
              :page-size="pageSize"
              :layout="paginationLayout"
              :total="toberenderShowTotal"
              :id="`${keyName}-pagination`")
              span.el-pagination__total 共 {{ toberenderTotal }} 条
    slot(name="append")
    ColumnFilter(
      v-if="showColumnFilter"
      v-model="showColumnFilter"
      v-on="$listeners"
      :columnsObject="columnsObject"
      :columnList="columnList"
      :fixedLeft="fixedLeft"
      :fixedRight="fixedRight"
      :visibleList="visibleList"
      @setColumnData="setColumnData"
      @close="closeColumnFilter")
</template>
<script>
import resize from 'vue-resize-directive'
import { slice, orderBy } from 'lodash'

import TableColumn from './TableColumn'
import ColumnFilter from './columnFilter'

import tableProps from './plugins/tableProps'
import filterForm from './plugins/filterForm'
import getTableData from './plugins/getTableData'
import fixed from './plugins/fixed'
import buttonList from './plugins/buttonList'
import filterByStatic from './plugins/filterByStatic.js'
import select from './plugins/select.js'
import bigData from './plugins/bigData.js'
import expand from './plugins/expand.js'
import { tagRenderType, tagRenderList } from './plugins/tagRender'
import tree from './plugins/tree.js'
import { treeFormat } from 'packages/utils/tree.js'
import { getCell, getColumnByCell, hasClass, getStyle } from './plugins/element-utils.js'
export default {
  name: 'AnsoDatatable',
  mixins: [
    tableProps,
    filterForm,
    getTableData,
    fixed,
    buttonList,
    select,
    bigData,
    tree,
    expand
  ],
  components: { ColumnFilter, TableColumn },
  directives: {
    resize
  },
  filters: {
    renderTag (value, fileId) {
      return tagRenderList[tagRenderType(fileId)](value, fileId)
    }
  },
  data () {
    return {
      // 通过接口读取到的数据
      tableData: [],
      // 通过接口读取到或者从data获取到的数据，存储在表格里给渲染前计算
      allTableData: [],
      // 每页记录数
      pageSize: this.defaultPageSize || this.pageSizes[0],
      // 页码
      pageIndex: this.defaultpageIndex,
      // 排序
      sortBy: this.defaultSortBy,
      // 合计数
      total: 0,
      // loading状态
      loading: false
      // cellClassName: ({ column }) => {
      //   return column.label === '操作' ? 'operation-column' : ''
      // }
    }
  },
  computed: {
    // 渲染的data，如果serverSide为true，直接读tableData，如果不是读pagedTableData
    toberenderTableData () {
      const renderTableData = this.serverSide
        ? this.tableData
        : this.pagedTableData
      return !this.isTree
        ? renderTableData
        : treeFormat(
          renderTableData,
          this.rowKey,
          this.parentKey,
          this.childrenKey
        )
    },
    // 如果serverSide为true，直接读total，如果不是读filteredRecords
    toberenderTotal () {
      return this.serverSide ? this.total : this.filteredRecords
    },
    // 如果表格真实总数量 > 限制的表格数据最大数量 el-pagination 的total传入限制的表格数据最大数量
    toberenderShowTotal () {
      return Number(this.toberenderTotal) > Number(this.maxTableTotal) ? this.maxTableTotal : this.toberenderTotal
    },
    // 如果表格真实总数量 > 限制的表格数据最大数量 el-pagination 的total显示自定义的效果
    paginationLayout () {
      return Number(this.toberenderTotal) > Number(this.maxTableTotal) ? 'slot, sizes, prev, pager, next, jumper' : 'total, sizes, prev, pager, next, jumper'
    },
    // 已分页的数据，pageIndex或pageSize或sortedTableData变动时变动
    pagedTableData () {
      const end = this.pageIndex * this.pageSize
      return !this.hasPage || !this.hasFooter
        ? this.sortedTableData
        : slice(this.sortedTableData, end - this.pageSize, end)
    },
    // 已排序的数据，sortBy或filteredTableData变动时变动
    sortedTableData () {
      if (this.sortBy.length) {
        const props = this.sortBy.map(({ prop }) => prop)
        const orders = this.sortBy.map(({ order }) =>
          order.substring(0, order.length - 6)
        )
        return orderBy(this.filteredTableData, props, orders)
      } else {
        return this.filteredTableData
      }
    },
    // 已过滤的数据，(allTableData或filterBy或filterFieldsObject变动时变动)
    filteredTableData () {
      return filterByStatic({
        datas: this.allTableData,
        filterBy: this.filterBy,
        columns: this.filterFieldsObject
      })
    },
    // 过滤完的数量，filteredTableData变动时变动
    filteredRecords () {
      return this.filteredTableData.length
    },
    // 是否有查询条件
    hasFilterBy () {
      return !!Object.keys(this.filterBy).length
    },
    // 是否可以获取数据，目前的规则是，被动查询的表格在无查询条件的情况下不可以做查询
    canGetData () {
      return !this.isPassive || this.hasFilterBy
    },
    // 表格组件本身有数据，但搜索结果为空的情况下，提示文字改为“没有查询到符合条件的记录”
    defaultEmptyText () {
      // 1.如果有搜索条件，搜不到数据，提示文字改为“没有查询到符合条件的记录”
      // 需要考虑表单重置后许多字段输出null的情况(this.filterBy已经做了过滤无效值的控制filterForm.js)
      // 2.其它情况全部走默认提示语this.emptyText
      if (this.loading) return ' '
      if (!this.canGetData) return this.notqueryText
      if (this.hasFilterBy && !this.resultrenderTableData.length) return '没有查询到符合条件的记录'
      return this.emptyText
    }
  },
  mounted () {
    this.init()
    // 初始化后，需要对表格重新计算布局，否则右固定列会挡住前面一列的右边框
    this.tableDoLayout()
    // 监听滚动事件
    this.scrollListener()
    // 为了实现tooltip不消失，重置element表格离开方法
    this.removehandleCellMouseLeave()
  },
  watch: {
    size () {
      // 解决改变表格行高，存在固定列，垂直滚动条从有变无/从无变有时，固定列错位问题
      this.tableDoLayout()
    },
    // 监听表格渲染数据变化
    toberenderTableData () {
      this.watchRenderTableDataChange()
    },
    // pageSize、sortBy或filterBy变化时pageIndex设置为1，同时如果serverSide为true，getTableData
    pageSize () {
      this.watchPageChange()
    },
    filterBy () {
      this.watchPageChange()
    },
    sortBy () {
      this.watchPageChange()
    },
    data: {
      deep: true,
      handler (value) {
        // 如果使用接口请求数据，则外部传入的数据不影响allTableData
        if (!this.resource) this.allTableData = value
      }
    }
  },
  methods: {
    init () {
      // 判断是否有传入数据且不使用接口请求数据，如果有，将页面的allTableData设置为传入数据
      if (this.data && !this.resource) {
        this.allTableData = this.data
      }
      // 判断页面加载时是否不要加载数据，如果不要第一时间加载数据，则跳出（待处理）
      // 判断页面是否绑定接口，如果是则跳出
      if (!this.resource) return
      // 判断页面是被动查询，如果是且无查询条件的情况下则跳出
      if (!this.canGetData) return
      // 判断是否服务端分页，如果是，则是则按页面状态获取数据，如果不是则getTableData时获取资源所有数据并传进allTableData
      if (this.serverSide) {
        this.getTableData()
      } else {
        this.getAllTableData()
      }
    },
    // 序号事件
    columnIndex (index) {
      return (
        index +
        this.pageIndex * this.pageSize -
        this.pageSize +
        1 +
        this.renderStartRowIndex
      )
    },
    // 监视表格数据变化
    watchRenderTableDataChange () {
      // 表格数据发生改变时，重新高亮currentRow
      if (Object.keys(this.currentRow).length) { this.setCurrentRow(this.currentRow) }
      // 树状表格的数据在发生变化（刷新、重新请求数据）后，须清空已选数据，然后重新勾选
      // this.$nextTick(() => {
      //   if (this.isTree && this.selectedTableDatas.length) this.treeReselect()
      // })
    },
    // 监视页面变化，方便watch调用
    watchPageChange () {
      if (!this.canGetData) return
      // pageSize、sortBy或filterBy变化时pageIndex设置为1
      this.pageIndex = 1
      // 同时如果serverSide为true，getTableData
      if (this.serverSide) {
        this.getTableData()
      }
    },
    // 改变页码
    pageIndexChange (val) {
      // 改变页码
      this.pageIndex = val
      // 同时如果serverSide为true，getTableData
      if (this.serverSide) {
        this.getTableData()
      }
    },
    // 改变当页显示条目数
    pageSizeChange (val) {
      this.pageSize = val
    },
    // 改变排序数据
    sortChange (sortBy) {
      const tmp = this.sortBy.filter(({ prop }) => prop !== sortBy.prop)
      this.sortBy = sortBy.order ? [sortBy, ...tmp] : tmp
      this.$emit('changeSortBy', this.sortBy)
    },
    // 排序数据添加头部样式
    handleTheadAddClass ({ row, column, rowIndex, columnIndex, sortBy = this.sortBy }) {
      const FindOrder = sortBy.find(({ prop }) => { return prop === column.property })
      if (FindOrder) {
        return `active-thead-${FindOrder.order}`
      }
    },
    // 表格宽高计算
    tableDoLayout () {
      this.$nextTick(() => {
        this.$refs.table.doLayout()
      })
    },
    filterFormCollapse (isCollapse) {
      if (!isCollapse) this.tableDoLayout()
    },
    // 为了实现tooltip不消失，重置element表格离开方法
    removehandleCellMouseLeave () {
      const tbody = this.$refs.table.$refs.bodyWrapper.children[0].__vue__
      tbody.handleCellMouseLeave = (event) => {
        const cell = getCell(event)
        if (!cell) return
        const oldHoverState = tbody.table.hoverState || {}
        tbody.table.$emit('cell-mouse-leave', oldHoverState.row, oldHoverState.column, oldHoverState.cell, event)
      }
      tbody.handleCellMouseEnter = (event, row) => {
        const table = tbody.table
        const cell = getCell(event)
        const tooltip = tbody.$refs.tooltip
        if (tooltip) {
          tooltip.setExpectedState(false)
          tooltip.handleClosePopper()
        }
        if (cell) {
          const column = getColumnByCell(table, cell)
          const hoverState = table.hoverState = { cell, column, row }
          table.$emit('cell-mouse-enter', hoverState.row, hoverState.column, hoverState.cell, event)
        }
        const cellChild = event.target.querySelector('.cell')
        if (!(hasClass(cellChild, 'el-tooltip') && cellChild.childNodes.length)) {
          return false
        }
        const range = document.createRange()
        range.setStart(cellChild, 0)
        range.setEnd(cellChild, cellChild.childNodes.length)
        const rangeWidth = range.getBoundingClientRect().width
        const padding = (parseInt(getStyle(cellChild, 'paddingLeft'), 10) || 0) +
          (parseInt(getStyle(cellChild, 'paddingRight'), 10) || 0)
        if ((rangeWidth + padding > cellChild.offsetWidth || cellChild.scrollWidth > cellChild.offsetWidth) && tooltip) {
          tbody.tooltipContent = cell.innerText || cell.textContent
          tooltip.referenceElm = cell
          tooltip.$refs.popper && (tooltip.$refs.popper.style.display = 'none')
          tooltip.doDestroy()
          tooltip.setExpectedState(true)
          tbody.activateTooltip(tooltip)
        }
      }
    }
  }
}
</script>
<style lang="sass" scoped>
::v-deep .loading-customClass
  .el-loading-spinner
    margin: -21px auto
    left: 0
    right: 0
    width: 130px
    background-color: rgba(0, 0, 0, 0.6)
    padding: 10px 0
    border-radius: 4px
    .el-icon-loading, .el-loading-text
      color: #fff
    .el-icon-loading
      font-size: 15px
    .el-loading-text
      display: inline-block
      margin-left: 8px
      white-space: nowrap
.datatable-main
  display: flex
  flex: 1
  flex-direction: column
  overflow: hidden
  height: 100%
  width: 100%
.datatable-table-wrapper
  display: flex
  flex: 1
  flex-direction: column
  // padding: 0 0 8px
  background-color: #fff
  height: 100%
  box-sizing: border-box
  overflow: hidden
  ::v-deep .cell
    white-space: nowrap
    div
      overflow: hidden
  ::v-deep .cell.el-tooltip
    div
      text-overflow: ellipsis
  // 单元格间、最左、最右16px边距
  .noBorder
    ::v-deep thead
      tr
        .selectBox
          .cell
            width: fit-content
        th:first-child
          .cell
            padding-left: 16px
        th:last-child
          .cell
            padding-right: 16px
        th
          .cell
            padding-left: 8px
            padding-right: 8px
    ::v-deep tbody
      tr
        .selectBox
          .cell
            width: fit-content
        td:first-child
          .cell
            padding-left: 16px
        td:last-child
          .cell
            padding-right: 16px
        td
          .cell
            padding-left: 8px
            padding-right: 8px
    .datatable-table
      // display: flex
      // flex: 1
      // flex-direction: column
      width: 100%
      ::v-deep
        .el-table__body-wrapper
          height: 100%
          overflow-y: overlay
.datatablepage-header
  &>div
    // margin-bottom: 8px
  .datatablepage-filter-wrapper
    background: #fff
    padding: 0
  .datatablepage-filter
    // margin-bottom: -18px
    display: flex
    justify-content: space-between
    border-radius: $--border-radius-base
    ::v-deep .el-form-item.dataform-button-item
      margin-right: 0
      min-width: 130px
  .datatablepage-toolbar
    margin-right: 1em
.datatablepage-footer
  font-size: $--th-font-size
  &>div
    flex: 1
    margin-top: 1em
  .datatablepage-info
    display: inline-block
    white-space: nowrap
    line-height: 32px
    .select-num
      margin: 0 5px
      color: $--color-primary
.datatablepage-pagination
  text-align: right
  float: right
  &::after
    display: block
    content: ''
    height: 0
    visibility: hidden
    clear: both
.datatable-table
  ::v-deep
    // 排序图标颜色
    .active-thead-descending
      .sort-caret.ascending
        border-bottom-color: #bfbfbf !important
      .sort-caret.descending
        border-top-color: #1890FF !important
    .active-thead-ascending
      .sort-caret.ascending
        border-bottom-color: #1890FF !important
      .sort-caret.descending
        border-top-color: #bfbfbf !important
    // 展开
    .el-table__expanded-cell
      padding: 0
    .table-handle
      font-size: 22px
      cursor: move
    // 拖拉排序或拖拉改变父子关系时的样式
    .highlight-in
      background: #ecf5ff
    .highlight-up
      box-shadow: 0 10px 18px -20px inset blue
      &::after
        transform: translate(0, -100%)
        box-shadow: 0 -10px 18px -20px inset blue
    .highlight-down
      box-shadow: 0 -10px 18px -20px inset blue
      &::after
        transform: translate(0, 100%)
        box-shadow: 0 10px 18px -20px inset blue
    .highlight-up,.highlight-down
      position: relative
      &::after
        content: ''
        display: block
        position: absolute
        width: 100%
        height: 40px
        left: 0
.datatablepage-prep
  display: flex
  flex-direction: row
  padding-bottom: $--padding-size-medium
  padding-top: $--padding-size-medium
  align-items: center
.datatablepage-filter-info
  flex-grow: 9999
  font-size: 12px
  color: rgba(0,0,0,0.65)
  line-height: 30px
  .el-tag
    margin-right: 4px
    border-radius: 0
    border-style: dashed
    background: rgba(0, 0, 0, 0.02)
    .el-tag__close
      color: #bfbfbf
.datatablepage-toolbar
  padding-right: 12px
  flex-grow: 99
  text-align: right
  white-space: nowrap
.datatablepage-setting
  flex-grow: 1
  text-align: right
  white-space: nowrap
.datatablepage-prep-hack
  color: #ccc
  display: flex
  align-items: center
.datatablepage-operate
  ::v-deep
    .el-button[text-type]
      font-size: $--td-font-size
      padding: 0
</style>
