<template lang="pug">
  el-container#app-frame
    el-header#app-header(height="48px")
      AppLogo
      #app-navbar
        AppProfile(
          :fullname="fullname",
          :avatar="avatar")
    el-container#app-container
      AppMenu(:menus="menus")
      .app-tagsview-container(v-if="menus.length")
        .appframe-navbar
          TagsView.tagsview
          AnsoButtonGroup(:isGroup="true",:buttonList="buttonList" :isInterval="false")
        AppMain(
          :sliderOpen="slideopenCode||slideopenReadme"
          :sliderGroup="sliderGroup")
</template>

<script>
import AppLogo from './AppLogo'
import AppProfile from './AppProfile'
import AppMenu from './AppMenu'
import AppMain from './AppMain'
import TagsView from './TagsView'
import menus from './menu'

export default {
  name: 'AppFrame',
  components: {
    AppLogo,
    AppProfile,
    AppMenu,
    AppMain,
    TagsView
  },
  data () {
    return {
      menus,
      fullname: 'Demo',
      avatar: 'sadf',
      slideopenCode: false,
      slideopenReadme: false,
      buttonList: [{
        icon: 'el-icon-receiving',
        name: 'codeReader',
        tooltip: {
          content: '本页效果源代码',
          placement: 'top'
        },
        func: (button) => {
          this.dialogTitle = '本页效果源代码'
          this.slideopenCode = !this.slideopenCode
          this.$set(button, 'type', button.type === 'primary' ? null : 'primary')
        }
      }, {
        name: 'mdReader',
        icon: 'el-icon-document',
        tooltip: {
          content: '组件说明文档'
        },
        func: (button) => {
          this.dialogTitle = '说明文档'
          this.slideopenReadme = !this.slideopenReadme
          this.$set(button, 'type', button.type === 'primary' ? null : 'primary')
        }
      }]
    }
  },
  computed: {
    sliderGroup () {
      return {
        code: this.slideopenCode,
        readme: this.slideopenReadme
      }
    }
  },
  methods: {
    removeStartLoading () {
      if (document.getElementById('loading')) {
        document.body.removeChild(document.getElementById('loading'))
      }
    }
  },
  created () {
    this.removeStartLoading()
  }
}
</script>

<style lang="sass" scoped>
#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  color: #2c3e50
  height: 100%
  // position: fixed
  // top: 0
  // bottom: 0
  // left: 0
  // right: 0
#app-container
  // height: 100%
  height: calc(100% - 60px)
  background: $--content-backgroud
  // background: #eceff0
#app-header
  z-index: 1999
  display: flex
  justify-content: space-between
  box-shadow: 2px 4px 20px -4px rgba(0,0,0,.1)
  background-color: #222F3F
  font-size: 14px
  color: rgba(255,255,255,0.65)
#menu-toggle
  line-height: 60px
  font-size: 28px
  padding: 0 16px
  cursor: pointer
.app-tagsview-container
  width: 1px
  flex: 1
  display: flex
  flex-direction: column
  .appframe-navbar
    display: flex
    justify-content: space-between
    .tagsview
      // max-width: 91%
      min-width: 80%
    .toolmenu
      display: flex
      justify-content: flex-end
</style>
