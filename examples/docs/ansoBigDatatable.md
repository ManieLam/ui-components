## 大数据表格 AnsoBigDatatable
通过列配置和数据填充, 全量数据显示表格组件

[TOC]

### 基础示例需求
- [X] 基本表格
- [x] 无分页, 全量显示
- [x] 内置渲染
- [x] 自定义渲染表格
- [x] 表格为空时的提示
- [x] 列宽度设置

### 提供基础属性配置如下：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| height | 表格高度 | String, Number | ------ | '1' | 在父级容器不知道高度的情况下，表格无法计算高度，此时需要配置一个高度 |
| emptyText | 空数据时的提示 | String | ------ | 暂无数据 | 打开表格时默认的搜索条件 |
| hasHeader | 是否展示表格头部 | Boolean | ------ | true | ------ |
| showIndex | 是否展示序号列 | Boolean | ------ | false | ------ |
| indexColumnName | 序号列的列名 | String | ------ | 序号 | showIndex为true时有效 |
| rowClassName | 行的className的回调方法，也可以使用一个固定的Array为所有行设置一样的className | Function/Array | ------ | ------ | 为function时，回调参数为Function(row, rowIndex) |
| rowStyle | 行的style的回调方法，也可以使用一个固定的Object为所有行设置一样的Style | Function/Object | ------ | ------ | 为function时，回调参数为Function({row, rowIndex}) |
| cellClassName | 单元格的className的回调方法，也可以使用一个固定的String为所有单元格设置一样的className | Function/String | ------ | ------ | 为function时，回调参数为Function({row, column, rowIndex, columnIndex}) |
| cellStyle | 单元格的style的回调方法，也可以使用一个固定的Object为所有单元格设置一样的Style | Function/ Object | ------ | ------ | 为function时，回调参数为Function({row, column, rowIndex, columnIndex}) |


### 表格列配置如下：

对每个列的表头、数据关联、排序、渲染方式等进行配置

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| columns | 表格配置项 | Array | ------ | ------ | ------ |
| columns.label | 表头名称 | String  | ------ | ------ | ------ |
| columns.name | 列名，和data数据的key值对应 | String | ------ | ------ | ------ |
| columns.width | 对应的列宽度 | String | ------ | ------ | ------ |
| columns.align | 该列的对齐方式 | String | left/center/right | center | ------ |
| columns.headerAlign | 表头对齐方式，若不设置该项，则使用表格的对齐方式 | String | left/center/right | ------ | ------ |
| columns.className | 列的 className | String | ------ | ------ | ------ |
| columns.options | columns.render.type为select/multiselect时，渲染进行匹配的选项值 | Array | ------ | ------ | 搭配columns.render.type使用时，格式需为[{label: '', value: ''}] |
| columns.render | 渲染 | Function/Object | ------ | ------ | 当render为function时，按function自定义渲染，为object时，按object里的配置类型进行渲染。详见下文 |

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

### 表格事件：
el-table事件说明：[el-table事件说明](https://element.eleme.cn/#/zh-CN/component/table)

| 事件名称    | 说明           | 参数   |
| ------- | ----------- | ------ |
| rowClick | 行点击事件 | row, event |
| rowDblClick | 行双击事件 | row, event |
| rowMouseEnter | 行hover事件 | row, event |
| cellClick | 单元格点击事件 | row, column, cell, event |
| cellDblclick | 单元格双击事件 | row, column, cell, event |
| cellMouseEnter | 单元格hover事件 | row, column, cell, event |


### 表格方法：

| 事件名称    | 说明           | 接收参数   |
| ------- | ----------- | ------ |
| setHighRow | 单选表格-改变当前高亮行. key 指定匹配的字段, 默认为 id | row, key |

