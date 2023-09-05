import { keyBy, keys } from 'lodash'
import { checkEmpty } from './filterByStatic.js'
/**
 * @filterFields {Array} 搜索栏的配置
 * @defaultFilterBy {Object} 搜索条件，初始化时用
 */
export default {
  props: {
    filterFields: {
      type: Array,
      default: () => ([])
    },
    defaultFilterBy: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      /**
       * 搜索条件
       * 初始化搜索条件优先级 > 默认搜索条件
       * 考虑到两个都传的情况，可能存在初始化搜索数据和默认搜索数据冲突，但是表格初始化的搜索又要和默认搜索不一致的情况
       */
      filterBy: { ...this.defaultFilterBy },
      // 搜索按钮
      filterButtonList: [{
        label: '重置',
        func: this.filterFormReset
      }, {
        label: '查询',
        type: 'primary',
        func: this.filterFormSubmit
      }]
    }
  },
  computed: {
    // 过滤字段的对象化，方便调取
    filterFieldsObject () {
      return keyBy(this.filterFields, 'name')
    },
    filterByArray () {
      return this.filterEmpty(this.filterBy)
      // const filterKeys = keys(this.filterBy)
      // return filterKeys.filter(key => !checkEmpty(this.filterBy[key])).map(key => ({
      //   key,
      //   value: this.filterBy[key]
      // }))
    }
  },
  methods: {
    // 提交搜索
    filterFormSubmit ({ formData }) {
      this.filterBy = this.converFilterObj(formData)
      this.$emit('changeFilterBy', this.filterBy)
    },
    // 重置搜索条件
    filterFormReset () {
      this.clearSelection()
      this.filterBy = this.converFilterObj({ ...this.defaultFilterBy })
      this.$emit('resetFilterBy', this.filterBy)
    },
    filterFormRemove (key) {
      this.$delete(this.filterBy, key)
      this.$emit('changeFilterBy', this.filterBy)
    },
    filterEmpty (filterBy = {}) { // 过滤无效值（筛选过滤空数组、空字符串等空数据）
      const filterKeys = keys(filterBy)
      return filterKeys.filter(key => checkEmpty(filterBy[key])).map(key => ({
        key,
        value: filterBy[key]
      }))
    },
    converFilterObj (filterBy = {}) {
      /**
       * 获取已经过滤掉无效数据的数组 this.filterEmpty(filterBy)
       * 转换格式 => 对象转数组
       */
      return this.filterEmpty(filterBy).reduce((res, item) => {
        res[item.key] = item.value
        return res
      }, {})
    }
  }
}
