<template lang="pug">
el-dialog.dialog-box(
  :append-to-body="true"
  :close-on-click-modal="false"
  :visible.sync="dialogVisible")
  div.dialog-header(slot="title")
    div.dialog-header-box
      el-checkbox(
        :disabled="isSearch"
        :value="isAll"
        :indeterminate="isIndeterminate"
        @change="checkAll")
      span.dialog-header-text 列设置
      AnsoDataformInput(
        v-model="filterValue"
        v-bind.sync="filterConfig"
        :clearable="true")
  div.dialog-footer(slot="footer")
    AnsoButtonGroup(:buttonList="buttonList")
  .columnFilter
    .columnGroup(
      v-for="(item, itemIndex) in filterGroup"
      :key="itemIndex")
      p.columnGroupTitle {{item.text}}
      ul.columnGroupList(
        :id="`datatable-manage-${item.name}`"
        :class="`${item.name}`")
        li(
          v-for="column, columnIndex in dataGroup[item.name]"
          v-show="dataFilter(column)"
          :key="column")
          div.columnGroupText
            AnsoIcon.icon(icon="tuodong")
            el-checkbox(
              :value="visibleGroup[column]"
              :data-column="column"
              @change="checkItem($event, column)")
            span.column-name {{columnsObject[column].label}}
            el-tooltip.columnTooltip(
              v-for="(operate, operateIndex) in operateList"
              :key="operateIndex"
              v-show="operate.name !== item.name"
              :content="operate.text" placement="top")
              i(@click="operateHandle(column, columnIndex, item.name, operate.name)")
                AnsoIcon(:icon="operate.icon")
</template>

<script>
import { cloneDeep, difference, pull, values, some, every, mapValues, pickBy, keys } from 'lodash'
import Sortable, { MultiDrag } from 'sortablejs'
import { AutoScroll } from 'sortablejs/modular/sortable.core.esm.js'
Sortable.mount(new MultiDrag(), new AutoScroll())

const operate = [
  /**
    * 操作按钮数据的展示列
    * 如有修改数据，请相关修改operateHandle函数相关数据
    */
  { name: 'right', text: '固定在右侧', icon: 'gudingzaiyouce' },
  { name: 'left', text: '固定在左侧', icon: 'gudingzaizuoce' },
  { name: 'center', text: '不固定', icon: 'buguding' }
]

