<template lang="pug">
div.treeObject(
  v-clickoutside="handleClose"
  :class="{'without-limit__width': multiple}")
  .searchBox(:isShowTag="showInput && multiple && !!Object.keys(searchList).length")
    slot(name="selectTag")
      .tag-group-list
        span(v-if="collapseTags && multiple && showInput && !!Object.keys(searchList).length")
          el-tag(
            :closable="!searchList[0].disabled"
            v-bind.sync="tagConfig"
            @close="searchClose(searchList[0])") {{searchList[0].label}}
          el-tag(
            v-if="searchList.length > 1"
            :closable="false"
            v-bind.sync="tagConfig") + {{ searchList.length - 1 }}
        el-tag(
          v-if="!collapseTags && multiple && showInput"
          :key="index"
          v-bind.sync="tagConfig"
          v-for="(tag, index) in searchList"
          :closable="!tag.disabled"
          @close="searchClose(tag)") {{tag.label}}
        AnsoDataformInput.searchInput(
          v-if="showInput"
          ref="searchInput"
          :class="showselectTree ? 'is-reverse' : null"
          v-model="filterText"
          :placeholder="searchPlaceholder"
          :readonly="!isFilter"
          @focus="focus"
          @click.native="checkSelectPanel"
          @clear="clear"
          v-bind.sync="filterConfig")
  component(
    :is="showType === 'select' ? 'el-collapse-transition' : 'div'")
    div(
      :class="{'transition-box': showType === 'select'}"
      v-show="showType === 'select' ? showselectTree : true")
      AnsoButtonGroup.operatebtn(
        :buttonList="operatebtn")
      el-tree.tree(
        ref='tree'
        v-bind="$attrs"
        v-on="$listeners"
        :class="{'singleChoose': !multiple}"
        :data="optionsResult"
        :default-checked-keys="currentValue"
        :show-checkbox="multiple"
        :nodeKey="valueKey"
        :filter-node-method="filterMethod"
        :lazy="isLazy"
        :indent="indent"
        :load="lazyLoad"
        :props="{isLeaf: leaf}"
        @check="treeChangeValue"
        @node-click="checkChangeNode")
        template(slot-scope="{ node, data }")
          span.subtext(v-if="subtext(data)") {{subtext(data)}}
          span.subtext(v-else) {{data.label}}
</template>

