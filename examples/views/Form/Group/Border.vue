<template lang='pug'>
AnsoDataformGroup.form-withFixed(
  ref="form"
  v-model="formData"
  groupType="row"
  styleType="border"
  :colspanNum="2"
  labelPosition="top"
  :buttonFixed="true"
  :groupSplit="groupSplit"
  :groupTitle="groupTitle"
  :formFields="formFields"
  :buttonList="buttonList")
</template>

<script>
/** */
export default {
  name: 'FormGroupBorder',
  data () {
    return {
      groupTitle: ['组名1', '组名2', '组名3'],
      groupSplit: [['Field'], ['Field1', 'Field2', 'Field3'], ['Field4', 'Field5'], ['Field4', 'Field5'], ['Field4', 'Field5']],
      /* ==== 表单字段配置 ==== */
      formFields: [{
        name: 'Field',
        label: '测试手提式开发计划就是十生菇',
        form: {
          tag: 'input',
          placeholder: '输入数字',
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }, {
            pattern: /^[0-9]+$/,
            message: '必须是数字'
          }]
        }
      }, {
        name: 'Field1',
        label: 'Field1',
        form: {
          tag: 'input'
        }
      }, {
        name: 'Field2',
        label: 'Field2',
        form: {
          tag: 'input'
        }
      }, {
        name: 'Field3',
        label: 'Field3',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }]
        }
      }, {
        name: 'Field4',
        label: 'Field4',
        form: {
          tag: 'number'
        }
      }, {
        name: 'Field5',
        label: 'Field5',
        form: {
          tag: 'select'
        }
      }],
      /* ==== 表单数据 ==== */
      formData: {
        book: 'asdadadhjhkj'
      },
      buttonList: [{
        label: '下一步',
        func: () => {}
      }, {
        label: '确定',
        validate: true,
        func: (button) => {
          console.log('确认被点击', button)
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

<style lang='sass' scoped>

</style>
