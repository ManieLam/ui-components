## 字符串范围输入框 AnsoDataformTextRange

AnsoDataformTextRange为字符串范围输入框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | Array | ------ | ------ | ------ |
| width | 支持输入框宽度配置 | String, Number | ------ | auto | 选填 |
| connect | 中间的链接符号 | String | ------ | '-' | 选填 |


element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/input)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| size | 范围输入框尺寸 | String | medium、small、mini | ------ | 选填 |


基础配置说明：
```js
// 表单使用
form: {
  // 用于表单判断输出类型, 必传
  tag: 'textRange',
  // ...支持element常规属性配置
  disabled: true,
  size: 'medium',
  // 组件提供传入属性
  connect: '~'
}
// 单组件使用
AnsoDataformTextRange(v-model="ranges") // ranges值需要传入数组
```