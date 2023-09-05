<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="emptyTable"
      :data="[]"
      :columns="columns"
      :emptyText="emptyText")
</template>

<script>
export default {
  name: 'tableEmptyText',
  components: {
  },
  data () {
    return {
      emptyText: '自定义表格为空时提示语',
      columns: [{
        name: 'name',
        label: 'Name'
      }, {
        name: 'position',
        label: 'Position'
      }, {
        name: 'office',
        label: 'Office'
      }, {
        name: 'age',
        label: 'Age'
      }, {
        name: 'startDate',
        label: 'Start Date'
      }, {
        name: 'salary',
        label: 'Salary'
      }, {
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
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
