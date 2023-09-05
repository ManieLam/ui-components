<template lang="pug">
  span.buttonInfo
    AnsoIcon(
      v-if="icon && showAnsoIcon && iconAlign !== 'right'"
      v-bind="$attrs"
      :icon="icon")
    span(
      v-if="label"
      :style="style"
      :class="textClass") {{label}}
    AnsoIcon.el-icon--right(
      v-if="icon && showAnsoIcon && iconAlign === 'right'"
      v-bind="$attrs"
      :icon="icon")
</template>

<script>
import { isElIcon } from '../utils/common'

export default {
  name: 'AnsoButtonInfo',
  props: {
    icon: String,
    iconAlign: String,
    label: String,
    textStyle: {
      type: Object,
      default: () => ({})
    },
    textClass: {
      type: Array
    },
    isDropdownButton: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {}
  },
  computed: {
    showAnsoIcon () {
      return !isElIcon(this.icon)
    },
    style () {
      if (Object.keys(this.textStyle).length) {
        return this.textStyle
      }
      return this.label && this.icon && this.iconAlign !== 'right' ? 'margin-left: 5px;' : ''
    }
  }
}
</script>

<style lang="sass" scoped>
.buttonInfo
  vertical-align: middle
  display: table-cell
</style>
