<template lang="pug">
el-tabs(ref='excal' type='border-card')
  el-tab-pane(
    v-for="sheet, index in sheetNameGroup"
    :key="`sheet_${index}`"
    :label="sheet")
    div.excal(v-html='sheetDataGroup[index]')
</template>

<script>
import XLSX from 'xlsx'
export default {
  name: 'excalOnline',
  data () {
    return {
      sheetNameGroup: [],
      sheetDataGroup: []
    }
  },
  props: {
    file: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    readWorkbook (fileUrl = this.file.url) {
      const _this = this
      _this.init(fileUrl, function (workbook) {
        _this.sheetNameGroup = workbook.SheetNames
        _this.sheetDataGroup = _this.sheetNameGroup.map((item, index) => {
          const worksheet = workbook.Sheets[item]
          const sheetHtml = XLSX.utils.sheet_to_html(worksheet)
          return sheetHtml
        })
      })
    },
    init (url, callback) {
      // const _this = this
      const xhr = new XMLHttpRequest()
      xhr.open('get', url, true)
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')
      xhr.responseType = 'arraybuffer' // 请求后出ArrayBuffer对象
      xhr.onload = function (e) {
        if (xhr.status === 200) {
          const data = new Uint8Array(xhr.response)
          const workbook = XLSX.read(data, { type: 'array' })
          console.log('workbook', workbook)
          if (callback) callback(workbook)
        }
      }
      xhr.send()
    }
  },
  mounted () {
    this.readWorkbook()
  }
}
</script>
<style lang="sass" scoped>
.el-tabs
  height: 100%
  ::v-deep .el-tabs__content
    height: 95%
    .el-tab-pane
      height: 100%
      .excal
        overflow: auto
        max-height: 100%
</style>
<style scoped>
.excal >>> table {
  border-collapse: collapse;
  border: none
}
.excal >>> td {
  border:solid #000 1px;
  padding: 5px
}
</style>
