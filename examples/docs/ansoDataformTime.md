## 时间选择器 AnsoDataformTime

AnsoDataformTime为时间选择器
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 时间选择框值 | String, Array, Number | ------ | ------ | ------ |
| isFixed | 是否为固定时间选择器 | Boolean | true、false | false | 选填 |
| icon | 图标类名 | String， Array |  ------ | ------ | 选填 |
| iconAlign |  图标位置，默认显示left, 需要icon传参类型为String才有效 | String | 'left' | ------  | 选填 |


element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/time-picker)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| readonly | 完全只读 | Boolean | true、false | false | 选填 |
| clearable | 是否显示清除按钮 | Boolean | true、false | false | 选填 |
| arrowControl | 是否使用箭头进行时间选择，仅对isFixed = false有效 | Boolean | true、false | false | 选填 |
| rangeSeparator | 选择范围时的分隔符，仅对isFixed = false有效 | String | '-' | ------  | 选填 |
| pickerOptions | 当前时间日期选择器特有的选项参考下表 | object | ------ | ------ | 选填 |


pickerOptions属性配置, 接受的数据object格式：

固定时间isFixed = true, pickerOptions配置，配置参数均为String类型
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| start | 开始时间 | string | ------ | 09:00 | 选填 |
| end | 结束时间 | string | ------ | 18:00 | 选填 |
| step | 间隔时间 | string | ------ | 00:30 | 选填 |
| minTime | 最小时间，小于该时间的时间段将被禁用 | string | ------ | 00:00 | 选填 |
| maxTime | 最大时间，大于该时间的时间段将被禁用 | string | ------ | ------ | 选填 |

固定时间isFixed = false, pickerOptions配置
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| selectableRange | 可选时间段 | String， Array | ------ | ------ | 选填 |
| format | 数据选择的时间格式化 | string | ------ | 'HH:mm:ss' | 选填 |

```
例子如下：
pickerOptions: {
  start: '05:00',
  end: '22:00',
  step: '00:10'
}
pickerOptions: {
  selectableRange: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00'],
  format: 'HH:mm:ss'
}
```

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'time',
    // ...支持element常规属性配置
    disabled: true,
    readonly: true,
    clearable: false,
    arrowControl: true,
    // icon配置，存在三种情况
    /**
     * 具体配置可查看示例
     * 传入字符串：由于iconAlign默认值为left,即为头部，因此只需要传入需要修改的icon即可
     * 传入字符串：修改iconAlign值为right,即为尾部，再传入需要修改的icon即可
     * 传入数组：提供此参数类型是为了可以同时修改前后两组按钮
    */
    icon: 'date',
    // 配置为固定时间
    isFixed: true,
    pickerOptions: {
      start: '05:00',
      end: '22:00',
      step: '00:10'
    }
  }
}
```

