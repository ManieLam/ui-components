<template lang="pug">
  .anso-button_badge
    AnsoButtonGroup(:buttonList="buttonList1")
    br
    AnsoButtonGroup(:buttonList="buttonList2")
    br
    AnsoButtonGroup(:buttonList="buttonList3")
    br
    AnsoButtonGroup(:buttonList="buttonList4")
    br
    AnsoButtonGroup(:buttonList="buttonList5")
</template>

<script>
export default {
  name: 'badgeButton',
  components: {
  },
  data () {
    return {
      buttonList1: [{
        label: '无',
        name: 'none'
      }],
      buttonList2: [{
        label: '默认',
        badge: {
          value: 1
        }
      }],
      buttonList3: [{
        label: '最大值',
        badge: {
          type: 'success',
          value: 100,
          max: 99
        }
      }],
      buttonList4: [{
        label: '自定义',
        badge: {
          type: 'warning',
          value: 'new'
        }
      }],
      buttonList5: [{
        label: '小圆点',
        badge: {
          type: 'danger',
          isDot: true
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-button_badge{
  padding: 2rem
}
</style>
