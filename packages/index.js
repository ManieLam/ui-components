import { defaultsDeep } from 'lodash'
// import { MessageBox } from 'element-ui'

import AnsoDatatable from './AnsoDatatable'
import AnsoDoubleColumnLayout from './AnsoDoubleColumnLayout'
import AnsoInfoRender from './AnsoInfoRender'
import AnsoButtonGroup from './AnsoButtonGroup'
import AnsoDataform from './AnsoDataform'
import AnsoFormBody from './AnsoDataform/FormBody'
import AnsoDataformGroup from './AnsoDataform/AnsoDataformGroup'
import AnsoDataformCompared from './AnsoDataform/AnsoDataformCompared'
import AnsoDataformSelect from './AnsoDataform/AnsoDataformSelect'
import AnsoDataformInput from './AnsoDataform/AnsoDataformInput'
import AnsoDataformTextRange from './AnsoDataform/AnsoDataformTextRange'
import AnsoDataformNumber from './AnsoDataform/AnsoDataformNumber'
import AnsoDataformNumRange from './AnsoDataform/AnsoDataformNumRange'
import AnsoDataformRadio from './AnsoDataform/AnsoDataformRadio'
import AnsoDataformCascader from './AnsoDataform/AnsoDataformCascader'
import AnsoDataformCheckbox from './AnsoDataform/AnsoDataformCheckbox'
import AnsoDataformSwitch from './AnsoDataform/AnsoDataformSwitch'
import AnsoDataformTime from './AnsoDataform/AnsoDataformDateTime/AnsoDataformTime'
import AnsoDataformDate from './AnsoDataform/AnsoDataformDateTime/AnsoDataformDate'
import AnsoDataformTimeRange from './AnsoDataform/AnsoDataformDateTime/AnsoDataformTimeRange'
import AnsoDataformSlider from './AnsoDataform/AnsoDataformSlider'
import AnsoDataformText from './AnsoDataform/AnsoDataformText'
import AnsoDataformUpload from './AnsoDataform/AnsoDataformUpload'
import AnsoDataformTree from './AnsoDataform/AnsoDataformTree'
import AnsoDataformTransfer from './AnsoDataform/AnsoDataformTransfer'
import AnsoIcon from './AnsoIcon'
import AnsoLink from './AnsoLink'
import AnsoBigDatatable from './AnsoBigDatatable'
import AnsoStates from './AnsoStates'

export const components = [
  AnsoFormBody,
  AnsoDoubleColumnLayout,
  AnsoInfoRender,
  AnsoButtonGroup,
  AnsoDataformGroup,
  AnsoDataformCompared,
  AnsoDataformSelect,
  AnsoDataformInput,
  AnsoDataformNumber,
  AnsoDataformNumRange,
  AnsoDataformRadio,
  AnsoDataformCascader,
  AnsoDataformCheckbox,
  AnsoDataformSwitch,
  AnsoDataformTime,
  AnsoDataformTimeRange,
  AnsoDataformDate,
  AnsoDataformSlider,
  AnsoDataformText,
  AnsoDataformUpload,
  AnsoDataformTree,
  AnsoDataformTransfer,
  AnsoDataformTextRange,
  AnsoIcon,
  AnsoLink,
  AnsoBigDatatable
  // AnsoStates
]

const plugins = {
  regexps: require('packages/utils/regexs.js').default,
  calculate: require('packages/utils/cacular.js').default,
  render: require('packages/AnsoInfoRender/renderList').default
}

// const ansoMessageBox = function () {
//   return MessageBox({ ...arguments[0], center: true, customClass: 'anso-message-box' })
// }

export const regexps = plugins.regexps
export const calculate = plugins.calculate
export const render = plugins.render

const install = (Vue, { table, form, ansoStates } = {}) => {
  // Object.defineProperty(Vue.prototype, '$ansoMesbox', { value: ansoMessageBox })

  components.forEach(component => {
    Vue.component(component.name, component)
  })
  Vue.component('AnsoDatatable', defaultsDeep({ props: table }, AnsoDatatable))
  Vue.component('AnsoDataform', defaultsDeep({ props: { ...form, collapseAllMultiTags: null } }, AnsoDataform))
  // Vue.component('AnsoDataform', defaultsDeep({ props: form }, AnsoDataform))
  Vue.component('AnsoStates', defaultsDeep({ props: ansoStates }, AnsoStates))
  if (form) {
    /*
     * formVerticalMargin 配置表单上下外边距，默认24px
     * space 配置操作表单间距，默认24px
     * readOnlySpace 配置只读表单间距，默认8px
    */
    const { formVerticalMargin = null, space = null, readOnlySpace = null } = form
    document.body.style.setProperty('--formVerticalMargin', formVerticalMargin)
    document.body.style.setProperty('--space', space)
    document.body.style.setProperty('--readOnlySpace', readOnlySpace)
  }
  /**
   * 文件上传下载全局配置
   * 优先级：
   * 上传组件上传下载参数配置 > 全局上传下载全局配置 > 全局上传下载全局默认配置
   */
  Vue.prototype.$fileUploadResource = form && form.fileUploadResource ? form.fileUploadResource : '/system/file/upload' /* 绑定全局文件上传接口链接 */
  Vue.prototype.$fileDownloadResource = form && form.fileDownloadResource ? form.fileDownloadResource : '/system/file/download/id' /* 绑定全局文件展示接口链接 */
  Vue.prototype.$fileDownloadResourceType = form && form.fileDownloadResourceType ? form.fileDownloadResourceType : 'id' /* 绑定全局文件展示接口類型 */

  Object.entries(plugins).forEach(([pluginName, value]) => {
    Object.defineProperty(Vue.prototype, '$' + pluginName, { value })
  })
}

export default install
