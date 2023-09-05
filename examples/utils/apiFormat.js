import { keys } from 'lodash'

// 与后端约定的接口规范修改请求的方式
export const resourceConfig = ({ url, params }) => {
  return {
    url,
    method: 'post',
    data: params
  }
}

// 按与后端约定的接口规范进行接口请求数据格式化
export const transformRequest = ({ pageSize, pageIndex, sortBy, filterBy, filterFieldsObject, alwaysFilterBy = [] }) => {
  return {
    pageSize,
    pageIndex,
    sortBy: sortByArray(sortBy),
    filterBy: [
      ...filterByArray(filterBy, filterFieldsObject),
      ...alwaysFilterBy
    ]
  }
}

/**
 * @name sortByArray
 * @description 将sortBy数据格式化为Post接口需要的数组格式
 * @param {Object} sortBy 转换格式的数据
 */
export const sortByArray = (sortBy) => sortBy.map(sortByFormatItem)

// sortBy单个的数据格式化
const sortByFormatItem = ({ prop, order }) => ({ name: prop, sort: order })

/**
 * @name sortByFormat
 * @description 将sortBy数据格式化为Get接口需要的格式
 * @param {Object} sortBy 转换格式的数据
 */
export const sortByFormat = (sortBy) => sortByArray(sortBy).map(sortByToString).join(';')

// 将sortBy数据格式化成String形式
const sortByToString = ({ name, sort }) => `${name}|${sort}`

/**
 * @name filterByArray
 * @description 将filterBy数据格式化为Post接口需要的数组格式
 * @param {Object} filterValues 转换格式的数据
 * @param {Object} columnsList 所有检索字段的columns解释，必须设置column[key].form对象
 */
export const filterByArray = (filterValues, columnsList = {}) => {
  const filterKeys = keys(filterValues)
  return filterKeys.reduce((result, name) => {
    const columnFilter = columnsList[name].form
    const value = filterValues[name]
    if (value === '' || value === undefined || value === null || !columnFilter) return result
    return [...result, ...filterByFormatItem({ name, value, columnFilter })]
  }, [])
}

// filterBy单个的数据格式化
const filterByFormatItem = (props) => filterByFormatByTag[props.columnFilter.tag] ? filterByFormatByTag[props.columnFilter.tag](props) : filterByFormatByTag.default(props)

// filterBy单个的数据格式化,两个值切范围的情况
const filterByFormatByRange = ({ name, value }) => ([{
  name: name,
  type: 'ge',
  value: value[0]
}, {
  name: name,
  type: 'le',
  value: value[1]
}])

// filterBy单个的数据格式化,直接调用的情况
const filterByFormatByType = ({ name, value, type }) => ([{ name, type, value }])

// 根据和后端约定的数据格式进行处理
const filterByFormatByTag = {
  // filterBy搜索控件为timeRange
  timeRange: filterByFormatByRange,
  // filterBy搜索控件为numberRange
  numberRange: filterByFormatByRange,
  // filterBy搜索控件为date,判断是否为范围，是的话按range处理，不是的话按eq处理
  date: (props) => {
    return ['datetimerange', 'daterange', 'monthrange'].includes(props.columnFilter.dateType) ? filterByFormatByRange(props) : filterByFormatByType({ ...props, type: 'eq' })
  },
  // filterBy搜索控件为select,判断是否为多选，是的话按in处理，不是的话按eq处理
  select: (props) => {
    return props.columnFilter.multiple === true ? filterByFormatByType({ ...props, type: 'in' }) : filterByFormatByType(({ ...props, type: 'eq' }))
  },
  // filterBy搜索控件为其它的情况,判断是否有模糊搜索，是的话按like处理，不是的话按eq处理
  default: (props) => {
    return props.columnFilter.like === true ? filterByFormatByType(({ ...props, type: 'like' })) : filterByFormatByType(({ ...props, type: 'eq' }))
  }
}

/**
 * @name filterByFormat
 * @description 将filterBy数据格式化为Get接口需要的格式
 * @param {Object} filterValues 转换格式的数据
 * @param {Object} columnsList 所有检索字段的columns解释，必须设置column[key].form对象
 */
export const filterByFormat = (filterValues, columnsList = {}) => filterByArray(filterValues, columnsList).map(filterToString).join(';')

// 将filterBy数据格式化成String形式
const filterToString = ({ name, type, value }) => `${name}|${type}|${value}`
