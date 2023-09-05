import { cloneDeep, isEmpty, filter, overEvery, intersection } from 'lodash'
import Moment from 'moment'
// 校验是否为空值
const isNull = (val) => {
  return val !== null && val !== undefined && val !== ''
}
/**
 * 公用纯静态检索,支持以下类型
 * 使用: filterByStatic({datas, filterBy, columns})
 * 检索全局支持的过滤类型
 *  eq: 等于
    ne: 不等于(极少使用 暂不支持)
    like: 类似
    ge: 大于等于
    le: 小于等于
    gt: 大于(极少使用 暂不支持)
    in 包含
    isNull: 为Null (极少使用 暂不支持)
    isNotNull: 不为Null(极少使用 暂不支持)
 */
/**
 *  日期类型筛选
 * @param {*} param0.type 检索日期对象类型
 * @param {*} param0.render 后端返回的数据类型,即需要检索的类型,默认时间戳('x')
 * @param {*} filterVal 检索的目标数据
 * @param {*} targetVal 检索对象组的数据
 */
const filterDate = ({ tag, dateType, render = 'x' } = {}, filterVal, targetVal) => {
  const d = Moment(targetVal, render)
  let start, end
  if (Array.isArray(filterVal)) {
    start = Moment(filterVal[0], 'x')
    end = Moment(filterVal[1], 'x')
  }

  switch (tag) {
    case 'timeRange': return d.isBetween(start, end) || d.isSame(start, end)
    case 'date':
      if (dateType && ['datetimerange', 'daterange', 'monthrange'].includes(dateType)) {
        return d.isBetween(start, end) || d.isSame(start, end)
      }
      return d.isSame(filterVal)
    case 'time':
    default: return d.isSame(filterVal)
  }
}
// like模糊搜索
const filterLike = (filterVal, targetVal) => {
  return new RegExp(filterVal).test(targetVal)
}

// range 范围搜索
const filterRange = (filterVal = [], targetVal) => {
  const start = filterVal[0]
  const end = filterVal[1]
  return isNull(start) && isNull(end) ? targetVal >= filterVal[0] && targetVal <= filterVal[1] : targetVal >= start || targetVal <= end
}
const filterIn = (filterVal = [], targetVal) => {
  if (typeof targetVal === 'object' && targetVal.map) {
    return intersection(filterVal, targetVal).length
  }
  return filterVal.includes(targetVal)
}

// 筛选类型 ----------------------
const checkFilterType = (filterDefined) => {
  const { tag, filterType } = filterDefined
  if (filterType) return filterType
  if (['date', 'time', 'timeRange'].includes(tag)) return 'dates'
  if (['numberRange', 'textRange'].includes(tag)) return 'range'
  if (tag === 'select' && filterDefined.multiple) return 'in'
  return null
}

export const checkEmpty = (value) => {
  if (value !== null && value !== undefined && value !== '' && value !== 'Invalid Date') {
    if (value.map) return value.length > 0
    return true
  } else if (typeof value === 'object') return !isEmpty(value)
  return false
}

const funcs = {
  like: ({ value, key }) => {
    return (tarVal) => filterLike(value, tarVal[key])
  },
  startWith: ({ value, key }) => {
    return (tarVal) => filterLike('^' + value, tarVal[key])
  },
  endWith: ({ value, key }) => {
    return (tarVal) => filterLike(value + '$', tarVal[key])
  },
  dates: ({ defined, value, key }) => {
    return (tarVal) => filterDate({
      tag: defined.tag,
      dateType: defined.dateType,
      render: defined.renderFrom
    }, value, tarVal[key])
  },
  range: ({ value, key }) => {
    return (tarVal) => filterRange(value, tarVal[key])
  },
  in: ({ value, key }) => {
    console.log(value, key)
    return (tarVal) => {
      const valueList = typeof value === 'string' ? value.split(',') : value
      return filterIn(valueList, tarVal[key])
    }
  }
}
const defaultFunc = ({ value, key }) => (tarVal) => {
  return String(tarVal[key]) === String(value)
}

function getFilterFuncs ({ filterDefined: defined, value, key }) {
  if (!defined) throw new Error('当前字段无设置columns.form')
  const type = checkFilterType(defined)
  return funcs[type] ? funcs[type]({ defined, value, key }) : defaultFunc({ value, key })
}

/**
 * 根据过滤字段格式化过滤函数
 * @param {Object} filterBy 检索的数据
 * @param {Array} filterKeys 已筛选过参数为null等不正常数据的字段
 * @param {Object} columns 字段配置
 */
function filterFormat ({ filterBy, filterKeys, columns }) {
  const filterFuncs = filterKeys.map(key => {
    const filterDefined = columns[key].form
    return getFilterFuncs({ filterDefined, value: filterBy[key], key })
  })
  return overEvery(filterFuncs)
}
/**
 * 静态检索方法
 * @param {Array} datas 需要被检索的整批数据
 * @param {Object} filterBy 检索的数据
 * @param {Object} columns 所有检索字段的columns解释,必须设置column[key].form对象
 */
const filterByStatic = ({ datas = [], filterBy = {}, columns = {} } = {}) => {
  const fulls = cloneDeep(datas)
  const keyList = Object.keys(filterBy)
  const keyLen = keyList.length
  if (!keyLen) return datas
  const validateKeys = keyList.filter(key => checkEmpty(filterBy[key]))
  const filterFormater = filterFormat({ filterBy, filterKeys: validateKeys, columns })
  return filter(fulls, filterFormater)
}

export default filterByStatic
