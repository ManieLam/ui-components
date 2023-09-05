import ChainEvent from '../plugins/chains'
import keyBy from 'lodash/keyBy'
import cloneDeep from 'lodash/cloneDeep'
import { isArray, isEmpty } from 'lodash'
// import { mapValues, cloneDeep } from 'lodash'
// import isEqual from 'lodash/isEqual'
// import debounce from 'lodash/debounce'

export default {
  data () {
    return {
      formkey: new Date().getTime(),
      datas: cloneDeep(this.value),
      // formData: cloneDeep(this.value),
      // labelWidth: 'auto',
      formTempBtns: this.buttonList,
      fieldMap: this.formFields,
      // rules: {},
      AFTER_MOUNTED_FLAG: false
    }
  },
  props: {
    value: {
      type: Object,
      default: () => ({})
    },
    formFields: {
      type: Array,
      required: true,
      default: () => ([])
    },
    /* 按钮属性 */
    buttonList: {
      type: Array,
      default: () => ([])
    },
    buttonFixed: {
      type: Boolean,
      default: false
    },
    /* 表单需要的列数，默认为1列 */
    colspanNum: {
      type: Number,
      default: 1,
      validator: (value) => {
        return value <= 24 && value > 0
      }
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (value) => {
        return ['top', 'left', 'right', 'center'].indexOf(value) > -1
      }
    },
    labelWidth: {
      type: [String, Number],
      default: '140px'
    }
  },
  computed: {
    // labelWidthVal () {
    //   return this.inline || this.$attrs['label-hidden'] || this.labelPosition === 'top' ? '' : this.labelWidth
    // },
    // 计算最大label
    // maxLabelLen () {
    //   // return this.$refs[this.refname]?.autoLabelWidth || this.labelWidthVal
    //   let len = ''
    //   for (const i of this.formFields) {
    //     if (i.label) {
    //       i.label.length > len && (len = i.label.length)
    //     }
    //   }
    //   len = len * 14 + 'px'
    //   return len
    // },
    formLabelHidden () {
      if (this.isGrid) {
        // grid类型的表单不走AnsoDataformItem的label (TODO 参考form-designer/widgetForm)
        return true
      }
      return this.$attrs.labelHidden || this.$attrs['label-hidden']
    }, // 表单字段是否隐藏
    labelWidthVal () {
      // 根据表单类型和隐藏控制labelwidth, 影响所有表单内的子元素(包括按钮)
      return this.formLabelHidden || this.labelPosition === 'top' ? '0px' : this.inline || this.type === 'row' ? '' : this.labelWidth
    },
    isGrid () {
      return this.type === 'grid'
    },
    validFields () {
      return this.formFields.filter(field => field?.form?.visabled !== false && !!field.form)
    },
    fieldColumns () {
      return keyBy(this.formFields, 'name')
    },
    chainMaps () {
      return this.validFields.reduce((res, fieldProps) => {
        const { form, name } = fieldProps
        // ...res, [name]: form.chains
        return !form.chains ? res : res.set(name, form.chains)
      }, new Map())
    },
    formData: {
      // 保留单向、双向绑定
      get () {
        return this.datas
      },
      set (datas) {
        this.datas = datas
      }
    },
    rules () {
      return this.initRules()
    }
  },
  watch: {
    colspanNum (num) {
      if (num === 1) {
        this.toggleCollapseBtn()
      }
    },
    value: {
      deep: true,
      handler (datas, oldDatas) {
        this.formData = cloneDeep(datas)
      }
    // },
    // // 不合理的写法
    // formLabelHidden: {
    //   immediate: true,
    //   deep: true,
    //   handler (flag, oldFlag) {
    //     console.info('formLabelHidden:', flag, oldFlag)
    //     if (flag !== oldFlag) {
    //       this.formFields.forEach(f => {
    //         if (f.form) {
    //           // this.$set(f.form, 'labelHidden', isNill(f.form.labelHidden) ? flag)
    //           // const fWidth = f.labelWidth
    //           // this.$set(f.form, 'labelwidth', flag ? fWidth ? fWidth : )
    //         }
    //       })
    //     }
    //   }
    }
  },
  methods: {
    formValidate () {
      return new Promise((resolve, reject) => {
        this.$refs[this.refname].validate((valid) => {
          valid ? resolve(this.button) : reject(valid)
        })
      })
    },
    validateField (fieldName) {
      this.$refs[this.refname].validateField(fieldName)
    },
    resetForm () {
      this.$refs[this.refname].resetFields()
      // 防止element-ui的之后导致无法重新输入
      this.validateFailFields = {}
      this.$nextTick(() => {
        this.clearChains()
        // this.formData = this.value
        // 防止form初始化之后没有设置默认值，重置后会无法重新输入
        Object.entries(this.formData).forEach(([key, value]) => {
          this.formData[key] = this.value[key]
          // 考虑到element组件resetFields重置时，对数组类型重置的值[undefined]，做兼容
          if (isArray(this.formData[key])) {
            if (isEmpty(this.compact(this.formData[key]))) delete this.formData[key]
          }
          if (this.formData[key] == null) {
            delete this.formData[key]
          }
        })
      })
    },
    clearChains (fieldName) {
      if (!fieldName) {
        for (const chain of this.chainMaps.entries()) {
          const name = chain[0]
          if (typeof chain[1] === 'function') this.onChains(this.fieldColumns[name], this.formData[name])
        }
      } else {
        const chainFn = this.chainMaps.get(fieldName)
        if (typeof chainFn === 'function') this.onChains(this.fieldColumns[fieldName], this.formData[fieldName])
      }
    },
    onChains (field, value) {
      const fieldForm = field && field.form ? field.form : {}
      if (fieldForm.chains && fieldForm.chains instanceof Function) {
        fieldForm.chains({
          chains: new ChainEvent({ component: this, field }),
          values: this.formData,
          value,
          field
        })
        this.$nextTick(() => {
          this.$emit('onChainChange', {
            field,
            // values: { ...this.values, ...this.formData }
            values: this.formData
          })
        })
      }
    },
    /* 触发联动交互：chains */
    onChangeField (value, field, oldValue) {
      if (field) {
        // console.info('表单字段修改----', field.name, field.form.tag)
        // this.$set(this.formData, field.name, value)
        // console.log(this.keyName, 'is change field ---- ', field.name)
        // 触发联动事件
        if (field?.form?.chains && typeof field?.form?.chains === 'function') {
          const type = typeof value
          if (type === 'object' ? isEmpty(value) : type === 'undefined') {
            this.clearChains(field.name)
          } else {
            this.onChains(field, value)
          }
        }
      }
      // 通知外部组件
      this.$emit('input', this.formData, field)
      this.$emit('onChange', {
        values: this.formData,
        field: field || {},
        value,
        oldValue
      })
    },
    initRules () {
      return this.validFields.reduce((result, current) => {
        return !(current.form && current.form.rules) ? result : {
          ...result,
          [current.name]: current.form.rules
        }
      }, {})
    },
    compact (group) {
      return group.filter(item => item !== '' && item !== null && item !== undefined)
    }
  }
}
