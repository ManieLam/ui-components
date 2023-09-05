<template lang="pug">
div.upload_content
  viewer(ref="file" :images="fullFileUrl")
    el-upload.form-upload(
      action=""
      v-loading="loading"
      :class="this.uploadType"
      v-bind.sync="limitParams"
      :file-list="fileList"
      :auto-upload="false"
      :list-type='listType'
      :drag='isDrag'
      :on-change="handlechange"
      :on-exceed="handleExceed")
      el-button.el-icon-upload2(v-if="isButton" v-bind="$attrs") 点击上传
      i.el-icon-plus(v-if="isPicture")
      div.dragBox(v-if="isDrag")
        i.el-icon-upload
        div.el-upload__text 点击或将文件拖拽到这里上传
        span.drag-tip {{tip}}
      div.el-upload__tip(v-if="!isDrag && tip" slot="tip") {{tip}}
      div.show-file(slot="file" slot-scope="{file}")
        ShowFileList(
          v-bind="$attrs"
          :file="file"
          :uploadType="uploadType"
          @handleRemove="handleRemove"
          @handlePreview="handlePreview")
  el-dialog.dialogfile(v-if="currentImage && dialogVisible" :visible.sync="dialogVisible" :title="dialogTitle" :append-to-body="true")
    PdfOnlineViewer(v-if="isPDF" :file="currentImage")
    WordOnlineViewer(v-if="isWord" :file="currentImage")
    ExcalOnlineViewer(v-if="isExcal" :file="currentImage")
</template>

