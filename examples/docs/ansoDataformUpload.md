## 上传组件 AnsoDataformUpload

AnsoDataformUpload为上传组件
提供属性如下：
| 参数    | 说明           | 类型   | 可选值 | 默认值 | 备注 |
| ------- | -------------- | ------ | ------ | ------ | ------ |
| value | 文件值 | Array | ------ | ------ | ------ |
| uploadType | 下载展示效果类型，button\drag\picture | String | button\drag\picture | picture | 选填 |
| tip | 下载备注文字 | String | ------ | '支持扩展名：.jpg .png .xlx .doc .docx .pdf...' | 选填 |
| disabled | 是否禁用 | Boolean | ------ | true、false | false | 选填 |
| isDownload | 是否支持下载 | Boolean | true、false | true | 选填 |
| isPreview | 是否支持预览 | Boolean | true、false | true | 选填 |
| multiple | 是否支持多选 | Boolean | true、false | false | 选填 |
| limit | 限制上传数量 | Number | ------ | ------ | 选填 |
| typeLimit | 限制文件上传类型 | Array | ------ | ------ | 选填 |
| compress | 文件压缩比例(值越小, 压缩强度越大) | Number | ------ | 0.5 | 选填 |
| resource | 上传接口 | String | ------ | '全局入口配置默认/system/file/upload' | 选填 |
| resType | 上传所带参数 | String | ------ | ------ | 选填 |
| showResource | 展示接口 | String | ------ | 全局入口配置默认'/system/file/download/shortUrl' | 选填 |
| showResourceType | 展示接口的使用類型 | String | shortUrl, id | 全局入口配置默认'shortUrl' | 选填 |
| uploadResourceConfig | 接口配置信息重新定义 | Function | ------ | 见下文 | 更改接口配置信息，组件配置优先级高于表单全局配置 |


默认接口配置信息如下，如果服务端接口有差别，使用uploadResourceConfig格式化：
```
// 回调参数url：resource配置的数据接口
// 回调参数params：文件格式参数
uploadResourceConfig: ({ url, params }) => ({
  url,
  method: 'post',
  data: params
})
```


基础配置说明：
```js
column: {
  form: {
    // 用于表单判断输出类型, 必传
    tag: 'file',
    uploadType: 'drag',
    typeLimit: ['jpg', 'png'],
    limit: 3,
    tip: '上传文件大小不能超过3个, 且文件类型为[jpg, png]',
    // 不预览，不下载
    isDownload: false,
    isPreview: false,
    multiple: 3
  }
}
```

