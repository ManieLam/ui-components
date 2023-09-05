<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 数字范围输入框
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
    h4 限制大小值
    AnsoDataform(
      :formFields="maxMinFormFields"
      :buttonList="[]"
    )
    hr
    h4 按钮位置类型
    AnsoDataform(
      :formFields="formFields"
      :buttonList="[]"
    )
    hr
    h4 直接引用AnsoDataformNumRange范围组件
    AnsoDataformNumRange(v-model="ranges" :width='90' connect='至')
    br
    span 输出值为：{{ranges}}
</template>

<script>
export default {
  name: 'numberRange',
  components: {
  },
  data () {
    return {
      ranges: [],
      nomalFormFields: [{
        name: '数字范围输入框',
        label: '数字范围输入框',
        form: {
          tag: 'numberRange'
        }
      }],
      connectFormFields: [{
        name: '连接符号配置为：~',
        label: '连接符号配置为：~',
        form: {
          tag: 'numberRange',
          connect: '~'
        }
      }],
      disabledFormFields: [{
        name: '禁用',
        label: '禁用',
        form: {
          tag: 'numberRange',
          disabled: true
        }
      }],
      maxMinFormFields: [{
        name: '限制最大值为：10，最小值为：2',
        label: '限制最大值为：10，最小值为：2',
        form: {
          tag: 'numberRange',
          min: 2,
          max: 10
        }
      }],
      formFields: [{
        name: 'stack',
        label: 'stack',
        form: {
          tag: 'numberRange'
        }
      }, {
        name: 'normal',
        label: 'normal',
        form: {
          tag: 'numberRange',
          triggerType: 'normal'
        }
      }, {
        name: 'none',
        label: 'none',
        form: {
          tag: 'numberRange',
          triggerType: 'none'
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
