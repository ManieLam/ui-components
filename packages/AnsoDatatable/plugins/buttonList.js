import { isString } from 'lodash'
import downloadMixin from './download'
/**
 * @defaultSize {String} 默认表格行大小
 * @toolbarButtonList {Array} 工具栏按钮组
 * @settingButtonList {Array} 设置栏按钮组
 * @operateButtonList {Array} 操作栏按钮组
 * @operationWidth {String} 操作栏宽度
 */
export default {
  mixins: [downloadMixin],
  props: {
    defaultSize: {
      type: String,
      default: 'small',
      // validator: (value) => ['large', 'medium', 'small', 'mini'].indexOf(value) !== -1
      validator: (value) => ['large', 'medium', 'small'].indexOf(value) !== -1
    },
    toolbarButtonList: {
      type: Array,
      default: () => ([])
    },
    settingButtonList: {
      type: Array,
      default: () => (['refresh', 'download', 'lineHeightSetter', 'columnFilter'])
    },
    operateButtonList: {
      type: Array,
      default: () => ([])
    },
    operationWidth: {
      type: String,
      default: '150'
    }
  },
  data () {
    return {
      // 表格的尺寸 ['large', 'medium', 'small', 'mini']
      size: this.defaultSize,
      // 预定义的toolbar：如新增、批量操作
      presetToolbarButtonList: {
      },
      // 预定义的setting：如刷新、下载数据、列过滤器
      presetSettingButtonList: {
        refresh: {
          name: 'refresh',
          type: 'text',
          textType: 'info',
          icon: 'shuaxin',
          specsSize: '20px',
          tooltip: {
            content: '刷新',
            placement: 'top'
          },
          func: this.reRenderTableData
        },
        download: {
          name: 'download',
          type: 'text',
          textType: 'info',
          specsSize: '20px',
          icon: 'xiazai',
          tooltip: {
            content: '下载',
            placement: 'top'
          },
          func: this.downloadStatic
        },
        lineHeightSetter: {
          name: 'lineHeightSetter',
          type: 'text',
          textType: 'info',
          specsSize: '20px',
          icon: 'hanggaoshezhi',
          tooltip: {
            content: '行高设置',
            placement: 'top'
          },
          dropdownButtons: [{
            label: '默认',
            textType: 'info',
            func: () => {
              this.size = this.defaultSize
            }
          // }, {
          //   label: '紧凑',
          //   textType: 'info',
          //   func: () => {
          //     this.size = 'mini'
          //   }
          }, {
            label: '紧凑',
            textType: 'info',
            func: () => {
              this.size = 'small'
            }
          }, {
            label: '中等',
            textType: 'info',
            func: () => {
              this.size = 'medium'
            }
          }, {
            label: '宽松',
            textType: 'info',
            func: () => {
              this.size = 'large'
            }
          }]
        },
        columnFilter: {
          name: 'columnFilter',
          type: 'text',
          textType: 'info',
          specsSize: '20px',
          icon: 'lieshezhi',
          tooltip: {
            content: '列设置',
            placement: 'top'
          },
          func: () => {
            this.showColumnFilter = true
          }
        }
      },
      // 预定义的operate：如编辑、删除
      presetOperateButtonList: {
      }
    }
  },
  computed: {
    // 渲染设置栏按钮
    renderSettingButtonList () {
      return this.renderTableButtons(this.settingButtonList, this.presetSettingButtonList)
    },
    // 渲染工具栏按钮
    renderToolbarButtonList () {
      return this.renderTableButtons(this.toolbarButtonList, this.presetToolbarButtonList)
    },
    // 渲染操作列按钮
    renderOperateButtonList () {
      return this.renderTableButtons(this.operateButtonList, this.presetOperateButtonList)
    }
  },
  methods: {
    /**
     * @name 渲染按钮组
     * @description 根据prop配置进来的buttonList与pre预置的button来渲染最后要展示按钮组
     * @param {Array} propButtonList 配置的按钮组
     * @param {Array} preButtonList 预置的按钮组
     */
    renderTableButtons (propButtonList = [], preButtonList = {}) {
      return propButtonList.map(button => {
        return isString(button) ? preButtonList[button] : button
      })
    },
    // 刷新表格数据
    reRenderTableData () {
      if (this.resource) {
        this.serverSide ? this.getTableData() : this.getAllTableData()
      } else {
        this.loading = true
        setTimeout(() => {
          // 为了防止allTableData重新赋值时，computed属性监听不到allTableData的变化，先清空再赋值
          const curPageIndex = this.pageIndex
          this.$set(this, 'allTableData', [])
          this.$nextTick(() => {
            this.$set(this, 'allTableData', this.data)
            this.$set(this, 'pageIndex', curPageIndex)
            this.loading = false
          })
        }, 1000)
      }
    }
  }
}
