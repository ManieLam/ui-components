<template lang="pug">
div.pdfOnlineContent
  span.pageNum {{pageNum}} / {{pageTotalNum}}
  pdf.pdf(
    ref="pdf"
    :src="pdfSrc"
    :page="pageNum"
    @num-pages="pageTotalNum=$event"
    @page-loaded="pageLoaded($event)"
    @loaded="loadPdfHandler")
  div.pdfOnlineAction
    AnsoButtonGroup.pageBtn(:buttonList="pageBtn")
</template>

<script>
import pdf from 'vue-pdf'
export default {
  name: 'pdfOnline',
  components: {
    pdf
  },
  data () {
    return {
      pageNum: 1,
      pageTotalNum: 1,
      curPageNum: 0, // 当前加载页
      path: '/online/PDF.pdf',
      scale: 60, // 放大系数
      clauseTitle: '',
      pageBtn: [{
        type: 'text',
        textType: 'primary',
        icon: 'el-icon-arrow-left',
        tooltip: {
          content: '上一页',
          placement: 'top'
        },
        func: () => {
          this.prePage()
        }
      }, {
        type: 'text',
        textType: 'primary',
        icon: 'el-icon-arrow-right',
        tooltip: {
          content: '下一页',
          placement: 'top'
        },
        func: () => {
          this.nextPage()
        }
      }, {
        type: 'text',
        textType: 'primary',
        icon: 'jia',
        tooltip: {
          content: '放大',
          placement: 'top'
        },
        func: () => {
          this.scaleD()
        }
      }, {
        type: 'text',
        textType: 'primary',
        icon: 'jian',
        tooltip: {
          content: '缩小',
          placement: 'top'
        },
        func: () => {
          this.scaleX()
        }
      }]
    }
  },
  props: {
    file: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    pdfSrc () {
      return pdf.createLoadingTask({
        url: this.file.url,
        cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.5.207/cmaps/',
        cMapPacked: true
      })
    }
  },
  methods: {
    pageLoaded (e) {
      this.curPageNum = e
    },
    prePage () { // 改变PDF页码,val传过来区分上一页下一页的值,0上一页,1下一页
      var p = this.pageNum
      p = p > 1 ? p - 1 : this.pageTotalNum
      this.pageNum = p
    },
    nextPage () {
      var p = this.pageNum
      p = p < this.pageTotalNum ? p + 1 : 1
      this.pageNum = p
    },
    loadPdfHandler (e) { // pdf加载时
      this.currentPage = 1 // 加载的时候先加载第一页
    },
    scaleD () { // 放大
      if (this.scale === 100) return
      this.scale += 5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    },
    scaleX () { // 缩小
      if (this.scale === 50) return
      this.scale += -5
      this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
    }
    // 将返回的流数据转换为url
    // getObjectURL (file) {
    //   let url = null
    //   if (window.createObjectURL !== undefined) { // basic
    //     url = window.createObjectURL(file)
    //   } else if (window.webkitURL !== undefined) { // webkit or chrome
    //     try {
    //       url = window.webkitURL.createObjectURL(file)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   } else if (window.URL !== undefined) { // mozilla(firefox)
    //     try {
    //       url = window.URL.createObjectURL(file)
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    //   return url
    // }
  },
  mounted () {
    this.$refs.pdf.$el.style.width = parseInt(this.scale) + '%'
  }
}
</script>

<style lang="sass" scoped>
.pdfOnlineContent
  height: 100%
  display: flex
  align-items: center
  justify-content: center
  flex-direction: column
  .pageNum
    line-height: 35px
  .pdf
    max-height: 100%
    overflow: auto
  .pdfOnlineAction
    flex-direction: row
    justify-content: space-between
    .pageBtn
      display: inline-block
</style>
