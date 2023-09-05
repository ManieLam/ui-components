import { pickBy } from 'lodash'
export default {
  props: {
    buttonAlign: {
      type: String,
      default: 'left',
      validator: (value) => {
        return ['center', 'left', 'right'].indexOf(value) > -1
      }
    }
  },
  data () {
    return {
      formTempBtns: this.buttonList,
      /* 是否展开所有的收缩行
      collapsable==true：开启收缩/展开模式
      isCollapse==true：当前属于收缩状态
      */
      isCollapse: this.collapsable,
      privateCollapseBtn: [{
        // __isPrivateCollapseBtn: true,
        name: 'privateCollapse',
        type: 'text',
        icon: 'daohang-down',
        iconAlign: 'right',
        label: '展开',
        textType: 'info',
        classname: 'collapse-btn',
        showabled: this.collapsable,
        func: (button) => {
          this.isCollapse = !this.isCollapse
          this.privateCollapseBtn[0].label = button.label === '展开' ? '收起' : '展开'
          this.privateCollapseBtn[0].iscollapse = button.label === '展开'
          this.$emit('collapseClick', this.isCollapse)
        }
      }]
    }
  },
  computed: {
    /* 除了inline类型，都是支持带位置的按钮组，所以属于复杂的按钮组 */
    isMultiBtns () {
      return !this.inline
    },
    /* 允许收缩/展开的按钮组 */
    isCollapseBtns () {
      return this.collapsable && (this.type === 'row' || this.inline)
    },
    defaultBtns () {
      return this.formTempBtns.map(button => ({
        ...button,
        formData: this.formData
      }))
    },
    formButtonList: {
      get () {
        // 只有row和inline类表单拥有收缩、展开的功能
        if (this.isCollapseBtns) {
          // return this.defaultBtns.concat(this.privateCollapseBtn)
          return this.privateCollapseBtn.concat(this.defaultBtns)
        } else {
          if (this.inline) return this.defaultBtns
          // 除了inline类型的表单，其他都有按钮位置可以配置
          return this.formTempBtns.reduce((res, btn) => {
            const button = {
              ...btn,
              formData: this.formData
            }
            const position = btn.position || this.buttonAlign // 传统按钮组默认居左
            res[position] = [...res[position], button]
            return res
          }, { left: [], center: [], right: [] })
        }
      },
      set (value) {
        this.formTempBtns = value
      }
    },
    formBtnsKey () {
      return Object.keys(pickBy(this.formButtonList, (arr) => { return arr.length > 0 }))
    }
  },
  watch: {
    collapsable (flag) {
      /* 关闭collapsable, isCollapse 应该展开即false */
      this.isCollapse = flag
    }
  },
  methods: {
    toggleCollapseBtn (flag) {
      this.$set(this.privateCollapseBtn[0], 'showabled', flag)
    }
  }
}
