<template lang='pug'>
AnsoDataformGroup.form-withFixed(
  ref="form"
  v-model="formData"
  :colspanNum="3"
  :gridspanNum="3"
  labelPosition="top"
  :groupSplit="groupSplit"
  :groupTitle="groupTitle"
  :groupType="groupType"
  :formFields="formFields"
  :buttonList="buttonList"
  :buttonFixed="true"
  :fieldSlots="fieldSlots")
  //- 第n组头部插槽（n由0开始）
  template(slot="group1-header")
    p.label-tip 支持自定义表单头部1信息
  //- 第n组尾部插槽（n由0开始）
  template(slot="group1-footer")
    p.label-tip 支持自定义表单足部1信息
  //- 第n组字段filer2插槽（n由0开始）
  template(slot="group1-Field2")
    el-progress(
      :text-inside="true"
      :stroke-width="26"
      :percentage="70")
  //- 第n分组的内容插槽（n由0开始计起）
  template(slot="group2")
    AnsoDataform(
      ref="customForm"
      labelPosition="right"
      :formData="formData"
      :formFields="formFields")
      template(#bodyHeader)
        p 支持自定义内容
</template>

<script>
/** */
export default {
  name: 'FormGroupComplex',
  data () {
    return {
      fieldSlots: ['Field2'],
      groupType: ['grid', 'row', 'grid'],
      groupTitle: ['网格式展示表单信息', '多列栅格式展示表单信息', '自定义信息展示'],
      groupSplit: [['Field', 'Field4', 'Field2', 'Field3'], ['Field1', 'Field2', 'Field3', 'Field4', 'Field5'], ['Field4', 'Field5']],
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
          }],
          preSlotRender: (h) => {
            return h('el-button', {
              domProps: {
                innerHTML: '点一下'
              },
              on: {
                click: () => {
                  this.$message.success('你点到我了')
                }
              }
            })
          },
          suffixSlotRender: (h) => {
            // return h('AnsoIcon', {icon: })
            return <AnsoIcon icon="shipin" width="32px" height="32px"></AnsoIcon>
          }
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
        label: '返回',
        position: 'left',
        type: 'success',
        func: () => {}
      }, {
        label: '下一步',
        func: () => {}
      }, {
        label: '确定',
        validate: true,
        type: 'success',
        position: 'center',
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
.label-tip
  border-left: 4px solid #1890FF
  padding-left: 8px
</style>
