<template lang="pug">
  div(:style="{padding: '1rem'}")
    div(style="border: 1px dotted #ddd;margin-bottom: 10px;padding: 5px") 提交数据：{{JSON.stringify(testData)}}
    h4 高亮显示修改项（默认）
    AnsoDataformCompared(
      ref="simpleCompared"
      :columns="['信息项', '原值', '变更值']"
      :value="formData"
      :formFields="formFields"
      :buttonList="[...buttonList, buildResetBtn('simpleCompared')]")
    hr
    h4 表单只读
    h6 全表单只读，配置属性disabled="true"
    AnsoDataformCompared(
      ref="simpleCompared1"
      :disabled="true"
      :value="formData"
      :originData="originData"
      :formFields="formFields"
      :buttonList="[...buttonList, buildResetBtn('simpleCompared1')]")
    h6 某字段只读，配置属性form.disabled="true"
    AnsoDataformCompared(
      ref="simpleCompared2"
      :columns="['信息项3', '原值', '变更值']"
      :value="formData"
      :originData="originData"
      :formFields="[...formFields, ...disableFileds]"
      :buttonList="[...buttonList, buildResetBtn('simpleCompared2')]")
    hr
    h4 表单存在
</template>

<script>
export default {
  name: 'FormComparedSimple',
  data () {
    return {
      formData: {
        field1: 123,
        field2: 456,
        field3: 222222
      },
      originData: {
        field1: '原值1',
        field2: '原值2',
        field3: '原值3'
      },
      testData: {},
      disableFileds: [{
        name: 'field3',
        label: '被禁止的字段',
        form: {
          tag: 'input',
          disabled: true // 配置当前字段不可编辑
        }
      }],
      formFields: [{
        name: 'field1',
        label: '字段1',
        form: {
          tag: 'input',
          prepend: '+86',
          maxlength: '11',
          // chainKey: 'field3',
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
          'show-word-limit': true,
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }, {
            pattern: /^[0-9]+$/,
            message: '必须是数字'
          }]
        }
      }],
      buttonList: [{
        label: '表单验证，异步',
        validate: true,
        func: (button, data) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(10000)
            }, 1000)
          }).then((res) => {
            this.testData = button.formData
          })
        }
      }, {
        label: '表单验证，同步',
        validate: true,
        func: (button) => {
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
            this.testData = button.formData
          })
        }
      }, {
        label: '无验证，同步',
        func: (button, data) => {
          this.testData = button.formData
        }
      }],
      buildResetBtn: (name) => {
        return {
          label: '重置',
          func: () => {
            this.$refs[name].resetForm()
          }
        }
      }
    }
  }
}
</script>
