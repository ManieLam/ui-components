<template lang='pug'>
div(style="padding: 2rem")
  .demo-selector
    el-switch(v-model="isAutoColumn", active-text="开启自适应宽度的列数", inactive-text="关闭自适应宽度的列数")
    div(for="defaultColNum", style="display: flex") 当关闭自适应列数，指定的列数
      el-input-number#defaultColNum(v-model="defaultColNum")
    div(for="readOnlyCol", style="display: flex") 只读
      el-switch#readOnlyCol(v-model="readOnlyCol")
  h4 栅格式表单
  AnsoDataform(
    ref="form1"
    v-model="formData"
    type="row"
    :readOnly="readOnlyCol"
    :defaultColNum="defaultColNum"
    :isAutoColumn="isAutoColumn"
    :formFields="formFields"
    :buttonList="[submitBtn, resetBtn('form1')]"
    buttonAlign="right")
    template(#field2)
      el-button(@click="$message.success('你点到我了')") 点一下
  hr
  h4 配置可收缩/展开
  .demo-selector
    el-switch(v-model="collapsable", active-text="开启自动收缩", inactive-text="关闭自动收缩")
  AnsoDataform(
    v-model="formData"
    ref="form2"
    type="row"
    buttonAlign="right"
    :defaultColNum="defaultColNum"
    :isAutoColumn="isAutoColumn"
    :collapsable="collapsable"
    :formFields="formFields"
    :buttonList="[submitBtn, resetBtn('form2')]")
  hr
  h4 栅格式表单行内跨列
  .demo-group-inline__flex(style="padding-bottom: 8px")
  AnsoDataform(
    ref="form3"
    v-model="formData"
    type="row"
    :defaultColNum="defaultColNum"
    :isAutoColumn="isAutoColumn"
    :colspanNum="3"
    :formFields="formFieldsRowCol"
    :buttonList="[submitBtn, resetBtn('form3')]"
    buttonAlign="right")
</template>

<script>
/** */
import fieldsJson from './fields.json'
export default {
  name: 'FormLayoutRow',
  data () {
    return {
      formFields: fieldsJson.simple,
      formFieldsRowCol: fieldsJson.simpleRowCol,
      formData: {
        name: 'boook',
        field1: 222,
        field3: [],
        field4: null, // 注意数据类型会导致组件操作异常
        field5: null,
        field6: []
      },
      collapsable: true,
      isAutoColumn: true,
      defaultColNum: 2,
      readOnlyCol: false,
      submitBtn: {
        label: '提交',
        type: 'primary',
        validate: true,
        func: (button) => {
        }
      },
      resetBtn: (name) => {
        return {
          label: '重置',
          type: 'complete',
          func: (button) => {
            console.info('button:', button)
            this.$refs[name].resetForm()
          }
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.demo-group-inline__flex
  display: flex
  align-items: center
  &>label
    margin-right: 4px
  &>label:not(:first-child)
    margin-left: 20px
.demo-selector
  border: 3px dashed #d5d5d5
  padding: 4px
  > div
    margin: 4px 0
</style>
