## 选择框 AnsoDataformSelect

AnsoDataformSelect为选择框
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 选择框值 | String, Number, Array | ------ | ------ | ------ |
| options | 传入显示数据数据 | Array | ------ | ------  | 配置属性请查看：options属性配置, 必填(remoteFunc配置则不需要配置options数据) |
| groupKey | 传入数据为分组数据时，默认为group显示分组名称,只存在分组时有效 | String | ------ | 'group' | 选填 |
| isGroup | 是否分组展示, 默认不分组 | Boolean | ------ | false | 选填 |
| groupLabel | 设置分组名称，参数输出{label: 分组的值, groups：分组数据} | Boolean, Function | ------ | false | 选填 |
| subtext |  配置则输出选项说明，居右显示，支持文字，优先级高于直接在option数据中输出的subtext值 | Function | 出参值有：option(选项的所有参数值)， index(选项的索引值) | ------  | 选填 |
| optionHeight | 可配置选项高度，需要options属性配置内存在对于img配置，才会有效 | String | ------ | '90' | 选填 |
| subtextlimit | 配置选项中，选项说明subtext可显示最长长度,如果超过设置长度，需要配置此参数，省略内容才会浮窗显示 | Number | ------ |  ------ | 选填 |
| remoteFunc | 配置远程异步搜索函数 | Function | 出参值有：query(搜索值) | ------ | 选填，filterable: true配置为必填 |
| filterable | Boolean表示可搜索，且搜索条件遵顼默认规则，Function表示可搜索，搜索条件遵顼传入规则 | Boolean, Function |  ------ | ------ | 选填 |

options属性配置, 接受的数据json格式：

| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| label | 选项的标签 | string，number | ------ | ------ |必填 |
| value | 选项值 | string，number | ------ | ------  | 必填 |
| disabled | 是否禁用选项 | Boolean | true、false | false | 选填 |
| subtext | 返回配置选项说明，限字符串类型 | String | ------ | ------ | 选填，相关自定义选项配置 |
| img | 返回配置选项图片 | String | ------ | ------ | 选填，相关自定义选项配置 |
| group | 分组显示，返回group属性，值为分组名称 | String | ------ | ------ | 选填，如果要配置分组则为必填 |
| disabledGroup |  是否将该分组下所有选项置为禁用,只在 '选项值存在分组' 时有效 | Boolean | true、false | false | 选填 |
```
例子如下：
options: [{
 label: '',
 value: '',
 disabled: true,
 subtext: '选项说明',
 img: require('@/assets/logo.png'),
 group: '分组名称',
 disabledGroup: true,
}]
```

element常用常规属性如下： 组件属性【[常规属性及方法](https://element.eleme.cn/#/zh-CN/component/select)】
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| placeholder | 输入框占位文本 | String | ------ | ------ | 选填 |
| disabled | 禁用 | Boolean | true、false | false | 选填 |
| clearable | 是否可以清空选项 | Boolean | true、false | true | 选填 |
| multiple | 是否多选 | Boolean | true、false | false | 选填 |
| filterable | 是否可搜索,可以利用搜索功能快速查找选项 | Boolean | true、false | false | 选填 |

基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'select',
    // ...支持element常规属性配置
    placeholder: '请输入',
    disabled: true,
    clearable: false,
    multiple: true,
    filterable: true,
    // 组件提供传入属性
    /**
       * 配置为分组时，group参数为必填
       * group参数的key值可变更为自己需要的值
       * 如下group参数key值通过配置‘groupKey’，变更为parents
       * 后续会根据所传的parents参数分配分组，值为分组名称
      */
    groupKey: 'parents',
    options: [{
      label: '高中',
      value: 1,
      parents: '学历'
    }, {
      label: '初中',
      value: 2,
      parents: '学历'
    }, {
      label: '30岁',
      value: 3,
      parents: '年龄'
    }],
    optionHeight：'100',
    subtextlimit：15,
    // 相关自定义选项配置
    subtext: (option) => { return option.value },
    // 支持远程异步搜索
    filterable: true,
    remoteFunc: ({ query }) => {
      return new Promise((resolve, reject) => {
        // 传入平时使用的get方法获取请求数据
        const data = query.length > 0 ? [{
          label: '高中',
          value: 1
        }, {
          label: '初中',
          value: 2
        }, {
          label: '小学',
          value: 3
        }] : []
        resolve(data)
      })
    }
  }
}
```

