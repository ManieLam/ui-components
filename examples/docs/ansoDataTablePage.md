## 表格页面 AnsoDatatable
通过配置方式渲染整个表格组件，整个组件有表格列配置、过滤器配置、接口服务、排序、页码等进行配置
### 基础示例需求
- [X] 基本表格
- [x] 分页与排序
- [x] 默认排序
- [x] 多列排序
- [x] 列隐藏
- [x] 内置渲染
- [x] 自定义渲染表格
- [x] 表格为空时的提示
- [x] 列宽度设置
- [x] 点击表格内容跳转
- [x] 点击表格内容打开外部连接

### 提供基础属性配置如下：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| height | 表格高度 | String, Number | ------ | '1' | 在父级容器不知道高度的情况下，表格无法计算高度，此时需要配置一个高度 |
| isPassive | 是否不主动搜索 | Boolean | ------ | false |  |
| emptyText | 空数据时的提示 | String | ------ | 暂无数据 |  |
| notqueryText | 不主动搜索又无条件时文字提示 | String | ------ | 请先搜索内容 |  |
| defaultColumnList | 表格所有列 | Array | ------ | ------ | 接收的是列名数组[column.name, column.name]<br/>不配置时，则展示columns配置的所有列 |
| defaultFixedLeft | 表格默认左固定列 | Array | ------ | [] | 接收的是列名数组[column.name, column.name] |
| defaultFixedRight | 表格默认右固定列 | Array | ------ | [] | 接收的是列名数组[column.name, column.name] |
| defaultVisibleList | 表格默认展示列 | Array | ------ | ------ | 接收的是列名数组[column.name, column.name] |
| hasHeader | 是否展示表格头部 | Boolean | ------ | true | ------ |
| hasFooter | 是否展示表格底部 | Boolean | ------ | true | ------ |
| hasPage | 是否显示页码 | Boolean | ------ | true | ------ |
| pagerCount | 页码按钮的数量 | Number | ------ | 5 | 当总页数超过该值时会折叠，注意：只接收单数！！ |
| defaultpageIndex | 默认页码 | Number | ------ | 1 | 打开表格时默认的当前页码 |
| maxTableTotal | 表格数据承载最大数量 | Number | ------ | 100000 | ------ |
| pageSizes | 每页记录数选项 | Array | ------ | [30, 50, 100, 200, 500] | 每页显示个数选择器的选项设置 |
| defaultPageSize | 默认每页记录数 | Number | ------ | 30 | 打开表格时默认的显示个数，如果没有配置，初始pageSizes为第0个选项 |
| defaultSize | 默认表格行大小 | String | ------ | 'small' | large/medium/small/mini' |
| defaultSortBy | 默认排序 | Array | ------ | [] | 打开表格时默认的排序 |
| showIndex | 是否展示序号列 | Boolean | ------ | false | ------ |
| indexColumnName | 序号列的列名 | String | ------ | 序号 | showIndex为true时有效 |
| rowClassName | 行的className的回调方法，也可以使用一个固定的Array为所有行设置一样的className | Function/Array | ------ | ------ | 为function时，回调参数为Function(row, rowIndex) |
| rowStyle | 行的style的回调方法，也可以使用一个固定的Object为所有行设置一样的Style | Function/Object | ------ | ------ | 为function时，回调参数为Function({row, rowIndex}) |
| cellClassName | 单元格的className的回调方法，也可以使用一个固定的String为所有单元格设置一样的className | Function/String | ------ | ------ | 为function时，回调参数为Function({row, column, rowIndex, columnIndex}) |
| cellStyle | 单元格的style的回调方法，也可以使用一个固定的Object为所有单元格设置一样的Style | Function/ Object | ------ | ------ | 为function时，回调参数为Function({row, column, rowIndex, columnIndex}) |
| filterFields | 搜索栏的渲染设置 | Array | ------ | ------ | 参考AnsoDataForm的formFields |
| defaultFilterBy | 初始化搜索条件 | Object | ------ | {} | 打开表格时默认的搜索条件, 初始化时用 |
| alwaysFilterBy | 默认搜索条件 | Object\Array | ------ | --- | 表格默认一直存在的搜索条件,需要与transformRequest配合使用，服务器方式拿数据使用，直接传data的方式在传data前做数据过滤 |
| rowKey | 行数据的key, 开启单选、多选、树表格时必填 | String | ------ | 行数据的key, 开启单选、多选、树表格、展开行表格时必填 | ------ |
| isSelection | 多选表格开关 | Boolean | ------ | false | ------ |
| reserveSelection | 数据更新之后保留之前选中的数据开关 | Boolean | ------ | true | ------ |
| highlightClickRow | 当前选中行高亮开关 | Boolean | ------ | false | ------ |
| grayNonselectableRow | 变灰不可选择行 | Boolean | ------ | false | 单选模式下，需配合selectable使用 |
| selectable | 对多选表格、单选表格的行有效，类型为 Function，Function 的返回值用来决定这一行是否可以选中 | Function(row, index) | ------ | ------ | ------ |
| isTree | 是否为树表格 | Boolean | ------ | false | 表格数据为一维数据，未嵌套children数据时，须设置为true才会渲染成树表格 |
| childrenKey | 存储子级数据的字段key名 | String | ------ | children | ------ |
| parentKey | 存储父级唯一值的key名 | String | ------ | parentId | ------ |
| hasChildrenKey | 懒加载模式时，判断当前行是否存在子级数据的字段key名 | String | ------ | hasChildren | ------ |
| lazy | 是否开启懒加载模式 | Boolean | ------ | false | 开启懒加载模式时，lazyResource必填 |
| isExpand | 是否开启行扩展 | Boolean | ------ | false | ------ |
| expandAll | 是否默认展开所有行 | Boolean | ------ | false | 只对展开行表格、树表格有效 |
| defaultExpandRowKeys | 默认展开行的keys数组，用于设置默认的展开行 | Array | ------ | [] | 需要配置了row-key、且不默认展开所有行才能使用 |
| expandRowKeys | 展开行的keys数组，用于设置目前的展开行 | Array | ------ | [] |  需要配置了row-key才能使用 |
| toolbarButtonList | 工具栏按钮组 | Array | ------ | [] | 参考AnsoButtonGroup |
| settingButtonList | 设置栏按钮组 | Array | ------ | ['refresh', 'download', 'lineHeightSetter', 'columnFilter'] | 参考AnsoButtonGroup |
| preventDownloadFunc | 非必填，自定义阻止下载的方法  | function | -      | -      | 参数为整个表格数据，返回boolean，true为阻止。<br />在使用表格内置的下载的情况下，该配置有效。 |
| operateButtonList | 操作栏按钮组 | Array | ------ | [] | 参考AnsoButtonGroup |
| operationWidth | 操作栏宽度 | String | ------ | 150 | ------ |
| border | 表格是否带有纵向边框 | Boolean | ------ | true | ------ |
| operateBorder | 表格操作按钮间是否带有纵向边框 | Boolean | ------ | true | ------ |
| keyName | 用于显示配置固定id属性，非必填，当传空时，会采用特定规则生成id，影响范围整个表格内元素（除表头、列外）           | String | -          |       |

