<template lang="pug">
div.file_content
  viewer(v-if="files.length" ref="file" :class="showType" :images="imagesList" :options="viewerOptions")
    div.file_box(
      v-for="image in files"
      :key="image.id")
      div.attachText(v-if="showType === 'attachText'")
        span {{image.fileName}}
          i(@click="download(image)") 下载
          i(@click="onlineView(image)") 查看
      div.image_box(v-if="showType === 'image'")
        el-image.infoRender-files(
          :style="imageStyle"
          :src="image.src"
          :fit="fit"
          :onerror="errorUrl")
        div.el-upload-list__item-actions
          div.shadow
          span {{image.fileName}}
          i.el-icon-zoom-in(@click="onlineView(image)")
          i.el-icon-download(@click="download(image)")
  span(v-else) --
  el-dialog.dialogfile(v-if="currentImage" :visible.sync="dialogVisible" :title="dialogTitle" :append-to-body="true")
    PdfOnlineViewer(v-if="isPDF" :file="currentImage")
    WordOnlineViewer(v-if="isWord" :file="currentImage")
    ExcalOnlineViewer(v-if="isExcal" :file="currentImage")
    p.tip-mesg(v-else) 暂不支持该类型文件预览
</template>

<script>
import viewer from 'v-viewer/src/component.vue'
import 'viewerjs/dist/viewer.css'
import axios from 'axios'
import onlineMixin from './Online/onlineMixin.js'
import { getFileList } from './renderFile'
const base64Img = require('packages/base64Img.json')
export default {
  name: 'InfoRenderFiles',
  mixins: [onlineMixin],
  components: {
    viewer
  },
  props: {
    images: [Array, String, Number],
    // 设置图片如何适应容器框
    fit: {
      type: String,
      default: 'contain' // fill / contain / cover / noneimage / scale-down
    },
    showType: {
      type: String,
      default: 'image' // image / attachText
    },
    imageStyle: {
      type: Object,
      default: () => ({
        height: '105px',
        width: '105px'
      })
    },
    viewerOptions: { // 相关配置可查看https://github.com/fengyuanchen/viewerjs#options
      type: Object,
      default: () => ({})
    },
    // 展示接口
    showResource: String,
    showResourceType: String, // 展示接口的使用類型
    showResourceFileType: {
      type: String,
      default: 'jpg'
    } // 假设进来的images值只存在单纯的 id\shortUrl, 则需要传入格式供预览提供效果
  },
  computed: {
    files () {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      const showResource = this.showResource || this.$fileDownloadResource
      const imagesGroup = this.images || []
      return getFileList(showResource, showResourceType, imagesGroup)
    },
    imagesList () {
      return this.files.map(({ src }) => src)
    }
  },
  data () {
    // const imgError = require('assets/imgs/imgError.png')
    return {
      errorUrl: 'this.src="' + base64Img.imgError + '"'
    }
  },
  methods: {
    changeSingleImage (image) {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      return {
        shortUrl: showResourceType === 'shortUrl' ? image : null,
        id: showResourceType === 'id' ? image : null,
        fileType: this.showResourceFileType,
        fileName: '附件'
      }
    },
    onlineView (image) {
      this.currentImage = image // 获取当前点击附件对象内容
      if (image.type === 'image') {
        this.$refs.file.$viewer.update()
        // console.log(this.$refs.file.$viewer)
        this.$refs.file.$viewer.view(image.index)
        return
      }
      this.dialogVisible = true
      this.dialogTitle = image.fileName
    },
    download (image) {
      // 生成a标签，模拟click下载files
      // 生成a标签，模拟click下载files
      const config = {
        url: image.path,
        method: 'get',
        responseType: 'arraybuffer'
      }
      // 利用a标签自定义下载文件名
      const link = document.createElement('a')
      axios(config).then(res => {
        console.log(res)
        const blob = new Blob([res.data])
        const objectUrl = URL.createObjectURL(blob) // 创建URL
        link.href = objectUrl
        link.download = image.fileName // 自定义文件名
        link.click() // 下载文件
        URL.revokeObjectURL(objectUrl) // 释放内存
      }).catch(err => {
        console.log(err)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.tip-mesg
  @include font-large
  text-align: center
.image
  display: flex
  flex-flow: wrap
  grid-gap: 8px
.attachText
  display: flex
  flex-direction: column
.file_content
  display: flex
  ::v-deep .el-dialog
    width: 80%
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    margin: auto !important
    height: 90%
    .el-dialog__body
      height: 94%
  .file_box
    display: inline-flex
    .attachText
      i
        cursor: pointer
        font-style: normal
        margin-left: 10px
        color: #1890FF
    .image_box
      position: relative
      &:hover
        ::v-deep .el-upload-list__item-actions
          text-align: center
          display: flex
      .infoRender-files
        vertical-align: top
        border: 1px solid #eaeaea
      ::v-deep .el-upload-list__item-actions
        display: flex
        align-items: center
        justify-content: center
        position: absolute
        width: 100%
        height: 100%
        top: 0
        display: none
        span
          margin: 0
          font-size: 12px
          position: absolute
          bottom: 0
          left: 0
          width: 90%
          white-space: nowrap
          line-height: 34px
          left: 5px
          right: 5px
          white-space: nowrap
          overflow: hidden
          text-overflow: ellipsis
          color: #FFF
        .shadow
          position: absolute
          width: 100%
          height: 100%
          top: 0
          background-color: #000
          opacity: 0.5
        i
          cursor: pointer
          padding: 10px
          font-size: 16px
          color: #FFF
          z-index: 1
</style>
