import axios from 'axios'
/**
 * @resource {String} 数据接口
 * @resourceConfig {Function} 数据接口配置信息重新定义
 * @transformRequest {Function} 数据接口请求
 * @transformResponse {Function} 数据接口响应
 * @errorResponse {Function} 接口异常处理
 * @alwaysFilterBy {Object||Array} 默认搜索条件, 表格默认一直存在的搜索条件
 */

export default {
  props: {
    resource: {
      type: String
    },
    resourceConfig: {
      type: Function,
      default: ({ url, params }) => ({
        url,
        method: 'get',
        params
      })
    },
    transformRequest: {
      type: Function,
      default: res => res
    },
    transformResponse: {
      type: Function,
      default: res => res
    },
    errorResponse: {
      type: Function,
      default: err => err
    },
    alwaysFilterBy: {
      type: [Object, Array]
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 获取表格数据
    getData (pageSize, pageIndex) {
      this.loading = true
      return new Promise((resolve, reject) => {
        axios(this.resourceConfig({
          url: this.resource,
          params: this.transformRequest({
            pageSize,
            pageIndex,
            sortBy: this.sortBy,
            filterBy: this.filterBy,
            alwaysFilterBy: this.alwaysFilterBy,
            filterFieldsObject: this.filterFieldsObject
          })
        })).then(this.transformResponse).then((res) => {
          // if (!res) return
          this.loading = false
          const { data } = res.data
          const result = {
            total: data.total,
            tableData: data.records
          }
          this.$emit('getData', result)
          resolve({
            ...result
          })
        }).catch((err) => {
          this.loading = false
          this.errorResponse(err)
          throw new Error(err)
        })
      })
    },
    // 获取表格数据
    async getTableData () {
      const { total, tableData } = await this.getData(this.pageSize, this.pageIndex)
      this.total = total
      this.$set(this, 'tableData', tableData)
      this.tableDoLayout()
    },
    // 获取全部数据
    async getAllTableData () {
      const { tableData } = await this.getData(99999, 1)
      this.$set(this, 'allTableData', tableData)
      this.tableDoLayout()
    }
  }
}
