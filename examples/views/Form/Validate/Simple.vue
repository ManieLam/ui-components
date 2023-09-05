<template lang="pug">
.demo-box
  //- h4 默认的验证方式：错误信息会在对应的字段下放显示。并无法操作表单按钮组
  //- AnsoDataform(
  //-   :value="formData"
  //-   :formFields="formFields"
  //-   :buttonList="buttonList")
  //- hr
  h4 使用errorToptip=true，配置错误信息采用toptip文字小浮窗提示
  p 切换字段显示/隐藏
    AnsoDataformSwitch(style="margin-left: 8px",v-model="fieldVisabled", :options="[{label: '显示', name: true}, {label: '隐藏', name: false}]")
    //- :gridspanNum="2"
  AnsoDataform(
    ref="form1"
    type="grid"
    :gridspanNum="2"
    :defaultColNum="3"
    :isAutoColumn="false"
    :value="formData1"
    :errorToptip="true"
    :formFields="formFields1"
    :buttonList="buttonList")
  hr
  div(style="margin: 10px") 提交数据：{{testData}}
</template>

<script>
import { discount } from './testField'
const discountOptions = [
  {
    value: 34,
    label: '特困减免（场景42）',
    parentId: null
  },
  {
    value: 73,
    label: '低保每月优惠18元',
    parentId: null
  }
]
export default {
  name: 'FormValidateSimple',
  data () {
    return {
      formData: {
        field1: 123,
        field2: 456
      },
      formData1: {
        startTime: Date.now() - 8.64e7
        // lowIncomeDiscountPolicyType: []
      },
      testData: '',
      formFields: [{
        name: 'field1',
        label: '字段1',
        form: {
          tag: 'input',
          prepend: '+86',
          maxlength: '11',
          width: 100,
          'show-word-limit': true,
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }, {
            pattern: /^[0-9]+$/,
            message: '必须是数字'
          }]
        }
      }, {
        name: 'field2',
        label: '字段2',
        form: {
          tag: 'input',
          prepend: '+86',
          maxlength: '11',
          width: 100,
          'show-word-limit': true,
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }, {
            pattern: /^[0-9]+$/,
            message: '必须是数字'
          }]
        }
      }],
      fieldVisabled: true, // 字段显示隐藏
      // formFields1: [{
      //   name: 'field1',
      //   label: '字段1',
      //   form: {
      //     tag: 'input',
      //     rules: [{
      //       required: true, message: '必填'
      //     }, {
      //       pattern: /^[0-9]+$/,
      //       message: '必须是数字'
      //     }]
      //   }
      // }, {
      //   name: 'field2',
      //   label: '字段2',
      //   form: {
      //     tag: 'select',
      //     visabled: false,
      //     options: [{
      //       label: '选项1',
      //       value: 1
      //     }, {
      //       label: '选项2',
      //       value: 2
      //     }],
      //     rules: [{
      //       required: true, message: '必填'
      //     }]
      //   }
      // }, {
      //   name: 'field3',
      //   label: '字段3',
      //   form: {
      //     tag: 'date',
      //     rules: [{
      //       required: true, message: '必填'
      //     }]
      //   }
      // }],
      formFields1: ['lowIncomeDiscountPolicyType', 'x', 'x', 'startTime', 'endTime', 'x', 'attachments'].map(field => discount[field]),
      buttonList: [
        {
          label: '表单验证，异步',
          validate: true,
          func: (button, data) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(10000)
              }, 1000)
            }).then((res) => {
              console.log(button.formData)
              this.testData = button.formData
            })
          }
        }, {
          label: '表单验证，同步',
          validate: true,
          func: (button) => {
            console.log(button.formData)
            this.testData = button.formData
          }
        }, {
          label: '无验证，异步',
          func: (button, data) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(10000)
              }, 1000)
            }).then((res) => {
              console.log(button.formData)
              this.testData = button.formData
            })
          }
        }, {
          label: '无验证，同步',
          func: (button, data) => {
            console.log(button.formData)
            this.testData = button.formData
          }
        }, {
          label: '重置',
          func: (button, data) => {
            this.testData = {}
            this.$refs.form1.resetForm()
            // this.formData1 = {}
            // this.$refs.form1.$refs.dataform.clearValidate()
          }
        }
      ]
    }
  },
  watch: {
    fieldVisabled (flag) {
      this.$set(this.formFields1[0].form, 'visabled', flag)
    }
  },
  created () {
    setTimeout(() => {
      this.formFields1 = this.formFields1.map(field => {
        if (field.name === 'lowIncomeDiscountPolicyType') {
          return {
            ...field,
            options: discountOptions,
            form: {
              ...field.form,
              options: discountOptions
            }
          }
        }
        return field
      })
    }, 1000)
  }
}
</script>
