<template lang="pug">
  .anso-table_summary
    AnsoDatatable(
      keyName="summaryFontDIY"
      show-summary
      :summary-method="getSummaries"
      :settingButtonList="[]"
      :data="tableData"
      :columns="columns")
</template>

<script>
/**
 * @name 表尾合计行-自定义
 */
import { setRandomData, columns } from '@/views/Table/Tool/setRandomData'

export default {
  name: 'tableSummaryFontDIY',
  components: {
  },
  data () {
    return {
      tableData: setRandomData(50),
      columns
    }
  },
  methods: {
    getSummaries ({ columns: summaryColumns, data }) {
      const sums = []
      summaryColumns.forEach((column, index) => {
        if (index === 0) sums[index] = '总价'
        const values = data.map(item => item[column.property])
        if (index === 1 || index === 2) {
          sums[index] = values.reduce((pre, num) => {
            pre += Number(num)
            return Number(pre.toFixed(2))
          }, 0)
        }
        if (index === 3) {
          sums[index] = values.reduce((pre, cur) => {
            const num = Number(cur.replace(/\D/, ''))
            pre += num
            return pre
          }, 0) + '元'
        }
      })
      return sums
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_summary
  display: flex
  flex: 1
  flex-direction: column
  padding: 8px
  background-color: #eee
  width: 100%
  height: 100%
</style>
