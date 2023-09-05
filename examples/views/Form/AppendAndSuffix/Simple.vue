<template lang='pug'>
.demo-form-append_and_suffix
  .demo-box
    h4 基础表单，设置表单内前置后置slot，以及字段的前缀后缀
    div.chooseForm
      span 表单类型选择
      AnsoDataformSelect(v-model="type",:options="typeOption")
    AnsoDataform.demo(
      style="padding: 0 32px"
      :formFields="formFields"
      :buttonList="buttonList"
      :type="type"
      v-model="formValues")
      template(v-slot:body-before="{formData}")
        el-input(v-model="formData.testInput")
      template(#custom)
        span 自定义设置内容
      template(#body-header)
        h3.slot-box 表单body-header插槽
      template(#body-footer)
        h3.slot-box 表单body-footer插槽
  .demo-box
    h4 表单嵌套
    el-button(@click="setInnerData") 设置内置数据
    AnsoDataform.demo(
      ref="withinnerForm"
      style="padding: 0 32px"
      keyName="withinnerForm"
      :formFields="formFields"
      :buttonList="[...withInnerButtonList, ...resetBtn]"
      :defaultColNum="4"
      :isAutoColumn="false"
      labelPosition="top"
      v-model="formValues")
      template(v-slot:body-before="{formData}")
        el-input(v-model="formData.testInput")
      template(v-slot:custom="{data, value}")
        //- slotProps.data.custom | slotProps.value
        AnsoDataform.inner-form(
          ref="innercustomForm"
          v-model="data.custom"
          type="inline"
          keyName="innercustomForm"
          :formFields="inlineFields"
          @onChange="getInnerForm")
  .demo-box
    AnsoDataform(
      ref="inlineForm"
      v-model="formValues",
      type="inline",
      :formFields="inlineFields"
      :buttonList="[...withInnerButtonList, ...resetBtn]")
      template(v-slot:body-header="{formData}")
        .el-form-item
          label.el-form-item__label 测试first插槽
          el-input.el-form-item__content(
            style="width: auto;"
            v-model="formData.testInput")

  .demo-box
    h4 直接使用插槽对象表示某字段的前后插槽位置, 内置插槽字段name属性必须唯一（防止数据覆盖）
    AnsoDataform(ref="customSlot", :formFields="slotFields", @onChange="customSlotChange")
</template>

<script>
/** */
export default {
  name: 'AppendAndSuffix',
  data () {
    const isrequired = {
      required: true, message: '必填'
    }
    const validateCustom = function (rule, value, callback) {
      if (!value || !Object.keys(value).length) {
        callback(new Error('必填'))
      } else {
        callback()
      }
    }
    return {
      type: 'default',
      typeOption: [{
        label: '基础表单 ',
        value: 'default'
      }, {
        label: '网格式表单',
        value: 'grid'
      }, {
        label: '栅格式表单',
        value: 'row'
      }, {
        label: '内联式表单',
        value: 'inline'
      }],
      formValues: {
        append: null,
        suffix: null,
        both: null,
        custom: {}
        // custom: {
        //   // p: null,
        //   // c: null,
        //   // a: null
        // }
      },
      /* 使用函数式表示插槽 */
      formFields: [{
        name: 'append',
        label: '设置前缀的字段',
        form: {
          tag: 'input',
          rules: [isrequired],
          // 配置前缀
          preSlotRender: (h) => {
            return h('el-button', {
              domProps: {
                innerHTML: '前缀点一下'
              },
              on: {
                click: () => {
                  this.$message.success('你点到我了')
                }
              }
            })
          }
        }
      }, {
        name: 'suffix',
        label: '设置后缀的字段',
        form: {
          tag: 'select',
          bottomTip: '这是一段在底部显示的辅助性文字。只限输入文本。',
          suffixSlotRender: (h) => {
            return h('el-button', {
              domProps: {
                innerHTML: '后缀点一下'
              },
              on: {
                click: () => {
                  this.$message.success('你点到我了')
                }
              }
            })
          }
        }
      }, {
        name: 'both',
        label: '设置了前缀和后缀的字段',
        form: {
          tag: 'input',
          // 配置前缀
          preSlotRender: (h) => {
            return h('el-button', {
              domProps: {
                innerHTML: '+ 0754'
              }
            })
          },
          suffixSlotRender: (h) => {
            return h('el-button', {
              domProps: {
                innerHTML: '保存'
              },
              on: {
                click: () => {
                  this.$message.success('保存')
                }
              }
            })
          }
        }
      }, {
        label: '自定义内容字段',
        name: 'custom',
        form: {
          tag: 'text',
          colSpan: 3,
          rules: [
            {
              validator: validateCustom, trigger: 'change'
            }
            // isrequired
          ],
          innerRules: {}
        }
      }],
      /* 行内类型表单，插槽使用 */
      inlineFields: [{
        name: 'testInput',
        label: '测试插槽',
        form: {
          tag: 'input'
        }
      }, {
        label: '省',
        name: 'p',
        form: { tag: 'input', placeholder: '请输入省', labelHidden: true, rules: [isrequired] }
      }, {
        label: '市',
        name: 'c',
        form: { tag: 'input', placeholder: '请输入市', labelHidden: true, rules: [isrequired] }
      }, {
        label: '区',
        name: 'a',
        form: { tag: 'input', placeholder: '请输入区', labelHidden: true }
      }],
      /* 直接使用插槽对象{preSlotRender: <Object>, suffixSlotRender: <Object>}表示某字段的前后插槽位置 */
      slotFields: [
        {
          name: 'field1',
          label: '同时使用前后插槽位置',
          form: {
            tag: 'input',
            preSlotRender: {
              name: 'field1PreSlot',
              tag: 'text',
              // readOnly: true,
              render: () => {
                return 'aaaaa'
              },
              options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]
            },
            suffixSlotRender: {
              name: 'field1SuffixSlot',
              tag: 'select',
              options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }]
            }
          }
        },
        {
          name: 'field2',
          label: '使用前插槽位置',
          form: {
            tag: 'select',
            options: [{ label: '选项1', value: 1 }, { label: '选项2', value: 2 }],
            preSlotRender: {
              name: 'field2PreSlot',
              tag: 'switch',
              options: [{ label: '开', value: true }, { label: '关', value: false }]
            }
          }
        },
        {
          name: 'field3',
          label: '使用后插槽位置',
          form: {
            tag: 'input',
            suffixSlotRender: {
              name: 'field3SuffixSlot',
              tag: 'button',
              buttonList: [
                { name: 'getAddress', label: '获取地址', func: () => { console.log('已点击:', ...arguments) } }
              ]
            }
          }
        }
      ],
      buttonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (button, datas) => {
          // console.log('submit button:', button)
          console.log('submit datas:', datas)
        }
      }],
      withInnerButtonList: [{
        label: '提交',
        type: 'primary',
        validate: true,

        func: (button, data) => {
        // func: (button, datas, form) => {
        //   // 由于嵌套表单，数据为对象类型，监听会异常
          console.log('submit datas1:', data)
          // console.log('submit button:', button)
        }
      }],
      resetBtn: [{
        label: '重置',
        func: () => {
          this.$refs.withinnerForm.resetForm()
          this.$refs.innercustomForm.resetForm()
          // this.formValues.custom = {}
        }
      }]
    }
  },
  methods: {
    setInnerData () {
      this.$set(this.formValues, 'custom', {
        p: '广东省',
        c: '广州市',
        a: '海珠区'
      })
    },
    getInnerForm ({ value, field, values }) {
      // 如果设置表单字段必填，由于是插槽自定义字段，数据是嵌套关系，需要使用以下方法重新触发判断验证单个字段。
      /* 在async-validator官网中, object嵌套的时候rules也是个嵌套的结构。这种方式表单待优化 */
      this.$refs.withinnerForm.validateField('custom')
    },
    customSlotChange () {
      console.log('自定义插槽数据更改：', ...arguments)
    }
  }
}
</script>

<style lang="sass" scoped>
.chooseForm
  span
    margin-right: 8px
    font-size: 14px
.inner-form::v-deep .el-form-item
  margin-bottom: 0

</style>

<style lang='sass' scoped>
</style>
