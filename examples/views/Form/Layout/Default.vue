<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h2 基础表单
  AnsoDataform(
    ref="form"
    v-model="formData"
    keyName="example-form-default"
    id="example-form-default"
    :formFields="formFields"
    :buttonList="buttonList"
    :buttonFixed="btnFixed"
    :label-position="labelPosition"
    @onChange="onChange")
    template(#customField)
      el-button(@click="$message.success('你点到我了')") 点一下
    template(#body-header)
      .body-header.slot-box
        h4 当前表单onChange方法出参数据
        ul
          li 所有表单数据：{{changeValue.values}}
          li 当前修改项配置信息：{{changeValue.field}}
          li 当前修改值：{{changeValue.value}}
          li 当前修改项原先值：{{changeValue.oldValue}}
        ul
          li
            el-button(@click="toggleData(1)") 赋值表单值为对象1
            el-button(@click="toggleData(2)") 赋值表单值为对象2
    template(#body-footer)
      h4.slot-box 表单bodyFooter插槽
</template>

<script>
/** */
import fieldsJson from './fields.json'
/** formFields 配置信息:
  [{
    "name": "field1",
    "label": "field1field1field1field1field1field1field1",
    "form": {
      "tag": "input",
      "placeholder": "请输入field1",
      "rules": [{
        "required": true, "message": "请输入field1"
      }]
    }
  }....]
*/
export default {
  name: 'FormFormDefault',
  data () {
    return {
      changeValue: {},
      // 是否按钮组固定
      btnFixed: false,
      // 表单文本标签文字位置
      labelPosition: 'right',
      // 表单文本标签文字位置选项
      labelPositonOptions: [{
        label: '居左',
        value: 'left'
      }, {
        label: '居顶',
        value: 'top'
      }, {
        label: '居右',
        value: 'right'
      }],
      // 表单数据
      formData: {
        name: 'boook',
        field1: 222,
        // field2: [],
        field3: [],
        field4: 'field4',
        field5: 'field5',
        field6: []
      },
      data1: {
        name: 'boook1',
        field1: 223,
        field2: '测试字段1',
        field3: [],
        field4: 1647670628000,
        field5: 1646841600000,
        field6: []
      },
      data2: {
        name: 'boook',
        field1: 123,
        field2: '测试字段2',
        field3: [],
        field4: null,
        field5: 1647446400000,
        field6: []
      },
      // 表单子元素字段配置
      formFields: [
        ...fieldsJson.simple,
        {
          label: '自定义字段',
          name: 'customField',
          form: {}
        }],
      buttonList: [{
        label: '提交',
        type: 'primary',
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
  },
  methods: {
    // 获取当表单子元素修改时修改项
    onChange (values) {
      // console.log('当前修改的内容：', values)
      // this.changeValue = values
    },
    toggleData (flag) {
      this.formData = this[`data${flag}`]
    }
  }
}
</script>

<style lang='sass' scoped>
.slot-box
  border: 1px dotted #747474
  padding: 8px
</style>
