## 输入框 AnsoDataformInput

建议：
属性中已经实现较为基础的带slot的配置，还有其它无法直接配置使用文档中表示带slot的实现：如带输入建议；下拉框复合型输入框等已提供了相对应的slot插槽；

AnsoDataformInput为输入框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 输入框值 | String、 Number | ------ | ------ | ------ |
| inputType | 当默认为输入框时不需要配置，当需要启用到文本框时可配置为textarea | String | text、textarea | text | 选填 |
| affixes  | 基础的前后缀，复合型输入框 | Object | { type: 'prepend', content: 'http://' } | {} | 对象里的type值可以为（prepend/append)，选填 <span style="color: red"> [废弃],请使用prepend/append属性</span>  |
| icon  | 配置显示图标 | String | ------ | ------ | 选填 <span style="color: red"> [废弃],请使用prepend/append属性</span>  |
| iconAlign  | 支持配置图标显示位置 |  String | ------ | 'left' | 选填 <span style="color: red"> [废弃],请使用prepend/append属性</span>  |
| prepend | 前缀，支持string、icon | Object | { type = 'string/icon', content = '文本/icon' } |  | 选填 |
| append | 后缀，支持string、icon | Object | { type = 'string/icon', content = '文本/icon' } |  | 选填 |
| password | 配置为密码框显示 | Boolean | true、false | false | 选填 |
| clearable | 是否可以清空选项 | Boolean | true、false | true | 选填 |

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/input)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| placeholder | 输入框占位文本 | String | ------ | ------ | 选填 |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| size | 输入框尺寸，只在 inputType!="textarea" 时有效 | String | medium、small、mini | ------ | 选填 |
| autosize | 自适应内容高度，只对 inputType="textarea" 有效，可传入对象，如，{ minRows: 2, maxRows: 6 } | Object、 Boolean | ------ | false | 选填 |
| maxlength/minlength | 原生属性，最大/最小输入长度 | Number | ------ | ------ | 选填 |
| 'show-word-limit' | 是否显示输入字数统计 | Boolean | true、false | false | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'input',
    // ...支持element常规属性配置
    placeholder: '请输入',
    disabled: true,
    size: 'medium',
    maxlength: 10,
    'show-word-limit': true,
    // 组件提供传入属性
    inputType: 'textarea',
    autosize: true,
    affixes: {
      type: 'prepend',
      content: 'http://'
    },
    /** icon的配置，例子如下
      * 可直接配置图标，则默认显示在输入框起始位
      * 可配置iconAlign，则按照配置位置显示
    */
    icon: 'date',
    iconAlign: 'right'
    password: true
  }
}
```

