export default {
  /**
   * @props props参数
   * @prop {Number} limit 限制上传数量
   * @prop {Array} typeLimit 限制文件上传类型
   * @prop {Boolean} disabled 限制是否置灰
   * @prop {Boolean} multiple 限制是否允许多选
  **/
  data () {
    return {}
  },
  props: {
    limit: Number,
    multiple: {
      type: Boolean,
      default: true
    },
    typeLimit: {
      type: Array,
      default: () => []
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    limitParams () {
      return {
        disabled: this.disabled,
        limit: this.limit,
        multiple: this.multiple,
        accept: this.multiple ? this.typeLimit.join(',') : null
      }
    }
  },
  methods: {
    /**
     * @name filesTypeLimit
     * @description 添加文件类型限制
     * @param {Object} file 当前变更操作的文件
     * @param {Array} fileList 已上传的所有文件
     * @var {Array} this.typeLimit 组件定义的可传输类型
     * @return {Boolean} 是否为当前允许的格式
    */
    filesTypeLimit (file, fileList) {
      const filename = file.name.split('.')
      const fileType = filename[filename.length - 1]
      if (this.typeLimit.length > 0 && !this.typeLimit.includes(`${fileType}`)) {
        this.$message({
          message: `无法上传，当前限制可上传格式为：${this.typeLimit.join(',')}`,
          type: 'warning'
        })
        return false
      } else return true
    },
    /**
     * @name fileSizeLimit
     * @description 添加文件大小限制
     * @param {Object} file 当前变更操作的文件
     * @param {Array} fileList 已上传的所有文件
     * @return {Boolean} 是否为当前允许的文件大小
    */
    fileSizeLimit (file, fileList) {
      // 判断文件是否超过10M，超过则不能上传
      const size = file.size / 1024 / 1024
      if (size >= 10) {
        this.$message({
          message: '上传文件大小不能超过 10MB!',
          type: 'warning'
        })
        return false
      } else return true
    },
    // isPasslimit (file, fileList) {
    //   // 是否通过数量，类型的限制
    //   if (this.filesTypeLimit(file, fileList) && this.fileSizeLimit(file, fileList)) {
    //     // 添加文件类型参数，可供判断
    //     return fileList.map((item, index) => {
    //       const filename = item.name.split('.')
    //       const fileType = filename[filename.length - 1]
    //       return {
    //         ...item,
    //         fileName: item.name,
    //         fileType: fileType,
    //         index: index,
    //         // TODO需要post对接后台取得内容id,this.postFile()
    //         // 后续不需要在从此处赋值给id
    //         id: item.uid
    //       }
    //     })
    //   } else {
    //     return fileList.filter(item => item.uid !== file.uid)
    //   }
    // },
    handleExceed (files, fileList) { // 限制文件上传个数
      this.$message({
        message: `当前限制上传文件为： ${this.limit} 个文件`,
        type: 'warning'
      })
    }
  }
}
