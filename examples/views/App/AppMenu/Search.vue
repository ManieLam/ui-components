<template lang='pug'>
.menu-search-bar
  AnsoDataformInput(
    v-model="searchVal"
    v-bind="$attrs"
    icon="search"
    iconAlign="right"
    size="small"
    @change="getSearch")
</template>

<script>
import PinyinMatch from 'pinyin-match'
/** */
export default {
  name: 'AppMenuSearch',
  props: {
    menu: Array
  },
  data () {
    return {
      searchVal: '',
      allNodes: []
    }
  },
  methods: {
    getSearch (keyword) {
      if (keyword === '') {
        this.treeMenu = null
      } else {
        // 树里面的name当做关键词匹配出来
        this.treeMenu = this.getFilterNodes(this.allNodes, keyword, 0)
      }
      this.$emit('getSearch', this.treeMenu)
    },
    getAllNode (navTree) {
      return navTree.reduce((prev, current, index) => {
        return prev.concat(current.children ? this.getAllNode(current.children) : [])
      }, navTree)
    },
    getFilterNodes (allNodes, keyword) {
      return allNodes.filter(({ label }) => PinyinMatch.match(label, keyword))
    }
  },
  mounted () {
    // 把树的数据扁平化
    this.allNodes = this.getAllNode(this.menu)
  }
}
</script>

<style lang='sass' scoped>
.menu-search-bar
  padding: 5px 16px
  ::v-deep
    .el-input__inner
      height: 26px
      border-radius: 3px
      color: rgba(255,255,255,0.36)
      background: rgba(0,0,0,0.15)
      border: 1px solid rgba(255,255,255,0.30)
    .el-input__suffix
      transition: none
      line-height: 26px
</style>
