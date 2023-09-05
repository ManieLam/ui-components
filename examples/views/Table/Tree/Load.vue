<template lang="pug">
  .anso-table
    AnsoDatatable(
      ref="serveLoadTreeTable"
      keyName="serveLoadTreeTable"
      resource="/api/system/getParentOrg"
      lazyResource="/api/system/getLazyOrg"
      rowKey="_id"
      hasChildrenKey="hasChilds"
      :isTree="true"
      :lazy="true"
      :transformResponse="transformResponse"
      :treeResourceConfig="treeResourceConfig"
      :highlightClickRow="true"
      :serverSide="true"
      :hasPage="false"
      :columns="columns"
      :settingButtonList="[]"
      @rowClick="rowClick"
      @currentChange="currentChange")
</template>

<script>

export default {
  name: 'tableServeLoadTree',
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
      ]
    }
  },
  methods: {
    rowClick (row) {
      console.log('rowClick:', row)
    },
    currentChange (curRow, oldRow) {
      console.log('currentChange:', curRow, oldRow)
    },
    transformResponse (res) {
      const { code, data, message } = res.data
      const result = {
        code,
        data: {
          records: data.data,
          total: data.total
        },
        message
      }
      return { data: result }
    },
    treeResourceConfig ({ url, row }) {
      return {
        url: `${url}/${row._id}`,
        method: 'post'
      }
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
