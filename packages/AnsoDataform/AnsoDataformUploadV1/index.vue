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
  el-dialog.dialogfile(v-if="currentImage" :visible.sync="dialogVisible" :title="dialogTitle" :append-to-body="true")
    PdfOnlineViewer(v-if="isPDF" :file="currentImage")
    WordOnlineViewer(v-if="isWord" :file="currentImage")
    ExcalOnlineViewer(v-if="isExcal" :file="currentImage")
</template>

<script>
// 上传组件版本-1，支持多种格式传入，出入参不一致
/**
 * 上传`
 * @props props参数
 * @prop {String} uploadType 下载展示效果类型，button\drag\picture
 * @prop {String} tip 下载备注文字
**/
// 优化
// 出参入参一致, 添加组件出参入参可配置格式 ok
/**
 * 考虑入参可以支持[Array, String, Number], 但是到组件组件里面还是需要转成数组处理内容
 * 1. 当前支持入参是附件数组的全部内容, 出参是附件数组id
 * 2. 现在存在的情况有, 当前上传的附件, 需要赋值到别的附件组件上 (如今上传出参是数组id, 不复核入参是数组全部数据)
 */
// 需要可以支持接受id传入，string ok
/**
 * 1. 当前支持获取后端给的全部的附件的数据, 填入组件数据
 * 2. 现在存在的情况有, 获取到的值, * 附件数组id * 附件单个id  考虑是否支持单个 shortUrl
 */
// watch监听属性响应，透传属性 limitParams OK
// disabled 禁止样式添加 OK
// TODO: 存在一种业务情况，即后端给到我们的数据是单纯的 shortUrl 数组，当前组件做到可支持展示，但是如果按约定需要提交给后端是id 的情况，则会拿不到shortUrl 数组的id
/**
 * 1. 这种情况考虑告知后端，需要上传什么内容需要给足什么内容
 */