### 表格按钮组配置补充说明：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| disabled | 按钮是否可用 | Boolean/Function | ------ | ------ | ------ |
| showabled | 按钮是否显示 | Boolean/Function | ------ | ------ | ------ |
| func | 按钮执行回调操作 | Function | ------ | ------ | ------ |
以上配置的回调参数说明如下：
```js
// 工具栏
toolbarButtonList: [{
  label: '新增',
  name: 'add',
  type: 'primary',
  icon: 'jia',
  disabled: () => {
  },
  showabled: () => {
  },
  func: (button) => {
    // `button: 当前按钮配置`
  }],
// 设置栏
// 已内置了'refresh'（刷新）, 'download'（下载）, 'lineHeightSetter'（行高设置）, 'columnFilter'（列设置），配置时直接传入即可
settingButtonList: [{
  name: 'refresh',
  type: 'text',
  textType: 'info',
  icon: 'shuaxin',
  tooltip: {
    content: '刷新',
    placement: 'top'
  },
  disabled: () => {
  },
  showabled: () => {
  },
  func: (button) => {
    // `button: 当前按钮配置`
  }]
// 操作栏
operateButtonList: [{
  label: '编辑',
  name: 'edit',
  type: 'text',
  textType: 'primary',
  disabled: (row) => {
    // `row: 当前行数据`
  },
  showabled: (button) => {
    // `row: 当前行数据`
  },
  func: (button, row) => {
    // `button: 当前按钮配置`, `row: 当前行数据`
  }]
```
### 数据请求配置如下：

