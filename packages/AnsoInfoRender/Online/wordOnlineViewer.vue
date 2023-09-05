<template lang="pug">
div.word(
  ref='word'
  v-html='wordDetails')
</template>

<script>
import mammoth from 'mammoth'
export default {
  name: 'wordOnline',
  data () {
    return {
      wordDetails: ''
    }
  },
  props: {
    file: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    init () {
      const _this = this
      const xhr = new XMLHttpRequest()
      xhr.open('get', this.file.url, true)
      xhr.responseType = 'arraybuffer' // 请求后出ArrayBuffer对象
      xhr.onload = function () {
        console.log(xhr.response)
        if (xhr.status === 200) {
          mammoth.convertToHtml({ arrayBuffer: new Uint8Array(xhr.response) }).then((resultObject) => {
            _this.$nextTick(() => {
              _this.wordDetails = resultObject.value
            })
          })
        }
      }
      xhr.send()
    }
  },
  created () {
    this.init()
  }
}
</script>
<style lang="sass" scoped>
.word
  overflow: auto
  max-height: 100%
</style>
<style scoped>
.word >>> img {
  width: 100%
}
</style>
