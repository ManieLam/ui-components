
import isFunction from 'lodash/isFunction'
import renderList from './renderList'

export function resultRender (field) {
  return !field.render ? renderList.text : isFunction(field.render) ? field.render : renderList[field.render.type]
}
