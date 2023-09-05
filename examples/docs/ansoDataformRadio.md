## 单选框 AnsoDataformRadio

AnsoDataformRadio为单选框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | String、 Number | ------ | ------ | ------ |
| options | 单选框组，以多个单选框（el-radio）配置为对象 | Array | ------ | ------ | 配置属性请查看：options属性配置，必填 |
| isVertical | 单选框组是否垂直显示 | Boolean | true、false | false | 选填 |
| isButton | 单选组合,按钮组方式呈现 | Boolean | true、false | false | 选填 |
| isBorder | 单选是否显示边框,如将单选框设置成按钮组isButton = true，则设置无效 | Boolean | true、false | false | 选填 |
| disabled | 禁用整个单选组 | Boolean | true、false | false | 选填 |
| size | Radio 的尺寸，仅在 isButton = true 或 isBorder = true 时有效，配置整个单选组格式大小 | String | medium、small、mini | ------ | 选填 |

options属性配置：[el-radio属性说明](https://element.eleme.cn/#/zh-CN/component/radio)
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| label | 选项的标签 | string，number | ------ | ------ |必填 |
| value | 选项值 | string，number | ------ | ------  | 必填 |
| disabled | 禁用某一选项 | Boolean | true、false | false | 选填 |
| size | Radio 的尺寸，仅在 isButton = true 或 isBorder = true 时有效，配置某个单选项格式大小 | String | medium、small、mini | ------ | 选填 |


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'radio',
    // ...支持element常规属性配置
    placeholder: '请输入',
    disabled: true,
    size: 'mini' // Radio组 的尺寸，仅在 isButton = true 时有效
    // 组件提供传入属性
    isVertical: true,
    options: [{
      label: '无',
      value: '0',
      disabled: true, // 禁用某一选项
      size: 'mini' // 某个Radio单选项的尺寸，仅在 isButton = true 时有效
    }, {
      label: '有',
      value: '1'
    }, {
      label: '还有',
      value: '2'
    }, {
      label: '没有还有',
      value: '3'
    }],
    isButton: true,
    isBorder: true, // 如将单选框设置成按钮组isButton = true，则设置无效
  }
}
```

