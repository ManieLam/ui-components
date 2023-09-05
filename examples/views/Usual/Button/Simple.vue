<template lang="pug">
  .anso-button_simple
    h6 不同尺寸：
    AnsoButtonGroup(:buttonList="buttonList1")
    hr
    h6 不同颜色（带边框）：
    AnsoButtonGroup(:buttonList="buttonList2")
    h6 不同颜色（不带边框）：
    AnsoButtonGroup(:buttonList="buttonList7")
    hr
    h6 disabled状态：
    AnsoButtonGroup(:buttonList="buttonList3")
    hr
    h6 loading状态
    AnsoButtonGroup(:buttonList="buttonList4")
    hr
    h6 异步操作
    AnsoButtonGroup(:buttonList="buttonList5")
    hr
    h6 嵌套按钮
    AnsoButtonGroup(:buttonList="buttonList6")
</template>

<script>
export default {
  name: 'simpleButton',
  navName: '按钮',
  components: {
  },
  data () {
    return {
      title: '按钮',
      buttonList1: [{
        label: '按钮'
      }, {
        name: 'default',
        label: '默认大小'
      }, {
        label: '中',
        size: 'medium'
      }, {
        label: '小',
        size: 'small'
      }, {
        label: '极小',
        size: 'mini'
      }],
      buttonList2: [{
        name: 'default',
        type: 'default',
        label: '默认按钮'
      }, {
        name: 'primary',
        type: 'primary',
        label: '主要按钮'
      }, {
        name: 'success',
        type: 'success',
        label: '成功按钮'
      }, {
        name: 'info',
        type: 'info',
        label: '信息按钮'
      }, {
        name: 'warning',
        type: 'warning',
        label: '警告按钮'
      }, {
        name: 'danger',
        type: 'danger',
        label: '危险按钮'
      }],
      buttonList7: [{
        name: 'default',
        type: 'text',
        label: '默认按钮'
      }, {
        name: 'primary',
        type: 'text',
        textType: 'primary',
        label: '主要按钮'
      }, {
        name: 'success',
        type: 'text',
        textType: 'success',
        label: '成功按钮'
      }, {
        name: 'info',
        type: 'text',
        textType: 'info',
        label: '信息按钮'
      }, {
        name: 'warning',
        type: 'text',
        textType: 'warning',
        label: '警告按钮'
      }, {
        name: 'danger',
        type: 'text',
        textType: 'danger',
        label: '危险按钮'
      }],
      buttonList3: [{
        label: '点击更改',
        name: 'default',
        func: () => {
          this.buttonList3[1].label = this.buttonList3[1].disabled ? '按钮启用' : '按钮禁用'
          this.buttonList3[1].disabled = !this.buttonList3[1].disabled
        }
      }, {
        label: '按钮禁用',
        name: 'disabled',
        disabled: true
      }],
      buttonList4: [{
        label: '点击loding',
        name: 'default',
        func: (button) => {
          button.loading = true
          setTimeout(() => {
            // button.loading = false
          }, 1000)
        }
      }],
      buttonList5: [{
        label: '同步按钮',
        type: 'primary',
        func: (button) => {
        }
      }, {
        label: '异步按钮',
        name: 'action',
        func: () => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.$message.info('等待两秒后触发')
              resolve()
            }, 2000)
          })
        }
      }],
      buttonList6: [{
        label: '不同颜色',
        name: 'color',
        icon: 'xiala',
        iconAlign: 'right',
        hideOnClick: false,
        dropdownButtons: [{
          name: 'default',
          label: '默认按钮'
        }, {
          name: 'primary',
          textType: 'primary',
          label: '主要按钮'
        }, {
          name: 'success',
          textType: 'success',
          label: '成功按钮'
        }, {
          name: 'info',
          textType: 'info',
          label: '信息按钮'
        }, {
          name: 'warning',
          textType: 'warning',
          label: '警告按钮'
        }, {
          name: 'danger',
          textType: 'danger',
          label: '危险按钮'
        }]
      }, {
        label: '不同尺寸',
        name: 'size',
        icon: 'xiala',
        iconAlign: 'right',
        hideOnClick: false,
        dropdownButtons: [{
          name: 'default',
          textType: 'info',
          label: '默认大小'
        }, {
          label: '中',
          textType: 'info',
          size: 'medium'
        }, {
          label: '小',
          textType: 'info',
          size: 'small'
        }, {
          label: '极小',
          textType: 'info',
          size: 'mini'
        }]
      }, {
        label: '其他',
        name: 'other',
        icon: 'xiala',
        iconAlign: 'right',
        hideOnClick: false,
        dropdownButtons: [{
          label: '同步按钮',
          textType: 'info',
          func: (button) => {
          }
        }, {
          label: '异步按钮',
          textType: 'info',
          name: 'async',
          func: (button) => {
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                resolve(10000)
              }, 1000)
            })
          }
        }, {
          label: '点击loding',
          textType: 'info',
          name: 'loading',
          func: (button) => {
            button.loading = true
            setTimeout(() => {
              button.loading = false
            }, 1000)
          }
        }, {
          label: '按钮禁用',
          name: 'disabled',
          disabled: true,
          func: () => {}
        }]
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-button_simple{
  padding: 2rem
}
</style>
