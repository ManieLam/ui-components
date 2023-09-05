<template lang='pug'>
.demo-box
  b 内置的正则规则
  ul.regex-content
    li.regex-item(
      v-for="regexItem in regexMaps"
      :key="regexItem.label") {{regexItem.label}} : {{regexItem.regexp}}
  .flex-box
    h4 选择正则规则类型测试
    AnsoDataformSelect(v-model="regexType",:options="regexMaps")
  AnsoDataform(:label-hidden="true",:formFields="formFields")
</template>

<script>
/** */
export default {
  name: 'Setting',
  data () {
    return {
      regexpTypes: Object.keys(this.$regexps),
      regexType: 'mobile',
      buttonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (button) => {
          console.log('提交内容:', button.formData)
        }
      }],
      formFields: [{
        label: '内置的正则表达式',
        name: 'regexp',
        form: {
          tag: 'input',
          clearable: true,
          rules: [{
            pattern: this.$regexps.mobile,
            message: '请输入手机号'
          }]
        }
      }]
    }
  },
  watch: {
    regexType (name) {
      this.$set(this.formFields[0].form.rules[0], 'pattern', this.$regexps[name])
      this.$set(this.formFields[0].form.rules[0], 'message', `不符合正则${name}`)
    }
  },
  computed: {
    regexMaps () {
      return Object.entries(this.$regexps).map(([name, regexp]) => {
        return {
          label: name,
          value: name,
          regexp
        }
      })
    }
  }
}
</script>

<style lang='sass' scoped>
.flex-box
  display: flex
  align-items: center
  h4
    margin-right: 8px
</style>
