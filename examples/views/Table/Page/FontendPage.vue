<template lang="pug">
  .anso-table
    AnsoDatatable(
      resource="/api/common/list"
      :settingButtonList="[]"
      :columns="columns")
</template>

<script>
export default {
  name: 'tableFontendPage',
  components: {
  },
  data () {
    return {
      filterFields: [{
        name: 'name',
        label: 'Name',
        form: {
          tag: 'input'
        }
      }, {
        name: 'position',
        label: 'Position',
        form: {
          tag: 'input'
        }
      }, {
        name: 'office',
        label: 'Office',
        form: {
          tag: 'input'
        }
      }, {
        name: 'age',
        label: 'Age',
        form: {
          tag: 'input'
        }
      }, {
        name: 'salary',
        label: 'Salary',
        form: {
          tag: 'input'
        }
      }],
      columns: [{
        name: 'name',
        label: 'Name',
        sortable: true
      }, {
        name: 'position',
        label: 'Position',
        sortable: true
      }, {
        name: 'office',
        label: 'Office',
        sortable: true
      }, {
        name: 'age',
        label: 'Age',
        sortable: true
      }, {
        name: 'startDate',
        label: 'Start Date',
        sortable: true
      }, {
        name: 'salary',
        label: 'Salary',
        sortable: true
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
.el-input
  width: auto
</style>
