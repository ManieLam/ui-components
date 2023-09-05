<template lang="pug">
  .anso-table
    div.title
      span 由于列过滤器是表格默认工具, 如果需要单独显示列过滤器，则需要单独配置settingButtonList属性, 当前表格属性 settingButtonList 的配置为 {{settingButtonList}}
      br
      AnsoDataformSwitch(v-model="setting" :options="options")
    AnsoDatatable(
      size="small"
      :data="tableData"
      :settingButtonList="settingButtonList"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Tool/data.json'
import columns from '@/views/Table/Tool/columns.js'
export default {
  name: 'ColumnManagement',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: columns,
      setting: true,
      options: [{
        label: '表格只配置：列过滤器',
        value: true
      }, {
        label: '表格默认配置所有工具',
        value: false
      }]
    }
  },
  computed: {
    settingButtonList () {
      return this.setting ? ['columnFilter'] : ['refresh', 'download', 'lineHeightSetter', 'columnFilter']
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
  .title
    background: #fff
    line-height: 30px
    padding-left: 10px
    padding-top: 10px
.el-input
  width: auto
</style>
