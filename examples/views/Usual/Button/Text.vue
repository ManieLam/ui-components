<template lang="pug">
  .anso-button_text
    h6 文字按钮
    AnsoButtonGroup(:buttonList="buttonList1")
    hr
    h6 不同尺寸
    AnsoButtonGroup(:buttonList="buttonList2")
    hr
    h6 带图标
    AnsoButtonGroup(:buttonList="buttonList3")
</template>

<script>
export default {
  name: 'textButton',
  components: {
  },
  data () {
    return {
      buttonList1: [{
        type: 'text',
        label: '点击跳转',
        func: () => {
          this.$router.push({ path: '/form/button/simple' })
        }
      }, {
        type: 'text',
        label: '文字按钮禁用',
        disabled: true
      }, {
        type: 'text',
        label: '文字按钮点击loading',
        func: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve()
            }, 2000)
          })
        }
      }],
      buttonList2: [{
        type: 'text',
        label: '默认文字按钮'
      }, {
        label: '中文字按钮',
        type: 'text',
        size: 'medium'
      }, {
        label: '小文字按钮',
        type: 'text',
        size: 'small'
      }, {
        label: '极小文字按钮',
        type: 'text',
        size: 'mini'
      }],
      buttonList3: [{
        type: 'text',
        icon: 'sousuo',
        label: '搜索'
      }, {
        type: 'text',
        label: '上传',
        icon: 'shanghchuan'
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-button_text{
  padding: 2rem
}
</style>
