<template lang='pug'>
#toolmenu-mdReader-container.markdown-body.mdReader-body
  component(:is="fileModule")
</template>

<script>
/** */
export default {
  name: 'MdReader',
  data () {
    return {
      fileModule: ''
    }
  },
  watch: {
    '$route' (route, oldRoute) {
      if (route.meta.docName !== oldRoute.meta.docName) {
        this.getfileModules()
      }
    }
  },
  methods: {
    getfileModules () {
      const name = this.$route.meta.docName
      const path = name ? `docs/${name}.md` : 'views/Help/404.vue'
      /* eslint-disable */
      import(`@/${path}`).then(res => {
        if (res) {
          this.fileModule = res.default
        }
      })
      /* eslint-disable */
    }
  },
  mounted () {
    this.getfileModules()
  },
  beforeDestroy () {
    this.fileModule = ''
  }
}
</script>

<style lang='sass' scoped>
</style>
