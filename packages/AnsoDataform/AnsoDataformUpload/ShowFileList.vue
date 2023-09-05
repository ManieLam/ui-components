<template lang="pug">
div.form-fileList
  div.form-file-item(v-if="uploadType !== 'button'")
    img.el-upload-list__item-thumbnail(:src="url" v-on:error.once="errorImg($event)" alt="")
    span.el-upload-list__item-actions
      span.el-upload-list__item-preview(v-if='isPreview' @click="handlePreview(file)")
        i.el-icon-zoom-in
      span.el-upload-list__item-download(v-if='isDownload' @click="handleDownload(file)")
        i.el-icon-download
      span.el-upload-list__item-delete(@click="handleRemove(file)")
        i.el-icon-delete
      span.file-name(:title="file.fileName") {{file.fileName}}
  div.textList(v-else)
    a.el-upload-list__item-name
      i.el-icon-link {{file.fileName}}
        img.defalutImg(:src="url")
      i.el-icon-close(@click="handleRemove(file)")
      i.el-icon-download(v-if='isDownload' @click="handleDownload(file)") 下载
      i.el-icon-zoom-in(v-if='isPreview' @click="handlePreview(file)") 预览
  //- el-dialog.dialogfile(:visible.sync="dialogVisible" :append-to-body="true")
  //-   img.dialogImg(v-if="isImage(file.fileType) && uploadType !== 'button'" :src="dialogImageUrl" alt="")
  //-   iframe(v-else :src='ifarmeSrc' width='100%' height='600px' frameborder='1')
</template>

<script>
/**
 * 上传`
 * @props props参数
 * @prop {Boolean} isDownload 是否支持下载
 * @prop {Boolean} isPreview 是否支持预览
**/
import axios from 'axios'
import fileFormat from './fileFormat.js'
const base64Img = require('packages/base64Img.json')
export default {
  name: 'showFileList',
  props: {
    uploadType: String,
    file: {
      type: Object,
      default: () => {}
    },
    isDownload: {
      type: Boolean,
      default: true
    },
    isPreview: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      errorUrl: 'this.src="' + base64Img.imgError + '"',
      defaultUrl: base64Img.upload,
      imgType: ['jpg', 'png', 'bmp', 'gif', 'tiff', 'svg', 'JPG', 'PNG', 'BMP', 'GIF', 'TIFF', 'jpeg', 'tif']
    }
  },
  computed: {
    url () {
      // console.log('this.file.url', this.file.url)
      return this.isImage(this.file.fileType) ? this.file.url : this.defaultUrl
    }
  },
  methods: {
    errorImg (event) {
      var img = event.srcElement
      img.src = base64Img.imgError
      img.onerror = null // 控制不要一直跳动
    },
    isImage (fileType) {
      // 判断文件类型是否为image
      return this.imgType.includes(fileType)
    },
    handlePreview (file) {
      // console.log('file', file)
      this.$emit('handlePreview', file)
    },
    handleRemove (file) {
      this.$emit('handleRemove', file)
    },
    handleDownload (file) {
      // TODO支持后端返回数据内容下载
      // 生成a标签，模拟click下载files
      const config = {
        url: file.url,
        method: 'get',
        responseType: 'arraybuffer'
      }
      // 利用a标签自定义下载文件名
      const link = document.createElement('a')
      axios(config).then(res => {
        const blobType = fileFormat[file.fileType] || null
        // console.info('blobType:', blobType)
        const blob = new Blob([res.data], { type: blobType })
        // const blob = new Blob([res.data], { type: res.headers['content-type'] })
        const objectUrl = URL.createObjectURL(blob) // 创建URL
        // console.info('objectUrl:', objectUrl)
        link.href = objectUrl
        link.download = file.fileName // 自定义文件名
        link.click() // 下载文件
        setTimeout(() => {
          URL.revokeObjectURL(objectUrl) // 释放内存
        })
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.textList
  width: 100%
  .el-upload-list__item-name [class^=el-icon]
    line-height: 28px
    cursor: pointer
    .defalutImg
      display: none
.dialogImg
  width: 100%
  .el-upload-list__item-actions
    font-size: 16px
</style>
<style scoped>
.form-fileList {
  display: flex;
  flex: 1;
  align-items: center;
}
.form-fileList >>> .el-icon-close {
  vertical-align: top;
  top: 0;
}
.form-fileList >>> .form-file-item {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.textList >>> .el-icon-download, .el-icon-zoom-in {
  float: right
}
.textList >>> .el-icon-download:before, .el-icon-zoom-in:before {
  /* margin-right: 5px */
}
.form-fileList >>> .el-icon-link:before{
  margin-right: 4px
}
.form-fileList >>> .el-upload-list__item {
  color: #000;
  font-size: 14px;
}
.form-fileList >>> .el-upload-list__item-name [class^=el-icon] {
  font-size: 12px;
  color: #000;
  padding-left: 0
}
.form-fileList >>> .el-upload-list__item-name {
  padding-left: 0
}
.dialogfile >>> .el-icon-close {
  display: block !important
}
.form-fileList >>> .el-upload-list__item-actions {
  font-size: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.form-fileList >>> .file-name {
  margin: 0;
  font-size: 12px;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90%;
  white-space: nowrap;
  line-height: 34px;
  left: 5px;
  right: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis
}
</style>
