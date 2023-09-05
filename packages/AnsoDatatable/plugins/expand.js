/**
 * @isExpand {Boolean} 是否开启行扩展
 * @defaultExpandRowKeys {Array} 默认展开行的keys数组，用于设置默认的展开行（需要配置了row-key、且不默认展开所有行才能使用）
 * @expandRowKeys {Array} 展开行的keys数组，用于设置目前的展开行（需要配置了row-key才能使用）
 * @expandAll {Boolean} 是否默认展开所有行（只对展开行表格、树表格有效）
 */
export default {
  props: {
    isExpand: {
      type: Boolean,
      default: false
    },
    defaultExpandRowKeys: {
      type: Array,
      default: () => ([])
    },
    expandRowKeys: {
      type: Array,
      default: () => ([])
    },
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      renderExpandRowKeys: []
    }
  },
  watch: {
    expandRowKeys: {
      deep: true,
      handler (keys) {
        this.renderExpandRowKeys = keys
      }
    }
  },
  methods: {
    // 点击展开/关闭某一行、调用toggleRowExpansion时触发该事件
    expandChange (row, expanded) {
      this.$emit('expandChange', row, expanded)
    },
    /**
     * @name 展开行表格-改变展开状态
     * @param {Array} rows 需要改变选中状态的数据
     * @param {Boolean} expanded 展开状态
     */
    toggleRowExpansion (rows = [], expanded = true) {
      this.$nextTick(() => rows.map(row => this.$refs.table.toggleRowExpansion(row, expanded)))
    }
  },
  mounted () {
    if (!this.expandAll) this.renderExpandRowKeys = this.defaultExpandRowKeys
  }
}
