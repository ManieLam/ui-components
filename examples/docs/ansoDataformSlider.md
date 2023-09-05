## 滑块选择 AnsoDataformSlider

AnsoDataformSlider为滑块选择
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 滑块值 | Array, Number | ------ | ------ | ------ |
| options | 滑块标记，每个标记可以单独设置样式，标记值范围限制在[min, max] | Array | ------ | ------  | 配置属性请查看：options属性配置，选填 |
| height | Slider 高度，竖向模式(vertical = true)时必填 | String | ------ | '200px' | 选填 |
| tooltip | 是否展示提示性语句,配置提示语句输出内容格式 | [Boolean, Function | Function类型， 出参值有：val(当前滑块选项值); Boolean类型, true、false | true | 选填 |


options属性配置, 接受的数据json格式：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| label | 文字描述 | string，number | ------ | ------ | 必填 |
| value | 标记值范围限制在[min, max]，才可以渲染出其它正确的参数值 | Number | ------ | ------  | 必填 |
| color | 字体颜色变更 | String | ------ | ------ | 选填 |
| fontlable | html输出标签 | String | ------ | ------ | 选填 |

```
例子如下：
options: [{
  label: '50%',
  value: 50,
  color: '#e6a23c',
  fontlable: 'strong'
}]
```

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/slider)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| max, min | 限制滑块选项的最大最小值 | number | ------ | ------ | 选填 |
| vertical | 是否配置竖向模式 | Boolean | true、false | false | 选填 |
| step | 步长 | number | ------ | 1 | 选填 |
| showStops | 是否显示步长间隔点 | Boolean | true、false | false | 选填 |
| showInput | 是否显示输入框，仅在非范围选择（range = false）时有效 | Boolean | true、false | false | 选填 |
| showInputControls | 在显示输入框的情况下(showInput = true)，是否显示输入框的控制按钮 | Boolean | true、false | true | 选填 |
| range | 设置为范围选择 | Boolean | true、false | false | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'slider',
    // ...支持element常规属性配置
    disabled: true,
    max: 10,
    min: 80,
    vertical: true, // 竖向模式，可配置高度height: '300px'，高度默认值为'200px'
    height: '300px',
    step: 10, // 设置步长，并显示步长间隔点
    showStops: true，
    showInput: true, // 展示输入框，且不显示输入框按钮
    showInputControls: false,
    range: true,
    // 组件提供props参数
    /** 
     * tooltip传入false,则为不显示提示信息
     * 传入函数值则为配置提示信息输出格式
    */
    tooltip: false || (val) => { return `海拔高达：${val}米` }
    options: [{ // 设置4个标识点
      label: '8%',
      value: 8
    }, {
      label: '15%',
      value: 15,
      color: '#67c23a'
    }, {
      label: '20%',
      value: 20,
      color: '#ff4949'
    }, {
      label: '50%',
      value: 50,
      color: '#e6a23c',
      // html将转为<strong>50%</strong>输出
      fontlable: 'strong'
    }]
  }
}
```

