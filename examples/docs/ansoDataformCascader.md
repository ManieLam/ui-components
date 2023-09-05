## 级联选择器 AnsoDataformCascader

AnsoDataformCascader为输入框，提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 |
| ------- | -------------- | ------ | ------ | ------ |
| options | 可选项数据源(数组对象) | Array | - | - |
| isPanel | 是否级联面板（与级联选择器一样，有单选、多选、动态加载等多种功能） | Boolean | - | false |
| value / v-model | 级联选择器的值 | Number, String, Array | - | - |
| props | 配置选项，具体见[el-cascader Props配置](https://element.eleme.cn/2.10/#/zh-CN/component/cascader#props) | Object | - | - |
| valueKey | 选择项值的key，也是这个级联组件的唯一标识 | String | - | value |
| parentKey | 父级值的key | String | - | parentId |
| multiple | 是否为多选类型的级联 | Boolean | - | false |
| remoteFunc | 加载动态数据的方法 | Function | 出参(node)，node为当前点击的节点数据 | ----- | 选填 |
| leaf | 判断动态加载子节点是否为最小节点的属性，需与 remoteFunc 方法结合使用 | String | ----- | 'isPetty' | 选填 |
| subtext | 自定义配置subtext内容 | String | 出参(data)，data为当前节点的数据内容 | ----- | 选填 |

options对象属性：

| 参数      | 说明                      | 类型          |
| --------- | ------------------------- | ------------- |
| value     | 选项值                    | String/Number |
| label     | 选项名                    | String        |
| disabled  | 当前选项是否禁用          | Boolean       |
| icon      | 选项图标                  | String        |
| iconAlign | 选项图标位置(left/right)  | String        |
| parentId  | 父组件id,如果已经是一级组件,可不传 | String/Number         |

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/2.10/#/zh-CN/component/cascader#cascader-attributes)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| clearable | 可清空 | Boolean | true、false | true | 选填 |
| showAllLevels | 输入框中是否显示选中值的完整路径（如果选择展示所有节点，输出的数据也会有整个选择的节点数据） | Boolean | true、false | true | 选填 |
| filterable | 是否可搜索选项 | Boolean | true、false | ------ | 选填 |
| filterMethod | 自定义搜索逻辑，第一个参数是节点node，第二个参数是搜索关键词keyword，通过返回布尔值表示是否命中 | Function | function(node, keyword) | ------ | 选填 |



props配置选项常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/2.10/#/zh-CN/component/cascader#props)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| expandTrigger | 次级菜单的展开方式 | String | 'click / hover' | 'click' | 选填 |
| checkStrictly | 单选选择任意一级选项 | Boolean | true、false | false | 选填 |


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'cascader',
    options: [
      { value: '1', label: '1', icon: 's-tools' },
      { value: '2', label: '2' },
      { value: '3', label: '3', disabled: true },
      { value: '4', label: '1.1', parentId: '1', icon: 's-ticket' },
      { value: '5', label: '1.2', parentId: '1', icon: 's-management', iconAlign: 'left' },
      { value: '6', label: '1.3', parentId: '1', icon: 's-open', iconAlign: 'right' },
      { value: '8', label: '2.2', parentId: '2' },
      { value: '9', label: '2.3', parentId: '2' },
      { value: '10', label: '3.1', parentId: '3' },
      { value: '11', label: '3.2', parentId: '3' },
    ],
    isPanel: true,
    multiple: true,
    valueKey: 'id',
    parentKey: 'fatherId',
    // ...支持element常规属性配置
    disabled: true,
    clearable: false,
    showAllLevels: false,
    filterable: true
    // ...props配置选项常用常规属性
    props: { 
      expandTrigger: 'hover',
      checkStrictly: true
    },
     remoteFunc: (data) => {
      /**
       * 出参为node，节点参数
       * 该配置需要先匹配获取level = 1（第一个阶段内容）的数据
       * 在根据点击，通过节点参数获取节点值value，接着获取加下来阶段的内容数据，回调数据
      */
      return new Promise((resolve, reject) => {
        if (!data) resolve([])
        else {
          /**
           * ansycoption，ansycoption1，ansycoption2具体数据请转看示例
          */
          const { node } = data
          if (node.level === 0) resolve(ansycoption)
          else if (node.level === 1 && node.value === '1') resolve(ansycoption1)
          else if (node.level === 1 && node.value === '2') resolve(ansycoption2)
          else resolve([])
        }
      })
    }
  }
}
```