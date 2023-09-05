<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 字符串范围输入框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    hr
    h4 连接符号
    AnsoDataform(
      :formFields="connectFormFields"
      :buttonList="[]"
    )
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 设置输入框宽度
    AnsoDataform(
      :formFields="widthFormFields"
      :buttonList="[]"
    )
    hr
    h4 直接引用AnsoDataformTextRange范围组件
    AnsoDataformTextRange(v-model="ranges" :width='90' connect='至')
    br
    span 输出值为：{{ranges}}
</template>

<script>
export default {
  name: 'stringRande',
  components: {
  },
  data () {
    return {
      ranges: [],
      nomalFormFields: [{
        name: 'nomal',
        label: '字符串范围输入框',
        form: {
          tag: 'textRange'
        }
      }],
      connectFormFields: [{
        name: 'connect',
        label: '连接符号配置为：~',
        form: {
          tag: 'textRange',
          connect: '~'
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'textRange',
          disabled: true
        }
      }],
      widthFormFields: [{
        name: 'width',
        label: '宽度设置: 90',
        form: {
          tag: 'textRange',
          width: 90
        }
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
