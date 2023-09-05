****
## 表单 AnsoDataform

### 需求

AnsoDataform为基础表单，默认列布局。

多种布局说明：

1. 列布局：支持单行单列
2. 内联布局：支持元素收缩展开
3. 网格式布局：支持多行多列，跨行跨列
4. 分组布局：对表单内字段元素的分组，请查看AnsoDataformGroup组件说明
5. 表格嵌套式布局：常见于对比式表单（查看AnsoDataformCompared组件），其他形式请使用表格AnsoDatatable组件/el-table

表单基础需求：

- [x] 单行单列，多行多列
- [x] 表单验证：提交验证、配置多项验证需求、通过服务端的异步验证
- [x] 表单联动：元素间联动（1对n/n对1联动；多依赖联动；链式联动；异步联动）、表单间联动
- [x] 表单重置
- [x] 获取表单提交的数据、获取表单仅修改的数据
- [ ] 防止表单重复提交
- [x] 对表单元素的控制展示：按钮

- [x] 对文本的控制显示
- [x] 支持插槽，允许自定义扩展头部、底部

### API

#### AnsoDataform Attributes

> 不同type布局类型，对属性值不一样，具体查看以下说明

##### 默认AnsoDataform、AnsoDataformGroup公共基础属性

| 参数          | 说明                                                         | 类型          | 可选值            | 默认值 |
| ------------- | ------------------------------------------------------------ | ------------- | ----------------- | ------ |
| value         | 【必填】表单数据对象                                         | object        | -                 | -      |
| formFields    | 【必填】表单字段属性配置，见下文属性说明                     | array         | -                 | -      |
| buttonList    | 【必填】表单操作按钮组，位于表单最底部位置,见下文属性说明    | array         | -                 | -      |
| buttonAlign   | 按钮组水平位置                                               | string        | left,right,center | left   |
| buttonFixed   | 按钮组是否固定底部，当配置true时需要加上.form-withFixed类名  | boolean       | false/true        | false  |
| type          | 表单体展示布局形式，<br />默认不传，即为基础列式表单；<br />type=row:栅格式；<br />type=grid：网格式；<br />type=inline: 内联式<br />具体查看/表单/布局菜单下的示例 | string        | row,gird,inline   | -      |
| labelHidden   | 是否允许表单标签隐藏                                         | boolean       |                   | false  |
| labelPosition | 表单文本标签显示的位置                                       | string        | top/left/right    | right  |
| labelWidth    | 表单文本标签宽度                                             | string |                   | 140px  |
| labelTip      | 带提示辅助性标签, 小图标在标签盘显示，hover显示辅助内容      | string        | -                 | -      |
| keyName | 用于显示配置固定id属性，非必填，当传空时，会采用特定规则生成id，影响范围整个表单组内元素           | String | -          |       |
| formItemProp | 直接传给el-form-item的属性         | Object | -          |       |
| collapseAllMultiTags | 允许对表单内所有下拉多选（select）、下拉联级多选（cascader）的标签属性，合并为一段文字 | Boolean| true/false

##### type=inline,内联表单布局属性

| 参数        | 说明                       | 类型    | 可选值 | 默认值 |
| ----------- | -------------------------- | ------- | ------ | ------ |
| collapsable | 是否开启默认收缩展开行     | boolean |        | false  |
| errorToptip | 是否开启小浮窗提示错误信息 | boolean |        | true  |

##### type=grid,网格布局表单属性

| 参数        | 说明                                                         | 类型    | 可选值     | 默认值 |
| ----------- | ------------------------------------------------------------ | ------- | ---------- | ------ |
| gridspanNum | 默认表示表单列数（在type=row/grid生效），gridFlow=column时候，表示行数；gridFlow=row时，表示列数 | number  | [1-24]     | 2      |
| gridFlow    | 字段排列的流向属性                                           | string  | column/row | row    |
| border      | 是否设置边框                                                 | boolean |            | true   |

##### type=row ,栅格式布局表单属性