只支持get，后期考虑支持所有请求模式

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| data | 表格数据 | Array | ------ | ------ | 在无配置resource的情况下，使用data作为表格数据<br />（注意：若要改变data内的数据，须使用$set才会触发表格数据变化） |
| resource | 数据接口 | String | ------ | ------ | resource或data填一个就好，如果都填，data会被resource的数据覆盖 |
| serverSide | 是否服务端分页 | Boolean | ------ | ------ | ------ |
| resourceConfig | 接口配置信息重新定义 | Function | ------ | 见下文 | 更改接口配置信息 |
| transformRequest | 数据接口请求 | Function | ------ | 见下文 | 更改请求数据格式，参数为待请求数据，return回最终请求的数据格式 |
| transformResponse | 数据接口响应 | Function | ------ | 见下文 | 更改接口数据返回格式，参数为接口返回数据，return回表格要求的数据格式 |
| errorResponse | 接口异常处理 | Function | ------ | 见下文 | 接收接口异常信息，并处理异常 |
| lazyResource | 树状表格-懒加载模式时的接口 | String | ------ | ------ | 开启懒加载模式时必填 |
| treeResourceConfig | 树状表格-懒加载接口配置信息重新定义 | Function | ------ | ------ | 更改接口配置信息，参数为url、row（当前行数据） |
| transformLazyTreeResponse | 树状表格-懒加载数据接口响应 | Function | ------ | ------ | 更改接口数据返回格式，参数为接口返回数据，return回表格要求的数据格式 |
| ajax | 数据接口 | Promise | ------ | ------ | 整个数据接口以promise方式输入，代替resource、resourceRequest、resourceResponse，支持非GET的其它请求（待开发） |

默认接口配置信息如下，如果服务端接口有差别，使用resourceConfig格式化：
```
// 回调参数url：resource配置的数据接口
// 回调参数params：经过transformRequest格式化后的请求参数
resourceConfig: ({ url, params }) => ({
  url,
  method: 'get',
  params
})
```

默认接口响应格式如下，如果服务端接口有差别，使用transformResponse格式化：
```
// 回调参数res：接口请求完成后返回的数据
transformResponse: res => res
```

默认接口异常处理如下，如需要捕获到异常后做别的处理，使用errorResponse：
```
// 回调参数err：接口异常信息
errorResponse: err => err

// 例如捕获到异常后，需要消息窗口提示：
errorResponse: (err) => {
  console.log(err)
  this.$message({
    showClose: true,
    message: '网络连接异常，请检查接口连接',
    type: 'error',
    duration: 0
  })
}
```

树状表格-懒加载模式-默认接口响应格式如下，可使用treeResourceConfig格式化：
```
// 回调参数url：lazyResource配置的数据接口
// 回调参数row：当前行数据
treeResourceConfig: ({ url, row }) => ({
  url,
  method: 'get'
})
```

树状表格-懒加载模式-默认接口响应格式如下，如果服务端接口有差别，使用transformLazyTreeResponse格式化：
```
// 回调参数res：接口请求完成后返回的数据
transformLazyTreeResponse: res => res
```
### 下载请求配置如下：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| isDefaultExport |  默认不导出 | Boolean | ------ | false | 需要和exportResource配合使用,请求导出表格数据 |
| exportResource | 导出数据接口 | String | ------ | ------ | 需要和isDefaultExport配合使用,请求导出表格数据 |
| exportFileName | 导出文件名称 | String, Number | ------ | ------ | 输出导出文件名称 |
| exportResourceConfig | 导出接口配置信息重新定义 | Function | ------ | 见下文 | 更改接口配置信息 |
| transExportRequest | 导出数据接口请求参数配置 | Function | ------ | 见下文 | 更改请求数据格式，参数为待请求数据，return回最终请求的数据格式 |
| errorExportResponse | 导出接口异常处理 | Function | ------ | 见下文 | 接收接口异常信息，并处理异常 |

默认导出接口配置信息如下，如果服务端接口有差别，使用exportResourceConfig格式化：
```
// 回调参数url：resource配置的数据接口
// 回调参数params：经过transExportRequest格式化后的请求参数
exportResourceConfig: ({ url, params }) => ({
  url,
  method: 'get',
  params
})
```

默认接口响应格式如下，如果服务端接口有差别，使用transExportRequest格式化：
```
// 回调参数res：接口请求完成后返回的数据
transExportRequest: res => res
```

默认接口异常处理如下，如需要捕获到异常后做别的处理，使用errorExportResponse：
```
// 回调参数err：接口异常信息
errorExportResponse: err => err

```

