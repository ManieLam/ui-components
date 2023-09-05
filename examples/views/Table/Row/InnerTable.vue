<template lang="pug">
  .anso-table
    AnsoButtonGroup.btn(:buttonList="buttonList1")
    AnsoDatatable(
      ref="expandTable"
      keyName="expandTable"
      rowKey="id"
      :isExpand="true"
      :expandAll="false"
      :hasHeader="false"
      :hasFooter="false"
      :defaultExpandRowKeys="defaultExpandRowKeys"
      :expandRowKeys="expandRowKeys"
      :data="tableData"
      :columns="columns"
      @expandChange="expandChange")
      template(slot="col-expand", slot-scope="scope")
        AnsoDatatable.innerTable(
          ref="innerTable"
          keyName="innerTable"
          rowKey="school"
          height="100"
          :hasHeader="false"
          :hasFooter="false"
          :data="scope.row.detail"
          :columns="columns1")
</template>

<script>
import { data } from '@/views/Table/Expand/data'

export default {
  name: 'tableExpand',
  components: {
  },
  data () {
    return {
      tableData: data,
      expandRowKeys: [],
      expandAllStatus: false,
      columns: [{
        name: 'name',
        label: '代号'
      }, {
        name: 'position',
        label: '位置'
      }, {
        name: 'office',
        label: '城市'
      }, {
        name: 'age',
        label: '年龄'
      }, {
        name: 'startDate',
        label: '出生日期'
      }, {
        name: 'salary',
        label: '年薪'
      }],
      columns1: [{
        name: 'customerStatus',
        label: '客户状态'
      }, {
        name: 'customerCode',
        label: '客户号'
      }, {
        name: 'customerName',
        label: '客户名称'
      }, {
        name: 'customerType',
        label: '客户类型'
      }, {
        name: 'certificateType',
        label: '证件类型'
      }, {
        name: 'certificateNum',
        label: '证件号码'
      }, {
        name: 'customerContact',
        label: '联系人'
      }, {
        name: 'customerMobileNum',
        label: '联系手机'
      }, {
        name: 'customerPhoneNum',
        label: '联系固话'
      }, {
        name: 'customerAddress',
        label: '联系地址'
      }, {
        name: 'customerEmail',
        label: '联系邮箱'
      }, {
        name: 'createTime',
        label: '建档日期'
      }, {
        name: 'creator',
        label: '登记人'
      }, {
        name: 'registerTime',
        label: '登记日期'
      }],
      buttonList1: [{
        label: '只展开第二行',
        type: 'primary',
        func: () => {
          this.expandRowKeys = [2]
        }
      }, {
        label: '全部展开/收起',
        type: 'primary',
        func: () => {
          this.$refs.expandTable.toggleRowExpansion(this.tableData, !this.expandAllStatus)
          this.expandAllStatus = !this.expandAllStatus
        }
      }]
    }
  },
  computed: {
    defaultExpandRowKeys () {
      return this.tableData.filter(data => data.id > 2).map(row => row.id)
    }
  },
  methods: {
    expandChange (row, expandRows) {
      console.log(row, expandRows)
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  // background-color: #eee
  width: 100%
  height: 100%
  .btn
    margin: 8px 0 0 8px
  .innerTable
    height: 100%
</style>
