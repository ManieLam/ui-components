

## AnsoDataformGroup 分组表单

### 需求

对表单内的字段元素做分组，同时支持AnsoDataform提供的属性和事件。

1. 简单分组，即设计稿默认表单形式，

2. 可配置分组标题，不配置标题则不显示

3. 可配置展开收缩分组

4. 分组的多种展示形式：

   默认：即设计稿默认的表单形式
   简约：标题显示在边框上，不可收缩展开
   块式：以元素块的形式展示分组

5. 表单联动：字段间联动、组间联动

### API

#### AnsoDataformGroup Attributes

除以下属性之外，其他AnsoDataform属性皆支持。

| 参数       | 说明                                                         | 类型          | 可选值                 | 默认值  |
| ---------- | ------------------------------------------------------------ | ------------- | ---------------------- | ------- |
| groupSplit | 【必填】对字段的分组说明，为二维数组形式[[],  [], .... , []]。 | array[array]  | -                      |         |
| groupTitle | 组名标题（默认可收缩展开）                                   | array[string] | -                      |         |
| groupType | 如果传入格式为字符串,则整个分组为统一表单布局类型。 <br />如果传入格式为数组,则各组采用对应的表单布局类型 | String,array | row/grid/default | row |
| value      | 【必填】表单数据对象                                         | object        | -                      | -       |
| formFields | 【必填】表单字段属性配置，见下文属性说明                     | array         | -                      | -       |
| buttonList | 【必填】表单操作按钮组，位于表单最底部位置,见下文属性说明    | array         |                        |         |
| buttonFixed | 操作按钮组是否固定到页面底部（设计稿分组表单默认固定底部） | boolean | false/true | true |
| styleType     | 块式/边框简约式显示分组                                | string        | default，block，border | default |
| *labelPosition* | 文本位置 | string | left/right/top | top |
| keyName | 用于显示配置固定id属性，非必填，当传空时，会采用特定规则生成id，影响范围整个表单组内元素           | String | -          |       |

##### groupType=grid,网格布局表单属性

| 参数             | 说明                                                         | 类型    | 可选值     | 默认值 |
| ---------------- | ------------------------------------------------------------ | ------- | ---------- | ------ |
| gridspanNum      | 默认表示表单列数（在type=row/grid生效），gridFlow=column时候，表示行数；gridFlow=row时，表示列数 | number  | [1-24]     | 2      |
| gridFlow         | 字段排列的流向属性                                           | string  | column/row | row    |
| border           | 是否设置边框                                                 | boolean |            | true   |
| inlineGrid(废弃) | 是否为内联形式，在网格布局中，inlineGrid=false，则为二维表格形式(废弃，网格布局默认为inlineGrid) | boolean | -          | true   |

##### groupType=row ,栅格式布局表单属性

| 参数        | 说明                                                         | 类型    | 可选值 | 默认值 |
| ----------- | ------------------------------------------------------------ | ------- | ------ | ------ |
| maxRow      | 设置最大行，当表单超过当前设置的最大行，会自动可提供收缩展开 | number  | -      | -      |
| colspanNum  | 表单需要的列数，默认为1列                                    | number  | [1-24] | 1      |
| collapsable | 是否允许展开收缩，需同时设置maxRow属性生效                   | boolean |        | false  |

#### AnsoDataformGroup Events

| 方法 | 说明 | 返回值 |
| ---- | ---- | ------ |
|      |      |        |

### buttonList Attributes

> 详细可查看AnsoButtonGroup组件说明

| 属性     | 说明     | 类型   | 默认值 |可选值 |
| -------- | -------- | ------ | ------ | -------- |
| label    | 按钮文本 | string | -      ||
| position | 按钮位置 | string | right  |left / center/ right|
| validate | 开启表单提交验证 | boolean | false |true / false|
| type | 类型，代表不同色块 | string | - |default/primary/success/info/warning/danger|
| func | 按钮操作事件 | function |  ||

### slot
| 插槽名               | 说明                                                         |
| -------------------- | ------------------------------------------------------------ |
| group[n]             | 表单第n个分组内容体插槽                                      |
| group[n]-label      | <span style="color: red">v1.0.0新增属性</span>表单小标题插槽，插入表单小标题，n表示分组表单第n组,从0开始计数 |
| group[n]-header      | 表单头部插槽，插入表单内容体头部，n表示分组表单第n组,从0开始计数 |
| group[n]-footer      | 表单尾部插槽，插入表单内容体尾部，n表示分组表单第n组,从0开始计数 |
| group[n]-${字段名称} | 第n个分组字段插槽                                            |

示例：[查看复杂分组表单](/form/group/complex)

``` js

//- 第n组头部插槽（n由0开始）
  template(slot="group1-header")
    p.label-tip 支持自定义表单头部1信息
  //- 第n组尾部插槽（n由0开始）
  template(slot="group1-footer")
    p.label-tip 支持自定义表单足部1信息
  //- 第n组字段filer2插槽（n由0开始）
  template(slot="group1-Field2")
    el-progress(
      :text-inside="true"
      :stroke-width="26"
      :percentage="70")
  //- 第n分组的内容插槽（n由0开始计起）
  template(slot="group2")
		...
 	// 通过formField对象，对字段前缀后缀的配置
  formFields: [{
      name: 'Field',
      label: '测试字段前缀后缀的配置',
      form: {
        tag: 'input',
        placeholder: '输入数字',
        rules: [{
          required: true, message: '必填', trigger: 'blur'
        }, {
          pattern: /^[0-9]+$/,
          message: '必须是数字'
        }],
        preSlotRender: (h) => {
          return h('el-button', {
            domProps: {
              innerHTML: '点一下'
            },
            on: {
              click: () => {
                this.$message.success('你点到我了')
              }
            }
          })
        },
        suffixSlotRender: (h) => {
          // return h('AnsoIcon', {icon: })
          return <AnsoIcon icon="shipin" width="32px" height="32px"></AnsoIcon>
        }
      }
   
```

