<template lang="pug">
  .anso-button_tooltip
    h6 tooltip展示方式
    AnsoButtonGroup(:buttonList="buttonList1")
    hr
    h6 tooltip主题
    AnsoButtonGroup(:buttonList="buttonList2")
    hr
    h6 tooltip自定义内容
    AnsoButtonGroup(:buttonList="buttonList3")
    hr
    h6 tooltip扩展
    AnsoButtonGroup(:buttonList="buttonList4")
</template>

<script>
export default {
  name: 'tooltipButton',
  components: {
  },
  data () {
    return {
      buttonList1: [{
        label: '无',
        name: 'none'
      }, {
        label: '上边',
        tooltip: {
          content: 'Top Center',
          placement: 'top'
        }
      }, {
        label: '左边',
        tooltip: {
          content: 'Left Center',
          placement: 'left'
        }
      }, {
        label: '下边 默认',
        tooltip: {
          content: 'Left Center'
        }
      }, {
        label: '右边',
        tooltip: {
          content: 'Right Center',
          placement: 'right'
        }
      }],
      buttonList2: [{
        label: 'dark主题',
        tooltip: {
          effect: 'dark',
          content: 'Dark'
        }
      }, {
        label: 'light主题',
        tooltip: {
          effect: 'light',
          content: 'Light'
        }
      }],
      buttonList3: [{
        label: '单行信息',
        tooltip: {
          content: '单行信息'
        }
      }, {
        label: '多行信息',
        tooltip: {
          content: '多行信息<br/>第二行信息'
        }
      }, {
        label: '多行信息',
        tooltip: {
          effect: 'light',
          content: '多行信息<br/>第二行信息'
        }
      }],
      buttonList4: [{
        label: '点击关闭 tooltip 功能',
        tooltip: {
          content: '点击关闭 tooltip 功能',
          disabled: false
        },
        func: () => {
          this.$set(this.buttonList4[0].tooltip, 'disabled', !this.buttonList4[0].tooltip.disabled)
          this.$set(this.buttonList4[0], 'label', `点击${this.buttonList4[0].tooltip.disabled ? '开启' : '关闭'}tooltip功能`)
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-button_tooltip{
  padding: 2rem
}
</style>
