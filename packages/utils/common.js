/**
* @name common
* @description 通用函数文件
* @author chenkj
* @content 目录
* isPromise: 判断参数是不是Promise对象
*/
/**
* @name isPromise
* @description 判断参数是不是Promise对象
* @param {String} obj 参数
* @return {Bealoon} 是Promise对象返回true，不是则返回false
*/
export const isPromise = (obj) => {
  // 有实际含义的变量才执行方法，变量null，undefined和''空串都为false
  // 初始promise 或 promise.then返回的
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function'
}

/**
 * @name isElIcon
 * @description 判断参数是不是elememt的icon
 * @param {String} icon 参数
 */
export const isElIcon = (icon = '') => {
  return icon.split('-').includes('el')
}
