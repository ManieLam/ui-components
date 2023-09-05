<template lang="pug">
div.resetForm(style="padding: 1rem")
  .select
    label.selectLabel 设置表单初始化数据, 演示初始化值不同时表单重置效果
    AnsoDataformSelect(v-model="initFormData",:options="initOption")
  h2 重置表单
  AnsoDataform(
    v-if="resetForm"
    ref="resetForm"
    v-model="formData"
    :formFields="formFields"
    :buttonList="buttonList"
    :buttonFixed="false"
    label-position="right"
    @onChange="onChange")
  br
  span 当前表单数据：{{formData}}
</template>

<script>
export default {
  name: 'reset',
  data () {
    return {
      resetForm: true,
      formData: {},
      valChange: {},
      // 表单子元素字段配置
      formFields: [{
        name: 'fields1',
        label: 'field1',
        form: {
          tag: 'input'
        }
      }, {
        name: 'fields2',
        label: 'field2',
        form: {
          tag: 'select',
          options: [{ value: '1', label: '1' }, { value: '2', label: '2' }]
        }
      }, {
        name: 'fields3',
        label: 'field3',
        form: {
          tag: 'time'
        }
      }, {
        name: 'fields4',
        label: 'field4',
        form: {
          tag: 'date'
        }
      }],
      nullFormData: {},
      valFormData: {
        fields1: '初始化有值',
        fields2: '1',
        fields3: 1627958703000,
        fields4: 1628092800000
      },
      initFormData: 0,
      // 初始化表单数据选择
      initOption: [{
        value: 0,
        label: '表单初始化数据为空, 表单重置数据为空'
      }, {
        value: 1,
        label: '表单初始化数据有值, 表单重置数据为初始值'
      }],
      buttonList: [{
        label: '重置',
        type: 'primary',
        func: (button) => {
          console.log('重置', button)
          this.$refs.resetForm.resetForm()
        }
      }]
    }
  },
  watch: {
    initFormData (val) {
      console.log(val)
      this.resetForm = false
      if (val === 0) this.formData = this.nullFormData
      else this.formData = this.valFormData
      this.$nextTick(() => {
        this.resetForm = true
      })
    }
  },
  methods: {
    onChange (val) {
      console.log(val)
      this.formData = val.values
    }
  }
}
</script>
<style lang="sass" scoped>
.resetForm
  display: flex
  flex-direction: column
  .select
    display: flex
    flex-direction: column
    .selectLabel
      margin-bottom: 8px
</style>
