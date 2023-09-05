import { randomString } from '@/views/Table/Other/randomData.js'

export function setRandomData (length) {
  const data = []
  for (let i = 0; i < length; i++) {
    const obj = {}
    obj.name = randomString(3)
    obj.num1 = Math.floor(Math.random() * 100)
    obj.num2 = Math.random().toFixed(2)
    obj.num3 = Math.floor(Math.random() * 100) + '元'
    data.push(obj)
  }
  return data
}

export const columns = [{
  name: 'name',
  label: 'Name'
}, {
  name: 'num1',
  label: '数值1'
}, {
  name: 'num2',
  label: '数值2'
}, {
  name: 'num3',
  label: '数值3'
}]
