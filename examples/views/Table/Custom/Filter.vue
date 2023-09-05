<template lang="pug">
  .anso-table
    AnsoDatatable(
      resource="/api/common/list"
      :serverSide="true"
      :settingButtonList="[]"
      :filterFields="filterFields"
      :columns="columns")
      template(v-slot:filter-left="{formData}")
        .el-form-item
          label.el-form-item__label 测试header插槽:name
          el-input.el-form-item__content(
            style="width: auto;"
            v-model="formData.name")
</template>

<script>
export default {
  name: 'tableBackendPage',
  components: {
  },
  data () {
    return {
      filterFields: [{
        name: 'name',
        label: 'Name',
        form: {
          visabled: false,
          tag: 'input',
          like: true
        }
      }, {
        name: 'position',
        label: 'Position',
        form: {
          tag: 'input',
          like: true
        }
      }, {
        name: 'office',
        label: 'Office',
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
