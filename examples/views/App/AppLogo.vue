<template lang="pug">
  .app-logo {{title}} {{version}}
</template>

<script>

export default {
  name: 'AppLogo',
  props: {
    title: {
      type: String,
      default: '智慧水务平台组件库'
    }
  },
  data () {
    return {
      version: require('../../../package.json').version
    }
  }
}
</script>

<style lang="sass" scoped>
.app-logo
  font-size: 24px
  line-height: 48px
</style>
