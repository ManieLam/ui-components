export default {
  name: 'ColumnItem',
  props: {
    name: String,
    field: Object,
    rowDatas: Object
  },
  render (h) {
    const rowItem = this.rowDatas[this.name]
    const renderResult = this.field.renderFormat(rowItem, this.field, this.rowDatas)
    // console.info('renderResult:', name, renderResult)
    /* 支持file、icon、link版本，renderList文件需要调整所有都带tag */
    return h(renderResult.tag || 'div', {
      props: renderResult.attrs,
      domProps: typeof renderResult !== 'object' && typeof renderResult !== 'function' ? {
        value: renderResult,
        innerHTML: renderResult
      } : renderResult
    })
    /* 不支持file、icon、link版本 */
    // return h('div', {
    //   domProps: renderResult.value || renderResult
    // })
  }
}
