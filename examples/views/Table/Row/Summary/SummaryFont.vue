<template lang="pug">
  .anso-table_summary
    AnsoDatatable(
      keyName="summaryFont"
      show-summary
      :settingButtonList="[]"
      :data="tableData"
      :columns="columns")
</template>

<script>
/**
 * @name 表尾合计行
 */
import { setRandomData, columns } from '@/views/Table/Tool/setRandomData'

export default {
  name: 'tableSummaryFont',
  components: {
  },
  data () {
    return {
      tableData: setRandomData(50),
      columns
    }
  },
  methods: {
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
