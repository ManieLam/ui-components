<template lang='pug'>
div(style="padding: 0 2rem")
  h4 使用AnsoDataform基础表单实现多行多列，根据配置的字段默认流向依次按行填充，可以通过配置gridFlow=column/row来设置字段按列或行填充
  .demo-group-inline__flex(slot="body-header",style="padding-bottom: 8px")
    label
      div 设置方向
      AnsoDataformSelect(v-model="gridFlow",:options="flowOption")
    label
      div 设置{{gridFlow==='column' ? '行' : '列'}}数
      AnsoDataformNumber(v-model="gridspanNum")
    label
      div 文本标签水平方向排列
      AnsoDataformSelect(v-model="labelPosition",:options="labelPositionOption")
    label
      div 只读
      AnsoDataformSwitch(v-model="readOnly")
  AnsoDataform(
    ref="form"
    v-model="formData"
    type="grid"
    :gridspanNum="gridspanNum"
    :gridFlow="gridFlow"
    :labelPosition="labelPosition"
    :inlineGrid="true"
    :readOnly="readOnly"
    :formFields="formFields1"
    :buttonList="buttonList")
    template(#field2)
      el-button(@click="$message.success('你点到我了')") 点一下
  hr
  h4 网格布局实现多行多列，跨多行跨多列
  h6 多列情景下，列的总数以最大跨列决定
  AnsoDataform(
    ref="form1"
    v-model="formData"
    type="grid"
    :gridspanNum="5"
    :gridFlow="gridFlow"
    :inlineGrid="true"
    :formFields="formFieldsRowCol"
    :buttonList="buttonList")
  hr
  h4 网格布局，设置border=false，关闭边框
  AnsoDataform(
    ref="form2"
    v-model="formData"
    type="grid"
    :gridspanNum="gridspanNum"
    :border="false"
    :inlineGrid="true"
    :formFields="formFields"
    :buttonList="buttonList")
  hr
  h4 网格布局，设置inline=false置为二维表格形式（TODO）
</template>

<script>
/** */
import fieldsJson from './fields.json'
export default {
  name: 'FormFromGrid',
  data () {
    return {
      readOnly: false,
      formFields: fieldsJson.simple,
      formFieldsRowCol: fieldsJson.simpleRowCol,
      multiSpanFields: fieldsJson.spans,
      formData: {
        name: 'boook',
        field1: 222,
        field2: null,
        field3: [],
        field4: null,
        field5: null,
        field6: [],
        field8: [],
        field9: null,
        field10: null,
        field11: null,
        field12: null,
        field: null
      },
      gridFlow: 'row',
      gridspanNum: 3,
      buttonList: [{
        label: '提交',
        position: 'right',
        validate: true,
        func: (button) => {
          console.log('确认被点击', button)
        }
      }, {
        label: '重置',
        func: () => {
          this.$refs.form.resetForm()
        }
      }],
      flowOption: [{
        label: '竖向排序 column',
        value: 'column'
      }, {
        label: '横向排序 row',
        value: 'row'
      }],
      labelPosition: 'right',
      labelPositionOption: [{
        label: '居左',
        value: 'left'
      }, {
        label: '居中',
        value: 'center'
      }, {
        label: '居右',
        value: 'right'
      }],
      formFields1: [
        {
          name: 'field1',
          label: '中华人民共和国合同法章节',
          form: {
            tag: 'input',
            placeholder: '请输入field1',
            rules: [{
              required: true, message: '请输入field1'
            }]
          }
        },
        {
          name: 'field2',
          label: 'field2',
          form: {
            tag: 'select',
            placeholder: '请输入field2',
            rules: [
              {
                required: true,
                message: '请输入field2'
              }
            ],
            options: [
              { label: '1', value: '1' },
              { label: '2', value: '2' },
              { label: '3', value: '3' },
              { label: '4', value: '4' },
              { label: '5', value: '5' }
            ]
          }
        },
        {
          name: 'field3',
          label: 'field3',
          form: {
            tag: 'cascader',
            placeholder: '请输入field3',
            rules: [
              {
                required: true,
                message: '请输入field3'
              }
            ],
            options: [
              {
                label: '1',
                value: '1'
              },
              {
                label: '2',
                value: '2'
              },
              {
                label: '3',
                value: '3'
              },
              {
                label: '4',
                value: '4'
              },
              {
                label: '5',
                value: '5'
              }
            ]
          }
        },
        {
          name: 'field4',
          label: 'field4',
          form: {
            tag: 'time',
            placeholder: '请输入field4'
          }
        },
        {
          name: 'field5',
          label: 'field5',
          form: {
            tag: 'date',
            placeholder: '请输入field5',
            rules: [
              {
                required: true,
                message: '请输入field5'
              }
            ]
          }
        },
        {
          name: 'field6',
          label: 'field6',
          form: {
            tag: 'timeRange',
            placeholder: '请输入field6',
            rules: [
              {
                required: true,
                message: '请输入请输入field6'
              }
            ]
          }
        },
        {
          name: 'field7',
          label: 'field7',
          form: {
            tag: 'radio',
            placeholder: '请输入field7',
            rules: [
              {
                required: true,
                message: '请输入field3'
              }
            ],
            options: [
              {
                label: '无',
                value: '0'
              },
              {
                label: '有',
                value: '1'
              }
            ]
          }
        },
        {
          name: 'field8',
          label: 'field8',
          form: {
            tag: 'checkbox',
            options: [
              {
                label: '无',
                value: '0'
              },
              {
                label: '有',
                value: '1'
              }
            ],
            placeholder: '请输入field8'
          }
        },
        {
          name: 'field9',
          label: 'field9',
          form: {
            tag: 'switch',
            placeholder: '请输入field9'
          }
        },
        {
          name: 'field10',
          label: 'field10',
          form: {
            tag: 'numberRange',
            placeholder: '请输入field10'
          }
        },
        {
          name: 'field11',
          label: 'field11',
          form: {
            tag: 'number',
            placeholder: '请输入field11'
          }
        },
        {
          name: 'field',
          label: 'field',
          form: {
            tag: 'input',
            placeholder: '请输入field1',
            inputType: 'textarea'
          }
        },
        {
          name: 'field12',
          label: 'field12',
          form: {
            tag: 'file',
            colSpan: 3,
            placeholder: '请输入field12'
          }
        }
      ]
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
</style>
