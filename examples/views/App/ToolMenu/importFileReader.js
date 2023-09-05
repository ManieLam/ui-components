/**
 * @name 将import的内容在“本页效果源代码”里展示出来
 * 1.获取当前页面内容
 * 2.从当前页面内容中，截取import内容片段再转成对象数组importInfoList
 * 3.循环importInfoList获取import文件内容，从import文件内容截取当前页面使用到的内容，然后拼接进fileModule
 */
import trim from 'lodash/trim'
import words from 'lodash/words'

export default {
  data () {
    return {
      importInfoList: []
    }
  },
  methods: {
    // 给fileModule拼接import内容
    renderFileModule () {
      this.importInfoList.forEach(info => {
        this.getFileData(info.fullPath).then(({ data }) => {
          const fileName = `* ${info.fileName}`
          const fileInfoStr = info.fullPath.includes('.json') ? `* ${JSON.stringify(data, null, 2)}` : `${this.splitFile(data, info.name).join('\n')}`
          this.fileModule = `${this.fileModule}\n` + `/**\n ${fileName}\n ${fileInfoStr} \n */\n`
        })
      })
    },
    // 根据当前页面内容，截取import内容片段再转成对象数组importInfoList
    getImportInfo (data) {
      const { importIdx, exportIdx } = this.getInfoIndex(data)
      if (importIdx === -1) return []
      const dataList = data.substring(importIdx, exportIdx).split('\n')
      const { path } = this.$route
      const parentPath = path.substring(0, path.lastIndexOf('/'))
      return this.renderInfoList(dataList, parentPath)
    },
    renderInfoList (dataList, parentPath) {
      return dataList.filter(data => ['./', '../', '@'].some(reg => data.includes(reg))).map(info => {
        return this.formatInfoToObj(info, parentPath)
      })
    },
    // 将info转成对象
    formatInfoToObj (info, parentPath) {
      const { importIdx, fromIdx, lastSlash } = this.getInfoIndex(info)
      const name = this.subStringInfo({ info, start: importIdx + 6, end: fromIdx })
      const path = this.subStringInfo({ info, start: fromIdx + 5, trimStr: "'" })
      const file = this.subStringInfo({ info, start: lastSlash + 1, trimStr: "'" })
      const fileName = this.addFileType(file)
      const res = {
        name: this.getKeyList(name),
        fileName,
        path,
        fullPath: this.handelFullPath(`/views${parentPath}/${fileName}`, path)
      }
      return res
    },
    // 将'./xxx.json' || '../xxx' || '@/A/B/C' 转换成 '/A/B/xxx.json' || '/A/B/xxx.js' || '/A/B/C.js'
    handelFullPath (fullPath, path) {
      const tmpPath = path.includes('@') ? this.subStringInfo({ info: path, start: 1 }) : fullPath
      const fullPathArr = tmpPath.split('/').reverse()
      const pathArr = path.split('/').reverse()
      // pathArr一比一替换fullPathArr
      pathArr.forEach((item, idx) => {
        if (['..', '.', '@'].every(key => item && item !== key)) fullPathArr[idx] = item
      })
      fullPathArr[0] = this.addFileType(fullPathArr[0])
      return fullPathArr.reverse().join('/')
    },
    // 获取info里第一个‘import’的索引、第一个‘from’的索引、第一个‘export’的索引、最后一个反斜杠的索引
    getInfoIndex (info) {
      return {
        importIdx: info.indexOf('import'),
        fromIdx: info.indexOf('from'),
        exportIdx: info.indexOf('export'),
        lastSlash: info.lastIndexOf('/')
      }
    },
    /**
     * @name 截取info字符串的片段，返回一个新的字符串
     * @param info String 需要截取的字符串
     * @param start Number 开始截取的字符串下标位置，闭区间
     * @param end Number 最后截取的字符串下标位置，开区间
     * @param trimStr String 需要剔除的字符串
     */
    subStringInfo: ({ info, start, end, trimStr }) => trim(info.substring(start, end), trimStr),
    /**
     * @name 给没有文件类型后缀的文件名，默认添加.js类型
     * @param fileName String 文件名称
     */
    addFileType: fileName => fileName.split('.')[1] ? fileName : `${fileName}.js`,
    // 获取import进来的key名List
    /**
     * @name 获取import进来的key名List
     * @param name String import内容的名字
     * @example 例如'import { A, B } from './xxxx', getKeyList('{ A, B }')后得到['A', 'B']
     */
    getKeyList: name => words(name, /[^, ]+/g).filter(item => item !== '{' && item !== '}'),
    /**
     * @name 以export为分割点，将file内容进行分割，并过滤掉不包含nameList的片段(主要用于切割js文件内容)
     * @param file String 文件内容
     * @param nameList [string, string] 需要保留的文件内容片段的唯一key内容
     */
    splitFile: (file, nameList = []) => file.split('export ').filter(info => nameList.some(name => info && info.includes(name)))
  },
  beforeDestroy () {
    this.importInfoList = []
  }
}
