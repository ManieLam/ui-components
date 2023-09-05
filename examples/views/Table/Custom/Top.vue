<template lang="pug">
  .anso-table_OtherTop
    AnsoDatatable(
      keyName="tableOtherTop"
      :hasPage="false"
      :settingButtonList="[]"
      :data="[]"
      :columns="columns")
      .header-diy(slot="header")
        label 自定义表格顶部
        .form
          AnsoDataformSelect(
            v-model="formValue"
            v-bind="selectConfig"
          )
      span(slot="column-name-header", slot-scope="scope") {{scope.column.diyLabel}}
      span(slot="column-position-header", slot-scope="scope") 自定义
</template>

<script>
export default {
  name: 'tableOtherTop',
  components: {
  },
  data () {
    return {
      columns: [{
        name: 'name',
        label: 'Name',
        diyLabel: '自定义表头标题'
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
      }],
      formValue: '',
      selectConfig: {
        options: [{
          label: '选项1',
          value: 1
        }, {
          label: '选项2',
          value: 2
        }, {
          label: '选项3',
          value: 3
        }]
      }
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_OtherTop
  display: flex
  flex-direction: column
  width: 100%
  height: 100%
  .header-diy
    margin: 7px 0 0 7px
    .form
      margin-top: 7px
</style>
