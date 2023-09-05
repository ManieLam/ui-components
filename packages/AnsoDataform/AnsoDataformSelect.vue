<template lang="pug">
  el-select.select(
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue"
    :class="{'without-limit__width': $attrs.multiple}"
    :remote="isRemote"
    :clearable="clearable"
    :remote-method="remoteMethod"
    :loading="searchLoading"
    :filterable="isFilter"
    :filter-method="filterMethod"
    @visible-change="visibleChange")
    el-option-group(
      v-for="group in defaultGroup"
      :key="group.label"
      :disabled="group.disabled"
      :label="group.label")
      el-option.option_Group_item(
        v-for="(option, index) in group.options"
        v-bind="option"
        :style="{ 'height': !!option.img ?  `${optionHeight}px` : '100%' }"
        :key="option.value")
        div.option
          div.optionImg(
            v-if="!!option.img"
            :style="{ height: `${optionHeight}px`, backgroundImage: `url(${option.img})` }")
          component.optionText(
            :is="isPopover(option, index) ? 'div' : 'el-popover'"
            v-bind.sync="params"
            :title="!option.subtext ? '' : option.label"
            :content="transSubtext(option, subtext, index) || option.label")
            div(slot="reference" :class="!!option.img ? 'optionText_column' : 'optionText_row'")
              span {{option.label|ellipsisSubtext(subtextlimit)}}
              span.subtextText(v-if="transSubtext(option, subtext, index)") {{transSubtext(option, subtext, index)|ellipsisSubtext(subtextlimit)}}
</template>

<script>
/**
 * @module AnsoDataformSelect 选择框
 *   */
