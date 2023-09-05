<template lang="pug">
  .anso-table
    AnsoDatatable(
      ref="ColumnStyleTable"
      keyName="ColumnStyleTable"
      :hasHeader="false"
      :hasFooter="false"
      :showIndex="true"
      :data="data"
      :columns="columns")
</template>

<script>
import data from '@/views/Table/Tool/data.json'
export default {
  name: 'tableToolColumnStyle',
  components: {
  },
  data () {
    return {
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
        label: 'Age',
        sortable: true
      }, {
        name: 'startDate',
        label: 'Start Date'
      }, {
        name: 'salary',
        label: 'Salary',
        labelClassName: 'column-brand',
        className: 'column-info'
      }],
      data
    }
  },
  methods: {
    onChange ({ values }) {
      this.formValue = values
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
.anso-table::v-deep
  .column-info
    background-color: #606266
    color: #fff
  .column-brand
    background-color: #409EFF
</style>
