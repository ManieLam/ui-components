## 数值范围输入框 AnsoDataformNumRange

AnsoDataformNumRange为数值范围输入框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | Array | ------ | ------ | ------ |
| width | 支持输入框宽度配置 | String, Number | ------ | auto | 选填 |
| connect | 中间的链接符号 | String | ------ | '-' | 选填 |
| max | 数值范围输入框, 设置允许的最大值 | Number | ------ | ------ | 选填 |
| min | 数值范围输入框, 设置允许的最小值 | Number | ------ | ------ | 选填 |
| triggerType | 按钮位置类型, 默认为stack显示符号堆积再右侧 | String | normal,none,stack | stack | 选填 |

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/input-number)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| size | 范围输入框尺寸 | String | medium、small、mini | ------ | 选填 |


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'numberRange',
    // ...支持element常规属性配置
    disabled: true,
    size: 'medium',
    // 组件提供传入属性
    min: 1,
    max: 10,
    triggerType: 'stack',
    connect: '~'
  }
}
```