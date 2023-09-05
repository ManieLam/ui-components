<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 基础用法
    h5 常规用法
    AnsoDataformSlider(v-model="nomalValue")
    h5 自定义初始值
    AnsoDataformSlider(v-model="nomalValue1")
    h5 限制大小值,最小值10，最大值80
    AnsoDataformSlider(v-model="nomalValue0" :max="80" :min="10")
    h5 禁用
    AnsoDataformSlider(v-model="nomalValue2" :disabled="true")
    h5 竖向模式
    AnsoDataformSlider(v-model="nomalValue" :vertical="true")
    br
    hr
    h4 步长
    AnsoDataform(
      :formFields="stepFormFields"
      :buttonList="[]"
    )
    hr
    h4 Tooltip设置
    AnsoDataform(
      :formFields="tooltipFormFields"
      :buttonList="[]"
    )
    hr
    h4 展示输入框
    AnsoDataform(
      :formFields="inputFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否为范围选择
    AnsoDataform(
      :formFields="rangeFormFields"
      :buttonList="[]"
    )
    hr
    h4 展示标记
    AnsoDataform(
      :formFields="optionsFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleSlider',
  components: {
  },
  data () {
    return {
      nomalValue0: 50,
      nomalValue: 0,
      nomalValue1: 80,
      nomalValue2: 50,
      normalFormFields: [{
        name: 'isOpen',
        label: '基础滑块',
        form: {
          tag: 'slider'
        }
      }],
      stepFormFields: [{
        name: 'step',
        label: '步长设置10',
        form: {
          tag: 'slider',
          step: 10
        }
      }, {
        name: 'showStep',
        label: '步长设置10,显示步长间隔点',
        form: {
          tag: 'slider',
          step: 10,
          showStops: true
        }
      }],
      tooltipFormFields: [{
        name: 'tooltip',
        label: '设置隐藏提示',
        form: {
          tag: 'slider',
          tooltip: false
        }
      }, {
        name: 'tooltipShow',
        label: '设置提示格式',
        form: {
          tag: 'slider',
          tooltip: (val) => { return `海拔高达：${val}米` }
        }
      }],
      inputFormFields: [{
        name: 'input',
        label: '展示输入框',
        form: {
          tag: 'slider',
          showInput: true
        }
      }, {
        name: 'inputControls',
        label: '不显示输入框的控制按钮',
        form: {
          tag: 'slider',
          showInput: true,
          showInputControls: false
        }
      }],
      rangeFormFields: [{
        name: 'range',
        label: '设置为范围选择',
        form: {
          tag: 'slider',
          range: true
        }
      }],
      optionsFormFields: [{
        name: 'options',
        label: '展示标记',
        form: {
          tag: 'slider',
          options: [{
            label: '8%',
            value: 8
          }, {
            label: '15%',
            value: 15,
            color: '#67c23a'
          }, {
            label: '20%',
            value: 20,
            color: '#ff4949'
          }, {
            label: '50%',
            value: 50,
            color: '#e6a23c',
            fontlable: 'strong'
          }]
        }
      }]
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
