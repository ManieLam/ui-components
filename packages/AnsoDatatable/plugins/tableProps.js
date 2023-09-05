import { resultRender } from 'packages/AnsoInfoRender/render.js'
import keyBy from 'lodash/keyBy'
/**
 * @keyName {String} 表格关键key
 * @data {Array} 外部传入的数据
 * @height {String, Number} 表格固定高度（在父级容器不知道高度的情况下）
 * @resource {String} 数据接口
 * @serverSide {Boolean} 是否使用服务端分页
 * @columns {Array} 列配置
 * @hasPage {Boolean} 是否需要分页器（一次性加载去掉分页，后期考虑用滚动模式的全量加载）
 * @maxTableTotal {Number} 表格数据承载最大数量
 * @pageSizes {Array} 每页记录数选项
 * @pagerCount {Number} 页码按钮的数量，当总页数超过该值时会折叠，只接收单数！
 * @defaultPageSize {Number} 默认每页记录数，初始化时用
 * @defaultpageIndex {Number} 默认页码，初始化时用
 * @defaultSortBy {Array} 默认排序，初始化时用
 * @emptyText {String} 表格数据为空时提示
 * @showIndex {Boolean} 是否展示序号列
 * @indexColumnName {String} 序号列的列名
 * @hasHeader {Boolean} 是否展示表格头部
 * @hasFooter {Boolean} 是否展示表格底部
 * @rowClassName {Function, Array} 行的className的回调方法，需返回一个className数组；也直接为所有行设置一个固定的className
 * @rowStyle {Function, Object} 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
 * @cellClassName {Function, String} 单元格的className的回调方法，也可以使用一个固定的String为所有单元格设置一样的className
 * @cellStyle {Function, Object} 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style
 * @border {Boolean} 是否带有纵向边框
 * @operateBorder {Boolean} 操作按钮间是否带有纵向边框
 */
// 列的渲染函数格式化函数
const renderFormat = (columns = []) => {
  return columns.reduce((result, column) => {
    return [...result, {
      ...column,
      renderFormat: resultRender(column)
    }, ...renderFormat(column.innerColumns)]
  }, [])
}

export default {
  props: {
    keyName: {
      type: String,
      default: () => {
        return `ansoTable-${Math.floor(Math.random() * 100)}`
      }
    },
    data: {
      type: Array
    },
    height: {
      type: [String, Number],
      default: '1'
    },
    resource: {
      type: String
    },
    serverSide: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      default: () => ([])
    },
    hasPage: {
      type: Boolean,
      default: true
    },
    maxTableTotal: {
      type: Number,
      default: 100000
    },
    pageSizes: {
      type: Array,
      default: () => ([30, 50, 100, 200, 500])
    },
    pagerCount: {
      type: Number,
      default: 5
    },
    defaultPageSize: {
      type: Number
    },
    defaultpageIndex: {
      type: Number,
      default: 1
    },
    defaultSortBy: {
      type: Array,
      default: () => ([])
    },
    isPassive: {
      type: Boolean,
      default: false
    },
    emptyText: {
      type: String,
      default: '暂无数据'
    },
    notqueryText: {
      type: String,
      default: '请先搜索内容'
    },
    showIndex: {
      type: Boolean,
      default: false
    },
    indexColumnName: {
      type: String,
      default: '序号'
    },
    hasHeader: {
      type: Boolean,
      default: true
    },
    hasFooter: {
      type: Boolean,
      default: true
    },
    rowClassName: {
      type: [Function, Array]
    },
    cellClassName: {
      type: [Function, String]
    },
    rowStyle: {
      type: [Function, Object]
    },
    cellStyle: {
      type: [Function, Object]
    },
    border: {
      type: Boolean,
      default: false
    },
    operateBorder: {
      type: Boolean,
      default: true
    },
    showOverflowTooltip: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 将列配置对象化，方便渲染
    columnsObject () {
      const columnsFormat = renderFormat(this.columns)
      return keyBy(columnsFormat, 'name')
    },
    // 可勾选单元格宽度
    selectionWidth () {
      return this.border ? 35 : 38
    }
  }
}
