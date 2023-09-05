<template lang="pug">
  el-submenu.anso-el-submenu(
    v-if="children && children.length > 0"
    :index="url"
    :title="label")
    template(slot="title")
      i(:class="`el-icon-${icon || 'setting'}`")
      span {{label}}
    AppMenuItem(
      v-for="menu in children"
      :key="menu.url"
      v-bind="menu")
  el-menu-item(
    v-else
    :index="url"
    :title="label")
    template(slot="title")
      span {{label}}
</template>

<script>
export default {
  name: 'AppMenuItem',
  props: {
    label: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'setting'
    },
    children: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
.el-menu-item,
.el-submenu__title
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap
  vertical-align: middle
</style>
