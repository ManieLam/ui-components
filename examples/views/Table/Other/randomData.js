
import moment from 'moment'
/**
 * @description 简略的表格数据随机生成
 */

export const randomDate = (startDate, endDate) => {
  const date = new Date(+startDate + Math.random() * (endDate - startDate))
  const hour = 0 + Math.random() * (23 - 0) | 0
  const minute = 0 + Math.random() * (59 - 0) | 0
  const second = 0 + Math.random() * (59 - 0) | 0
  date.setHours(hour)
  date.setMinutes(minute)
  date.setSeconds(second)
  return date
}

export function random (min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

export function randomString (n) {
  const str = 'abcdefghijklmnopqrstuvwxyz9876543210'
  const fStr = 'ABCDEFGHIJKLMNOPQRSTUPWSYZ'
  let tmp = ''
  const l = str.length
  Array.from({ length: n }).forEach(() => {
    tmp += str.charAt(Math.floor(Math.random() * l))
  })
  // 异味代码：Review this useless assignment: "i" already holds the assigned value along all execution paths
  // for (let i = 0; i < n; i++) {
  //   tmp += str.charAt(Math.floor(Math.random() * l))
  // }
  // console.log('tmp:', tmp)
  tmp = fStr.charAt(Math.floor(Math.random() * l)) + tmp
  return tmp
}

export function randomTableData (num = 20) {
  console.log(num)
  const arr = []
  for (let index = 0; index < num; index++) {
    const startDate = moment().year(moment().year() - 5).startOf('year').toDate()
    const endDate = moment().endOf('year').toDate()
    arr.push({
      id: index + 1,
      name: randomString(5),
      value: index + random(1, 100),
      position: randomString(20),
      office: randomString(10),
      age: random(1, 80),
      startDate: moment(randomDate(startDate, endDate)).valueOf(),
      salary: `${random(0, 1000)}.${random(0, 100)}`
    })
  }
  console.log(arr.length)
  return arr
}
