<template lang="pug">
  .anso-table
    AnsoDatatable(
      ref="serveTreeTable"
      keyName="serveTreeTable"
      resource="/api/system/getOrg"
      rowKey="_id"
      :isTree="true"
      :hasPage="false"
      :highlightClickRow="true"
      :columns="columns"
      :errorResponse="errorResponse"
      @rowClick="rowClick"
      @currentChange="currentChange")
</template>

<script>

export default {
  name: 'tableServeTree',
  components: {
  },
  data () {
    return {
      columns: [
        { name: 'orgName', label: '组织名称', align: 'left' },
        {
          name: 'orgType',
          label: '组织类型',
          options: [{
            label: '集团',
            value: 'GROUP'
          }, {
            label: '部门',
            value: 'DIVISION'
          }, {
            label: '科室',
            value: 'DEPARTMENT'
          }],
          render: { type: 'select' }
        },
        { name: 'remark', label: '备注' }
      ],
      errorResponse: () => {
        this.$message({
          showClose: true,
          message: '网络连接异常，请检查接口连接',
          type: 'error',
          duration: 0
        })
      }
    }
  },
  methods: {
    rowClick (row) {
      console.log('rowClick:', row)
    },
    currentChange (curRow, oldRow) {
      console.log('currentChange:', curRow, oldRow)
    }
  },
  mounted () {
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  flex: 1
  display: flex
  flex-direction: column
  .drawerForm
    padding: 0 20px
</style>
