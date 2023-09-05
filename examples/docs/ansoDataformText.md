## 纯文本 AnsoDataformText

AnsoDataformText为纯文本
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 表单控件的值 | Boolean， String, Number, Object, Array, Set | ------ | ------ | 必填 |
| data | 整个表单值 | Object | ------ | ------ | 选填 |
| field | 渲染控件字段配置,field中配合render使用（render的使用请查看AnsoInfoRender组件render配置） | Object | ------ | ------ | 必填 |
| icon | 图标展示以及图标类名 | String |  ------ | ------ | 选填 |
| textStyle | 传入内容样式 | Object |  ------ | ------ | 选填 |
| tooltip | 提示性内容 | Object | tooltip常用常规属性如下 | ------ | 选填 |
| func | 支持内容点击后传出参数，以便后续操作 | Function |  出参值有：text(组件所有属性)、data(传入表单内所有值)，value(当前控件值)，field(渲染控件字段配置) | ------ | 选填 |

tooltip常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/tooltip)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| effect | 默认提供的主题 | String	| dark/light | dark | 选填 |
| content | 传入内容 | String | ------ | ------ | 必填 |
| placement | Tooltip 的出现位置 | String | top/top-start/top-end/bottom/bottom-start/bottom-end/left/left-start/left-end/right/right-start/right-end | top | 选填 |
| enterable | 鼠标是否可进入到 tooltip 中 | Boolean | true\false | true | 必填 |

```

基础配置说明：
```js
field: [{
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'text',
    icon: 'date',
    textStyle: {
      color: 'red',
      'text-decoration': 'underline'
    },
    func: ({ funcProps }) => {
      window.location.href = 'http://www.baidu.com'
    },
    tooltip: {
      content: '点击跳转至百度'
    }
  }，
  render: { type: 'text' }
}]
```

