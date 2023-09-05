<template lang='pug'>
.anso-dataform-demo__inline
  h4 内联模式的表单：常用于页面占位小，紧凑的，如筛选表单
  .field-controller
    h5 勾选需要展示的字段
    el-checkbox-group(v-model="showFieldList2")
      el-checkbox(
        v-for="(field, index) in formFields"
        :key="field.name"
        :label="field") {{field.label}}
  .field-controller
    h5 可否收缩
    el-switch(v-model="collapsable", active-text="开启", inactive-text="关闭")
  AnsoDataform(
    ref="collapseForm"
    v-model="modelData"
    type="inline"
    keyName="form-inline-collapseable"
    :collapsable="collapsable"
    :formFields="showFieldList2"
    :buttonList="[...buttonList, buildResetButton('collapseForm')]")
  hr
  //- h5 另一种展示收缩/展开表单方式（详细文档见"/布局/栅格式"）
  //- AnsoDataform(
  //-   ref="collapseRowForm"
  //-   v-model="modelData"
  //-   type="row"
  //-   keyName="form-row-collapseable"
  //-   :collapsable="collapsable"
  //-   :formFields="showFieldList2"
  //-   :buttonList="[...buttonList, buildResetButton('collapseRowForm')]")
  //- AnsoDataform(
  //-   ref="collapseRowForm1"
  //-   :value="singleData"
  //-   type="row"
  //-   keyName="form-row-collapseable1"
  //-   :collapsable="collapsable"
  //-   :formFields="showFieldList2"
  //-   :buttonList="[...buttonList1, buildResetButton('collapseRowForm1')]")
</template>

<script>
/** */
import fieldsJson from './fields.json'
export default {
  name: 'FormFormInline',
  data () {
    return {
      collapsable: true,
      toptipVisable: true,
      modelData: {},
      singleData: {},
      formFields: fieldsJson.simple.slice(0, fieldsJson.simple.length - 2),
      // 设置最大显示行，其余收缩，允许展开
      showFieldList2: fieldsJson.simple.slice(0, fieldsJson.simple.length - 2),
      maxRow: 2,
      colspanNum: 2,
      buttonList: [{
        label: '搜索',
        type: 'primary',
        validate: true,
        func: (button) => {
          console.log('button:', button.formData)
        }
      }],
      buttonList1: [{
        label: '单项数据绑定 - 搜索',
        type: 'primary',
        validate: true,
        func: (button) => {
          console.log('单项数据绑定:', button.formData)
          this.singleData = button.formData
        }
      }]
    }
  },
  methods: {
    buildResetButton (refname) {
      return {
        label: '重置',
        func: () => {
          this.$refs[refname].resetForm()
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>
.anso-dataform-demo__inline
  padding: 0 2rem 1rem
.field-controller
  margin-bottom: 1rem
  padding-bottom: 0.8rem
  border-bottom: 1px dotted #dfdfdf
</style>
