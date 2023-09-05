<script>
/**
 * @module AnsoDataformItem 表单项
 * @description 通过判断表单项类型决定使用哪种表单项
 * */
import AnsoDataFormItemReg from './AnsoDataFormItemReg'
// import isEqual from 'lodash/isEqual'
import { isEqual, isEmpty } from 'lodash'
import { computedLabelWidth } from './plugins/computed'
export default {
  name: 'AnsoDataformItem',
  mixins: [AnsoDataFormItemReg],
  /**
  * @property {any} value 表单项数据
  * @property {Object} field 表单项配置
  */
  props: {
    value: [String, Boolean, Array, Number, Object],
    field: Object,
    labelHidden: Boolean, // 注意type=grid类型的label 是写在外面
    labelWidth: String,
    errorToptip: {
      type: Boolean,
      default: false
    },
    // failFields: {
    //   type: Object,
    //   default: () => ({})
    // },
    full: Object, // 接收整个表单值
    readOnly: {
      type: Boolean,
      default: false
    }, // 只读
    formProps: Object, // 表单props
    scopedSlots: {
      type: Object,
      default: () => ({})
    },
    keyName: {
      type: String,
      default: 'ansoForm'
    }
  },
  data () {
    return {
      offset: 8,
      formItemEl: this.$refs[`formitem_${this.field.name}`]
    }
  },
  mounted () {
    this.formItemEl = this.$refs[`formitem_${this.field.name}`]
  },
  // created () {
  //   console.info(this.field.name, 'is created---')
  // },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        // this.$emit('onValueChange', this.field, val, null)
        this.$emit('input', val, this.field)
      }
    },
    validateFailMesg () {
      return this.formItemEl ? this.formItemEl.validateMessage : ''
    },
    toptipVisable () {
      // return this.errorToptip && !this.readOnly && !!this.failFields[this.field.name]
      return this.errorToptip && !this.readOnly && !this.field.form.disabled && !!this.validateFailMesg
    }
  },
  watch: {
    currentValue (val, oldVal) {
      //     console.info(this.field.name, 'is watching')
      if (this.readOnly) return
      if (this.checkAllNone(val, oldVal)) return
      // console.info('formItem changed----', this.field.name, oldVal, val, isEqual(oldVal, val))
      if (!isEqual(oldVal, val)) {
        // console.log('在watch中emit1次')
        this.$emit('onValueChange', val, this.field, oldVal)
      }
      //     // this.$emit('onValueChange', this.field, val, oldVal)
    }
  },
  methods: {
    checkAllNone (val, oldVal) {
      const isEmptyVal = typeof val === 'object' ? isEmpty(val) : val == null
      const isEmptyOldVal = typeof oldVal === 'object' ? isEmpty(oldVal) : oldVal == null
      return isEmptyVal && isEmptyOldVal
    },
    slotRenderFunc (h, slotProps = {}, slotType) {
      if (!h && typeof h !== 'function') return ''
      return h(this.dataFormItem[slotProps.tag], {
        class: 'form-item_slot',
        props: {
          field: slotProps,
          value: this.full[slotProps?.name],
          data: this.full,
          ...slotProps
        },
        attrs: {
          ...slotProps,
          formAttrs: this.formProps,
          // 需要在行内表单类型下，对多选的下拉和联级组件（其他组件未知），默认设置collapseTags=true，优先级：columns配置>全局组件库默认配置
          'collapse-tags': typeof slotProps.collapseTags === 'boolean' ? slotProps.collapseTags : this.formProps.collapseAllMultiTags,
          id: slotProps.id || `${this.keyName}-${this.field.name}-${slotType}`
        }, // formAttrs: 传入form组件props配置内容
        on: {
          // ...this.$listeners
          input: (value) => {
            // this.currentValue = value
            this.$set(this.full, slotProps.name, value)
          },
          change: (value) => {
            this.$emit('onValueChange', value, slotProps)
          }
        }
      })
    }
  },
  render (h) {
    const { name, label, form: fieldConfig } = this.field
    // console.log('this.labelHidden:', this.labelHidden)
    const { labelHidden, labelWidth } = computedLabelWidth({ form: { ...this.formProps, labelHidden: this.labelHidden }, field: this.field?.form })
    // const { type: formType, labelWidth: formLabelWidth } = this.formProps
    /* label-width={this.$attrs?.labelWidth || (this.labelHidden ? '0' : 'auto')} */
    // const formLabelHidden = this.labelHidden
    // // TODO 优化labelHidden+labelWidth -- 参考form-designer/.../widgetFormItem
    // const labelHidden = isNil(fieldConfig.labelHidden) || formType === 'grid' ? formLabelHidden : fieldConfig.labelHidden
    // // TODO 优化, 目前grid不走这个label:fieldConfig.labelWidth -> 字段自定义的labelWidth; this.labelWidth -> 表单计算后的; formLabelWidth -> 原始传入表单的
    // // const labelWidth = !labelHidden ? (isNil(fieldConfig.labelWidth) ? (!isNil(this.labelWidth) ? this.labelWidth : formLabelWidth) : fieldConfig.labelWidth) : this.labelWidth
    // const labelWidth = fieldConfig.labelWidth ? fieldConfig.labelWidth : '' // 旧
    // console.log('labelWidth1:', labelWidth)

    const { preSlotRender, suffixSlotRender } = fieldConfig
    return (
      <el-form-item
        ref={`formitem_${name}`}
        id={`${this.keyName}-formitem-${name}`}
        props={this.$attrs.formItemProp}
        on={this.$listeners}
        class={fieldConfig.tag === 'text' ? 'el-form-item-text' : ''}
        label={label}
        prop={name}
        label-hidden={labelHidden} // 文本标签显示的优先级：以字段内部配置 > 表单全局文本标签显示隐藏的配置
        label-width={labelWidth}
        is-toptiperror={this.errorToptip}>
        <template slot='label'>
          <span>{label}</span>
          {this.field.labelTip
            ? (
              <el-popover
                placement="top-start"
                trigger="hover"
                width="200"
                content={this.field.labelTip}
                id={`${this.keyName}-${name}-labelTip`}>
                <i
                  slot="reference"
                  style="padding-left: 4px;cursor: pointer"
                  class="el-icon-warning-outline"></i>
              </el-popover>
            )
            : ''}
        </template>
        {
          preSlotRender
            ? (
              typeof preSlotRender === 'function'
                ? preSlotRender(h)
                : typeof preSlotRender === 'object' && preSlotRender.tag ? this.slotRenderFunc(h, preSlotRender, 'preSlotRender') : ''
            )
            : ''
        }
        <el-tooltip
          effect="dark"
          placement="top-start"
          value={this.toptipVisable}
          disabled={!this.toptipVisable}
          content={this.validateFailMesg}>
          <div class="tooltip_template">
            {
              this.scopedSlots[name] && typeof this.scopedSlots[name] === 'function'
                ? this.scopedSlots[name]({ field: this.field, data: this.full, value: this.value })
                : h(!this.readOnly ? this.dataFormItem[fieldConfig.tag] : 'AnsoDataformText', {
                  // vModel: this.currentValue,
                  class: 'form-item_component',
                  props: {
                    field: this.field,
                    value: this.currentValue,
                    data: this.full,
                    ...this.field.form
                  },
                  attrs: {
                    ...this.field.form,
                    formAttrs: this.formProps,
                    // 需要在行内表单类型下，对多选的下拉和联级组件（其他组件未知），默认设置collapseTags=true，优先级：columns配置>全局组件库默认配置
                    'collapse-tags': typeof fieldConfig.collapseTags === 'boolean' ? fieldConfig.collapseTags : this.formProps.collapseAllMultiTags,
                    id: this.field?.form.id || `${this.keyName}-${this.field.name}`
                  }, // formAttrs: 传入form组件props配置内容
                  on: {
                    ...this.$listeners
                    // input: (value) => {
                    //   console.log('this.currentValue = value', value)
                    //   // this.currentValue = value
                    // }
                  }
                })
            }
          </div>
        </el-tooltip>
        {
          suffixSlotRender
            ? (
              typeof suffixSlotRender === 'function'
                ? suffixSlotRender(h)
                : typeof suffixSlotRender === 'object' && suffixSlotRender.tag ? this.slotRenderFunc(h, suffixSlotRender, 'suffixSlotRender') : ''
            )
            : ''
        }
      </el-form-item>
    )
  }
}
</script>
<style lang="sass" scoped>
.el-form-item[is-toptiperror]
  position: relative
  // margin-right: 24px
  ::v-deep .el-form-item__error
   display: none
.form-item_component[bottomtip]::after
  content: attr(bottomtip)
  color: $--color-text-secondary
  font-size: $--font-size-small
.tooltip_template
  display: inline-flex
  flex: 1

.error-absolute
  position: absolute
  top: -20px
  left: 0
  background: rgba(0,0,0,0.8)
  color: #fff
  padding: 6px 20px
  border-radius: 4px
  &:hover
    opacity: 0

.form-item_slot
  width: fit-content !important
</style>
