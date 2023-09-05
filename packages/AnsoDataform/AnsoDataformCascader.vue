<template lang="pug">
  component(
    :is="isPanel ? 'el-cascader-panel' : 'el-cascader'"
    v-bind="$attrs"
    v-model="currentValue"
    :show-all-levels="showAllLevels"
    :options="optionsResult"
    :clearable="clearable"
    :class="{'without-limit__width': multiple}"
    :props="{ value: valueKey, multiple, ...isLazy, lazyLoad, ...props }")
    template(slot-scope="{ node, data }")
      i(v-if="data.icon && data.iconAlign !== 'right'",:class="`el-icon-${data.icon} el-icon--left`")
      span(v-if="subtext(data)") {{subtext(data)}}
      span(v-else) {{data.label}}
      i(v-if="data.icon && data.iconAlign === 'right'",:class="`el-icon-${data.icon} el-icon--right`")
</template>

<script>
import { isPromise } from 'packages/utils/common'
import last from 'lodash/last'
import uniqBy from 'lodash/uniqBy'
import { treeFormat } from 'packages/utils/tree'
function treeValue (result, cid, options, parentKey, valueKey) {
  if (cid !== undefined && cid !== '' && cid !== null) {
    // console.log(options)
    const cidOpt = options.find(option => option[valueKey] === cid)
    if (!cidOpt) return [cid, ...result]
    const pid = cidOpt[parentKey]
    if (pid) {
      return treeValue([cid, ...result], pid, options, parentKey, valueKey)
    } else {
      return [cid, ...result]
    }
  } else {
    return result
  }
}
export default {
  name: 'AnsoDataformCascader',
  /**
   * 级联选择框
   * @props props参数
   * @prop {Number, String, Array} value 级联选择框值
   * @prop {Array} options 可选项数据源(数组对象)
   * @prop {String} valueKey 选择项值的key，也是这个级联组件的唯一标识
   * @prop {String} parentKey 父级值的key
   * @prop {Boolean} multiple 是否为多选类型的级联
   * @prop {Object} props 支持element其它配置选项
   * @prop {Function} remoteFunc 配置支持远程异步搜索，配置运行请求数据函数
   * @prop {String} leaf 远程异步掺入数据，改参数字段用于判断是否味最小子集
   * @prop {Boolean} showAllLevels 输入框中是否显示选中值的完整路径(如果选择展示所有节点，输出的数据也会有整个选择的节点数据)
   **/
  props: {
    value: [Number, String, Array],
    isPanel: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    options: {
      type: Array,
      default: () => ([])
    },
    valueKey: {
      type: String,
      default: 'value'
    },
    parentKey: {
      type: String,
      default: 'parentId'
    },
    props: {
      type: Object,
      default: () => ({})
    },
    multiple: {
      type: Boolean,
      default: false
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
    showAllLevels: { // 输入框中是否显示选中值的完整路径
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      remoteDatas: [], // 保存远传数据每次过来的数据，已去重
      remoteOptions: [] // 根据保存的remoteDatas返回的tree数据
    }
  },
  computed: {
    currentValue: {
      /**
       * get:
       * 需要判断是否为多选, 是:进行多选数值操作,将传入数值转换为多选数值的树形模式
       * 否:则为单选,判断转入参数值类型(Number, String, Array(TODO))
       * (TODO)如果是数组类型需要获取数组最后一位值来转换为数值的树形模式
       * set:
       * 同样需要判断是否为多选再输出值的内容
       */
      get () {
        if (!this.value) return null
        if (this.multiple) return this.isMultiple(this.value)
        if (this.isRemote) return this.changeTreeValue(this.value, this.remoteDatas)
        else return this.changeTreeValue(this.value, this.options)
      },
      set (val) {
        let value
        if (this.multiple) {
          value = val.map(item => { return this.showAllLevels ? item : last(item) })
        } else value = this.showAllLevels ? val : last(val)
        this.$emit('input', value)
      }
    },
    optionsResult () {
      const r = treeFormat(this.options, this.valueKey, this.parentKey, undefined, false)
      return r
    },
    isRemote () { // 是否支持异步远传
      // 如果传入函数则返回true
      if (!isPromise(this.remoteFunc())) return false
      else return true
    },
    isLazy () {
      if (!this.isRemote) return {}
      else return { lazy: true, leaf: this.leaf }
    },
    defaultOptions () {
      if (!this.isRemote) return this.optionsResult
      else return this.remoteOptions
    }
  },
  methods: {
    isMultiple (value) { // 多选类型的值需要循环各个值，返回为支持el-cascader数值格式的树形值，供组件展示数据
      return value.map(item => {
        return this.changeTreeValue(item, this.options)
      })
    },
    /**
     * @name changeTreeValue
     * @description 转换为支持el-cascader数值格式的树形值
     * @param {Number, String, Array} val 当前已经选择的值
     * @param {Array} option 数据源
     * @return {Array} 转换为支持el-cascader数值格式的树形值
    */
    changeTreeValue (val, option) {
      const allAbleValue = val.constructor === Array ? this.showAllLevels ? last(val) : val : val
      // 转换为支持el-cascader数值格式的树形值
      return treeValue([], allAbleValue, option, this.parentKey, this.valueKey)
    },
    lazyLoad (node, resolve) {
      if (!this.isRemote) return null
      const f = this.remoteFunc({ node })
      if (isPromise(f)) {
        f.then(data => {
          this.remoteDatas = uniqBy([...this.remoteDatas, ...data], this.valueKey)
          this.remoteOptions = treeFormat(this.remoteDatas, this.valueKey, this.parentKey, undefined, false)
          // console.log('获取值', data)
          setTimeout(() => {
            // console.log('赋值', data)
            resolve(data)
          }, 1000)
        })
      }
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
