// import InfoRenderFiles from './InfoRenderFiles'
import day from 'dayjs'
import { toFixed, thousandSplit } from 'packages/utils/cacular'
const isEmpty = (value) => {
  return value === null || value === undefined || value === ''
}

export default {
  // 值类型
  text: (value) => {
    return isEmpty(value) ? '--' : value
  },
  // 金钱类型
  money: (value) => {
    if (isEmpty(value)) return '¥ 0.00'
    return `¥ ${thousandSplit(toFixed(value))}`
  },
  // 单值匹配
  select: (value, field) => {
    if (value === null || value === undefined || value === '') return '--'
    const option = field.options ? field.options.find(opt => opt.value === value) : null
    return option ? option.label : value
  },
  // 多值匹配
  multiselect: (value, field) => {
    if (value === null || value === undefined) return '--'
    return value.map(data => {
      const item = field.options ? field.options.find(option => option.value === data) : null
      return item ? item.label : ''
    }).join(',')
  },
  /**
   * 时间类型
   */
  time: (value, field) => {
    return isEmpty(value) ? '--' : day(value).format(field.render.timeType || 'HH:mm:ss')
  // },
  // file: (value, field) => {
  //   return {
  //     tag: InfoRenderFiles,
  //     attrs: { images: value }
  //   }
  }
  /* 字符拼接 *
  * @padRender 字符串拼接在字符串前{start}或后{end}
  * @length    拼接长度
  * @charWith  使用拼接的字符串或数字
  *  */
  // padString: ({ data, column }) => {
  //   const { padRender = 'start', length = 0, charWith = '' } = column.render
  //   const padFunc = {
  //     'start': padStart,
  //     'end': padEnd
  //   }
  //   return padFunc[padRender](data, length, charWith)
  // }
  /**
   * 金钱符号拼接
   */
}
