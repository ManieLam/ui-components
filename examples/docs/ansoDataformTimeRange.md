## 时间范围选择器 AnsoDataformTimeRange

AnsoDataformTimeRange为时间范围选择器
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 时间选择框值 | Array | ------ | ------ | ------ |
| width | 支持选择框宽度配置 | String, Number | ------ | auto | 选填 |
| isFixed | 是否为固定时间选择器 | Boolean | true、false | false | 选填 |
| connect | 连接符号 | String | ------ | '-' || 选填 |
| pickerOptions | 时间范围选择器控制限制 | Object | ------ | ------ | 选填(pickerOptions属性配置: 参考如下) |
| icon | 图标类名 | String， Array |  ------ | ------ | 选填 |
| iconAlign |  图标位置，默认显示left, 需要icon传参类型为String才有效 | String | 'left' | ------  | 选填 |

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
| selectableRange | 可选时间段 | String | ------ | ------ | 选填 |
| format | 数据选择的时间格式化 | string | ------ | 'HH:mm:ss' | 选填 |

```
例子如下：
pickerOptions: {
  start: '05:00',
  end: '22:00',
  step: '00:10'
}
pickerOptions: {
  // 限制任意时间范围限只可传入字符串，及为限制一个时间段可选
  selectableRange: '09:00:00 - 12:00:00',
  format: 'HH:mm:ss'
}
```

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/time-picker)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| readonly | 完全只读 | Boolean | true、false | false | 选填 |
| clearable | 是否显示清除按钮 | Boolean | true、false | false | 选填 |
| arrowControl | 是否使用箭头进行时间选择，仅对isFixed = false有效 | Boolean | true、false | false | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'timeRange',
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
    // 配置为固定时间范围
    isFixed: true,
    // 限制固定时间范围传入限制大小
    pickerOptions: {
      start: '05:00',
      end: '12:00',
      step: '00:10',
      minTime: '05:10',
      maxTime: '10:00'
    }
    // 限制任意时间范围传入限制大小，selectableRange只允许传入字符串，限制一段可选时间范围
    pickerOptions: {
      selectableRange: '09:00:00 - 12:00:00'
    }
  }
}
```

