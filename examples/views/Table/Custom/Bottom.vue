<template lang="pug">
  .anso-table
    AnsoDatatable(
      :hasHeader="false"
      :hasFooter="false"
      :data="tableData"
      :columns="columns")
      .footer(slot="footer")
        label 自定义表格底部
        AnsoDataform(
          ref="form"
          v-model="formData"
          type="inline"
          :errorToptip="true"
          :formFields="columns"
          :buttonList="buttonList")
</template>

<script>
export default {
  name: 'tableOtherBottom',
  components: {
  },
  data () {
    return {
      tableData: [],
      columns: [{
        name: 'name',
        label: 'Name',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        name: 'position',
        label: 'Position',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        name: 'office',
        label: 'Office',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        name: 'age',
        label: 'Age',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        name: 'startDate',
        label: 'Start Date',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        name: 'salary',
        label: 'Salary',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }],
      formData: {},
      buttonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (button) => {
          this.tableData.push({ ...button.formData })
          this.$nextTick(() => { this.$refs.form.resetForm() })
        }
      }, {
        label: '重置',
        func: () => {
          this.$refs.form.resetForm()
        }
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
  .footer
    margin: 8px 0
</style>
