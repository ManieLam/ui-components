export const getCell = function (event) {
  let cell = event.target

  while (cell && cell.tagName.toUpperCase() !== 'HTML') {
    if (cell.tagName.toUpperCase() === 'TD') {
      return cell
    }
    cell = cell.parentNode
  }

  return null
}

export const getColumnByCell = function (table, cell) {
  const matches = (cell.className || '').match(/el-table_[^\s]+/gm)
  if (matches) {
    return getColumnById(table, matches[0])
  }
  return null
}
export const getColumnById = function (table, columnId) {
  let column = null
  table.columns.forEach(function (item) {
    if (item.id === columnId) {
      column = item
    }
  })
  return column
}
export function hasClass (el, cls) {
  if (!el || !cls) return false
  if (cls.indexOf(' ') !== -1) throw new Error('className should not contain space.')
  if (el.classList) {
    return el.classList.contains(cls)
  } else {
    return (' ' + el.className + ' ').indexOf(' ' + cls + ' ') > -1
  }
};
const SPECIAL_CHARS_REGEXP = /([:\-_]+(.))/g
const MOZ_HACK_REGEXP = /^moz([A-Z])/
/* istanbul ignore next */
const camelCase = function (name) {
  return name.replace(SPECIAL_CHARS_REGEXP, function (_, separator, letter, offset) {
    return offset ? letter.toUpperCase() : letter
  }).replace(MOZ_HACK_REGEXP, 'Moz$1')
}
/* istanbul ignore next */
export const getStyle = (element, styleName) => {
  if (!element || !styleName) return null
  styleName = camelCase(styleName)
  if (styleName === 'float') {
    styleName = 'cssFloat'
  }
  try {
    var computed = document.defaultView.getComputedStyle(element, '')
    return element.style[styleName] || computed ? computed[styleName] : null
  } catch (e) {
    return element.style[styleName]
  }
}