<script>
import PinyinMatch from 'pinyin-match'
import { last, uniqBy, cloneDeep, flattenDeep, isEmpty } from 'lodash'
import { treeFormat } from 'packages/utils/tree'
import { isPromise } from 'packages/utils/common'
import operateMixin from './operate.js'
import Clickoutside from 'element-ui/src/utils/clickoutside'
function allLevels (result, option, nodeData, valueKey, parentKey) { // 寻找子节点的父级节点
  /**
   * @name allLevels
   * @description 寻找子节点的父级节点
   * @param {Array} result 输出结果
   * @param {Array} option 树组件的数据源
   * @param {Object} nodeData 查询的节点的对象内容
   * @param {String} valueKey 选择项值的key，也是这个树的唯一标识
   * @param {String} parentKey 父级值的key
   * @return {Array} result 返回查询的子节点的所有[父级节点1, 父级节点2, 当前字节点]
  */
  if (!option) return []
  if (nodeData?.[parentKey]) {
    result.unshift(nodeData[parentKey])
    const nodeObj = option.find(item => item[valueKey] === nodeData[parentKey])
    return allLevels(result, option, nodeObj, valueKey, parentKey)
  } else return result
}
function hasChild (result, value, treeoption, valueKey) { // 是否存在子节点
  /**
   * @name hasChild
   * @description 是否存在子节点
   * @param {Array} value 查询值
   * @param {Array} treeoption 树组件的树形数据源
   * @param {String} valueKey 选择项值的key，也是这个树的唯一标识
  */
  if (!treeoption.length) return result
  const treeObject = treeoption.find(treeItem => treeItem[valueKey] === value)
  if (treeObject) return !!treeObject.children
  else {
    return treeoption.some(item => {
      if (!item.children || !item.children.length) return result
      else return hasChild(result, value, item.children, valueKey)
    })
  }
}
// 组件hover效果已被关闭
export default {
  name: 'AnsoDataformTree',
  mixins: [operateMixin],
  /**
   * 树形选择器
   * @props props参数
   * @prop {Array, String, Number} value 树形选择器值, 请保持出入参一致
   * @prop {String} showType 树形选择器展示效果 select-下拉 panel-平铺
   * @prop {Array} options 可选项数据源(数组对象)
   * @prop {String} valueKey 选择项值的key，也是这个树的唯一标识
   * @prop {String} parentKey 父级值的key
   * @prop {Boolean} multiple 是否多选
   * @prop {Boolean, Function} filterable Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则
   * @prop {Function} remoteFunc 配置支持远程异步搜索，配置运行请求数据函数
   * @prop {String} leaf 远程异步掺入数据，改参数字段用于判断是否为最小子集
   * @prop {Function} disabled 支持传入置灰条件函数
   * @prop {Boolean} showAllLevels 是否显示选中值的完整路径值(如果选择展示所有节点，输出的数据也会有整个选择的节点数据)
   * @prop {Boolean} collapseTags 多选时是否将选中值按文字的形式展示
  **/
  props: {
    value: [Array, String],
    options: {
      type: Array,
      default: () => ([])
    },
    showType: {
      type: String,
      default: 'select'
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    parentKey: {
      type: String,
      default: 'parentId'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    filterable: {
      type: [Boolean, Function],
      default: true
    },
    remoteFunc: {
      type: Function,
      default: () => {
        return false
      }
    },
    leaf: {
      type: String,
      default: 'isPetty'
    },
    subtext: {
      type: Function,
      default: () => {
        return false
      }
    },
    disabled: {
      type: Function,
      default: () => {
        return false
      }
    },
    showAllLevels: {
      type: Boolean,
      default: false
    },
    collapseTags: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    filterText (val) {
      if (this.showType === 'panel') return
      if (this.isFilter) this.$refs.tree.filter(val)
    },
    value: {
      deep: true,
      immediate: true,
      handler (val) {
        if (!val) return
        if (this.showInput) {
          if (this.multiple) this.outputValue(val)
          else this.filterText = this.filterDataLabel([val])[0]
        }
      }
    }
  },
  directives: { Clickoutside }, // 自定义书组件下拉点击组件外部事件
  data () {
    return {
      showselectTree: false,
      filterText: '',
      filterConfig: {
        placeholder: '输入关键字进行过滤',
        icon: this.multiple ? 'arrow-up' : null,
        iconAlign: 'right',
        clearable: true
      },
      tagConfig: {
        'disable-transitions': true,
        size: 'small',
        type: 'info'
      },
      remoteDatas: [], // 保存远传数据每次过来的数据，已去重
      remoteOptions: [], // 根据保存的remoteDatas返回的tree数据
      searchList: []
    }
  },
  computed: {
    searchPlaceholder () {
      if (isEmpty(this.value) && !this.filterText) return '请选择'
      if (this.value && !this.multiple) return this.filterDataLabel([this.value])[0]
      return null
    },
    showInput () {
      // 展示输入框的情况,
      // 1、展示类型为下拉 2、可搜索 且 展示类型不为平铺
      return this.showType === 'select' || (this.isFilter && this.showType !== 'panel')
    },
    currentValue () {
      if (!this.value) return []
      if (this.multiple) {
        return this.showAllLevels ? this.value.map(item => last(item)) : this.value
      } else return this.showAllLevels ? [last(this.value)] : [this.value]
    },
    optionsResult () {
      const r = this.tree(this.converDisabled(cloneDeep(this.options)))
      return r
    },
    defaultOptions () {
      if (!this.isRemote) return this.optionsResult
      else return this.remoteOptions
    },
    defaultDate () {
      if (!this.isRemote) return this.options
      else return this.remoteDatas
    },
    isFilter () {
      if (this.filterable.constructor === Boolean) return this.filterable
      else return true
    },
    isRemote () {
      // 如果传入函数则返回true
      if (!isPromise(this.remoteFunc())) return false
      else return true
    },
    isLazy () {
      if (!this.isRemote) return false
      else return true
    },
    indent () {
      if (!this.multiple) return 14
      else return 16
    }
  },
  methods: {
    searchClose (tag) {
      if (tag.disabled) return
      this.searchList = this.searchList?.filter(item => item.value !== tag.value)
      const key = this.showAllLevels ? last(tag.value) : tag.value
      this.$nextTick(() => {
        this.$refs.tree.setChecked(key, false)
      })
      // 设置值的输出
      let value
      if (this.showAllLevels) value = this.value?.filter(item => last(item) !== last(tag.value))
      else value = this.value?.filter(item => item !== tag.value)
      this.$emit('input', this.multiple ? value : last(value))
    },
    clear () {
      // 只有存在过滤才需要清除搜索框输入内容
      if (this.multiple) { // 多选框只是清除当前搜索的内容，不一会清除到到值
        this.filterText = null
        return
      }
      // 只有单选的才需要用到输入框清除
      this.filterText = null
      this.$emit('input', null)
      this.$refs.tree.setCheckedNodes([])
    },
    focus () {
      // 获得焦点时触发，平铺不在考虑范围内
      if (this.showType === 'panel') return
      // 为了样式效果需要清空输入的值
      this.filterText = null
    },
    /**
     * @name converDisabled
     * @description 处理默认的置灰数据，依据优先级：传入的置灰函数 > 原本的传入的置灰数据, 父级置灰，所属下级全部置灰。下级全部置灰，父级置灰。
     * @param {Array} arr 树组件数据源，平铺状态数据
     * @var {Array} assignDisabled 先根据组件api,disabled函数和数据源本身树节点disabled参数，整理基础置灰的数据（优先级：传入的置灰函数 > 原本的传入的置灰数据）
     * @return {Array} 返回值, 整理出符合逻辑的存在所有置灰项的平铺数据源
    */
    converDisabled (arr) {
      const assignDisabled = arr.map(item => {
        const data = { node: item, options: arr }
        return {
          ...item,
          disabled: (!this.disabled(data)) ? item.disabled : this.disabled(data) // 优先级：传入的置灰函数 > 原本的传入的置灰数据
        }
      })
      return assignDisabled.map(item => {
        const valueList = assignDisabled.filter(obj => obj.disabled).map(value => value[this.valueKey]) // 获取所有置灰的值
        // 当前存在父级节点，且父级节点值存在于valueList（获取所有置灰的值）中，则disabled为true
        if (item[this.parentKey] && valueList.includes(item[this.parentKey])) item.disabled = true
        // 获取所有子节点内容
        const sameLevel = assignDisabled.filter(nodes => nodes[this.parentKey] === item[this.valueKey])
        // 判断所有子节点内容disabled是否都为true,是：当前节点disabled为true
        // 若查无子节点内容，则直接返回原本节点disabled状态
        const isAllDisabled = sameLevel.length ? sameLevel.every(level => level.disabled) : !!item.disabled
        if (isAllDisabled) item.disabled = true
        return item
      })
    },
    /**
     * @name filterMethod
     * @description 过滤展示数据
     * @param {String} query 搜索框输入值，关键字
     * @var {Object} item tree的数据源的每个对象值
     * @return {Boolean} 返回值为true，element会自动过滤出相对应的数据
    */
    filterMethod (query, item) {
      const allLabelValue = allLevels([item[this.valueKey]], this.options, item, this.valueKey, this.parentKey)
      const defalutItem = {
        allLable: flattenDeep(this.filterDataLabel(allLabelValue)).join('/'),
        ...item
      }
      // console.log(defalutItem.allLable)
      if (!query) return true
      if (this.filterable.constructor === Boolean) return !!PinyinMatch.match(defalutItem.allLable, query)
      else return this.filterable({ query, item: defalutItem })
    },
    /**
     * @name filterDataLabel
     * @description 将输出的值转为label，展示效果
     * @param {String} value 获取组件选择的值
    */
    filterDataLabel (value, options = this.defaultDate) {
      // console.log('filterDataLabel ------', value)
      return value?.map(item => {
        // 由于组件输出的值格式可能是数组，也有可能是二维数组，因此需要判断类型在进行渲染
        if (item.constructor !== Array) return options.find(optionItem => optionItem[this.valueKey] === item).label
        else {
          const nodeText = item.map(nodeItem => {
            return options.find(optionItem => optionItem[this.valueKey] === nodeItem).label
          })
          return nodeText.join('/')
        }
      }) || []
    },
    /**
     * @name treeChangeValue
     * @description 当复选框被点击的时候触发
     * @param {Object} data 当前点击节点的内容
     * @emit currentChoose 输出node:当前点击的节点内容 checkedNodes:树目前的选中状态对象
     * @emit input 输出树勾选值
    */
    treeChangeValue (data, currentValue) {
      const { checkedNodes, checkedKeys } = currentValue
      const checkedValues = !this.isRemote ? checkedNodes.reduce((checkedList, item) => {
        if (!item.children) {
          checkedList.push(item[this.valueKey])
        }
        return checkedList
      }, []) : this.getRemoteValue(checkedKeys)
      if (this.showInput) this.$refs.searchInput.$children[0].focus()
      this.$emit('currentChoose', { node: data, checkedNodes })
      const emitValue = this.allLevelsValue(checkedValues)
      this.$emit('input', this.multiple ? emitValue : last(emitValue))
      this.getSelectList(this.allLevelsValue(checkedValues), data)
      this.filterText = null
    },
    getRemoteValue (checkedKeys) {
      return checkedKeys.filter((item) => !hasChild(false, item, this.remoteOptions, this.valueKey))
    },
    getSelectList (list = [], data) { // 获取勾选的列表内容
      this.searchList = list.map(item => {
        return {
          disabled: data.disabled,
          value: item,
          label: this.showAllLevels ? last(this.filterDataLabel(this.allLevelsValue(item))) : this.defaultDate.find(optionItem => optionItem[this.valueKey] === item).label
        }
      })
      // console.log(this.searchList)
    },
    // 树形组件单选操作
    checkChangeNode (data, node, vueComponent) {
      /*
      * 单选置灰不可选
      * 多选操作不可操作
      * 非叶子节点不可选
      */
      if (data.disabled) return
      if (this.multiple) return
      if (!node.isLeaf) return
      this.$refs.tree.setCheckedKeys([]) // 删除所有选中节点
      this.$refs.tree.setCheckedNodes([data]) // 选中已选中节点
      this.$emit('singleCurrentChoose', { data, node, vueComponent }) // 提供单个勾选函数
      const emitValue = this.allLevelsValue([data[this.valueKey]])

      this.$emit('input', this.multiple ? emitValue : last(emitValue))
      // 单选，存在过滤则赋值
      this.filterText = flattenDeep(this.filterDataLabel(this.allLevelsValue([data[this.valueKey]]))).join(', ')
      // 下拉树样式，收缩选择内容
      this.showselectTree = false
    },
    /**
     * @name allLevelsValue
     * @description 返回值是否包含父级节点
     * @param {Array} value 当前树已勾选的节点值
     * @var showAllLevels 是否显示选中值的完整路径值(如果选择展示所有节点，输出的数据也会有整个选择的节点数据)
    */
    allLevelsValue (value, options = this.defaultDate) { // 是否输出父级节点
      if (!this.showAllLevels) return value
      return value.map(valueItem => {
        const nodeData = options.find(item => item[this.valueKey] === valueItem)
        return allLevels([valueItem], options, nodeData, this.valueKey, this.parentKey)
      })
    },
    /**
     * @name lazyLoad
     * @description 加载子树数据的方法，仅当 isLazy 为true 时生效
     * @param {Object} node 当前选择的节点参数
     * @param {Function} resolve 返回内容
    */
    lazyLoad (node, resolve) {
      if (!this.isRemote) return null
      const f = this.remoteFunc({ node })
      if (isPromise(f)) {
        f.then(data => {
          this.remoteDatas = uniqBy([...this.remoteDatas, ...data], this.valueKey)
          this.remoteOptions = this.tree(this.converDisabled(cloneDeep(this.remoteDatas)))
          this.searchClose({ ...node, value: node.key })
          setTimeout(() => {
            resolve(data)
          }, 1000)
        })
      }
    },
    tree (options = []) { // 转化为树形格式
      const tree = treeFormat(options, this.valueKey, this.parentKey, undefined, false)
      return tree
    },
    checkSelectPanel () {
      // 多选打开下拉框点击输入框不关闭的场景，存在打开下拉框后想进行搜索，需要重新点击输入框
      if (this.multiple) {
        if (!this.showselectTree) this.showselectTree = !this.showselectTree
        return
      }
      this.showselectTree = !this.showselectTree
    },
    handleClose (e, type) {
      if (this.showType === 'panel') return // 平铺不存在关闭下拉操作
      this.filterText = this.searchPlaceholder && this.searchPlaceholder !== '请选择' ? this.searchPlaceholder : this.filterText
      this.showselectTree = false
    }
  }
}
</script>
<style lang="sass" scoped>
.treeObject
  width: 100%
  position: relative
  .searchBox
    .searchInput
      width: 100%
      ::v-deep .el-icon-arrow-up
        transition: transform .3s
        transform: rotateZ(180deg)
    .is-reverse
      ::v-deep .el-icon-arrow-up
        transform: rotateZ(0)
  .searchBox[isShowTag]
    display: flex
    align-items: center
    border: 1px solid #d9d9d9
    border-radius: 4px
    justify-content: space-between
    .searchInput
      margin-bottom: 0
      width: auto
      display: flex
      flex: 1
    &:hover
      border-color: #3171F2
    &:focus
      border-color: #3171F2
    ::v-deep .el-tag
      margin: 2px 0 2px 6px
    ::v-deep .el-tag__close
      background-color: #bfbfbf
      color: #fff
      &:hover
        color: #fff
        background-color: #bfbfbf
    ::v-deep .el-input__inner
      border: none
    .tag-group-list
      display: flex
      flex-wrap: wrap
      flex: 1
  .transition-box
    border: none
    position: absolute
    width: 100%
    padding: 10px !important
    z-index: 999
    margin-top: 5px
    background-color: #FFF
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%)
  .searchInput, .operatebtn
    margin-bottom: 5px
  .tree
    ::v-deep .el-tree-node__content:hover
      background-color: #f5f7fa
    ::v-deep .el-tree-node:focus>.el-tree-node__content
      background-color: #fff
  .singleChoose
    ::v-deep
      .subtext
        padding-left: 8px
    ::v-deep .is-checked
      .is-leaf + span.subtext
        color: $--color-primary
        background: #f5f7fa
        display: block
        width: 100%
        line-height: 26px
    ::v-deep .el-tree-node__content
      padding-right: 0
    ::v-deep .el-tree-node[aria-disabled=true]
      color: $--button-disabled-font-color
      div
        color: $--button-disabled-font-color
    ::v-deep .el-tree-node
      .el-tree-node__content:hover
        .is-leaf + span.subtext
          background: #f5f7fa
          display: block
          width: 100%
          line-height: 26px
    ::v-deep .el-tree-node:hover>.el-tree-node__content
      background-color: #fff
    ::v-deep .el-tree-node:focus>.el-tree-node__content
      background-color: #fff
</style>
