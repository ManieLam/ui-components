<template lang="pug">
  el-aside#app-aside(
    :class="isCollapse?'el-aside--collapse':''"
    :width="asideWidth")
    AppMenuSearch.menu-search(
      :placeholder="isCollapse ? '' : '请输入关键字查询'"
      :menu="menus"
      @getSearch="getSearch")
    el-menu#app-menu.el-menu(
      router=true
      background-color="#364760"
      text-color="#ffffffd9"
      active-text-color="#fff"
      :default-active="defaultActive")
      .app-menu__ul
        AppMenuItem(
          v-for="menu in treeMenu"
          :key="menu.url"
          v-bind="menu")
    .aside-footer
      AppMenuFooter(
        collapseIcon='caidan-shouqi'
        spreadIcon='caidan-zhankai'
        iconWidth='20px'
        :collapse="isCollapse"
        @toggleCollapse="toggleCollapse")
</template>

<script>
import AppMenuItem from './AppMenuItem'
import AppMenuFooter from './Footer'
import AppMenuSearch from './Search'
import cloneDeep from 'lodash/cloneDeep'

export default {
  name: 'AppMenu',
  components: {
    AppMenuItem,
    AppMenuFooter,
    AppMenuSearch
  },
  props: {
    menus: {
      type: Array,
      default: () => ([])
    }
  },
  data () {
    return {
      searchMenu: '',
      isCollapse: false,
      // asideWidth: '184px',
      treeMenu: cloneDeep(this.menus)
    }
  },
  computed: {
    defaultActive () {
      const visitedViews = this.$store.state.tagsView.visitedViews
      const currentView = visitedViews.find(view => view.path === this.$route.fullPath)
      return currentView ? currentView.path : ''
    },
    asideWidth () {
      return `${this.$store.state.menu.width}px`
    }
  },
  filters: {
  },
  methods: {
    toggleCollapse () {
      this.isCollapse = !this.isCollapse
      this.$store.commit('menu/toggleWidth', !this.isCollapse ? 184 : 45)
      // this.asideWidth = !this.isCollapse ? '184px' : '45px'
    },
    getSearch (menus) {
      this.treeMenu = menus ? cloneDeep(menus) : cloneDeep(this.menus)
    }
  }
}
</script>

<style lang="sass" scoped>
#app-aside
  position: relative
  // transition: 0.3s
  background: #364760
  display: flex
  flex-direction: column
  .aside-footer
    width: 100%
    height: 45px
    line-height: 45px
    color: rgba(255,255,255,0.65)
    border-top: 1px solid
    border-top-color: rgba(0,0,0,0.30)
    background: #364760
#app-menu
  // height: calc(100% - 100px)
  flex: 1
  overflow: auto
  overflow-x: hidden
  &:not(.el-menu--collapse)
    width: 100%
  .app-menu__ul
    max-height: 0
.el-aside--collapse::v-deep
  .menu-search
    padding: 5px 10px
    .el-input__inner
      padding: 0
    .el-input__suffix
      right: 0
  .el-menu-item
    padding: 0 20px
  .el-submenu .el-menu-item
    min-width: unset
  .el-menu-item,.el-submenu__title
    padding-left: 16px !important
    .el-icon-arrow-down
      visibility: hidden
  .el-submenu__title
    span
      visibility: hidden
</style>
