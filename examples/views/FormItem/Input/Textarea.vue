<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 多行文本框
    AnsoDataform(
      :formFields="textareaFormFields"
      :buttonList="[]"
    )
    hr
    h4 可自适应文本高度的文本域
    AnsoDataform(
      :formFields="FormFields"
      :buttonList="[]"
    )
    hr
    h4 输入长度限制
    AnsoDataform(
      :formFields="lenghtFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleInput',
  components: {
    // inputReadme
  },
  data () {
    return {
      textareaFormFields: [{
        name: '文本框',
        label: '文本框',
        form: {
          tag: 'input',
          inputType: 'textarea',
          placeholder: '请输入'
        }
      }],
      FormFields: [{
        name: '文本框- 自适应文本',
        label: '文本框 - 自适应文本',
        form: {
          tag: 'input',
          inputType: 'textarea',
          autosize: true,
          placeholder: '请输入'
        }
      }, {
        name: '文本框 - 设置固定文本高度',
        label: '文本框 - 设置固定文本高度',
        form: {
          tag: 'input',
          inputType: 'textarea',
          autosize: { minRows: 2, maxRows: 4 },
          placeholder: '请输入'
        }
      }],
      lenghtFormFields: [{
        name: '文本框 - 输入长度限制',
        label: '文本框 - 输入长度限制',
        form: {
          tag: 'input',
          inputType: 'textarea',
          maxlength: 30,
          'show-word-limit': true,
          placeholder: '请输入'
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
