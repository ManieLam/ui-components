<template lang="pug">
  el-button.el-button(
    v-bind="button"
    v-on="$listeners"
    :disabled="$props.disabled|filterDisAble($attrs.data)"
    :ref="name"
    :type="type === 'info' ? '' : type"
    :text-type="type==='text'? textType : false"
    :class="{'anso-button-icon': $attrs.icon && !$attrs.label}"
    @click="onClickButton(button)")
    slot
      AnsoButtonInfo(
        :style="size"
        v-bind="$attrs")
</template>

<script>
import AnsoButtonInfo from './AnsoButtonInfo'
import clickFunc from './clickFuncMix.js'

export default {
  name: 'AnsoButtonItem',
  mixins: [clickFunc],
  components: {
    AnsoButtonInfo
  },
  filters: {
    filterDisAble: (func, data) => func instanceof Function ? func(data) : func === true
  },
  props: {
    name: String,
    type: String,
    textType: {
      type: String,
      default: 'primary'
    },
    disabled: {
      type: [Function, Boolean]
    },
    specsSize: [String, Number]
  },
  watch: {
    $attrs (value) {
      const { loading } = this.button
      this.button = {
        loading,
        ...value
      }
    }
  },
  computed: {
    size () {
      if (!this.specsSize) return {}
      const size = this.specsSize.constructor === String ? this.specsSize : `${this.specsSize}px`
      return { 'font-size': size }
    }
  },
  data () {
    return {
      button: {
        ...this.$attrs,
        loading: false
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.el-button.is-disabled[text-type=primary]
  color: #bfbfbf
</style>
