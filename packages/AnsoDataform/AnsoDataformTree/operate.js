import { flattenDeep, compact, concat, last } from 'lodash'
function treeValue (result, option, valueKey) {
  if (!option) return []
  const options = option.map(item => {
    if (item.children) {
      return treeValue([result], item.children, valueKey)
    } else return item[valueKey]
  })
  return flattenDeep(options)
}
export default {
  /**
   * 全选/取消全选/展开所有/合并所有
   * @props props参数
   * @prop {Boolean} checkableWhenDisable 全选，取消全选是否控制到禁用数据
   * @prop {Object} operateState 操作按钮的展示状态
   * @prop {Function} checkAllFunc 全选自定义方法
   * @prop {Function} unCheckAllFunc 取消全选自定义方法
  **/
  data () {
    return {
      isExpandAll: false, // 是否展开所有节点
      operatebtn: [{
        label: '全选',
        name: 'checkAll',
        showabled: this.operateState.checkAll,
        size: 'small',
        func: () => { this.checkAll() }
      }, {
        label: '取消全选',
        name: 'unCheckAll',
        showabled: this.operateState.unCheckAll,
        size: 'small',
        func: () => { this.checkAll(false) }
      }, {
        label: '展开所有',
        name: 'expandAll',
        showabled: this.operateState.expandAll,
        size: 'small',
        func: () => { this.expandAll(true) }
      }, {
        label: '合并所有',
        name: 'unExpandAll',
        showabled: this.operateState.unExpandAll,
        size: 'small',
        func: () => { this.expandAll() }
      }]
    }
  },
  props: {
    checkableWhenDisable: { // 全选，取消全选是否控制到禁用数据
      type: Boolean,
      default: false
    },
    operateState: {
      type: Object,
      default: () => {
        return {
          checkAll: false,
          unCheckAll: false,
          expandAll: false,
          unExpandAll: false
        }
      }
    },
    checkAllFunc: { // 全选自定义方法
      type: Function,
      default: () => {
        return false
      }
    },
    unCheckAllFunc: { // 取消全选自定义方法
      type: Function,
      default: () => {
        return false
      }
    }
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @name expandAll
     * @description 展开\合并树组件所有
     * @param {Boolean} type 展开所有：true 合并所有：false
    */
    expandAll (type = false) { // 展开所有/合并所有
      this.$nextTick(() => {
        for (var i = 0; i < this.$refs.tree.store._getAllNodes().length; i++) {
          this.$refs.tree.store._getAllNodes()[i].expanded = type
        }
      })
    },
    // 全选或取消全选
    /**
     * checkableWhenDisable: 全选，取消全选是否控制到禁用数据
     * 勾选操作的节点数据（node）需要转化为树形结构
     * 1.节点没有置灰数据
     *   取消全选: 勾选传空，输出数据传空
     *   所有数据：判断是否为远程异步调用数据，是则所有数据为以获取的远程异步调用数据，否则所有数据为optionsResult数据
     *   全选：勾选传所有数据，输出数据传所有数据的末端叶子节点值
     * 2.节点存在置灰数据(checkableWhenDisable = false 默认)
     *   - checkableWhenDisable = false 默认
     *       1) 存在默认勾选的置灰数据
     *          默认勾选的置灰数据node：获取默认勾选的置灰数据-节点数据
     *          默认勾选的置灰数据：获取默认勾选的置灰数据的值-节点的值
     *          取消全选: 勾选传默认勾选的置灰数据node，输出数据传默认勾选的置灰数据
     *          全选：勾选排除置灰以外的数据 + 默认勾选的置灰数据node，输出数据的末端叶子节点值
     *       2) 不存在默认勾选的置灰数据
     *          取消全选: 勾选传空，输出数据传空
     *          全选：勾选排除置灰以外的数据，输出数据的末端叶子节点值
     *   - checkableWhenDisable = true 全选，取消全选可控制到禁用数据
     *       取消全选: 勾选传空，输出数据传空
     *       全选：勾选传所有数据，输出数据传所有数据的末端叶子节点值
     */
    /**
     * @name checkAll
     * @description 全选\取消全选树组件所有
     * @param {Boolean} type 全选：true 取消全选：false
    */
    checkAll (type = true) {
      if (!this.multiple) return
      if (this.hasCheckFunc(type)) return // 走自定义数据
      if (!this.checkableWhenDisable) {
        // 判断是否存在默认勾选的置灰数据
        const defalutData = this.isRemote ? this.converDisabled(this.remoteDatas) : this.converDisabled(this.options)
        const defaultDisabledGroup = this.defaultDisabledGroup(defalutData, Array.from(this.currentValue))
        // 存在默认勾选的置灰数据
        if (defaultDisabledGroup.length) this.checkDisabledhasDefaultAll(type, defaultDisabledGroup, defalutData)
        else this.checkDisabledAll(type, defalutData)
        return
      }
      // 没有置灰数据
      if (!type) { // 取消全选
        this.processData()
        return
      }
      // 全选
      const data = this.isRemote ? this.remoteOptions : this.optionsResult // 先获取组件所有数据
      const checkedValues = treeValue([], data, this.valueKey) // 获取数据末端叶子节点传出
      this.processData(data, checkedValues)
    },
    /**
     * @name hasCheckFunc
     * @description 是否存在自定义勾选方法
     * @param {Boolean} type 全选：true 取消全选：false
     * @func {Function} this.unCheckAllFunc(data) 取消全选自定义方法 data.options: 传出参数,过滤数据源
     * @func {Function} this.checkAllFunc(data) 选自定义方法 data.options: 传出参数,过滤数据源
     * @return {Boolean} 返回值为true，存在自定义方法， 返回值为false，不存在自定义方法
    */
    hasCheckFunc (type) { // 判断是否存在自定义方法
      // 先根据是否为远程异步的数据，获取数据源
      const defalutData = this.isRemote ? this.converDisabled(this.remoteDatas) : this.converDisabled(this.options)
      const data = { options: defalutData }
      if (this.unCheckAllFunc(data) || this.checkAllFunc(data)) {
        // 存在自定义全选或取消全选的方法
        const resultData = type ? this.checkAllFunc(data) : this.unCheckAllFunc(data)
        const checkNodes = resultData.length ? this.tree(resultData) : []
        const checkedValues = treeValue([], checkNodes, this.valueKey) // 获取数据末端叶子节点传出
        this.processData(checkNodes, checkedValues)
        return true
      } else return false
    },
    /**
     * @name checkDisabledhasDefaultAll
     * @description 取消勾选\全选，数据存在默认勾选的置灰数据,且全选，取消全选不包括控制到禁用数据（checkableWhenDisable）
     * @param {Boolean} type 全选：true 取消全选：false
     * @param {Array} defaultDisabledGroup 默认勾选的置灰数据
     * @param {Array} defalutData 树组件数据源
     * @var {Array} defalutDisabledNode 默认勾选的置灰数据循环出节点内容，供勾选使用
     * @var {Array} defalutDisabledValue 默认勾选的置灰数据循环出节点值，供输出值使用
    */
    checkDisabledhasDefaultAll (type, defaultDisabledGroup, defalutData) { // 存在默认的置灰数据
      const defalutDisabledNode = defaultDisabledGroup.map(item => item.node)
      const defalutDisabledValue = defaultDisabledGroup.map(item => item.value)
      if (!type) { // 取消全选
        this.processData(defalutDisabledNode, defalutDisabledValue)
        return
      }
      // 全选
      // 获取(排除置灰 + 默认置灰值)的节点内容
      const checkOptions = concat(defalutData.filter(item => !item.disabled), defalutDisabledNode)
      const checkNodes = this.tree(checkOptions)
      const checkedValues = treeValue([], checkNodes, this.valueKey) // 获取数据末端叶子节点的值传出
      this.processData(checkNodes, checkedValues)
    },
    /**
     * @name checkDisabledAll
     * @description 取消勾选\全选，数据不存在默认勾选的置灰数据,且全选，取消全选不包括控制到禁用数据（checkableWhenDisable）
     * @param {Boolean} type 全选：true 取消全选：false
     * @param {Array} defalutData 树组件数据源
    */
    checkDisabledAll (type, defalutData) { // 不存在默认的置灰数据
      if (!type) { // 取消全选
        this.processData()
        return
      }
      // 获取排除置灰
      const checkOptions = defalutData.filter(item => !item.disabled)
      const checkNodes = this.tree(checkOptions)
      const checkedValues = treeValue([], checkNodes, this.valueKey) // 获取数据末端叶子节点传出
      this.processData(checkNodes, checkedValues)
    },
    /**
     * @name defaultDisabledGroup
     * @description 获取默认勾选的置灰数据
     * @param {Array} data 树组件数据源
     * @param {Array} currentValue 当前组件已勾选的值
     * @return {Array} 返回值已勾选的置灰数组[{ value: 置灰值，node：相对应的节点内容 }]
    */
    defaultDisabledGroup (data, currentValue) {
      // 获取所有数据里的置灰数据node和置灰数据的value
      const disabledData = data.filter(item => item.disabled)
      const disabledValues = disabledData.map(item => item[this.valueKey])
      // 判断当前值内存在默认置灰的数据
      const currentDisabled = currentValue.map(item => {
        if (disabledValues.includes(item)) {
          return { value: item, node: disabledData.find(node => node[this.valueKey] === item) }
        } else return null
      })
      return compact(currentDisabled)
    },
    /**
     * @name processData
     * @description 获取数据，对组件进行勾选处理，输出相对应的值
     * @param {Array} node 需要对组件进行勾选处理的节点
     * @param {Array} value 输出组件已勾选的值
    */
    processData (node = [], value = []) {
      this.checkedNodes(node)
      this.outputValue(value)
    },
    checkedNodes (data = []) { // 勾选数据
      this.$refs.tree.setCheckedNodes(data)
    },
    outputValue (value = []) { // 输出数据
      this.$emit('input', value)
      this.searchList = value.map(item => {
        return {
          value: item,
          label: this.showAllLevels ? last(this.filterDataLabel(this.allLevelsValue(item))) : this.findValueObject(item).label,
          disabled: this.showAllLevels ? this.findValueObject(last(item)).disabled : this.findValueObject(item).disabled
        }
      })
      this.filterText = null
    },
    findValueObject (item) {
      return this.converDisabled(this.defaultDate).find(optionItem => optionItem[this.valueKey] === item)
    }
  }
}
