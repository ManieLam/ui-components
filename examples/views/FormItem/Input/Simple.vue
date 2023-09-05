<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 输入框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    h5 单独使用AnsoDataformInput
    AnsoDataformInput(v-model="inputVal")
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 可清空
    AnsoDataform(
      :formFields="clearFormFields"
      :buttonList="[]"
    )
    hr
    h4 密码框
    AnsoDataform(
      :formFields="passwordFormFields"
      :buttonList="[]"
    )
    hr
    h4 限制输入长度
    AnsoDataform(
      :formFields="lenghtFormFields"
      :buttonList="[]"
    )
    hr
    h4 基础复合型输入框
    AnsoDataform(
      :formFields="affixesFormFields"
      :buttonList="[]"
    )
    hr
    h4 带 icon 的输入框
    AnsoDataform(
      :formFields="iconFormFields"
      :buttonList="[]"
    )
    hr
    h4 插槽使用（文本类型前后缀）
    AnsoDataformInput(v-model="inputVal")
      div(slot="prepend") ¥
      div(slot="append") / 人
    hr
    h4 插槽使用（icon类型前后缀）
    AnsoDataformInput(v-model="inputVal")
      i.el-input__icon.el-icon-search(slot="prefix")
      i.el-input__icon.el-icon-arrow-down(slot="suffix")
</template>

<script>
export default {
  name: 'simpleInput',
  components: {},
  data () {
    return {
      inputVal: '',
      nomalFormFields: [{
        name: '输入框',
        label: '输入框',
        form: {
          tag: 'input'
        }
      }],
      disabledFormFields: [{
        name: '输入框-禁用',
        label: '输入框-禁用',
        form: {
          tag: 'input',
          disabled: true
        }
      }],
      clearFormFields: [{
        name: '输入框-可清空',
        label: '输入框-可清空',
        form: {
          tag: 'input',
          clearable: true
        }
      }],
      passwordFormFields: [{
        name: '输入框-密码框',
        label: '输入框-密码框',
        form: {
          tag: 'input',
          password: true
        }
      }],
      lenghtFormFields: [{
        name: '输入框-限制输入长度',
        label: '输入框-限制输入长度',
        form: {
          tag: 'input',
          maxlength: 10,
          'show-word-limit': true
        }
      }],
      affixesFormFields: [{
        name: '基础复合型输入框-前缀',
        label: '前缀',
        form: {
          tag: 'input',
          // affixes: {
          //   type: 'prepend',
          //   content: 'http://'
          // }
          prepend: { type: 'string', content: 'http://' }
        }
      }, {
        name: '基础复合型输入框-后缀',
        label: '后缀',
        form: {
          tag: 'input',
          // affixes: {
          //   type: 'append',
          //   content: '.com'
          // }
          append: { type: 'string', content: '.com' }
        }
      }],
      iconFormFields: [{
        name: '基础复合型输入框-默认图标显示在输入框起始位',
        label: '默认icon',
        form: {
          tag: 'input',
          // icon: 'search'
          prepend: { type: 'icon', content: 'search' }
        }
      }, {
        name: '基础复合型输入框',
        label: '后缀icon',
        form: {
          tag: 'input',
          // icon: 'date',
          // iconAlign: 'right',
          append: { type: 'icon', content: 'date' }
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
