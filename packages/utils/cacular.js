/**
 *  转换小数点后两位，解决二进制精度问题
 * @params num 转换的float、double、int
 * @params n 转换的小数点位数，默认2位
 *  */
export const toFixed = (num, n = 2) => {
  if (num === null || num === undefined || isNaN(num)) return '-'
  let symbol = 1
  if (num < 0) {
    // 符号为负
    symbol = -1
    num *= -1
  }
  const num2 = (Math.round(num * Math.pow(10, n)) / Math.pow(10, n) + Math.pow(10, -(n + 1))).toString().slice(0, -1)
  return parseFloat(num2 * symbol).toFixed(n)
}

/**
 * 每三位数字加逗号，如123456789 => 123,456,789
 * @params num 转换的数字
 *  */
export const thousandSplit = (num) => {
  if (isNaN(num)) throw new Error('thousandSplit的参数为非数字')
  let result = ''
  let counter = 0
  const NUMSTRARR = (num || 0).toString().match(/\d+/g)
  const DEMICAL = NUMSTRARR[1] ? `.${NUMSTRARR[1]}` : '' // 保留小数位
  const INTEGER = NUMSTRARR[0]
  for (let i = INTEGER.length - 1; i >= 0; i--) {
    counter++
    result = INTEGER.charAt(i) + result
    if (!(counter % 3) && i !== 0) {
      result = `,${result}`
    }
  }
  return `${num < 0 ? '-' : ''}${result}${DEMICAL}`
}

export default {
  toFixed,
  thousandSplit
}
