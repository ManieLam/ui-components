<template lang="pug">
el-dropdown(
  v-on="$listeners"
  trigger="click"
  :hide-on-click="hideOnClick")
  AnsoButtonItem(
    v-bind="$attrs")
  el-dropdown-menu(slot="dropdown")
    el-dropdown-item(
      v-for="(dropdownButton, index) in dropdownButtons"
      v-bind="dropdownButton"
      :key="dropdownButton.name"
      :ref="dropdownButton.name"
      :disabled="dropdownButton.disabled|filterDisAble($attrs.data)")
      AnsoButtonItem(
        v-bind="dropdownButton"
        type="text"
        :data="$attrs.data"
        :id="idRuleFormat($attrs.keyName, dropdownButton)"
        :formValidate="$attrs.formValidate")
</template>

<script>
import AnsoButtonItem from './AnsoButtonItem'
import idRuleMixin from './idRuleMixin'
export default {
  name: 'AnsoDropButtonItem',
  mixins: [idRuleMixin],
  components: {
    AnsoButtonItem
  },
  props: {
    // 是否在点击菜单项后隐藏菜单
    hideOnClick: {
      type: Boolean,
      default: false
    },
    dropdownButtons: Array
  },
  filters: {
    filterDisAble: (func, data) => func instanceof Function ? func(data) : func === true
  },
  data () {
    return {}
  }
}
</script>

<style lang="sass" scoped>
.el-dropdown-menu__item
  text-align: center
</style>
