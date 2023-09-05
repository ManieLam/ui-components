<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 开关
    AnsoDataform(
      :formFields="normalFormFields"
      :value="formValues"
      :buttonList="[]"
    )
    hr
    h4 小尺寸开关 size: 'sm'
    AnsoDataform(
      :formFields="smallFormFields"
      :value="formValues"
      :buttonList="[]"
    )
    hr
    h4 禁用开关
    button(@click="clickDisabled") 点击变更禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
      :value="formValues"
    )
    hr
    h4 文字描述
    AnsoDataform(
      :formFields="textFormFields"
      :buttonList="[]"
    )
    hr
    h4 背景色变更
    AnsoDataform(
      :formFields="colorFormFields"
      :buttonList="[]"
    )
    hr
    h4 开关文字提示
    AnsoDataform(
      :formFields="tooltipFormFields"
      :value="tooltipValues"
      :buttonList="[]"
    )
    hr
    h4 传入值类型变更
    AnsoDataform(
      :formFields="activeFormFields"
      :value="activeValues"
      :buttonList="buttonList"
    )
    hr
    h4 异步开关按钮
    AnsoDataform(
      :formFields="funcFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleSwitch',
  components: {
  },
  data () {
    return {
      formValues: {
        isOpen: 0,
        smallopened: true,
        smallopenedDisabled: true,
        disabledOpen: true
      },
      normalFormFields: [{
        name: 'isOpen',
        label: '基础开关',
        form: {
          tag: 'switch'
        }
      }],
      smallFormFields: [{
        name: 'smallNormal',
        label: '正常',
        form: {
          tag: 'switch',
          size: 'sm',
          width: 34
        }
      }, {
        name: 'smallDisabled',
        label: '禁用',
        form: {
          tag: 'switch',
          size: 'sm',
          width: 34,
          disabled: true
        }
      }, {
        name: 'smallopened',
        label: '默认开启',
        form: {
          tag: 'switch',
          size: 'sm',
          width: 34
        }
      }, {
        name: 'smallopenedDisabled',
        label: '禁用-默认开启',
        form: {
          tag: 'switch',
          size: 'sm',
          width: 34,
          disabled: true
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'switch',
          disabled: true
        }
      }, {
        name: 'disabledOpen',
        label: '禁用',
        form: {
          tag: 'switch',
          disabled: true
        }
      }],
      textFormFields: [{
        name: 'text',
        label: '文字处于两端',
        form: {
          tag: 'switch',
          options: [{
            label: '开',
            value: true
          }, {
            label: '关',
            value: false
          }]
        }
      }, {
        name: 'isInline',
        label: '文字处于按钮内',
        form: {
          tag: 'switch',
          width: 90,
          isInline: true,
          options: [{
            label: '开始运行',
            value: true
          }, {
            label: '结束运行',
            value: false
          }]
        }
      }],
      colorFormFields: [{
        name: 'color',
        label: '开关背景色变更',
        form: {
          tag: 'switch',
          options: [{
            label: '开',
            value: true,
            color: '#13ce66'
          }, {
            label: '关',
            value: false,
            color: '#ff4949'
          }]
        }
      }],
      tooltipValues: { tooltip: false },
      tooltipFormFields: [{
        name: 'tooltip',
        label: '文字提示开关',
        form: {
          tag: 'switch',
          isTooltip: true
        }
      }],
      activeValues: { activeType: 0 },
      activeFormFields: [{
        name: 'activeType',
        label: '开关值类型变更',
        form: {
          tag: 'switch',
          isTooltip: true,
          activeType: 'number'
        }
      }],
      buttonList: [{
        name: 'number',
        label: '变更为数值类型',
        func: () => {
          this.activeFormFields[0].form.activeType = 'number'
        }
      }, {
        name: 'boolean',
        label: '变更为布尔类型',
        func: () => {
          this.activeFormFields[0].form.activeType = 'boolean'
        }
      }, {
        name: 'string',
        label: '变更为字符串类型',
        func: () => {
          this.activeFormFields[0].form.activeType = 'string'
        }
      }],
      funcFormFields: [{
        name: 'asynType',
        label: '异步开关按钮',
        form: {
          tag: 'switch',
          func: (datas) => {
            if (!datas) return
            const { funcProps } = datas
            return new Promise((resolve, reject) => {
              setTimeout(() => {
                this.$message.info('等待两秒后执行操作')
                resolve(funcProps.data)
              }, 2000)
            })
          }
        }
      }]
    }
  },
  methods: {
    clickDisabled () {
      const disabledType = this.disabledFormFields[0].form.disabled
      this.$set(this.disabledFormFields[0].form, 'disabled', !disabledType)
      this.$set(this.disabledFormFields[1].form, 'disabled', !disabledType)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
