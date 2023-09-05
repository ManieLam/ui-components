<template lang="pug">
  .slide-collaspe-button(@click="handelClick", :is-collapse="collapse")
    AnsoIcon(
      :width="iconWidth"
      :height="iconWidth"
      :icon="collapse ? spreadIcon : collapseIcon")
</template>

<script>
export default {
  name: 'AppMenuFooter',
  props: {
    collapse: {
      type: Boolean,
      default: false
    },
    // 折叠菜单的icon
    collapseIcon: {
      type: String,
      default: ''
    },
    // 展开菜单的icon
    spreadIcon: {
      type: String,
      default: ''
    },
    iconWidth: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  },
  methods: {
    handelClick () {
      this.$emit('toggleCollapse')
    }
  }
}

</script>
<style lang="sass" scoped>
.slide-collaspe-button
  width: 44px
  height: 100%
  text-align: center
  cursor: pointer
.slide-collaspe-button[is-collapse]
  background-color: #0a111a
</style>
