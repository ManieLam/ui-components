<template lang='pug'>
.form-item__range.without-limit__width(
  type="flex"
  :gutter="0"
  :class="{'range-box__mini': isMiniWidth }"
  v-resize:debounce:50="resetWidth")
  slot.range-input(name="start")
  slot(name="link")
    div.connect {{ connect }}
  slot.range-input(name="end")
</template>

<script>
import resize from 'vue-resize-directive'
export default {
  name: 'RangeFormItem',
  props: {
    connect: {
      type: String,
      default: '-'
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      minWidth: 260,
      contentWidth: null
    }
  },
  computed: {
    isMiniWidth () {
      return !this.inline && this.contentWidth <= this.minWidth
    }
  },
  directives: {
    resize
  },
  methods: {
    resetWidth (el) {
      this.contentWidth = el.clientWidth
    }
  }
}
</script>

<style lang='sass' scoped>
.form-item__range
  display: flex
  width: 100%
  justify-content: center
  align-items: center
  .range-input
    width: 100%
.range-box__mini
  display: flex
  flex-direction: column
.connect
  text-align: center
  color: $--color-text-primary
  margin: 0 $--margin-primary
</style>