import PinyinMatch from 'pinyin-match'
import { groupBy, truncate, isEmpty, debounce } from 'lodash'
import { isPromise } from 'packages/utils/common'
import userHead from '@/assets/logo.png'
export default {
  name: 'AnsoDataformSelect',
  /**
   *选择框
   * @props props参数
   * @prop {Array} options 传入数据
   * @prop {String} groupKey 传入数据为分组数据时，默认为group显示分组名称
   * @prop {Boolean} isGroup 是否分组展示
   * @prop {Boolean, Function} groupLabel 设置分组名称，参数输出{label: 分组的值, groups：分组数据}
   * @prop {String} groupKey 传入数据为分组数据时，默认为group显示分组名称
   * @prop {Function} subtext 配置则输出选项说明，居右显示，支持文字，优先级高于直接在option数据中输出的subtext值
   * @prop {String} optionHeight 配置选项高度，用于配置options中有传入img的选项的高度
   * @prop {Number} subtextlimit 配置选项中，选项说明subtext可显示最长长度
   * @prop {Function} remoteFunc 配置支持远程异步搜索，配置运行请求数据函数
   * @prop {Number} remoteDebounceTime 配置远程异步搜索防抖时长
   * @prop {Boolean, Function} filterable Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则
  **/
  props: {
    value: {
      type: [String, Number, Array, Boolean],
      default: () => {
        return null
      }
    },
    options: {
      type: Array,
      default: () => ([])
    },
    isGroup: {
      type: Boolean,
      default: false
    },
    groupKey: {
      type: String,
      default: 'group'
    },
    groupLabel: {
      type: [Boolean, Function],
      default: false
    },
    optionHeight: {
      type: String,
      default: '90'
    },
    subtext: Function,
    subtextlimit: Number,
    remoteFunc: {
      type: Function,
      default: () => {
        return false
      }
    },
    filterable: {
      type: [Boolean, Function],
      default: true
    },
    clearable: {
      type: Boolean,
      default: true
    },
    remoteDebounceTime: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      // isEllipsis: false,
      params: {
        width: '200',
        trigger: 'hover',
        placement: 'top-start'
      },
      userHead,
      searchLoading: false,
      remoteOptions: [],
      filterOptions: [],

      remoteMethod: this.setDebounce(this.remoteSearch, 500)
    }
  },
  watch: {
    options: {
      deep: true,
      immediate: true,
      handler (groups) {
        // console.log('groups', groups)
        if (isEmpty(groups)) return
        this.filterOptions = groups
      }
    }
  },
  filters: {
    ellipsisSubtext (val, limitValue) {
      if (!val || !limitValue) return val
      return truncate(val, { length: limitValue, separator: '...' })
    }
  },
  computed: {
    currentValue: {
      get () {
        const curSet = Array.isArray(this.value) && isEmpty(this.value) ? null : this.value
        // return this.value
        return curSet
      },
      set (val) {
        const curSet = Array.isArray(val) && isEmpty(val) ? null : val
        this.$emit('input', curSet)
      }
    },
    isRemote () {
      // 如果传入函数则返回true
      if (!isPromise(this.remoteFunc())) return false
      else return true
    },
    isFilter () {
      if (this.filterable.constructor === Boolean) return this.filterable
      else return true
    },
    optionGroup () {
      return this.optionReorganiza(this.options)
    },
    defaultGroup () {
      if (this.isRemote) return this.optionReorganiza(this.remoteOptions)
      if (this.isFilter) return this.optionReorganiza(this.filterOptions)
      else return this.optionGroup
    }
  },
  methods: {
    /**
     * @name filterMethod
     * @description 下拉框中搜索框支持过滤数据
     * @param {String} query 搜索框输入值，关键字
     * @param {Object} item 传入展示的数据源
     * @return {Array} 返回过滤后的展示数据
    */
    filterMethod (query, item = this.options) {
      if (!query) { // 没有关键字，直接返回原本传入的数据源
        this.filterOptions = item
        return
      }
      if (this.filterable.constructor === Boolean) {
        // 检索默认支持关键字，拼音检索
        const data = item.filter(ones => !!PinyinMatch.match(ones.label, query))
        this.filterOptions = data
      } else this.filterOptions = this.filterable({ query, item }) // 自定义检索函数直接返回检索后的数据
    },
    isPopover (option, index) {
      /**
       * 是否显示浮窗
       * 判断option中label字符串长度是否小于等于传入subtextlimit值
       * 判断subtext中字符串长度是否小于等于传入subtextlimit值
       * 如果小于等于subtextlimit值，则显示true
       */
      if (!this.subtextlimit) return true
      const { label, subtext } = option
      if (!label && !subtext) return true
      const subtextVal = this.transSubtext(option, option.subtext, index)
      if (String(subtextVal).length <= this.subtextlimit && String(label).length <= this.subtextlimit) return true
      else return false
    },
    /**
     * @name groupByOption
     * @description 根据groupKey关键值分组, 转换数据源的置灰情况，输出分好组的数据源
     * @param {Array} options 数据源
     * @var {String} this.groupKey 传入数据为分组数据时，默认为group显示分组名称
     * @return {Object} 返回分组数量和，分组的数据源
    */
    groupByOption (fullOptions) {
      const groupObj = groupBy(fullOptions, this.groupKey)
      const groups = Object.entries(groupObj).map(([label, options]) => {
        return {
          label: this.groupLabel.constructor !== Boolean ? this.groupLabel({ label, options }) : label === '' || label === 'null' || label === 'undefined' ? '其他' : label,
          disabled: options.some(item => item.disabledGroup), // 根据数据源的置灰情况限制数据
          options
        }
      })
      return {
        length: groups.length, // 分数数量，由于数据源传入可以不分组，因此这个数据可以为1
        groups
      }
    },
    transSubtext (option, customSubtext, index) {
      return typeof customSubtext === 'function'
        ? customSubtext(option, index) : option.subtext
          ? option.subtext : null
    },
    /**
     * @name optionReorganiza
     * @description 为了适应组件封装展示，重新更改数据源的真是结构
     * @param {Array} options 展示数据源
    */
    optionReorganiza (options) {
      // 如果不是分组，可以直接执行输出，不用循环数组
      if (!this.isGroup) return [{ label: '', options }]
      // 获取数据重组为适应组件输出的数据
      const { length, groups } = this.groupByOption(options)
      if (length === 1) { // 如果groups长度为1，需要输出一个任然存在分组格式的数据源
        return [{
          label: '',
          options: groups[0].options
        }]
      }
      return groups
    },
    setDebounce (func, time) {
      return debounce(func, time)
    },
    remoteSearch (query) {
      this.searchLoading = true
      const f = this.remoteFunc({ query })
      if (isPromise(f)) {
        f.then(data => {
          this.remoteOptions = data
          this.searchLoading = false
        })
      }
    },
    visibleChange () {
      // 过滤时，如果无选值，那么下拉值重新定义为传入option值
      if (this.isFilter) this.filterOptions = this.options
    }
  },
  created () {
    this.remoteMethod = this.setDebounce(this.remoteSearch, this.remoteDebounceTime)
  }
}
</script>
<style lang="sass" scoped>
.option_Group_item
  .option
    display: flex
    flex-direction: row
    .optionImg
      width: 70px
      margin: 0 10px 0 0
      background: no-repeat center
      background-size: contain
    .optionText_column
      margin-top: 10px
      max-width: 180px
    .optionText
      width: 100%
      span
        display: block
        overflow: hidden
        text-overflow: ellipsis
      .subtextText
        font-size: 12px
        color: #8c8c8c
</style>

<style scoped>
.option {
  max-width: 270px;
}
</style>
