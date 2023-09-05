<template lang="pug">
el-date-picker(
  :class="!isRange ? '' : 'form-item__range without-limit__width'"
  :value-format="valueFormat"
  v-bind="$attrs"
  v-model="currentValue"
  :type="dateType"
  :prefix-icon="prefixIcon"
  :clear-icon="clearIcon"
  :picker-options="{ shortcuts:shortcuts, ...pickerOptions }")
</template>

<script>
/**
 * @module AnsoDataformDate 日期选择器
 * @author chenpy
 *   */
// v-on="$listeners"
import day from 'dayjs'
import iconMixin from './iconMixin.js'
export default {
  name: 'AnsoDataformDate',
  mixins: [iconMixin],
  /**
   * 日期选择器
   * @props props参数
   * @prop {String, Array, Number, Date} value 值
   * @prop {String} dateType 日期选择器选择类型（year/month/date/dates/week/datetime/datetimerange/ daterange/monthrange）
   * @prop {Boolean, Array} shortcut 需要日期选择类型为选择范围或时间日期选择器（dateType: 'datetime'）才生效，因此dateType必须配置为['datetimerange', 'daterange', 'monthrange', 'datetime']四种类型，否则配置无效
   * @prop {Object} pickerOptions 日期选择器控制限制
  **/
  data () {
    const endofToday = day().endOf('date').valueOf()
    const today = day().valueOf()
    return {
      a: day('21:55', 'HH:mm'),
      DEFAULT_PREFIX_ICON: 'el-icon-date',
      rangeGroup: ['datetimerange', 'daterange', 'monthrange'],
      defualtShortcut: [{
        text: '最近一周',
        onClick (picker) {
          const end = endofToday
          const start = day().subtract(1, 'week').startOf('date').valueOf()
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = endofToday
          const start = day().subtract(1, 'month').startOf('date').valueOf()
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = endofToday
          const start = day().subtract(3, 'month').startOf('date').valueOf()
          picker.$emit('pick', [start, end])
        }
      }],
      dateShortcut: [{
        text: '今天',
        onClick (picker) {
          picker.$emit('pick', today)
        }
      }, {
        text: '昨天',
        onClick (picker) {
          const date = day().subtract(1, 'day').valueOf()
          picker.$emit('pick', date)
        }
      }, {
        text: '一周前',
        onClick (picker) {
          const date = day().subtract(1, 'week').valueOf()
          picker.$emit('pick', date)
        }
      }]
    }
  },
  props: {
    value: [String, Array, Number, Date],
    dateType: {
      type: String,
      default: 'date'
    },
    shortcut: [String, Array],
    pickerOptions: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    isRange () {
      return this.rangeGroup.includes(this.dateType)
    },
    currentValue: {
      get () {
        return this.formatValue(this.value)
      },
      set (val) {
        this.$emit('input', this.formatValue(val))
      }
    },
    valueFormat () {
      return this.dateType === 'week' ? '' : 'timestamp'
    },
    shortcuts () {
      if (!this.shortcut) return null
      if (this.shortcut.constructor === Array) return this.shortcut
      else return this[`${this.shortcut}Shortcut`]
    }
  },
  methods: {
    /**
     * @name formatValue
     * @description 转换时间格式
     * @param {String, Array, Number, Date} val 传入时间值
     * @param {String} this.dateType 日期选择器选择类型（year/month/date/dates/week/datetime/datetimerange/ daterange/monthrange）
     * @returns {String} 返回值为转化好的时间戳格式
    */
    formatValue (val) {
      const isMapGroup = [...this.rangeGroup, 'dates']
      if (!val) return null
      if (this.dateType === 'week') return day(val).startOf('week').valueOf() // 如果日期格式是周，则默认输出一周初始时的时间戳
      if (isMapGroup.includes(this.dateType)) {
        // 如果存在时间范围或者时国歌时间选项的情况，注意范围值需要获取到第一个时间(00:00:00)到第二个时间(23:59:59)
        if (this.dateType === 'datetimerange' || this.dateType === 'dates') return val.map(item => this.convertFormat(item))
        else {
          const type = this.dateType === 'daterange' ? 'date' : 'month'
          const start = day(val[0]).startOf(type).valueOf()
          const end = day(val[1]).endOf(type).valueOf()
          return [start, end]
        }
      } else return this.convertFormat(val)
    },
    /**
     * @name convertFormat
     * @description 转换为时间戳格式
     * @param {String, Array, Number, Date} val 传入时间格式
     * @returns {String} 返回值为转化好的时间戳格式
    */
    convertFormat (val) { // 转换为时间戳格式
      return val.valueOf()
    }
  }
}
</script>

<style lang="sass" scoped>
.el-range-editor
  ::v-deep .el-range__icon
    line-height: 25px
  ::v-deep .el-range-separator
    line-height: 25px
  ::v-deep .el-range__close-icon
    line-height: 25px
</style>