### 表格列配置如下：

对每个列的表头、数据关联、排序、渲染方式等进行配置

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| columns | 表格配置项 | Array | ------ | ------ | ------ |
| columns.label | 表头名称 | String  | ------ | ------ | ------ |
| columns.name | 列名，和data数据的key值对应 | String | ------ | ------ | ------ |
| columns.width | 对应的列宽度 | String | ------ | ------ | ------ |
| columns.sortable | 是否排序 | Boolean | ------ | false | ------ |
| columns.align | 该列的对齐方式 | String | left/center/right | center | ------ |
| columns.headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | ------ | ------ |
| columns.className | 列的 className | String | ------ | ------ | ------ |
| columns.labelClassName | 当前列标题的自定义类名 | String | ------ | ------ | ------ |
| columns.options | columns.render.type为select/multiselect时，渲染进行匹配的选项值 | Array | ------ | ------ | 搭配columns.render.type使用时，格式需为[{label: '', value: ''}] |
| columns.render | 渲染 | Function/Object | ------ | ------ | 当render为function时，按function自定义渲染，为object时，按object里的配置类型进行渲染。详见下文 |
| html | 将render返回的内容作为html进行渲染 | Boolean | ------ | ------ | 当render为function且返回了html标签内容时有效 |
| columns.renderHeader | 列标题 Label 区域渲染使用的 Function | Function(h, { column, $index }) | ------ | ------ | h相当于createElement函数 |
| columns.innerColumns | 多级表头配置项 | Array | ------ | ------ | 配置内容与columns一致 |

columns.render配置说明

> <span style="color: red">v0.5.0+版本取消内置的file、link、icon，这3种选项, 相关属性失效</span>

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| type | 渲染类型 | String | text/money/select/multiselect<br/>/time/file/link/icon | ------ | 当render为object时有效，按object里的配置类型进行渲染；select/multiselect需搭配columns.options使用 |
| timeType | 需要渲染的时间格式 | String | HH:mm:ss | ------ | type为time时有效 |
| fit | 设置图片如何适应容器框 | String | fill/contain/cover<br/>/noneimage/scale-down | contain | type为file时有效 |
| imageStyle | 设置图片的样式 | Object | ------ | { height: '105px', width: '105px' } | type为file时有效 |
| showType | 展示类型 | String | image/attachText | image | type为file时有效 |
| showResource | 图片资源地址 | String | ------ | 全局入口配置默认'/system/file/download/shortUrl' | type为file时有效 |
| href | 跳转链接地址 | String | ------ | ------ | 原生href属性，type为link时有效 |
| target | 跳转打开方式 | String | _blank/_self/_parent<br/>/_top/"指定的frame框架name" | _blank | 原生target属性，type为link时有效 |
| underline | 是否下划线 | Boolean | ------ | false | type为link时有效 |
| disabled | 是否禁用 | Boolean | ------ | false | type为link时有效 |
| (value, field, data) | 当render为function时的回调参数 | ------ | ------ | ------ | ------ |

```js
columns: [
  {
    name: 'columnKey',
    label: 'columnName',
    render: (value, field, data) => {
      /**
       * value：当前单元格的值
       * field：当前列字段配置
       * data：当前行数据
      */
      return '自定义渲染' + value
    }
  },
  {
    name: 'columnKey1',
    label: 'columnName1',
    options: [{
      label: 'options1',
      value: 0
    }, {
      label: 'options2',
      value: 1
    }],
    render: {
      type: 'select'
    }
  }
]
```
### 表格过滤器配置如下：

表格过滤器的渲染设置

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| filterFields | 表格过滤器配置项 | Array | ------ | ------ | ------ |
| filterFields.label | 过滤器名称 | String  | ------ | ------ | ------ |
| filterFields.name | 过滤器名称，和表格每列配置项的key值对应 | String | ------ | ------ | ------ |
| filterFields.width | 对应的过滤器宽度 | String | ------ | ------ | ------ |
| filterFields.form | 过滤器需要使用的相关表单组件配置 | Object | ------ | ------ | 相关配置请查看各个数据录入的表单子组件内容进行配置 |
| columns.form.filterType | 过滤类型 | String | eq, like, in, dates, range | eq | ------ |

