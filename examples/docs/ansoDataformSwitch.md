## 开关选择框 AnsoDataformSwitch

AnsoDataformSwitch为开关选择框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 选择框值 | Boolean, String, Number | ------ | ------ | ------ |
| size | 开关尺寸 | String | lg, sm | lg | ------ |
| options | 传入数据输出文字描述或修改背景色,传入数据的值必须与activeType相对应，才可以匹配出正确的文字颜色，当isTooltip = true时，当前配置必填 | Array | ------ | ------  | 配置属性请查看：options属性配置，选填 |
| activeType | 传入值类型，防止传入值为0或1时，被element转为布尔类型。默认值为boolean | String | number、boolean、string | 'boolean' | 选填 |
| isTooltip | 是否展示提示性语句 | Boolean | true、false | false | 选填 |
| isInline | 文字描述展示，是否显示再按钮内，需要配合switch 的宽度width,option数据配置label，设置显示 | Boolean | true、false | false | 选填 |
| func |  支持开关按钮点击后的异步回调 | Function | switch(组件所有属性)、data(组件值) | ------  | 选填 |


options属性配置, 接受的数据json格式：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| label | 文字描述 | string，number | ------ | ------ | 选填（当isTooltip = true时，当前配置必填） |
| value | 需要和activeType（传入值类型)相匹配，才可以渲染出其它正确的参数值 | Boolean, String, Number | ------ | ------  | 必填 |
| color | 背景色变更 | String | ------ | ------ | 选填 |

```
例子如下：
options: [{
 label: '',
 value: true,
 color: '#13ce66'
}]
```

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/select)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| width | switch 的宽度（像素），当isTooltip = true时，当前配置必填 | number | ------ | 40 | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'switch',
    // ...支持element常规属性配置
    disabled: true,
    isTooltip: true,
    activeType: 'number',
    options: [{
      label: '开',
      value: true,
      color: '#13ce66'
    }, {
      label: '关',
      value: false,
      color: '#ff4949'
    }],
    // 文字描述展示，显示再按钮内
    width: 90,
    isInline: true,
    // 支持远程异步搜索
    func: (datas) => {
      if (!datas) return
      const { funcProps } = datas
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$message.info('等待两秒后执行操作')
          resolve(funcProps.data)
        }, 2000)
      })
    }
  }
}
```

