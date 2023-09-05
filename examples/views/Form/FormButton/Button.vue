<template lang='pug'>
.demo-form_buttom.form-withFixed(style="padding-left: 1rem;padding-right: 1rem")
  .demo-form-button__tip 当前提交的数据：{{JSON.stringify(submitData)}}
  h4 表单按钮居左(默认) buttonAlign="left"
  AnsoDataform(
    ref="leftForm1"
    buttonAlign="left"
    :formFields="formFields"
    :buttonList="buttonList")
  hr
  h4 表单按钮居右 buttonAlign="right"
  AnsoDataform(
    ref="leftForm"
    buttonAlign="right"
    :formFields="formFields"
    :buttonList="buttonList")
  hr
  h4 表单按钮居中 buttonAlign="center"
  AnsoDataform(
    ref="leftForm"
    buttonAlign="center"
    :formFields="formFields"
    :buttonList="buttonList")
  hr
  h4 表单按钮固定底部 buttonFixed="true"
  small 设置该属性需要为父组件增加类名：.form-withFixed
  AnsoDataform(
    ref="leftForm"
    :buttonFixed="true"
    :formFields="formFields"
    :buttonList="singleButtonList")
  hr
  h4 对单个按钮配置左中右位置
  AnsoDataform(
    ref="singleBtnSetting"
    :formFields="formFields"
    :buttonList="singleButtonList")
  hr
  h4 按钮作为表单某一项数据
  AnsoDataform(:formFields="[btnField, ...formFields]")
</template>

<script>
/** */
export default {
  name: 'FormFormButton',
  data () {
    return {
      formData: {},
      submitData: {},
      formFields: [{
        name: 'field1',
        label: 'field1',
        form: {
          tag: 'input'
        }
      }, {
        name: 'field2',
        label: 'field2',
        form: {
          tag: 'select',
          options: [{
            label: 'girl',
            value: 'girl'
          }, {
            label: 'boy',
            value: 'boy'
          }]
        }
      }],
      formField2: [{
        label: '文本3',
        name: 'field3',
        form: {
          tag: 'input'
        }
      }, {
        label: '文本4',
        name: 'field4',
        form: {
          tag: 'input'
        }
      }, {
        label: '文本5',
        name: 'field5',
        form: {
          tag: 'input'
        }
      }],
      btnField: {
        label: '搜索用户',
        name: 'btnField',
        form: {
          tag: 'button',
          buttonList: [{
            label: '验证当前用户',
            type: 'success',
            func: (button) => {
              this.$message.success('触发搜索用户')
            }
          }]
        }
      },
      buttonList: [{
        label: '提交',
        type: 'primary',
        func: (button) => {
          this.submitData = button.formData
          this.$message.success('提交按钮被点击')
        }
      }, {
        label: '取消',
        func: (button) => {
          this.$message.warning('取消按钮被点击')
        }
      }],
      singleButtonList: [{
        label: '居左',
        position: 'left',
        func: () => {
          this.$message.success('居左按钮被点击')
        }
      }, {
        label: '居中',
        position: 'center',
        func: () => {
          this.$message.success('居中按钮被点击')
        }
      }, {
        label: '居右',
        type: 'primary',
        position: 'right',
        func: () => {
          this.$message.success('居右按钮被点击')
        }
      }]
    }
  }
}
</script>

<style lang='sass' scoped>
.demo-form-button__tip
  border: 1px solid #dfdfdf
  padding: .8rem
  margin: 1rem 0
</style>
