## 字段渲染器 AnsoInfoRender
通过字段配置方式对字段的值进行渲染
### 渲染器未来需要完善的工作
- [ ] InfoRender的所有示例
- [ ] 将icon和file类型做成render函数，减少template上的if，以优化性能
- [ ] 优化render的顺序，将render函数做成预定义，达到优化性能的目的

提供基础属性配置如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | ----------- | ------ | ------ | ------ | ------ |
| value | 渲染值 | All | ------ | ------ | ------ |
| field | 渲染字段配置 | Object | ------ | ------ | ------ |
| field.render | 渲染函数 | Function/Object | ------ | ------ | 当render为function时，按function自定义渲染；为object时，按object里的配置类型进行渲染，请参见下表 |
| field.render.type | 渲染类型 | String | text/select/multiselect/money/time/icon/file/link | text |  |
| field.render.timeType | 渲染时间类型 | String | ------ | ------ | 当预定义的渲染方式为time时，按此字段样式进行渲染 |
| field.options | 字段匹配项 | Array | ------ | ------ | 当预定义的渲染方式为select/multiselect时，使用此字段的项进行匹配 |
| data | 渲染时需要的其它数据 | Object | ------ | ------ | 供自定义渲染时使用，多数情况下用于表格或表单字段渲染时使用其它字段的值 |

field.render属性配置如下：

| 类型     | 参数              | 值                                                | 说明                            |
| -------- | ----------------- | ------------------------------------------------- | ------------------------------- |
| Function | 渲染字段配置filed | ------                                            | 按返回值渲染                    |
| Object   | render.type       | text/select/multiselect/money/time/icon/file/link | 预定义value的渲染方式，请见下表 |

```
render：(filed) => {
	return filed.label
}
```

当field.render为Object时配置表：

| render.type的值 | 衍生参数        | 说明                                                         |
| --------------- | --------------- | ------------------------------------------------------------ |
| text            | ------          | value文字渲染                                                |
| select          | ------          | value匹配field.options的值进行渲染                           |
| multiselect     | ------          | value多值匹配field.options的值进行渲染                       |
| link            | ------          | render属性配置请参见[AnsoLink](.\ansoLink.md)                |
| icon            |                 | value作为类名渲染成icon                                      |
|                 | render.width    | icon的宽度                                                   |
|                 | render.height   | icon的高度                                                   |
| money           | ------          | 加上¥符号，并保留两位小数                                    |
| time            |                 | 将value按render.timeType时间类型进行格式化                   |
|                 | render.timeType | 可选值参考[Day.js](https://dayjs.fenxianglu.cn/category/display.html#%E6%A0%BC%E5%BC%8F%E5%8C%96)，默认'HH:mm:ss' |

