## 单选框 AnsoDataformCheckbox

AnsoDataformCheckbox为多选框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | Array | ------ | ------ | ------ |
| options | 多选框组，以多个多选框（el-checkbox）配置为对象 | Array | ------ | ------ | 配置属性请查看：options属性配置，必填 |
| isVertical | 多选框组是否垂直显示 | Boolean | true、false | false | 选填 |
| isButton | 多选组合,按钮组方式呈现 | Boolean | true、false | false | 选填 |
| isBorder | 多选是否显示边框,如将多选框设置成按钮组isButton = true，则设置无效 | Boolean | true、false | false | 选填 |
| isSelectAll | 是否显示全选，需要配合func使用，给组件传入对应准确的value值 | Boolean | true、false | false | 选填 |
| func | 支持全选按钮点击后的回调，isSelectAll = true 有效 | Function | 出参为checkbox(组件所有属性)、data(组件值) | ------ | isSelectAll = true 必填 |
| disabled | 禁用整个多选组 | Boolean | true、false | false | 选填 |
| size | checkbox 的尺寸，仅在 isButton = true 或 isBorder = true 时有效，配置整个多选组格式大小 | String | medium、small、mini | ------ | 选填 |
| min/max | 使用 min 和 max 属性能够限制可以被勾选的项目的数量 | Number | ------ | ------ | 选填 |

options属性配置：[el-checkbox属性说明](https://element.eleme.cn/2.10/#/zh-CN/component/checkbox)
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| label | 选项的标签 | string，number | ------ | ------ |必填 |
| value | 选项值 | string，number | ------ | ------  | 必填 |
| disabled | 禁用某一选项 | Boolean | true、false | false | 选填 |
| size | checkbox 的尺寸，仅在 isButton = true 或 isBorder = true 时有效，配置某个单选项格式大小 | String | medium、small、mini | ------ | 选填 |


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'checkbox',
    // ...支持element常规属性配置
    placeholder: '请输入',
    disabled: true,
    size: 'mini' // checkbox组 的尺寸，仅在 isButton = true 时有效
    // 组件提供传入属性
    isVertical: true,
    options: [{
      label: '北京',
      value: '0',
      disabled: true, // 禁用某一选项
      size: 'mini' // 某个checkbox多选项的尺寸，仅在 isButton = true 时有效
    }, {
      label: '上海',
      value: '1'
    }, {
      label: '汕头',
      value: '2'
    }],
    isButton: true,
    isBorder: true, // 如将多选框设置成按钮组isButton = true，则设置无效
    // 配置显示全选按钮formValues为传入表单值
    isSelectAll: true,
    func: ({ funcProps }) => {
      const { checkbox } = funcProps
      this.formValues = checkbox.checkAll ? { isAll: ['0', '1', '2'] } : {}
    }
  }
}
```

