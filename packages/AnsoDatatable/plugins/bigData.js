
const height = {
  large: 36,
  medium: 30,
  small: 26,
  mini: 22
}
export default {
  props: {
    bigData: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tableHeight: 0,
      scrollTop: 0,
      computedTop: 0
    }
  },
  computed: {
    computedHeight () {
      return this.tableHeight / 3
    },
    computedScrollHeight () {
      return Math.ceil(this.scrollTop / this.computedHeight)
    },
    // 通过当前表格高度和当前滚动高度计算需要渲染的数据的起始行序号
    renderStartRowIndex () {
      const a = this.computedTop - this.tableHeight
      return a <= 0 || !this.bigData ? 0 : Math.floor(a / this.heightPerRow)
    },
    // 通过当前表格高度和起始行序号计算需要渲染的数据的结束行序号
    renderEndRowIndex () {
      return this.renderStartRowIndex + this.renderRowNumber * 3
    },
    renderRowNumber () {
      return Math.ceil(this.tableHeight / this.heightPerRow)
    },
    heightPerRow () {
      return height[this.size]
    },
    resultrenderTableData () {
      return !this.bigData ? this.toberenderTableData : this.toberenderTableData.slice(this.renderStartRowIndex, this.renderEndRowIndex)
    },
    renderPaddingTop () {
      return this.renderStartRowIndex * this.heightPerRow
    },
    renderPaddingBottom () {
      const a = this.toberenderTableData.length - this.renderEndRowIndex
      return a <= 0 || !this.bigData ? 0 : a * this.heightPerRow
    }
  },
  watch: {
    computedScrollHeight (a) {
      this.computedTop = this.scrollTop
    },
    renderPaddingTop (top) {
      this.$refs.table.$refs.bodyWrapper.children[0].style.paddingTop = `${top}px`
      if (this.$refs.table.$refs.fixedBodyWrapper) this.$refs.table.$refs.fixedBodyWrapper.children[0].style.paddingTop = `${top}px`
      if (this.$refs.table.$refs.rightFixedBodyWrapper) this.$refs.table.$refs.rightFixedBodyWrapper.children[0].style.paddingTop = `${top}px`
    },
    renderPaddingBottom (bottom) {
      this.$refs.table.$refs.bodyWrapper.children[0].style.paddingBottom = `${bottom}px`
      if (this.$refs.table.$refs.fixedBodyWrapper) this.$refs.table.$refs.fixedBodyWrapper.children[0].style.paddingBottom = `${bottom}px`
      if (this.$refs.table.$refs.rightFixedBodyWrapper) this.$refs.table.$refs.rightFixedBodyWrapper.children[0].style.paddingBottom = `${bottom}px`
    }
  },
  methods: {
    // 监听滚动事件
    scrollListener () {
      // 获取需要绑定的table
      if (this.bigData) {
        this.$refs.table.bodyWrapper.addEventListener('scroll', this.handleScroll)
      }
    },
    // 滚动事件
    handleScroll (e) {
      const ele = e.srcElement || e.target
      const { scrollTop } = ele
      this.scrollTop = scrollTop
      console.log(scrollTop)
    },
    // 加载和resize时需要计算表格高度以供渲染时使用
    getTableHeight ({ clientHeight }) {
      this.tableHeight = clientHeight
    }
  }
}