| 参数         | 说明                                                         | 类型    | 可选值 | 默认值 |
| ------------ | ------------------------------------------------------------ | ------- | ------ | ------ |
| maxRow       | 设置最大行，当表单超过当前设置的最大行，会自动可提供收缩展开 | number  | -      | -      |
| colspanNum   | 表单默认的列数，默认为3列，当isAutoColumn开启，则失效 <span style="color:red">V0.6.0+更名为defaultColNum</span> | number  | [1-24] | 1      |
| collapsable  | 是否允许展开收缩，需同时设置maxRow属性生效                   | boolean |        | false  |
| isAutoColumn | 是否开启自适应屏幕的列数<span style="color: red">v0.6.0+新属性</span> | boolean |        | true   |
| errorToptip | 是否开启小浮窗提示错误信息 | boolean |        | true  |

#### formFields Attributes

| 参数             | 说明                                                         | 类型                    | 可选值                                                       |
| ---------------- | :----------------------------------------------------------- | ----------------------- | ------------------------------------------------------------ |
| name             | 【必填】字段关键key，作为表单字段身份索引，必须唯一          | string                  | -                                                            |
| label            | 字段标签文本                                                 | string                  | -                                                            |
| options          | 指定元素的可选项，当form.tag为select,cascader等选择框类标签时【必填】 | string\|array\|function | 查看下文解决方案：[配置字段选项](#options) |
| form             | 字段表单形式的属性对象，即指定的form.tag标签接收的prop属性，详细可查看每个tag类型的说明文档及示例 | object                  | -                                                            |
| form.tag         | 字段所用的表单标签，**暂不支持扩展自定义标签**               | string                  | input,number,select,switch,date....查看下文解决方案：[配置字段的表单元素](#fieldSetting) |
| form.chains      | 配置字段联动操作。传入一个可通过内置的chainsEvent对象方法控制自定义联动效果。 | function                | 查看下文解决方案：[配置字段联动](#chains)<br />查看[出参说明](#chainsParams) |
| form.rules       | 配置字段验证规则，可使用内置提供的验证类型或自定义正则表达式 | array                   | 查看下文解决方案：[配置字段验证](#validate)<br />查看[async-validator文档](https://github.com/yiminghe/async-validator) |
| form.options     | 选择框、联级选择器等的选项集合，同最外层的options，**优先级高于最外层**，当不设置时，默认取最外层的options | string\|array\|function | 配置方法同上options |
| form.visabled    | 字段表单是否显示(隐藏的字段不会被触发字段校验)                                             | boolean                 | true/false(非0，1)                                           |
| form.disabled    | 字段不可操作                                                 | boolean                 | -                                                            |
| form.labelHidden | 当前字段是否显示标签                                         | boolean                 | true/false                                                   |
| form.labelWidth | 当前字段标签宽度                                        | String                 | 自动                                                   |
| form.bottomTip   | 当前字段底部标签提示                                         | string                  ||
| form.colSpan | 当前字段跨列参数配置                  | number | 解决方案参考：[配置多行多列表单](#grid) |
| form.rowSpan | 当前字段跨行参数配置, 表单配置type=grid 有效        | number | 解决方案参考：[配置多行多列表单](#grid) |

#### AnsoDataform Events

> 通过以下方法对表单主动获取动作

| 方法      | 说明                                                         | 出参 | 入参|
| --------- | --------------------------------- | ------------- | ---- |
| resetForm | 内置的重置表单方法，恢复数值为原value传入的数值，并清除验证提示，恢复表单最初的样子, 调用：this.$refs[formname].resetForm() | -    | |
| onChange  | 获取当前修改的字段，当任一字段修改时都会触发该事件，建议搭配防抖函数使用该方法。       | {<br />field：当前修改的字段配置，<br />values:所有表单参数，<br />value: 当前修改的值} | |
| validateField  | 重新验证某个字段       | - | 字段名称，即formField中配置的字段name属性 |

#### AnsoDataform Slots

> [具体解决方案及解答](#slot)参考
>
> <span style="color: red"> v0.5.0+版本规范slot命名规则，采用 "<模块名>-<块名>" 的格式，取消驼峰命名规则 ,  涉及bodyHeader、bodyFooter</span>

| 插槽名      | 说明                                                         | 参数 |
| ----------- | ------------------------------------------------------------ | --- |
| [:name]     | 对字段自定义插槽，[:name]为字段名，需要与formFields中配置的字段name属性一致 | {field: 字段配置的信息，data: 表单数据, value: 当前数值} |
| body-header | 表单头部插槽，插入表单内容体头部 <span style="color: red"> （v0.5.0+ 更改为 body-header ）</span> | - |
| body-footer | 表单尾部插槽，插入表单内容体尾部<span style="color: red"> （v0.5.0+ 更改为 body-footer）</span> | - |
| dataform-button-left | 按钮前置位置加slot | - |

---

#### buttonList Attributes

> 详细说明可查看示例及说明（菜单路径）：/表单/表单内置示例/按钮与表单
> 多样的按钮说明（菜单路径）：/表单/按钮
>
> 不支持固定底部操作，篇幅过大造成浪费，请使用AnsoDataformGroup

| 参数      | 说明                                                         | 类型              | 可选值                                             |
| --------- | ------------------------------------------------------------ | ----------------- | -------------------------------------------------- |
| name      | 【必填】按钮唯一标识                                         | string            | -                                                  |
| label     | 【必填】按钮文本                                             | string            | -                                                  |
| func      | 【必填】按钮点击的回调函数，支持异步、非异步，可查看示例说明：按钮与表单 | function          | -                                                  |
| icon      | 图表类名                                                     | string            | anso 的iconfont库                                  |
| type      | 类型，只对样式有区别                                         | string            | primary / success / warning / danger / info / text |
| showabled | 是否可显示                                                   | boolean\|function | -                                                  |
| disabled  | 是否可操作                                                   | boolean\|function | -                                                  |
| validate  | 是否开启func操作前字段校验                                   | boolean           | true/false(非0，1)                                 |
| plain     | 是否朴素按钮                                                 | boolean           | —                                                  |
| round     | 是否圆角按钮                                                 | boolean           |                                                    |
| circle    | 是否圆形按钮                                                 | boolean           |                                                    |
| loading   | 是否加载中状态                                               | boolean           |                                                    |
| position  | v0.4.7+后新属性,表示**单个**按钮位置,默认全部不填则表示居左（根据深圳设计稿要求），分组表单则默认居右 | string            | left/right/center                                  |

---

#### <span id="chainsParams">form.chains 函数出参说明</span>

| 参数   | 说明                                                         | 类型     | 可选值                                                       |
| ------ | ------------------------------------------------------------ | -------- | ------------------------------------------------------------ |
| chains | 指向内置的chainEvent对象，可以调用chainEvent对象方法：<br />字段配置联动：setState(需要控制的字段名称，回调函数)；<br />数值联动：setValue(字段名称，替换的值)；<br />选项联动：setOptions(字段名称，替换的options选型)....更多内置的方法可以在packages/AnsoDataform/plugins/chains.js中补充。 | function | chains.setState(name, fn)<br />chains.setValue(name, value)<br />chains.setOptions(name, options) |
| values | 返回整个表单所有的数值                                       | object   |                                                              |
| value  | 当前字段最新的数值                                           | any      |                                                              |

### 解决方案

以下为解析说明，详细可搭配每个示例中对应的源代码效果查看。

#### 配置行内表单

> 配置type="inline"属性时生效。配置collapsable=true超区域/指定数量可展开收缩，[查看示例](/#/form/layout/inline)

#### <span id="grid">配置多行多列表单<span>

>1.配置type=grid，置为网格式表单[查看示例](ansoui.gddxit.cn:8021/#/form/layout/grid)；或配置type=row，置为栅格式表单[查看示例](ansoui.gddxit.cn:8021/#/form/layout/row)
>
>2.配置colspanNum属性，指定对应的列数量,

#### <span id="chains">配置字段联动</span>

> formField属性中的字段配置form.chains，具体示例可[查看示例](ansoui.gddxit.cn:8021/#/form/chain/simple)，格式如下：

``` js
form: {
  chains: ({ chains, values, value }) => {
   // 修改字段的数值
 chains.setValue('需要修改的字段名称', value)
   // 修改字段属性
 chains.setState('需要修改的字段名称', state => {
      // state 为 {需要修改的字段}的formfield属性
      // 对指定的字段做修改操作
 })
 // 更改字段的字典选项
 chains.setOptions('需要修改的字段名称', array)
  }
}
```

#### <span id="fieldSetting">配置字段的表单元素</span>

表单可选标签（form.tag）：

>text：只读文本/.富文本；input，number，numberRange，select，switch，slider，checkbox，radio，cascader，time，timeRange，date，file，button
>
>不在支持范围内的表单则不会显示

#### <span id="validate">配置字段验证</span>

单表单内验证

> 1. 配置formFields中字段form.rules属性，默认是在输入后失焦触发字段验证
> 2. 可在按钮组中设置button.validate属性，表示是否需要验证控制，当验证通过后再执行按钮事件。

多个表单验证，可查看示例代码配置

验证配置说明（form.rules）：

> 配置说明：
>
>   [{
> ​   type: <内置的验证类型| string>,  
> ​   pattern: <自定义的正则表达式| regexvalue>,
> ​   message: <验证错误的信息提示| string>  
> ​  }]

内置的验证类型（form.rules[n].type）：[查看表单验证示例](/form/validate/setting)

#### <span id="options">配置字段选项</span>

> 通过配置formFields.options 或formFields.form.options 来为字段设置字典选项，两者配置方法相同，但form.options优先级高于外层，即当配置formFields.form.options时，外层的options失效。
>
> options支持传入string|array|function，以下场景做解析：
>
> 1.当options为string：系统自动根据传入的字段，获取存储中的字段字典选项，否则发起请求获取。
>
> 2.当options为array：默认使用传入的array作为字典选项。
> 格式：[{
>   label: 选项文本(必填)<string> ,  
>   value: 选项取值(必填)<string|number|boolean>,  
>  }]
>
> 3.当options为function：function为回调函数，允许设置自定义的字典选项，需返回array格式，否则无法成功设置字典选项。


#### <span id="submit">表单数据提交</span>


>方法一：通过配置buttonList，设置表单操作按钮组，通过button对象的func属性，配置提交事件，如下：

``` js
 buttonlist: [{
   label: '确认', // 按钮文本名称
   validate: true, // 开启提交前验证
   func: ({formData}) => {
     // 按钮点击后操作事件
     // @return {Object} formData 整个表单的所有数据
   }
 }]
// tip：buttonList的具体配置，可以查看按钮组件的配置说明
```

> 方法二：监听onChange事件

``` js
AnsoDataform(@onChange="onChangeField")
// methods
onChangeField ({field, values, value, oldValue}) {
 // do something...
}
```

### <span id="slot">表单插槽</span>

1. 问：如何配置字段元素的自定义内容
   答：与form.tag无关，只需在formFields中配置label、name、form 3个属性，使用#{name}具名插槽，插槽名称与字段name属性一一对应，如：

   ```js
   AnsoDataform(
     ref="form"
     v-model="formData"
     :formFields="formFields"
     ...)
     template(#customField)
       el-button(@click="$message.success('你点到我了')") 点一下
     
   //formFields中仍然需要配置customField字段
     formfields: [{
       label: '自定义字段',
       name: 'customField', // 名字任取，只需要与具名插槽一致即可
       form: {} 						// 只需要配置form: {}即可
     }]
   ```

2. 问：表单重置、提交,自定义字段组件修改的值存储
   答：需要外部业务组件主动对自定义组件进行重置、处理赋值；自定义插槽无法被表单内部方法直接处理，包括表单验证、部分联动效果，需要外部业务组件自行监听表单onChange事件自行处理

3. 问：对其他表单类型是否影响
   答：行内、栅格、网格表单（用法与AnsoDataform一致）、分组（需要带上‘group${n}-’的前缀，表示第n分组的字段，具体查看[复杂分组表单](/form/layout/group/complex)）
   
4. 字段前后缀插槽（行内、栅格、网格、分组类的表单都相同），具体效果查看[复杂分组表单](/form/layout/group/complex)

   ``` js
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
         // 配置前缀
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
          // 配置后缀
         suffixSlotRender: (h) => {
           // return h('AnsoIcon', {icon: })
           return <AnsoIcon icon="shipin" width="32px" height="32px"></AnsoIcon>
         }
     }]
   ```

   