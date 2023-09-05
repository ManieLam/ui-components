<template lang='pug'>
  .slide-frame__codeReader
    pre(:style="{margin:0}",v-highlight)
      code(ref="codeReader",highlight,spellcheck="false",v-text="fileModule")
</template>

<script>
import axios from 'axios'
import importFileReader from './importFileReader'

String.prototype.firstUpperCase = function(){
    return this.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
        return $1.toUpperCase() + $2;
    });
}
export default {
  name: 'CodeReader',
  mixins: [importFileReader],
  data () {
    return {
      fileModule: ''
    }
  },
  watch: {
    '$route' (route, oldRoute) {
      if (route.path !== oldRoute.path) {
        this.getfileModules()
      }
    }
  },
  methods: {
    async getfileModules () {
      const fileName = this.$route.path.slice(1) ? `/views/${this.$route.path.slice(1).firstUpperCase()}.vue`: null
      const path = fileName || '/views/Help/404.vue'
      const { data } = await this.getFileData(path)
      this.fileModule = data
      this.importInfoList = this.getImportInfo(data)
      this.renderFileModule()
    },
    getFileData (path) {
      return new Promise((resolve, reject) => {
        axios({ url: path }).then((req) => resolve({ data: req.data }))
      })
    }
  },
  mounted () {
    this.getfileModules()
  },
  beforeDestroy () {
    this.fileModule = null
  }
}
</script>
