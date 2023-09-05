## 状态组件 AnsoStates

AnsoStates为状态组件
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| type | 组件提供两个可直接配置显示的状态，成功：success 失败: fail | String | String | 成功：success 失败: fail | ------ | ------ |
| color | 状态标识颜色 | ------ | ------ | ------ |
| statesLabel | 状态文本 | String, Number | ------ | ------ | ------ |
| circleStyle | 状态标识样式配置 | Object | ------ | {height: '8px',width: '8px'} | ------ |

> 在全局引入anso-ui，可以做以下初始化配置：
``` js
Vue.use(Anso, {
  // 状态组件初始配置
  ansoStates: {
    options: {
      type: Array,
      default: () => [
        {
          type: 'success',
          color: 'green',
          statesLabel: '成功'
        },
        {
          type: 'fail',
          color: 'red',
          statesLabel: '失败'
        }
      ]
    }
  }
})
```

