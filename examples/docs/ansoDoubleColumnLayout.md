## 分栏布局 AnsoDoubleColumnLayout

AnsoDoubleColumnLayout
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 分栏状态：main只显示主栏，both显示两栏，sub只显示次栏 | String | ------ | both | 选填 |
| direction | 分栏方向：row横向显示，column纵向显示 | String | ------ | row  | 选填 |
| mainGrow | 主栏大小，结合次栏大小一起使用，默认主次栏大小一比一 | Number | ------ | 1 | 选填 |
| subGrow | 次栏大小，结合主栏大小一起使用，默认主次栏大小一比一 | Number | ------ | 1 | 选填 |
| 'drag-minRatio' | 拖拽分栏最小值展示所占整个分栏的百分比，限制最小不可超过50% | String | ------ | '15%' | 选填 |

#### AnsoDoubleColumnLayout Slots

| 插槽名     | 说明                             |
| ---------- | -------------------------------- |
| main | 分栏主栏内容插槽 |
| sub | 分栏次栏内容插槽 |
