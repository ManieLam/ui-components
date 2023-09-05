<template lang='pug'>
.demo-form-append_and_suffix
  h4 分组表单，设置分组表单内前置后置slot，以及字段的前缀后缀
  AnsoDataformGroup.demo-Group.form-withFixed(
    ref="form"
    v-model="formValues"
    :colspanNum="2"
    :gridspanNum="2"
    :groupSplit="groupSplit"
    :groupTitle="groupTitle"
    :groupType="groupType"
    :formFields="formFields"
    :buttonList="buttonList"
    :buttonFixed="true")
    template(slot="group0-label")
      .form-group__label
        b.label-text 用小标题插槽自定义，替换原先小标题
        .label-action
          el-button(type="success", @click="$message.success('就知道你偏要点~')") 不要点
    template(slot="group0-header")
      p.label-tip 支持自定义分组表单头部信息，格式为`group${n}-header`: 第n组头部插槽（n由0开始）
    template(slot="group0-footer")
      p.label-tip 支持自定义分组表单足部信息，格式为`group${n}-footer`: 第n组足部插槽（n由0开始）
    //- 第n分组的内容插槽（n由0开始计起）
    template(slot="group2")
      AnsoDataform.customForm(
        ref="customForm"
        labelPosition="right"
        :formData="formData"
        :formFields="formFields")
        template(#body-header)
          p 第n分组的内容插槽（n由0开始计起），格式为`group${n}`，把原本配置groupType的网格式表单（grid）更换为自定义的表单内容
    //- 第n组字段filer2插槽（n由0开始）
    template(slot="group1-simple")
      el-button(@click="btnclick") 第n组字段simple插槽（n由0开始计起），自定义内容，格式为`group${n}-simple`
</template>

<script>
/** */
export default {
  name: 'group',
  data () {
    return {
      formData: {},
      formValues: {},
      groupType: ['grid', 'row', 'grid'],
      groupTitle: ['分组(0) - 分组内表单头部尾部的插槽', '分组(1) - 分组内表单的某一个字段自定义', '分组(2) - 某一个分组内的整个内容自定义'],
      groupSplit: [['append', 'suffix', 'both', 'simple'], ['append', 'suffix', 'both', 'simple'], ['append', 'suffix', 'both', 'simple']],
      formFields: [{
        name: 'append',
        label: '设置前缀的字段',
        form: {
          tag: 'input',
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
        name: 'simple',
        label: '普通字段',
        form: {
          tag: 'input'
        }
      }],
      buttonList: [{
        label: '提交',
        type: 'primary',
        func: () => {}
      }]
    }
  },
  methods: {
    btnclick () {
      this.$message.success('你点到了group1-simple,分组第二内simple自定内容的按钮事件')
    }
  }
}
</script>

<style lang='sass' scoped>
.form-group__label
  margin: 0 1.2rem
  display: flex
  justify-content: space-between
  color: $--color-primary
  .label-text:after
    content: ''
    display: block
    height: 10px
    background: $--color-primary
    margin-top: -6px
    opacity: .3
</style>

<style scoped>
.demo-Group >>> .el-input {
  width: auto
}
.customForm >>> .el-input {
  width: 100%
}
</style>
