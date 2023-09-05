import day from 'dayjs'
import isEmpty from 'lodash/isEmpty'

export const tagRenderList = {
  // 值类型
  text: (value) => {
    return value === null || value === undefined || value === '' ? '--' : value
  },
  // 单值匹配
  select: (value, field) => {
    const option = field.options ? field.options.find(option => option.value === value) : null
    return option ? option.label : value
  },
  // 多值匹配
  multiselect: (value, field) => {
    return value.map(data => {
      const item = field.options ? field.options.find(option => option.value === data) : null
      return item ? item.label : data
    }).join(',')
  },
  // 数字范围
  numberRange: (value, field) => {
    const start = value[0] || value[0] === 0 ? value[0] : '-∞'
    const end = value[1] || value[1] === 0 ? value[1] : '+∞'
    return value ? `[${start}, ${end}]` : '--'
  },
  // 字符串范围
  textRange: (value, field) => {
    const start = value[0] || !isEmpty(value[0]) ? value[0] : '-∞'
    const end = value[1] || !isEmpty(value[1]) ? value[1] : '+∞'
    return value ? `[${start}, ${end}]` : '--'
  },
  // 时间类型
  time: (value, field) => {
    return value ? day(value).format(field.timeType || 'HH:mm:ss') : '--'
  },
  // 日期范围
  timeRange: (value, field) => {
    const start = day(value[0]).format(field.timeType || 'HH:mm:ss')
    const end = day(value[1]).format(field.timeType || 'HH:mm:ss')
    return value ? `[${start}, ${end}]` : '--'
  },
  // 日期类型
  date: (value, field) => {
    return value ? day(value).format(field.timeType || 'YYYY-MM-DD') : '--'
  },
  // 日期范围
  daterange: (value, field) => {
    const start = day(value[0]).format(field.timeType || 'YYYY-MM-DD')
    const end = day(value[1]).format(field.timeType || 'YYYY-MM-DD')
    return value ? `[${start}, ${end}]` : '--'
  },
  // 多值匹配(级联组件多级展示)
  'multiselect-allLevels': (value, field) => {
    return value.map(val => {
      return tagRenderList.multiselect(val, field).split(',').join('/')
    }).join(',')
  },
  // 单值匹配(级联组件多级展示)
  'select-allLevels': (value, field) => {
    return value.map(val => {
      return tagRenderList.select(val, field)
    }).join('/')
  }
}

export const tagRenderType = (fileId) => {
  switch (fileId.tag) {
    case 'numberRange': // 数字范围
    case 'textRange': // 数字范围
    case 'time': // 时间
    case 'timeRange': // 时间范围
      return fileId.tag
    case 'radio': // 单选
    case 'switch': // 开关
      return 'select'
    case 'checkbox': // 多选
      return 'multiselect'
    case 'select': // 选择框
      return fileId.multiple ? 'multiselect' : 'select'
    case 'cascader': { // 级联选择框
      const { showAllLevels = true } = fileId
      if (showAllLevels) {
        return fileId.multiple ? 'multiselect-allLevels' : 'select-allLevels'
      } else return fileId.multiple ? 'multiselect' : 'select'
    }
    case 'date': // 日期
      return /range$/.test(fileId.dateType) ? 'daterange' : 'date'
    default:
      return 'text'
  }
}
