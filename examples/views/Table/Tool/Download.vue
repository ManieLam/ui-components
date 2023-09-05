<template lang="pug">
  .anso-table
    AnsoDatatable(
      size="small"
      :data="tableData"
      :settingButtonList="settingButtonList"
      :columns="columns")
</template>

<script>
import data from './data.json'
import columns from './columns.js'
export default {
  name: 'tableToolDownload',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: columns,
      settingButtonList: ['download']
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  width: 100%
  height: 100%
.el-input
  width: auto
</style>
