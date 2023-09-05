按钮组 AnsoButtonGroup

AnsoButtonGroup为数组，由n个el-button组成，属性如下：
| 参数         | 说明                                      | 类型     | 可选值     | 默认值 |
| ------------ | ----------------------------------------- | -------- | ---------- | ------ |
| buttonList   | 按钮组，由el-button组成数组   | Array    | -          | -      |
| isGroup      | 是否以按钮组的方式出现                    | Boolean  | true/false | false  |
| isVertical   | 按钮组是否垂直显示 | Boolean  | true/false | false  |
| isInterval   | 按钮间是否存在间隔（前提是isGroup为true && needDivider为false） | Boolean  | true/false | true  |
| formValidate | 表单验证函数                              | Function | -          | -      |
| needDivider      | 按钮组是否需要分割线                    | Boolean  | true/false | false  |
| dividerDirection   | 分割线方向 | String  | horizontal/vertical | vertical  |
| data | disabled/showabled/func补充的回调参数           | Object | -          | {}      |
| keyName | 用于显示配置固定id属性，非必填，当传空时，会采用特定规则生成id，影响范围整个按钮组内元素           | String | -          |       |

el-button属性：[el-button属性说明](https://element.eleme.cn/#/zh-CN/component/button)

| 参数      | 说明                                                         | 类型     | 可选值                                                      | 默认值 |
| --------- | ------------------------------------------------------------ | -------- | ----------------------------------------------------------- | ------ |
| label     | 按钮名称                                                     | String   | -                                                           | -      |
| size      | 按钮尺寸                                                     | String   | medium / small / mini                                       | -      |
| type      | 按钮类型                                                     | String   | primary / success / warning / danger / info / text          | -      |
| textType  | 文本按钮类型，type=text有效                                  | String   | info/primary/success/warning/danger                         | primary |
| specsSize  | 自定义按钮规格（font-size）大小         | String, Number  | -      | -    |
| disabled  | 是否禁用状态                                                 | Boolean  | -                                                           | false  |
| showabled  | 是否显示，不占位隐藏                                         | Boolean/Function  | -                                                           | true |
| visabled | 是否显示，占位隐藏 | Boolean/Function | - | true |
| loading   | 是否加载中状态                                               | Boolean  | -                                                           | false  |
| icon      | 图标类名                                                     | String   | [图标集合](https://element.eleme.cn/#/zh-CN/component/icon) | -      |
| iconAlign | 图标位置                                                     | String   | left / right                                                | left   |
| badge     | 按钮徽标 [el-badge属性说明](https://element.eleme.cn/#/zh-CN/component/badge) | Object   | -                                                           | -      |
| tooltip   | 按钮提示 [el-tooltip属性说明](https://element.eleme.cn/#/zh-CN/component/tooltip) | Object   | -                                                           | -      |
| dropdownButtons     | 嵌套按钮组                                                     | Array   | [{...el-button的属性}]                                                           | -      |
| hideOnClick | 是否在点击按钮后隐藏嵌套按钮                                                     | Boolean   | -                                               | true   |
| func      | 按钮执行回调操作，回调参数参考下文解释                       | Function | -                                                           | -      |

嵌套按钮组配置说明如下：
```js
buttonList: [{
	label: '按钮名称',
	name: 'name',
	icon: 'xiala',
	iconAlign: 'right',
	dropdownButtons: [{
		label: '嵌套按钮名称1',
		func: (button) => {
			....do something....
		}
	}, {
		label: '嵌套按钮名称2',
		func: (button) => {
			....do something....
		}
	}]
```

func函数参数解释如下：

| 参数   | 说明         | 类型   | 可选值 | 默认值 |
| ------ | ------------ | ------ | ------ | ------ |
| button | 当前按钮对象,即默认出参对单个按钮的配置内容 | Object | {func: func(button) , label: 'xxx', loading: false, type: 'primary', tooltip: 'xxx'} | -      |

配置说明：
```js
buttonList: [{
 	label: '按钮名称',
	type: 'primary', // 按钮类型
 	size: 'small', // 按钮尺寸
	icon: 'edit',
	iconAlign: 'right', // icon位置
	...el-button的属性,
	badge：{
		...el-badge的属性
	},
	tooltip: {
		...el-tooltip的属性,
		content: '多行信息<br/>第二行信息' // content支持html
	},
	showabled: () => {
		return true
	},
 	func: (button) => {
    	....do something....
 	}
}]
```