<template lang="pug">
el-main#app-main
  //- keep-alive(:include="cachedViews")
  .main-content(
    :is-full="!sliderOpen"
    :is-hide="isSlideAll")
    keep-alive
      router-view(:key="key")
  .slide-frame(:is-opened="sliderOpen",:style="slideWidth")
    CodeReader.slide-frame__codeReader(:is-opened="sliderGroup.code")
    MdReader.slide-frame__mdreader(:is-opened="sliderGroup.readme")
</template>

<script>
import CodeReader from './ToolMenu/CodeReader'
import MdReader from './ToolMenu/MdReader'
export default {
  name: 'AppMain',
  components: {
    CodeReader,
    MdReader
  },
  props: {
    sliderOpen: Boolean,
    sliderGroup: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    isSlideAll () {
      return this.sliderGroup.code && this.sliderGroup.readme
    },
    slideWidth () {
      const asideWidth = this.$store.state.menu.width
      return {
        width: this.isSlideAll ? `calc(100% - ${asideWidth}px)` : this.sliderOpen ? `calc(50% - ${asideWidth / 2}px)` : 0
      }
    },
    key () {
      return this.$route.path
    }
  }
}
</script>

<style lang="sass" scoped>
#app-main
  height: 100%
  display: flex
  // justify-content: space-between
  // flex-direction: column
  padding: 0
  margin: 8px
  background: #fff
  box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.05)
.main-content
  display: flex
  flex-direction: column
  width: 50%
  height: 100%
  box-sizing: border-box
  overflow: auto
  padding: 16px
  &[is-full="true"]
    flex: 1
    width: 100%
  &[is-hide="true"]
    opacity: 0
.slide-frame
  width: 0
  height: 100%
  max-height: calc(100vh - 95px)
  position: absolute
  right: 0
  overflow-y: auto
  border-left: 1px solid #f6f6f6
  box-shadow: inset .1rem 0 10px #eee
  transform: translateX(100%)
  display: none
  &[is-opened='true']
    transform: translateX(0)
    display: flex
.slide-frame__codeReader,
.slide-frame__mdreader
  display: none
.slide-frame__codeReader
  height: 100%
  padding: .5rem
  background: #282c34
.slide-frame__mdreader
  padding: 1rem
.slide-frame__codeReader[is-opened="true"],
.slide-frame__mdreader[is-opened="true"]
  display: block
  flex: 1
  overflow-y: auto
</style>