<script>
/**
 * 上传`
 * @props props参数
 * @prop {String} uploadType 下载展示效果类型，button\drag\picture
 * @prop {String} tip 下载备注文字
**/
import { compact, isFunction, cloneDeep } from 'lodash'
import axios from 'axios'
import lrz from 'lrz'
import viewer from 'v-viewer/src/component.vue'
import 'viewerjs/dist/viewer.css'
import onlineMixin from '../../AnsoInfoRender/Online/onlineMixin.js'
import ShowFileList from './ShowFileList'
import limitMixin from './limitMixin.js'
export default {
  name: 'AnsoDataformUpload',
  mixins: [limitMixin, onlineMixin],
  components: {
    ShowFileList,
    viewer
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    uploadType: {
      type: String,
      default: 'picture'
    },
    tip: {
      type: String,
      default: '支持扩展名：.jpg .png .xlx .doc .docx .pdf...'
    },
    resource: String,
    // 展示接口
    showResource: String,
    showResourceType: String, // 展示接口的使用類型 id\shortUrl
    resType: String,
    compress: {
      // 压缩比例(值越小, 压缩强度越大)
      type: Number,
      default: 0.5
    },
    uploadResourceConfig: Function
  },
  data () {
    const formData = new FormData()
    return {
      loading: false,
      fieldName: 'file',
      index: 0,
      currentImage: {},
      formData: formData,
      imgType: ['jpg', 'png', 'bmp', 'gif', 'tiff', 'svg', 'JPG', 'PNG', 'BMP', 'GIF', 'TIFF', 'jpeg', 'tif']
    }
  },
  computed: {
    isButton () {
      // 下载展示类型为button
      return this.uploadType === 'button'
    },
    isDrag () {
      // 下载展示类型为drag
      return this.uploadType === 'drag'
    },
    isPicture () {
      // 下载展示类型为picture
      return this.uploadType === 'picture'
    },
    listType () {
      // 根据下载展示类型来匹配文件列表的类型
      if (this.isButton) return 'text'
      else if (this.isDrag) return 'picture-card'
      else return 'picture-card'
    },
    postResource () { // 上传接口
      const resType = this.resType ? `?resType=${this.resType}` : ''
      const resource = this.resource || this.$fileUploadResource
      return `${resource}${resType}`
    },
    fullFileUrl () {
      return this.fileList.map(file => file.url)
    },
    fileList: {
      get () {
        /**
         * uid: el-upload 组件渲染文件时的 key值, 设为固定值就不会闪了
         */
        const list = this.value?.map((file, index) => { return { ...file, index, uid: file.id } }) || []
        return this.changeShowFile(list)
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {
    /**
     * @name handlechange
     * @description 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     * @param {Object} file 当前变更操作的文件
     * @param {Array} fileList 已上传的所有文件
     * @var {Number} this.index 允许多选的状态下，需要记录当前上传的所有文件数量
    */
    handlechange (file, fileList) {
      this.loading = true
      if (fileList && fileList.length) {
        this.fileList = cloneDeep(this.fileList) // 文本变化时就清掉零时文件 (解决上传接口返回后文件替换时动画效果太显眼的问题)
        this.checkFile(file.raw)
      }
    },
    /**
     * @name checkFile
     * @description 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     * @param {File} file 当前操作的文件格式内容
    */
    checkFile (file) {
      // 判断当前文件格式，文件大小是否允许上传，如受到限制，则保留为原有的文件列表
      if (!this.filesTypeLimit(file) || !this.fileSizeLimit(file)) {
        // this.fileList = cloneDeep(this.fileList) // 前面已经做了
        this.loading = false
        return
      }
      // 判断是否为图片, 如果是则做压缩处理,否则直接上传
      if (file.type.indexOf('image') !== -1) {
        this.lrzFile(file)
      } else {
        // 上传文件
        this.setUploadFile(file)
      }
    },
    lrzFile (file) {
      // 压缩文件
      lrz(file, {
        width: 1000,
        fieldName: this.fieldName, // 后端接收的字段名. 默认是file
        quality: this.compress // 压缩质量 0-1 默认不填为0.7
      })
        .then(data => {
          this.setUploadFile(data.origin)
        })
        .catch(err => {
          console.log(err)
        })
    },
    /**
     * @name setUploadFile
     * @description 上传文件formData的内容添加
     * @param {File} file 当前操作的文件格式内容
    */
    setUploadFile (file) {
      // 文件上传的处理
      this.formData.append('files', file, file.name) // 添加到请求体
      // 提交
      this.postFile(this.formData)
      // 初始化数据
      this.formData = ''
      this.formData = new FormData()
    },
    /**
     * @name postFile
     * @description 上传文件
     * @param {FormData} formData formData上传内容
     * @var defalutConfig 默认的上传配置
     * @var uploadResourceConfig 组件传输的上传配置
     * @var this.$attrs.formAttrs.uploadResourceConfig 全局传输的上传配置
    */
    postFile (formData) { // 上传接口
      const defalutConfig = ({ url, params }) => ({ // 传入默认配置
        url,
        method: 'post',
        data: params
      })
      // 接口定制配置信息内容遵循： 组件配置 > 全局配置 > 默认配置的优先级原则
      const config = isFunction(this.uploadResourceConfig)
        ? this.uploadResourceConfig({ url: this.postResource, params: formData }) : this.$attrs.formAttrs && isFunction(this.$attrs.formAttrs.uploadResourceConfig)
          ? this.$attrs.formAttrs.uploadResourceConfig({ url: this.postResource, params: formData }) : defalutConfig({ url: this.postResource, params: formData })
      // console.log('config', config)
      axios(config).then(res => {
        this.closeLoading()
        if (res && res.data) {
          this.showFileList(res.data.data.data) // 输出展示数据
        }
      }).catch(err => {
        this.closeLoading()
        this.$message({
          showClose: true,
          message: '网络连接异常，请检查接口连接',
          type: 'error'
        })
        // this.fileList = cloneDeep(this.fileList) // 前面已经做了
        console.log('err', err)
      })
    },
    closeLoading () {
      this.loading = false
    },
    /**
     * @name showFileList
     * @description 展示文件内容
     * @param {Array} files 后端返回的文件内容
     * @var showResource 展示接口，课组件配置，可全局配置，默认'/system/file/download/shortUrl'
     * @var uploadResourceConfig 组件传输的上传配置
     * @var this.$attrs.formAttrs.uploadResourceConfig 全局传输的上传配置
     * @var this.fileList 原本存在的文件列表+后端返回后重新整合的文件列表
    */
    showFileList (files) {
      // 显示文件列表
      const fileGroup = this.changeShowFile(compact(files))
      this.fileList = [...this.fileList, ...fileGroup]
    },
    /**
     * 转换为组件内可展示的格式
     */
    changeShowFile (files = []) {
      const showResource = this.showResource || this.$fileDownloadResource
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      return files.map(file => {
        const { shortUrl, id } = file
        return {
          ...file,
          url: `${showResource}/${showResourceType === 'shortUrl' ? shortUrl : id}` // 展示文件src
        }
      }) || []
    },
    /**
     * @name handleRemove
     * @description 移除文件
     * @param {Oblect} file 操作移除的某个文件
     * @var this.fileList 整个文件列表
    */
    handleRemove (file) {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType // 获取当前唯一的标识的key
      this.fileList = this.fileList.filter(item => item[showResourceType] !== file[showResourceType])
    },
    handlePreview (image) { // 预览文件内容
      this.currentImage = image // 获取当前点击附件对象内容
      if (this.imgType.includes(image.fileType)) {
        this.$refs.file.$viewer.update()
        this.$refs.file.$viewer.view(image.index)
        return
      }
      this.dialogVisible = true
      this.dialogTitle = image.fileName
    }
  }
}
</script>
<style lang="sass" scoped>
.form-upload
  .dragBox
    width: 100%
    height: 100%
    font-size: 0
    position: relative
    .drag-tip
      line-height: 25px
      position: absolute
      font-size: 12px
      left: 0
      right: 0
      margin: auto
      bottom: 15%
      color: #a9a6a6
.picture
  font-size: x-large
.picture, .drag, .form-upload
  .el-upload__tip
    font-size: 14px
    line-height: 22px
    margin-top: 5px
.upload_content[disabled]
  ::v-deep .el-upload-dragger
    background-color: #F5F5F5
    cursor: not-allowed
    &:hover
      border-color: #d9d9d9
  ::v-deep .el-upload-list__item-delete
    pointer-events: none
  ::v-deep .el-icon-close
    pointer-events: none
</style>
<style scoped>
.upload_content >>> .el-dialog {
  width: 80%;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto !important;
  height: 90%
}
.upload_content >>> .el-dialog__body {
  height: 94%
}
.dragBox >>> .el-upload__text {
  line-height: 0;
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 35%
}
.picture >>> .el-upload-list, .drag>>> .el-upload-list{
  line-height: 0;
  font-size: 0;
  display: contents;
}
.picture >>> .el-upload-list__item {
  width: 104px;
  height: 104px;
  margin: 0 8px 0 0;
}
.drag >>> .el-upload-list__item {
  width: 104px;
  height: 104px;
  margin: 0 8px 0 0;
}
.picture >>> .el-upload--picture-card {
  width: 104px;
  height: 104px;
}
.picture >>> .el-icon-plus {
  font-size: 22px;
  vertical-align: top;
  margin-top: 42px;
  caret-color: transparent;
}
.drag >>> .el-upload--picture-card {
  border: none;
  display: block;
  height: 180px;
  width: 360px;
}
/* .form-upload >>> .el-upload-list__item {
  margin-top: 0;
  transition: none !important
} */
.form-upload >>> .show-file {
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
}
.button >>> .el-upload-list__item:first-child {
  margin-top: 10px !important
}
.form-upload >>> .el-icon-upload2:before {
  margin-right: 10px
}
.el-icon-upload2 >>> .el-icon-loading {
  margin-right: 10px
}
.el-icon-plus >>> .circular {
  height: 25px;
  width: 25px;
  margin-top: 8px;
}
.dragBox >>> .el-loading-spinner {
  margin-top: 0;
  top: 20%;
}
.dragBox >>> .circular {
  height: 35px;
  width: 35px;
  margin-top: 0;
}
</style>
