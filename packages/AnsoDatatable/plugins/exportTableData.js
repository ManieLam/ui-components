import axios from 'axios'
/**
 * @isDefaultExport {Boolean} 默认不导出
 * @exportResource {String} 导出数据接口
 * @exportFileName {String} 导出文件名称
 * @exportResourceConfig {Function} 导出数据接口配置信息重新定义
 * @transExportRequest {Function} 导出数据接口请求参数配置
 * @errorExportResponse {Function} 导出接口异常处理
 * @successExportResponse {Function} 导出接口成功处理
 */

export default {
  props: {
    isDefaultExport: {
      type: Boolean,
      default: false
    },
    exportResource: {
      type: String
    },
    exportFileName: {
      type: [String, Number]
    },
    exportResourceConfig: {
      type: Function,
      default: ({ url, params }) => ({
        url,
        method: 'get',
        params
      })
    },
    transExportRequest: {
      type: Function,
      default: res => res
    },
    errorExportResponse: {
      type: Function,
      default: err => err
    },
    successExportResponse: {
      type: Function,
      default: res => res
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 调用导出
    exportEvent (pageSize = this.pageSize, pageIndex = this.pageIndex) {
      return new Promise((resolve, reject) => {
        axios(this.exportResourceConfig({
          url: this.exportResource,
          params: this.transExportRequest({
            pageSize,
            pageIndex,
            sortBy: this.sortBy,
            filterBy: this.filterBy,
            alwaysFilterBy: this.alwaysFilterBy,
            filterFieldsObject: this.filterFieldsObject,
            tableVisibleList: this.visibleList,
            tableColumnList: this.columnList,
            tableColumnConfig: this.columns,
            resource: this.resource,
            exportFileName: this.exportFileName
          })
        })).then((res) => {
          this.$emit('exportAfter', res)
          this.successExportResponse({ result: res, exportFileName: this.exportFileName })
          resolve(res)
        }).catch((err) => {
          this.errorExportResponse(err)
          throw new Error(err)
        })
      })
    }
  }
}
