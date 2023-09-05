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
        AnsoDataform.form(
          type="grid"
          :colspanNum="3"
          :formFields="columns"
          :value="scope.row"
          :buttonList="[]")
</template>

<script>
import { data } from './data'
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
        label: 'Name',
        form: {
          tag: 'text'
        }
      }, {
        name: 'position',
        label: 'Position',
        form: {
          tag: 'text'
        }
      }, {
        name: 'office',
        label: 'Office',
        form: {
          tag: 'text'
        }
      }, {
        name: 'age',
        label: 'Age',
        form: {
          tag: 'text'
        }
      }, {
        name: 'startDate',
        label: 'Start Date',
        form: {
          tag: 'text'
        }
      }, {
        name: 'salary',
        label: 'Salary',
        form: {
          tag: 'text'
        }
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
  .form::v-deep
    .anso-dataform__body
      margin: 5px
</style>
