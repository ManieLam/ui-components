<template lang="pug">
.print-box
  .print-btn
    el-button(@click="print") 打印
  .print-content(ref="printContent")
    table.report-table(ref="tableDom" border="1" borderColor="cbcbcb" cellpadding="0" cellspacing="0" style="border-collapse:collapse;")
      thead
        tr
          th(:rowspan="2") 账单区间
          th(:rowspan="2") 账单#[br]笔数
          th.width80(:rowspan="2") 最近1次#[br]水表指度
          th(:rowspan="2") 用水量#[br](m³)
          th(:rowspan="2") 水费#[br](元)
          th.padding5(:colspan="2") 代收费(元)
          th(:rowspan="2") 违约金#[br](元)
          th(:rowspan="2") 欠费合计#[br](元)
        tr
          th.padding5 污水费
          th.padding5 垃圾费
      tbody
        tr()
          td 0
          td 0
          td 0
          td 0
          td 0
          td 0
          td 0
          td 0
          td 0
    table.report-table.borderNone(style="margin-top: 15px;overflow:hidden" ref="tableDom2" border="0" borderColor="cbcbcb" cellpadding="0" cellspacing="0")
      tfoot
        tr.borderNone
          td.text-left.borderNone(colspan='2') #[span 区本：xx区xx本]
          td.text-left.borderNone(colspan='2') #[span 营销员：xxx]
          td.text-right.borderNone(colspan='2') #[span 营销员电话：xxxxxxxxxxxx]
          td.text-right.borderNone(colspan='2') #[span 打印日期：xxxxxxxxxxxx]
</template>

<script>
import { getLodop } from '@/utils/LodopFuncs'

export default {
  name: 'lodop',
  data () {
    return {
    }
  },
  methods: {
    print () {
      try {
        const LODOP = getLodop()
        if (LODOP.VERSION || LODOP.CVERSION) {
          const css = `
          <style>
            div {display: block !important; text-align: center;}
            .report-table{width:100%;margin:0 auto;font-size:13px;}
            th{font-size:13px}
            .report-table td{
              padding:5px;
              text-align:center;
              min-width:30px;
              font-size:12px;}
            .text-center{text-align:center !important;}
            .text-left{text-align:left !important;}
            .text-right{text-align:right !important;}
            .borderNone{border:none !important;}
            .padding5{padding:5px}
          </style>`
          LODOP.PRINT_INIT('printInit') // 打印初始化
          // 设置横向打印
          LODOP.SET_PRINT_PAGESIZE(2, 0, 0, 'B4')
          // 横向时的正向显示
          LODOP.SET_SHOW_MODE('LANDSCAPE_DEFROTATED', 1)
          // 底图上有模拟走纸板的条纹线, 可以隐藏该条线
          LODOP.SET_SHOW_MODE('HIDE_PAPER_BOARD', 1)
          LODOP.ADD_PRINT_HTM(240, '5%', '90%', '80%', css + this.$refs.printContent.innerHTML)
          LODOP.PREVIEW() // 打印预览
        }
      } catch (err) { console.log(err) }
    }
  }
}
</script>

<style lang="sass" scoped>
.print-box
  display: flex
  flex-direction: column
  background-color: #fff
  width: 100%
  height: 100%
  .print-btn
    margin: 8px
    margin-bottom: 0
  .print-content
    flex: 1
    padding: 8px
    .report-table
      width: 100%
      th, td
        text-align: center
        font-size: 13px
</style>
