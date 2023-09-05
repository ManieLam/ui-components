## 超链接 AnsoLink

AnsoLink为超链接
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| data | 所有对象值，用于使用表格时传入行值，使用表单时传入整个表单值 | Object | ------ | ------ | ------ |
| value | 超链接文本值 | String、 Number | ------ | ------ | ------ |
| linkLabel | 超链接自定义文本 | String、Number、Function | 传入类型为Function时，出参(value, data) | 不传则默认显示value | 选填   |
| linkShowType | 超链接展示类型 | String | primary / success / warning / danger / info | primary | 选填   |
| url | 超链接跳转链接 | String | ------ | ------ | 必填 |
| openType | 超链接打开的方式，传入current: 在当前页面刷新跳转, new：新标签页面打开| String | current, new | new | 选填 |
| showType | 超链接展示形式，支持图片image，文本text，按钮button形式 |  String | image, text, button  | text | 选填 |
| linkType | 超链接类型，支持内部链接inside，单页面锚点链接anchor, 外部链接outside | String | inside, anchor, outside | outside | 选填 |
| disabled | 超链接禁用 | Boolean | true, false | false | 选填 |
| icon | 图标类名 | String |  ------ | ------ | 选填 |
| iconAlign |  图标位置，默认显示left, 需要icon传参类型为String才有效 | String | left，right | ------  | 选填 |
| func |  提供超链接点击后的自定义操作方法，出参value: 当前值, data:所有值 | Function, Boolean | false | ------  | 选填 |

element常用常规属性如下： 文本式超链接组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/link)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| type | 类型 | String | primary, success, warning, danger, info | ------ | 选填 |
| underline | 是否下划线 | Boolean | true、false | false | 设计师要求：在全局中，全部的文字按钮和超链接均取消下划线 |

element常用常规属性如下： 按钮式超链接组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/button)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| type | 类型 | String | primary, success, warning, danger, info, text | ------ | 选填 |

element常用常规属性如下： 图片式超链接组件属性【[常规属性及方法](hhttps://element.eleme.cn/#/zh-CN/component/image)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| src | 图片源，同原生 | String | ------ | ------ | showType配置为image，必填 |


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'link',
    url: '/#/usual/button/simple',
    disabled: true,
    underline: false,
    linkType: 'inside'
    openType: 'current',
    showType: 'button',
    type: 'warning', // 适用在文本式超链接和按钮式超链接
    // 如果配置为图片超链接，则src必填
    src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
    showType: 'image',
    /** icon的配置，例子如下
      * 可直接配置图标，则默认显示在超链接起始位
      * 可配置iconAlign，则按照配置位置显示
    */
    icon: 'gerenxinxi-yijianfankui',
    iconAlign: 'right'
  }
}
```

