import { isNil } from 'lodash'
/* 计算单表单录入组件最终的labelWidth */
export function computedLabelWidth ({ form = {}, field = {} }) {
  const { labelHidden: lv1Hidden, type, labelWidth: lv1Width, labelPosition } = form
  const { labelHidden: lv2Hidden, labelWidth: lv2Width } = field
  const resHidden = isNil(lv2Hidden) || type === 'grid' ? lv1Hidden : lv2Hidden // 综合结果
  let resWidth = lv2Width
  resWidth = resHidden || labelPosition === 'top' ? '0px'
    : ['inline', 'row'].includes(type) && isNil(lv2Width) ? ''
      : isNil(lv2Width) || !lv2Width ? lv1Width
        : lv2Width
  // console.log('最终:', lv1Width, lv2Width, 'resWidth:', resWidth)
  return {
    labelHidden: resHidden,
    labelWidth: resWidth
  }
}