export default {
  name: 'columnFilter',
  props: {
    value: Boolean,
    columnList: {
      type: Array,
      default: () => []
    },
    fixedLeft: {
      type: Array,
      default: () => []
    },
    fixedRight: {
      type: Array,
      default: () => []
    },
    visibleList: {
      type: Array,
      default: () => []
    },
    columnsObject: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      filterConfig: {
        placeholder: '请输入字段名称',
        icon: 'search',
        iconAlign: 'right'
      },
      filterGroup: [
        { name: 'left', text: '固定在左侧' },
        { name: 'center', text: '不固定' },
        { name: 'right', text: '固定在右侧' }
      ],
      operateList: operate,
      buttonList: [{
        label: '确定',
        type: 'primary',
        func: () => {
          const visibleList = keys(pickBy(this.visibleGroup, v => v))
          if (!visibleList.length) {
            this.$message.warning('请至少勾选一个参数列')
            return
          }
          this.$emit('setColumnData', {
            visibleList,
            fixedLeft: this.dataGroup.left,
            fixedRight: this.dataGroup.right,
            columnList: [...this.dataGroup.left, ...this.dataGroup.center, ...this.dataGroup.right]
          })
        }
      }, {
        label: '重置',
        func: this.reset
      }, {
        label: '取消',
        func: () => {
          this.$emit('close')
        }
      }],
      filterTextGroup: ['left', 'center', 'right'],
      columnGroup: null,
      // 搜索值
      filterValue: '',
      dataGroup: {
        // 左边栏数据
        left: [],
        // 中间栏数据
        center: [],
        // 右边栏数据
        right: []
      },
      // 可显示数据
      visibleGroup: {}
    }
  },
  computed: {
    visibleGroupValues () {
      return values(this.visibleGroup)
    },
    isAll () {
      return every(this.visibleGroupValues, Boolean)
    },
    isIndeterminate () {
      return some(this.visibleGroupValues, Boolean) && !this.isAll
    },
    isSearch () { // 是否在搜索中
      return !!this.filterValue && !!this.filterValue.length
    },
    dialogVisible: {
      get () {
        return this.value
      },
      set () {
        this.$emit('close')
      }
    }
  },
  methods: {
    // 左中右列表渲染过滤器
    dataFilter (name) {
      return this.columnsObject[name].label.includes(this.filterValue)
    },
    // 组件初始化
    init () {
      this.reset()
      this.$nextTick(() => {
        this.initSortable()
      })
    },
    // 数据重置
    reset (val) {
      this.filterValue = ''
      this.dataGroup.left = cloneDeep(this.fixedLeft)
      this.dataGroup.center = cloneDeep(difference(this.columnList, [...this.fixedLeft, ...this.fixedRight]))
      this.dataGroup.right = cloneDeep(this.fixedRight)
      this.visibleGroup = this.columnList.reduce((result, column) => ({
        ...result,
        [column]: this.visibleList.includes(column)
      }), {})
    },
    // 拖拉事件：处理数据leftGroup、rightGroup、centerGroup
    initSortable () {
      this.filterTextGroup.map(item => {
        const columnGroup = document.querySelector(`#datatable-manage-${item}`)
        this.columnGroup = Sortable.create(columnGroup, {
          group: { name: 'columnGroup', pull: true, put: true },
          // 拖拽的时候是否阻止事件冒泡
          dragoverBubble: true,
          easing: 'cubic-bezier(1, 0, 0, 1)',
          onEnd: this.onDropEnd
        })
      })
    },
    onDropEnd (params) {
      const { newIndex, oldIndex, from, to } = params
      const fromId = from.id.replace('datatable-manage-', '')
      const toId = to.id.replace('datatable-manage-', '')
      const column = this.dataGroup[fromId][oldIndex]
      this.dataGroup[fromId].splice(oldIndex, 1)
      this.dataGroup[toId].splice(newIndex, 0, column)
    },
    // 点击事件：处理数据leftGroup、rightGroup、centerGroup
    operateHandle (column, columnIndex, from, to) {
      pull(this.dataGroup[from], column)
      this.dataGroup[to].push(column)
    },
    // 勾选事件：处理数据visibleGroup
    checkItem (checked, column) {
      this.visibleGroup[column] = checked
    },
    // 全选事件：处理数据visibleGroup
    checkAll (checked) {
      this.visibleGroup = mapValues(this.visibleGroup, () => checked)
    }
  },
  mounted () {
    this.init()
  }
}
</script>
<style lang="sass" scoped>
.dialog-header-box
  display: flex
  align-items: center
  line-height: 24px
  .dialog-header-text
    margin-left: 8px
.dialog-footer
  text-align: center
.columnFilter
  width: 100%
  display: flex
  flex-direction: row
  justify-content: space-between
  .columnGroup
    flex: 1
    padding: 0 10px 0 10px
    border-right: 1px solid #efefef
    &:last-child
      border: none
    .columnGroupTitle
      margin: 8px 0 10px 20px
      color: #00000073
      font-size: 12px
    ul
      list-style: none
      padding: 0
      margin: 0
      font-size: 14px
      max-height: 260px
      min-height: 200px
      overflow-y: auto
      li
        height: 28px
        line-height: 28px
        padding: 0 10px
        overflow: hidden
        &:hover
          background: #1890ff26
          div
            .columnTooltip
              display: block
        div
          .icon
            cursor: move
            font-size: 16px
            vertical-align: middle
            color: #b9c5d2
            line-height: 0
            height: 12px
            width: 6px
            margin-right: 8px
          .column-name
            margin-left: 8px
          .columnTooltip
            display: none
            float: right
            font-size: 18px
            vertical-align: top
            line-height: 28px
            margin-right: 5px
            color: #1890ff
</style>
<style scoped>
.dialog-header >>> .el-input {
  width: 196px;
  margin-left: 28px;
}
.dialog-header >>> .el-checkbox__label {
  font-size: 18px
}
.dialog-box >>> .el-checkbox__inner {
  width: 16px;
  height: 16px;
}
.dialog-box >>> .el-checkbox__inner::after {
  left: 5px;
  top: 2px
}
.dialog-box >>> .el-dialog__footer {
  padding: 15px 20px 15px 20px;
}
.dialog-box >>> .el-dialog__body {
  padding: 8px 15px;
  border-bottom: 1px solid #efefef;
  border-top: 1px solid #efefef;
}
</style>
