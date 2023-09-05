## 树形组件器 AnsoDataformTree

AnsoDataformTree为树形组件器
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 树形组件器选项的值 | Array, String, Number | ------ | ------ | ------ |
| showType | 树形选择器展示效果 select-下拉 panel-平铺 | String | select, panel | select | 选填 |
| options | 树形组件器的数据源 | Array | ------ | ------ | 必填 |
| valueKey | 选择项值的key，也是这个树的唯一标识 | String | - | value |
| parentKey | 父级值的key | String | - | parentId |
| multiple | 是否多选 | Boolean | true, false | true | 选填 |
| filterable | Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则 | Boolean, Function |  ------ | ------ | 选填 |
| remoteFunc | 加载动态数据的方法 | Function | 出参(node)，node为当前点击的节点数据 | ----- | 选填 |
| leaf | 判断动态加载子节点是否为最小节点的属性，需与 remoteFunc 方法结合使用 | String | ----- | 'isPetty' | 选填 |
| subtext | 自定义配置subtext内容 | String | 出参(data)，data为当前节点的数据内容 | ----- | 选填 |
| disabled | 支持传入置灰条件函数 | Function | 出参(node, options)，node为当前节点的数据内容, options为传入的所有数据内容 | ----- | 选填 |
| checkableWhenDisable | 全选，取消全选操作是否控制到禁用数据 | Boolean | true, false | false | 选填 |
| operateState | 全选/取消全选/展开所有/合并所有操作按钮的展示状态 | Object | ------ | {checkAll: false, unCheckAll: false, expandAll: false, unExpandAll: false} | 选填 |
| checkAllFunc |全选自定义方法 | Function | 出参(options)，options为传入的所有数据内容 | ----- | 选填 |
| unCheckAllFunc | 取消全选自定义方法 | Function | 出参(options)，options为传入的所有数据内容 | ----- | 选填 |
| showAllLevels | 是否显示选中值的完整路径值(如果选择展示所有节点，输出的数据也会有整个选择的节点数据) | Boolean | true, false | false | 选填 
| collapseTags | 多选时是否将选中值按文字的形式展示 | Boolean | true, false | true | 选填 

方法
| 方法名    | 说明           | 参数 |
| ------- | -------------- | ------ |
| currentChoose | 复选框被点击的时候触发，获取选择的节点参数 | node： 当前节点的信息，checkedNodes：整颗树已勾选的节点信息 |



element常用常规属性如下： 树形组件器组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/tree)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| emptyText | 内容为空的时候展示的文本 | String | ------ | 暂无数据 | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'tree',
    options: optionsSimpleoptions,
    multiple: false, // 单选
    showType: 'select', // 是否下拉框展示
    // 根据传入的options数据,变更为正确的valueKey, parentKey
    valueKey: 'id',
    parentKey: 'fatherId',
    filterable: true, // 配置筛选框可检索，默认支持关键字，拼音检索
    // 自行配置检索条件，当前配置为检索选项key值
    filterable: (data) => {
      const { query, item } = data
      return item.key.indexOf(query) > -1
    }
  }
}
const optionsSimpleoptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '1.1', parentId: '1' },
  { value: '5', label: '1.2', parentId: '1', disabled: true },
  { value: '6', label: '1.3', parentId: '1', disabled: true },
  { value: '7', label: '2.1', parentId: '2' },
  { value: '8', label: '2.2', parentId: '2' },
  { value: '9', label: '2.3', parentId: '2' },
  { value: '10', label: '3.1', parentId: '3' },
  { value: '11', label: '3.2', parentId: '3' },
  { value: '12', label: '3.3', parentId: '3' },
  { value: '13', label: '1.1.1', parentId: '4' },
  { value: '14', label: '1.1.2', parentId: '4' },
  { value: '15', label: '1.2.1', parentId: '5' },
  { value: '16', label: '1.3.1', parentId: '6' }
]
```

