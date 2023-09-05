<template lang='pug'>
i(:class="['anso-icon', 'icon-' + icon]")
</template>

<script>
/** */
export default {
  name: 'AnsoIcon',
  props: {
    icon: String
  },
  data () {
    return {}
  },
  computed: {}
}
</script>

<style lang='sass' scoped>
.anso-icon
  font-family: "iconfont" !important
  font-style: normal
  -webkit-font-smoothing: antialiased
</style>
