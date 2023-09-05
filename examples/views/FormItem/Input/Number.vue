<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 数字输入框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    //- hr
    //- h4 尺寸
    //- AnsoDataformNumber(
    //-   v-model="currentValue")
    //- AnsoDataformNumber(
    //-   v-model="currentValue"
    //-   v-bind="fields.mediumField.form")
    //- AnsoDataformNumber(
    //-   v-model="currentValue"
    //-   v-bind="fields.smallField.form")
    //- AnsoDataformNumber(
    //-   v-model="currentValue"
    //-   v-bind="fields.miniField.form")
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 限制大小值
    AnsoDataform(
      :formFields="maxMinFormFields"
      :buttonList="[]"
    )
    hr
    h4 步数（允许定义递增递减的步数控制）
    AnsoDataform(
      :formFields="stepFormFields"
      :buttonList="[]"
    )
    hr
    h4 数值精度
    AnsoDataform(
      :formFields="precisionFormFields"
      :buttonList="[]"
    )
    hr
    h4 按钮位置类型
    AnsoDataform(
      :formFields="formFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'number',
  components: {
  },
  data () {
    return {
      nomalFormFields: [{
        name: '数值输入框',
        label: '数值输入框',
        form: {
          tag: 'number'
        }
      }],
      disabledFormFields: [{
        name: '禁用',
        label: '禁用',
        form: {
          tag: 'number',
          disabled: true
        }
      }],
      maxMinFormFields: [{
        name: '限制最大值为：10，最小值为：0',
        label: '限制最大值为：10，最小值为：0',
        form: {
          tag: 'number',
          min: 0,
          max: 10
        }
      }],
      stepFormFields: [{
        name: '控制步长为：2',
        label: '控制步长为：2',
        form: {
          tag: 'number',
          step: 2
        }
      }],
      precisionFormFields: [{
        name: '控制数值精度为：2',
        label: '控制数值精度为：2',
        form: {
          tag: 'number',
          precision: 2
        }
      }],
      formFields: [{
        name: 'normal',
        label: 'normal',
        form: {
          tag: 'number'
        }
      }, {
        name: 'none',
        label: 'none',
        form: {
          tag: 'number',
          triggerType: 'none'
        }
      }, {
        name: 'stack',
        label: 'stack',
        form: {
          tag: 'number',
          triggerType: 'stack'
        }
      }],
      currentValue: null,
      fields: {
        mediumField: {
          form: {
            size: 'medium'
          }
        },
        smallField: {
          form: {
            size: 'small'
          }
        },
        miniField: {
          form: {
            size: 'mini'
          }
        }
      }
    }
  },
  methods: {
  }
}
</script>
<style lang="scss" scoped>
</style>
