## 穿梭框 AnsoDataformTransfer

AnsoDataformTransfer为穿梭框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 穿梭框选项的值 | Array | ------ | ------ | ------ |
| isPopup | 穿梭框是否弹窗展示 | Boolean | true, false | false | 选填 |
| dialogProps | 穿梭框配置弹窗展示后，弹窗信息配置 | Object | ------ | ------ | 配置参考以下dialogProps配置 |
| options | Transfer的数据源 | Array | ------ | ------ | 必填 |
| valuekey | 传入的value的key |  String | ------  | value | 选填 |
| labelkey | 传入的label的key |  String | ------  | label | 选填 |
| button | 自定义按钮, text, icon(icon支持组件库组件图标，也支持element的icon，配置element的Icon时需要写全icon名), direction(vertical and horizontal) | Object | ------  | { text: [], icon: ['el-icon-arrow-left', 'el-icon-arrow-right'], direction: 'vertical' } | 选填 |
| disabled | 支持传入option数据存在置灰选项，也同样支持传入disabled数组供于组件判断某选项置灰,优先级高于options | Array | ------ | ------ | 选填 |
| filterable | Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则 | Boolean, Function |  ------ | ------ | 选填 |

dialogProps配置属性如下
可配置element el-button常用常规属性【[el-button](https://element.eleme.cn/#/zh-CN/component/button)】，或el-dialog常用常规属性【[el-dialog](https://element.eleme.cn/#/zh-CN/component/dialog)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| type | 类型 | String | primary, success, warning, danger, info, text | ------ | ------ | 选填 |
| size | 尺寸 | string | medium, small, mini | ------ | ------ | 选填 |
| title | Dialog 的标题 | string | ------ | ------ | 选填 |

element常用常规属性如下： 穿梭框组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/transfer)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| filterPlaceholder | 搜索框占位符 | String | ------ | 请输入搜索内容 | 选填 |
| targetOrder | 右侧列表元素的排序策略：若为 original，则保持与数据源相同的顺序；若为 push，则新加入的元素排在最后；若为 unshift，则新加入的元素排在最前 | String | original, push, unshift | original | 选填 |
| format | 列表顶部勾选状态文案 | object | ------ | { noChecked: '${checked}/${total}', hasChecked: '${checked}/${total}' } | 选填 |
| 'left-default-checked' | 初始状态下左侧列表的已勾选项的 value 数组 | Array | ------  | ------ | 选填 |
| 'right-default-checked' | 初始状态下右侧列表的已勾选项的 value 数组 | Array | ------  | ------ | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'transfer',
    options: defaultOptions,
    disabled: ['1', '5', '3'],
    valuekey: 'key',
    labelkey: 'name',
    linkType: 'inside'，
    renderContent: (h, option) => {
      return <div class="header"><el-avatar size="small" src={option.img}></el-avatar><span>{option.label}</span></div>
    }
    titles: ['待选项', '已选项'],
    filterable: true, // 配置筛选框可检索，默认支持关键字，拼音检索
    // 自行配置检索条件，当前配置为检索选项key值
    filterable: (data) => {
      const { query, item } = data
      return item.key.indexOf(query) > -1
    },
    button: {
      text: ['往左', '往右'],
      icon: ['el-icon-d-arrow-left', 'el-icon-d-arrow-right'], // 配置element的icon
      icon: ['xiangzuofan', 'xiangyoufan'], // 配置组件库的icon
      direction: 'horizontal'
    }
  }
}
const disabledOptions = [{
  name: '北京',
  key: '0',
  img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  disabled: true
}, {
  name: '上海',
  key: '1',
  img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  disabled: true
}, {
  name: '汕头',
  img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  key: '2'
}, {
  name: '广州',
  img: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
  key: '3'
}]
```