过滤器类型说明
| 类型    | 说明           |
| ------- | ----------- |
| eq | 等于 |
| like | 类似 |
| in | 包含 |
| dates | 日期时间 |
| range | 范围选择器控制范围 |
### 表格事件：
el-table事件说明：[el-table事件说明](https://element.eleme.cn/#/zh-CN/component/table)

| 事件名称    | 说明           | 参数   |
| ------- | ----------- | ------ |
| selectAll | 表格全选事件 | rows |
| selectRow | 当用户手动勾选数据行的 Checkbox 时触发的事件 | rows, row |
| selectionChange | 当选择项发生变化时会触发该事件 | rows |
| addSelect | 点击勾选时触发该事件 | rows, row, index |
| removeSelect | 取消勾选时触发该事件 | rows, row |
| rowClick | 行点击事件 | row, column, event |
| rowDblClick | 行双击事件 | row, column, event |
| currentChange | 表格的当前行发生变化的时候会触发该事件 | curRow, oldRow |
| changeFilterBy | 点击表格搜索栏的查询按钮时，触发该事件 | filterBy（当前搜索值） |
| resetFilterBy | 点击表格搜索栏的重置按钮时，触发该事件 | filterBy（如果表格有传入alwaysFilterBy，则出alwaysFilterBy，没有则出{}） |
| expandChange | 点击展开/关闭某一行、调用toggleRowExpansion时触发该事件<br/>（为展开行表格时，回调的第二个参数为 expandedRows；为树形表格时第二参数为 expanded） | row, (expandedRows | expanded) |
| getData | 表格加载完的输出数据 | result = { total, tableData } |
| exportAfter | 表格导出完的输出数据 | res 返回数据 |


### 表格方法：

| 事件名称    | 说明           | 接收参数   |
| ------- | ----------- | ------ |
| setCurrentRow | 单选表格-改变当前选中状态 | row |
| toggleRowSelection | 多选表格-改变数据选中状态 Checkbox 时触发的事件 | rows, selected |
| clearSelection | 多选表格-清空所有已选中数据 | ------ |
| reRenderTableData | 刷新表格数据 | ------ |
| toggleRowExpansion | 展开行表格-改变展开状态，第一个参数接收Array，第二个参数接收Boolean | rows, expanded |

### 表格slot:

> <span style="color: red">v0.5.0+版本规范slot命名规则，采用"<模块名>-<块名>"的格式，取消驼峰命名规则，涉及修改为：filterInfo、toolbarDivider、colExpand</span>

| slot名 | 说明 |
| ------- | ----------- |
| header | 插入至表格头部，替换掉整个搜索块的内容 |
| filter | 插入至表格头部内，替换整个搜索表单 |
| prep | 插入至表体头部，替换搜索结果、工具栏、设置栏 |
| prep-header | 插入prep之前 |
| prep-footer | 插入prep之后 |
| filterInfo | 插入至表体头部内，替换搜索结果（<span style="color: red">v0.5.0+ 更改为 filter-info </span>） |
| toolbar | 插入至表体头部内，替换工具栏 |
| toolbarDivider | 插入至表体头部内，替换工具栏与设置栏的分割线（<span style="color: red">v0.5.0+ 更改为 toolbar-divider</span>） |
| setting | 插入至表体头部内，替换设置栏 |
| left | 插入至表格最左列（若是多选表格，则插入至表格勾选列后） |
| column-[:name] | 列具体内容的渲染，[:name]为具体字段名,scope里包含（column:字段信息，value:当前值，row:当前行的所有值） |
| column-[:name]-header | 列头部的自定义编辑，[:name]为具体字段名,scope里包含（column:字段信息） |
| operate | 插入至操作列表头，替换操作列表头内容 |
| right | 插入至表格最右列 |
| footer | 插入至表格底部，替换整个表格底部内容 |
| info | 插入至表格底部内左侧内容 |
| pagination | 插入至表格底部内，替换分页器 |
| colExpand | 行扩展内容插槽（isExpand为true时生效）（<span style="color: red">v0.5.0+ 更改为col-expand </span>） |
| filter-header | 搜索栏上 |
| filter-left | 搜索栏左 |
| filter-right | 搜索栏右 |
| filter-footer | 搜索栏下 |
| filter-info-left | 筛选栏左 |
| filter-info-right | 筛选栏右 |
| toolbar-left | 工具栏左 |
| toolbar-right | 工具栏右 |

### 问题集
问： 如果需要嵌套一层父级元素，导致表格出现无限放大 ?  
父级元素样式配置 height: 100%  
示例：  
.anso-table(:style="{height: 100%}")  
&emsp;&emsp;AnsoDatatable()