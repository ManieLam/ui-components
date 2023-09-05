<template lang='pug'>
.anso-formgroup-simple
  .tip-message-content
    h4 当前表单onChange方法出参数据
    ul
      li 所有表单数据：{{changeValue.values}}
      li 当前修改项配置信息：{{changeValue.field}}
      li 当前修改值：{{changeValue.value}}
      li 当前修改项原先值：{{changeValue.oldValue}}
  AnsoDataformGroup.form-withFixed(
    ref="form"
    v-model="formData"
    groupType="row"
    :colspanNum="3"
    labelPosition="top"
    :buttonFixed="true"
    :groupSplit="groupSplit"
    :groupTitle="groupTitle"
    :formFields="formFields"
    :buttonList="buttonList"
    :colSpans="colSpans"
    @onChange="onChange")
</template>

<script>
/** */
import { debounce } from 'lodash'
export default {
  name: 'FormGroupSimple',
  data () {
    return {
      changeValue: {},
      groupTitle: ['组名1', '组名2', '组名3'],
      groupSplit: [['Field'], ['Field1', 'Field2', 'Field3', 'Field4', 'Field5'], ['Field4', 'Field5']],
      colSpans: {
        Field2: 2
      },
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
        label: '确认',
        validate: true,
        type: 'primary',
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
  },
  methods: {
    onChange: debounce(function (values) {
      console.log('当前修改的内容：', values)
      this.changeValue = values
    }, 500)
  }
}
</script>

<style lang='sass' scoped>

</style>
