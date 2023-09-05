
## 对比表单 AnsoDataformCompared

### 需求说明

1. 体现原值与新值对比，二维表格展示，表单展示，暂只支持2列数据对比。
2. 存在新值或已做新值修改，则高亮提醒，且不允许两个值内容一样。
3. 一键取消修改（单项取消、全部取消）
4. 单项字段表单验证规则：1允许全部字段验证、2只对修改值验证、3自定义动态验证规则
5. 单项字段根据权限设置只读、可编辑

TODO：
1. 支持多列对比，支持多列对比配置指定原值



### 配置说明

``` js
AnsoDataformCompared(
  :formFields="field"
  :columns="['项目', '原值', '对比值']"
  :buttonList="buttonList"
  :value="表单数值<Object>"
  :originValue="表单原值<Object>" // 区别value，在于：value值为表单所有值，当表单默认同时存在原值与变更值时，需要传递originValue。
)
// 表单内字段的配置
field: [{
  label: 'field',
  name: 'field',
  form: {
    tag: 'input',
    disabled: true // 配置当前字段不可编辑
    ...其他属性同AnsoDataform的formFields配置
  }
}]

```

#### AnsoDataformCompared Attributes

| 参数              | 说明                                                         | 类型     | 可选值     | 默认值                                                     |
| ----------------- | ---------------------------------- | -------- | ---------- | ---------------------------------------------------------- |
| disabled   | 表单只读，整个表单内元素（包括按钮）不可操作                   | Boolean  | true/false | false                                                      |
| highlightChange | 是否高亮显示修改差异，若为true，则在最左边出现勾选框，允许取消当项、全部修改。当对比列内容一致，则表示无修改。 | Boolean  | true/false | true                                                       |
| columns | 变更对比的列名称数组，如：['信息项', '原值', '拟变更值']，数组长度为3，**暂不支持多列对比**。 | Array |  | ['信息项', '原值', '变更值'] |
| formFields | 表单中所有字段的配置对象（从上到下排列），同AnsoDataform.formFields配置 | Array    | -          | -                                                          |
| value      | 表单所有数值                                              | Object   | -          | -                                                          |
| originValue | 表单所有原值，区别于value，不可修改，value值为表单所有值，当表单默认同时存在原值与变更值时，需要传递originValue。当不存在originValue值则取value属性的值。 | Object | - | - |
| buttonList        | 表单按钮组                                                   | Array    | -          | -                                                          |
| buttonAlign       | 按钮对齐方式,同传统表单                                      | String   | left,right,center,fixed |                                                            |

#### AnsoDataformCompared Events

| 方法      | 说明                                                    | 返回值 |
| --------- | ------------------------------------------------------- | ------ |
| resetForm | 内置的重置所有修改以及验证方法, 使用$refs[].resetForm() | -      |



### 解决方案

#### 一键取消修改

> 单项取消：需在配置highlightChange=true时生效，勾选最左列勾选框取消当前项的修改，变更值恢复为原值，并不可操作勾选框。
>
> 全部取消：当配置hightlightChange=true时，可通过最左列的全选勾选框取消所有勾选，或通过this.$refs[给AnsoDataformCompared配置的refname].resetForm()调用内置的重置方法。

#### 配置验证，同AnsoDataform组件

[查看相关AnsoDataform示例]()


#### 