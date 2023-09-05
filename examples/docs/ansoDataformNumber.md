## 数值输入框 AnsoDataformNumber

AnsoDataformNumber为 数值输入框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | String、 Number | ------ | ------ | ------ |
| triggerType | 按钮位置类型, 默认为normal显示图标，数字两端 | String | normal,none,stack | normal | 选填 |

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/input-number)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| placeholder | 输入框占位文本 | String | ------ | ------ | 选填 |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| step | 允许定义递增递减的步数控制 | Number | ------ | ------ | 选填 |
| size | 数值输入框尺寸 | String | medium、small、mini | ------ | 选填 |
| precision | 数值精度 | Number | ------ | ------ | 选填(precision 的值必须是一个非负整数，并且不能小于 step 的小数位数) |
| min/max | 允许最大最小值 | Number | ------ | ------ | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'number',
    // ...支持element常规属性配置
    placeholder: '请输入',
    disabled: true,
    step: 2,
    size: 'medium',
    precision: 1,
    min: 1,
    max: 10,
    // 组件提供传入属性
    triggerType: 'none'
  }
}
```

