import PdfOnlineViewer from './pdfOnlineViewer'
import WordOnlineViewer from './wordOnlineViewer'
import ExcalOnlineViewer from './excalOnlineViewer'
const workTypeGroup = ['doc', 'docx']
const excalTypeGroup = ['xls', 'xlsx']
export default {
  components: {
    PdfOnlineViewer,
    WordOnlineViewer,
    ExcalOnlineViewer
  },
  data () {
    return {
      currentImage: {}, // 存储当前点击附件对象内容
      // 弹窗配置
      dialogVisible: false,
      dialogTitle: ''
    }
  },
  props: {},
  computed: {
    isPDF () { // 判断是否为pdf
      return this.dialogVisible && this.currentImage.fileType === 'pdf'
    },
    isWord () { // 判断是否为word
      return this.dialogVisible && workTypeGroup.includes(this.currentImage.fileType)
    },
    isExcal () { // 判断是否为excal
      return this.dialogVisible && excalTypeGroup.includes(this.currentImage.fileType)
    }
  },
  watch: {},
  methods: {}
}
