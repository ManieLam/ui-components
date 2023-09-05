## 日期选择器（包含时间日期选择器) AnsoDataformDate

AnsoDataformDate为 日期选择器（包含时间日期选择器)
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 日期（时间）选择框值 | String, Array, Number, Date | ------ | ------ | ------ |
| dateType | 日期选择器选择类型 | String | year、month、date、dates、week、datetime、datetimerange、daterange、monthrange | 'date' | 选填(具体类型介绍如下：dateType类型介绍) |
| shortcut | 需要日期选择类型为选择范围或时间日期选择器（dateType: 'datetime'）才生效，因此dateType必须配置为['datetimerange', 'daterange', 'monthrange', 'datetime']四种类型，否则配置无效 | String, Array | defualt、date | ------ | 选填 |
| pickerOptions | 当前时间日期选择器特有的选项参考下表 | Object | ------ | ------ | 选填(pickerOptions属性配置: 参考如下) |
| icon | 图标类名 | String， Array |  ------ | ------ | 选填 |
| iconAlign |  图标位置，默认显示left, 需要icon传参类型为String才有效 | String | 'left' | ------  | 选填 |

dateType类型介绍
| 类型参数  | 说明  | 使用方式 |
| ------- | -------------- | ------ |
| year | 年份选择器 | dateType：'year' |
| month | 月份选择器 | dateType：'month' |
| date | 日期选择器 | dateType：'date' （默认值） |
| dates | 多日期选择器 | dateType：'dates' |
| week | 周期选择器 | dateType：'week' |
| datetime | 日期时间选择器 | dateType：'datetime' |
| monthrange | 月份范围选择器 | dateType：'monthrange' |
| daterange | 日期范围选择器 | dateType：'daterange' |
| datetimerange | 日期时间范围选择器 | dateType：'datetimerange' |

pickerOptions属性配置, 接受的数据object格式：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabledDate | 设置禁用状态，输出参数为（time）当前日期，要求返回 Boolean | Function | ------ | ------ | 选填 |
| firstDayOfWeek | 周起始日 | Number | 1-7 | 7 | 选填 |
```
例子如下：
pickerOptions: {
  disabledDate: (time) => {
    return time.getTime() <= Date.now() - 8.64e7
  },
  firstDayOfWeek: 5
}
```


element常用常规属性如下： 组件属性【[日期选择器常规属性及方法](https://element.eleme.cn/#/zh-CN/component/date-picker)】【[日期时间选择器常规属性及方法](https://element.eleme.cn/#/zh-CN/component/datetime-picker)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| readonly | 完全只读 | Boolean | true、false | false | 选填 |
| clearable | 是否显示清除按钮 | Boolean | true、false | false | 选填 |
| format | 显示在输入框中的格式 | String | ------ | dateType = 'datetime'默认格式为：'yyyy-MM-dd HH:mm:ss',dateType = 'date'默认格式为：'yyyy-MM-dd' | 选填 |
| timeArrowControl | 是否使用箭头进行时间选择，仅对dateType = 'datetime\datetimerange'有效 | Boolean | true、false | false | 选填 |
| rangeSeparator | 选择范围时的分隔符，仅对dateType = 'datetimerange\daterange\monthrange'有效 | String | '-' | ------  | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'date',
    // ...支持element常规属性配置
    disabled: true,
    readonly: true,
    clearable: false,
    // 是否使用箭头进行时间选择，仅对dateType = 'datetime'有效
    dateType: 'datetime',
    timeArrowControl: true,
    // 选择范围时的分隔符，仅对dateType = 'datetimerange\daterange\monthrange'有效
    dateType: 'datetimerange',
    rangeSeparator: '至',
    // icon配置，存在三种情况
    /**
     * 具体配置可查看示例
     * 传入字符串：由于iconAlign默认值为left,即为头部，因此只需要传入需要修改的icon即可
     * 传入字符串：修改iconAlign值为right,即为尾部，再传入需要修改的icon即可
     * 传入数组：提供此参数类型是为了可以同时修改前后两组按钮
    */
    icon: 'date',
    pickerOptions: {
      disabledDate: (time) => {
        return time.getTime() <= Date.now() - 8.64e7
      },
      firstDayOfWeek: 5
    }
    /**
     * ['datetimerange', 'daterange', 'monthrange', 'datetime']
     * 需要日期选择类型为选择范围或时间日期选择器（dateType: 'datetime'）才生效，因此dateType必须配置为'datetimerange', 'daterange', 'monthrange', 'datetime'四种类型，否则配置无效
    */
    shortcut: true,
    dateType: 'datetimerange'
  }
}
```

