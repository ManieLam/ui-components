import { sheetToJson } from 'packages/utils/exportExcel'
import exportTableDataJS from './exportTableData'
/**
 * @preventDownloadFunc {Function} 自定义阻止下载的方法
 */
export default {
  mixins: [exportTableDataJS],
  data () {
    return {
      exportResponseData: []
    }
  },
  props: {
    preventDownloadFunc: {
      type: Function,
      default: () => {
        return false
      }
    }
  },
  computed: {
    exportTableData () {
      return this.sortedTableData
    }
  },
  watch: {
    exportTableData: {
      handler (datas) {
        const toPrevent = (typeof this.preventDownloadFunc === 'function' && this.preventDownloadFunc(datas)) || !!this.checkExportable(datas)
        this.$set(this.presetSettingButtonList.download, 'disabled', toPrevent)
      }
    },
    tableData: {
      deep: true,
      immediate: true,
      handler (datas) {
        const toPrevent = (typeof this.preventDownloadFunc === 'function' && this.preventDownloadFunc(datas)) || !!this.checkExportable(datas)
        // console.log(!!this.checkExportable(datas))
        this.$set(this.presetSettingButtonList.download, 'disabled', toPrevent)
      }
    }
  },
  methods: {
    downloadStatic () {
      if (this.resource) {
        if (!this.exportResource) {
          this.$message({
            message: '缺少导出链接的配置',
            type: 'error'
          })
          return
        }
        this.exportEvent() // 后端导出
      } else {
        const result = this.renderExportData()
        sheetToJson({ data: result, fileName: this.exportFileName + '.xlsx' })
      }
    },
    checkExportable (datas = this.tableData) {
      if (!this.isDefaultExport) return '暂无配置导出'

      if (!this.resource) { // 前端内部导出
        if (!datas.length) return '暂无数据导出'
        return null
      }
      // 外部内部导出
      if (!datas.length) return '暂无数据导出'
      return null
    },
    renderExportData () {
      return this.exportTableData.map(data => {
        const obj = {}
        for (const key of this.visibleList) {
          const { label } = this.columnsObject[key]
          const value = this.columnsObject[key].renderFormat(data[key], this.columnsObject[key], data)
          obj[label] = value
        }
        return obj
      })
    }
  }
}