import { uniqBy, compact, isFunction, isEmpty, isArray, cloneDeep } from 'lodash'
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
    value: [Array, String, Number],
    uploadType: {
      type: String,
      default: 'picture'
    },
    tip: {
      type: String,
      default: '支持扩展名：.jpg .png .xlx .doc .docx .pdf...'
    },
    // TODO上传需要配合
    resource: String,
    // 展示接口
    showResource: String,
    showResourceType: String, // 展示接口的使用類型 id\shortUrl
    showResourceFileType: {
      type: String,
      default: 'jpg'
    }, // 假设进来的value值只存在单纯的 id\shortUrl, 则需要传入格式供预览提供效果
    resType: String,
    compress: {
      // 压缩比例(值越小, 压缩强度越大)
      type: Number,
      default: 0.5
    },
    uploadResourceConfig: Function,
    uploadOutputResponse: Function // 组件輸出數據的配置轉換
  },
  data () {
    const formData = new FormData()
    return {
      loading: false,
      fieldName: 'file',
      index: 0,
      currentImage: {},
      formData: formData,
      fileList: [],
      deepFileList: [],
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
    valueJson () {
      // console.log('this.value', this.value)
      return JSON.stringify(this.value)
    }
  },
  watch: {
    valueJson: {
      immediate: true,
      handler (val, oldVal) {
        this.changeValues(this.value)
        this.emitFiles(this.fileList)
      }
    }
  },
  methods: {
    changeValues (file = this.value) { // 根据进来的value, 转化为内部适合的格式
      if ((isArray(file) && isEmpty(file)) || file === null || file === undefined) {
        this.fileList = []
        return
      }
      // 数组 && 数组里面存在对象 如果传值进来是对象数组才更新fileList
      if (file && file[0] && typeof file[0] === 'object') {
        const fileList = this.value.map(item => item)
        // 如果组件存在默认值，则需要根据输出规则先输出数据
        this.deepFileList = cloneDeep([...this.deepFileList, ...file])
        this.showFileList(fileList)
      }
      // 字符串 数值
      // 数组 && 数组里面存在字符串或数值
      if (isArray(file) && !isEmpty(file) && file.every(item => typeof item === 'string' || typeof item === 'number')) {
        const fileList = file.map(item => this.changeSingleImage(item))
        // 如果组件存在默认值，则需要根据输出规则先输出数据
        this.showFileList(fileList)
      }
      // 字符串 数值
      if (file && (typeof file === 'string' || typeof file === 'number')) {
        const defaultFiles = [this.changeSingleImage(file)]
        // 如果组件存在默认值，则需要根据输出规则先输出数据
        this.showFileList(defaultFiles)
      }
    },
    changeSingleImage (file) {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      const defalutFile = compact(this.deepFileList).find(item => item[showResourceType] === file)
      return !isEmpty(defalutFile) ? defalutFile : {
        shortUrl: showResourceType === 'shortUrl' ? file : null,
        id: showResourceType === 'id' ? file : null,
        fileType: this.showResourceFileType,
        fileName: '附件'
      }
    },
    /**
     * @name handlechange
     * @description 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
     * @param {Object} file 当前变更操作的文件
     * @param {Array} fileList 已上传的所有文件
     * @var {Number} this.index 允许多选的状态下，需要记录当前上传的所有文件数量
    */
    handlechange (file, fileList) {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      if (this.multiple) this.index = fileList.filter(item => !item[showResourceType]).length
      this.loading = true
      if (fileList && fileList.length) {
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
          this.emitFiles([...this.fileList, ...res.data.data.data])
          this.deepFileList = cloneDeep([...this.deepFileList, ...res.data.data.data])
          this.showFileList(res.data.data.data) // 输出展示数据
        }
      }).catch(err => {
        this.closeLoading()
        this.$message({
          showClose: true,
          message: '网络连接异常，请检查接口连接',
          type: 'error'
        })
        console.log('err', err)
      })
    },
    closeLoading () {
      // 判断是否为多选，是则上传一个总数减一，当index数量为0，关闭loading
      if (this.multiple) {
        this.index--
        // console.log('减后的index', this.index)
        if (this.index === 0) this.loading = false
      } else this.loading = false // 不是多选直接关闭loading
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
      const showResource = this.showResource || this.$fileDownloadResource
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      const fileGroup = [
        ...compact(files).map(file => {
          const { shortUrl, fileType, fileName, id } = file
          return {
            id: id,
            url: `${showResource}/${showResourceType === 'shortUrl' ? shortUrl : id}`, // 展示文件src
            fileType: fileType,
            fileName: fileName,
            shortUrl: shortUrl
          }
        })
      ]
      this.fileList = fileGroup.map((file, index) => { return { ...file, index } })
    },
    /**
     * @name emitFiles
     * @description 广播到上一级
     * @param {Array} files 文件數組
     * @var uploadOutputResponse 组件默認輸出數據的配置
     * @var this.$attrs.formAttrs.uploadOutputResponse 全局輸出數據的配置
    */
    emitFiles (defaultFiles = []) {
      const showResourceType = this.showResourceType || this.$fileDownloadResourceType
      const files = uniqBy(defaultFiles, showResourceType)
      const defalutUploadTransConfig = ({ files }) => { // 組件默认输出文件的數組id
        return files.map(file => file.id)
      }
      const globalConfig = this.$attrs.formAttrs && isFunction(this.$attrs.formAttrs.uploadOutputResponse)
      // 輸出值配置信息内容遵循： 组件配置 > 全局配置 > 默认配置的优先级原则
      const output = isFunction(this.uploadOutputResponse)
        ? this.uploadOutputResponse({ files }) : globalConfig ? this.$attrs.formAttrs.uploadOutputResponse({ files }) : defalutUploadTransConfig({ files })
      this.$emit('input', output)
      this.$emit('uploadFiles', files)
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
      this.deepFileList = this.deepFileList.filter(item => item[showResourceType] !== file[showResourceType])
      this.emitFiles(this.fileList) // 广播到上级组件
    },
    handlePreview (image) { // 预览文件内容
      this.currentImage = image // 获取当前点击附件对象内容
      if (this.imgType.includes(image.fileType)) {
        this.$refs.file.$viewer.update()
        // console.log(this.$refs.file.$viewer)
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
.form-upload >>> .el-upload-list__item {
  margin-top: 0;
  transition: none !important
}
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
