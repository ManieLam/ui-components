<template lang='pug'>
.demo-form-label.demo-box
  .flex-box
    h4 设置表单所有字段，文本标签显示/隐藏 label-hidden:
    AnsoDataformSwitch(v-model="labelHidden",:options="hiddenOptions")
  AnsoDataform.form-center_50(
    :label-hidden="labelHidden"
    :formFields="fields1")
  hr
  .flex-box
    h4 表单隐藏字段与单字段调整隐藏的关系
    label 表单类型：props.type
      AnsoDataformSelect(v-model="form6.type",:options="formPropTypeOptions")
    label 表单props.labelHidden
      AnsoDataformSwitch(v-model="form6.labelHidden",:options="hiddenOptions")
    label 表单第一个字段form.labelHidden
      AnsoDataformSwitch(v-model="form6.fieldLabelHidden",:options="hiddenOptions")
  .flex-box
    small 如果需要 【既要整个表单字段隐藏只单独开某个字段的情况】，请单独给需要开启的字段配置"labelHidden + labelWidth"
  .flex-box
    small 单字段的配置优先级高于整体表单配置
  AnsoDataform(
    key="fields6"
    :type="form6.type"
    :labelHidden="form6.labelHidden"
    :formFields="fields6")
  hr
  .flex-box
    h4 设置文本标签位置 label-position :
    AnsoDataformSelect(v-model="labelPosition",:options="positionOption")
  AnsoDataform(
    :label-position="labelPosition"
    :formFields="fields1"
    :buttonList="buttonList")
  AnsoDataform(
    type="grid"
    :gridspanNum="3"
    :labelPosition="labelPosition"
    :formFields="fields1"
    :buttonList="buttonList")
  AnsoDataform(
    type="row"
    :defaultColNum="3"
    :isAutoColumn="false"
    :labelPosition="labelPosition"
    :formFields="fields1"
    :buttonList="buttonList")
  hr
  .flex-box
    h4 字段辅助性标签显示(只限制文本)：labelTip
  AnsoDataform(
    :formFields="fields2"
    :buttonList="buttonList"
    labelWidth="160px")
  hr
  .flex-box
    h4 单字段 不显示文本标签，配置字段form.labelHidden
    AnsoDataformSwitch(v-model="toggleSingleLabelHidden",:options="hiddenOptions")
  AnsoDataform(
    type="inline"
    :formFields="fields3")
  AnsoDataform(
    type="grid"
    :gridspanNum="4"
    :formFields="fields4")
  AnsoDataform(
    type="row"
    :defaultColNum="4"
    :isAutoColumn="false"
    :formFields="fields4")
  hr
  .flex-box
    h4 单字段 设置label宽度，配置字段form.labelWidth
    AnsoDataformNumber(v-model="inputLabelWidth",style="width:120px",:step="10")
    | px
  AnsoDataform(
    type="row",
    :defaultColNum="3"
    :formFields="field5")
</template>

<script>
/** */
export default {
  name: 'FormFormLabel',
  data () {
    return {
      inputLabelWidth: 150,
      labelHidden: true,
      toggleSingleLabelHidden: true, // 单字段是否显示文本标签
      hiddenOptions: [{
        label: '隐藏 true  ',
        value: true
      }, {
        label: '显示 false',
        value: false
      }],
      fields1: [{
        label: '字段1label比较长',
        name: 'field1',
        form: {
          tag: 'input',
          placeholder: '请输入字段1',
          // labelHidden:true
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        label: '字段2 ',
        name: 'field2',
        form: {
          tag: 'date',
          placeholder: '请选择字段2   '
        }
      }, {
        label: '字段3 ',
        name: 'field3',
        form: {
          tag: 'select',
          placeholder: '请选择字段3',
          options: [{
            label: '女',
            value: 'female'
          }, {
            label: '男',
            value: 'male'
          }]
        }
      }],
      labelPosition: 'right',
      positionOption: [{
        label: '上边 top (对grid类型的form无效) ',
        value: 'top'
      }, {
        label: '左边 left',
        value: 'left'
      }, {
        label: '右边 right',
        value: 'right'
      }, {
        label: '中间 center',
        value: 'center'
      }],
      fields2: [{
        label: '带提示辅助性标签',
        name: 'labelTip',
        labelTip: '这是一段带提示性的辅助文字。只限输入文本。',
        form: {
          tag: 'input',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        label: '底部辅助性文字',
        name: 'labelTip2',
        form: {
          tag: 'select',
          bottomTip: '这是一段在底部显示的辅助性文字。只限输入文本。',
          rules: [{
            required: true, message: '必填'
          }]
        }
      }, {
        label: '字段3',
        name: 'field3',
        form: {
          tag: 'date'
        }
      }],
      singleLabelHidden: true,
      fields3: [{
        label: '单字段不显示文本标签',
        name: 'labelhidden',
        form: {
          tag: 'input',
          labelHidden: true
        }
      }],
      fields4: [{
        name: 'labelhidden1  ',
        label: '文本文本1 ',
        form: {
          tag: 'input',
          labelWidth: '200px',
          labelHidden: true
        }
      }, {
        name: 'labelhidden2',
        label: '文本2 ',
        form: {
          tag: 'input',
          colSpan: 2
        }
      }, {
        name: 'labelhidden3',
        label: '文本3',
        form: {
          tag: 'input'
        }
      }],
      field5: [{
        name: 'labelWidth',
        label: '设置文本宽度',
        form: {
          tag: 'input',
          labelWidth: '130px'
        }
      }, {
        name: 'labelWidth1',
        label: '没有设置文本宽度',
        form: {
          tag: 'input'
        }
      }],
      /* 第6个表单：表单隐藏字段与单字段调整隐藏的关系 */
      fields6: [{
        name: 'labelhidden1  ',
        label: '文本文本1 ',
        form: {
          tag: 'input'
        }
      }, {
        name: 'labelhidden2',
        label: '文本2 ',
        form: {
          tag: 'input',
          colSpan: 2
        }
      }, {
        name: 'labelhidden3',
        label: '文本3',
        form: {
          tag: 'input'
        }
      }],
      form6: {
        fieldLabelHidden: false,
        labelHidden: false,
        type: 'default'
      },
      formPropTypeOptions: [
        { label: '默认', value: 'default' },
        { label: '网格', value: 'grid' },
        { label: '行内', value: 'inline' },
        { label: '栅格', value: 'row' }
      ],
      buttonList: [{
        label: '确定',
        name: 'submit',
        type: 'primary',
        validate: true,
        func: (button) => {
          console.log('提交内容：', button.formData)
        }
      }]
    }
  },
  watch: {
    toggleSingleLabelHidden (flag) {
      this.fields3[0].form.labelHidden = flag
      this.fields4[0].form.labelHidden = flag
      // this.fields4.map(field => {
      //   field.form.labelHidden = flag
      // })
    },
    inputLabelWidth (val) {
      this.$set(this.field5[0].form, 'labelWidth', val ? val + 'px' : 0)
    },
    // 'form6.labelHidden' (flag) {
    //   const isHidden = !!this.fields6[0].form?.labelHidden
    //   if (!isHidden) {
    //     // 当字段没有配置隐藏标签时，才需要检查是否表单有隐藏
    //     this.$set(this.fields6[0].form, 'labelHidden', flag)
    //   }
    // },
    'form6.fieldLabelHidden' (flag) {
      this.$set(this.fields6[0].form, 'labelHidden', flag)
    }
  }
}
</script>

<style lang='sass' scoped>
.form-center_50
  margin: 0 auto
.flex-box
  display: flex
  align-items: center
  h4
    margin-right: 8px
</style>
