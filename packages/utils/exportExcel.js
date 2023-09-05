import XLSX from 'xlsx'
import FileSaver from 'file-saver'
/**
 * 参考文档：https://www.npmjs.com/package/xlsx
 * XLSX转换excel官网：https://sheetjs.com/opensource
 * TODO 支持excel样式转换
 * TODO 支持导出多个sheet文件
 * */
/**
 * 字符串转换
 * @param {*} s 字符串
 */
const s2ab = (s) => {
  const buf = new ArrayBuffer(s.length)
  const view = new Uint8Array(buf)
  for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF
  return buf
}
/**
 * 通用sheet对象转为excel文件的blob对象
 * @param {*} sheet 不同数据类型转换后的sheet对象
 * @param {*} sheetName excel文件名称
 */
const sheet2blob = (sheet, sheetName) => {
  sheetName = sheetName || 'sheet1'
  const workbook = {
    SheetNames: [sheetName],
    Sheets: {}
  }
  workbook.Sheets[sheetName] = sheet
  // 生成excel的配置项
  const wopts = {
    bookType: 'xlsx', // 要生成的文件类型
    bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
    type: 'binary'
  }
  const wbout = XLSX.write(workbook, wopts)
  const blob = new Blob([s2ab(wbout)], { type: 'application/octet-stream' })
  // 字符串转ArrayBuffer
  return blob
}
/**
 * XLSX.utils.sheet_to_json: generates an array of objects
 * 支持将json的对象数组转为sheet对象，导出excel（不考虑分页）
 */
export const sheetToJson = ({ data, fileName }) => {
  const sheetData = XLSX.utils.json_to_sheet(data)
  // console.log('newData:', sheetData)
  const blobData = sheet2blob(sheetData, fileName)
  // console.log('blobData:', blobData)
  try {
    FileSaver.saveAs(blobData, `${fileName}.xls`)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, blobData)
  }
}
/**
 * XLSX.utils.table_to_sheet takes a table DOM element and returns a worksheet resembling the input table. Numbers are parsed. All other data will be stored as strings
 * @param {*} tableId DOM对象（<table>标签）的id，兼容合并行，合并列
 * @param {*} opts 配置 具体参考文档：https://www.npmjs.com/package/xlsx#html-table-input
 */
export const sheetToTable = ({ tableId = '#el-table', fileName, opts = {} }) => {
  const wb = XLSX.utils.table_to_book(document.querySelector(tableId), opts)
  const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
  try {
    FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), `${fileName}.xls`)
  } catch (e) {
    if (typeof console !== 'undefined') console.log(e, wbout)
  }
  return wbout
}

export default {
  sheetToJson, // json对象数组的转换
  sheetToTable // table标签对象转换为excel
}
