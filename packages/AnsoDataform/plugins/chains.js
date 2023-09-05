/* 内置字段联动方法 */
// let _this = null
class ChainEvent {
  constructor ({ component, field }) {
    this.setState = this.setState.bind(component)
    this.setValue = this.setValue.bind(component)
    this.setOptions = this.setOptions.bind(component)
  }

  setState (name, fn) {
    fn && fn(this.fieldColumns[name])
  }

  // 修改字段值
  setValue (name, value) {
    this.$set(this.formData, name, value)
  }

  // 修改字典
  setOptions (name, options) {
    this.$set(this.fieldColumns[name].form, 'options', options)
  }
}
export default ChainEvent
