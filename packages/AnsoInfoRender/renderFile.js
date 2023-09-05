// const files = require('assets/imgs/upload.png')
const base64Img = require('packages/base64Img.json')
export const getFileURL = (showResource, showResourceType, shortUrl, id) => {
  return `${showResource}/${showResourceType === 'shortUrl' ? shortUrl : id}`
}
// 获取文件列表
export const getFileList = (showResource, showResourceType, fileList = []) => {
  if (fileList === '-' || !fileList || fileList.constructor !== Array) return []
  const list = fileList.slice().sort((a, b) => a.id - b.id) // id升序
  const imgType = ['jpeg', 'jpg', 'png', 'base64', 'bmp', 'JPG', 'JPEG', 'PNG', 'BASE64', 'BMP']
  return list.length ? list.map((item, index) => {
    // 定义文件路径
    const path = getFileURL(showResource, showResourceType, item.shortUrl, item.id)
    if (imgType.indexOf(item.fileType) >= 0) {
      const url = item.fileType === 'base64' ? item.base64 : path
      return {
        index,
        type: 'image',
        src: url,
        path,
        url: url,
        fileName: item.fileName,
        fileType: item.fileType
      }
    } else { // 附件类型
      // const path = getFileURL(showResource, item.shortUrl)
      return {
        index,
        type: 'files',
        src: base64Img.upload,
        path,
        url: path,
        fileName: item.fileName,
        fileType: item.fileType
      }
    }
  }) : []
}
