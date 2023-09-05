<template lang="pug">
div
  span 编辑器
  hr
  Editor#tinymce(:init="init")
</template>

<script>
import tinymce from 'tinymce'// 必须引入
import Editor from '@tinymce/tinymce-vue'// 必须引入
import 'tinymce/themes/silver/theme'// 必须引入
import 'tinymce/models/dom/model'// 必须引入
import 'tinymce/icons/default/icons'// 必须引入
import 'tinymce/skins/ui/oxide/skin.css' // 必须引入

import 'tinymce/plugins/image' // 图像
import 'tinymce/plugins/link' // 链接插件允许用户将外部资源
import 'tinymce/plugins/autolink' // 自动链接
import 'tinymce/plugins/lists' // 列样式
import 'tinymce/plugins/advlist' // 向控件添加 CSS样式的数字格式和项目符号类型
import 'tinymce/plugins/anchor' // 锚点, id: xxx
import 'tinymce/plugins/autosave' // 如果用户在编辑器中有未保存的更改，自动保存插件会向用户发出警告
import 'tinymce/plugins/code' // html
import 'tinymce/plugins/table' // 表格
import 'tinymce/plugins/preview' // 预览
import 'tinymce/plugins/wordcount' // 计数器
import 'tinymce/plugins/pagebreak' // 分页符支持

import axios from 'axios'
const httpBaseURL = '/api'
export const getFileURL = (showResource, showResourceType, shortUrl, id) => {
  return `${showResource}/${showResourceType === 'shortUrl' ? shortUrl : id}`
}
export default {
  name: 'app',
  components: {
    Editor
  },
  data () {
    return {
      tinymceHtml: '',
      init: {
        skin_url: 'tinymce/skins/ui/oxide-dark', // 主题
        height: 600,
        // 可用插件
        plugins: 'anchor link autolink autosave code codesample colorpicker contextmenu directionality  hr image imagetools importcss insertdatetime lists advlist media nonbreaking noneditable pagebreak paste preview print save  table  textcolor wordcount',
        // 工具栏
        toolbar: [
          'restoredraft undo redo preview | styles | bold italic underline strikethrough bullist numlist alignleft aligncenter alignright | pagebreak code',
          'link image table | forecolor backcolor '
        ],
        file_picker_types: 'file image media',
        branding: false,
        images_upload_url: `${httpBaseURL}/fileserver/upload`, // 上传图片的后端接口
        images_upload_handler: (blobInfo, progress) => new Promise((resolve, reject) => {
          const formData = new FormData()
          formData.append('files', blobInfo.blob(), blobInfo.filename())
          axios({
            url: `${httpBaseURL}/fileserver/upload`, // 预览图片的url
            method: 'post',
            data: formData
          }).then(res => {
            const result = res.data.data.data[0]
            const location = `${httpBaseURL}/fileserver/download/id/${result.id}`
            // 需要专门转出:location 字段
            resolve(location) // 输出展示数据
          }).catch(err => {
            console.log('err', err)
          })
        })
      }
    }
  },
  methods: {

  },
  mounted () {
    console.log('mounted', tinymce)
    tinymce.init({
      selector: '#tinymce'
    })
  }
}
</script>
