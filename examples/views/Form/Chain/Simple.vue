<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h4 1对多个字段联动：通过控制field1来显示隐藏field2，field3字段
  AnsoDataform(
    ref="form"
    v-model="formData"
    :formFields="fields"
    :buttonList="[...buttonList, buildReset('form')]")
    template(#field2)
      el-button(@click="$message.success('你点到我了')") 点一下
  hr
  h4 通过field1的值，更改field2的值
  AnsoDataform(
    ref="form1"
    v-model="formData1"
    :formFields="fields1"
    :buttonList="[...buttonList, buildReset('form1')]")
    template(v-slot:field2="slotProps")
      el-progress(
        style="width: 50%"
        :text-inside="true"
        :stroke-width="26"
        :percentage="slotProps.data.field2")
  hr
  h4 n对1字段联动：field2和field3的值会改变field1的选项，field2和field3互相清空数值
  AnsoDataform(
    ref="form2"
    v-model="formData2"
    :formFields="fields2"
    :buttonList="[...buttonList, buildReset('form2')]")
</template>

<script>
/** */
export default {
  name: 'FormFormChain',
  data () {
    return {
      formData: {
        field1: false,
        field2: 'field2',
        field3: 'field3'
      },
      formData1: {
        field1: 0,
        field2: 0
      },
      formData2: {},
      fields: [
        {
          label: 'field1',
          name: 'field1',
          form: {
            tag: 'select',
            options: [{
              label: '显示field2，field3',
              value: true
            }, {
              label: '隐藏field2，field3',
              value: false
            }],
            chains: ({ chains, values, value }) => {
              ['field2', 'field3'].forEach(field => {
                chains.setState(field, (state) => {
                  state.form.visabled = value
                })
              })
            }
          }
        }, {
          label: 'field2',
          name: 'field2',
          form: {
            tag: 'input',
            visabled: false
          }
        }, {
          label: 'field3',
          name: 'field3',
          form: {
            tag: 'input',
            visabled: false
          }
        }],
      fields1: [
        {
          label: 'field1',
          name: 'field1',
          form: {
            tag: 'select',
            options: [{
              label: '把field2的值置为10',
              value: 10
            }, {
              label: '把field2的值置为50',
              value: 50
            }],
            chains: ({ chains, values, value }) => {
              chains.setValue('field2', value)
            }
          }
        }, {
          label: 'field2',
          name: 'field2',
          form: {
            tag: 'number'
          }
        }],
      fields2: [
        {
          label: 'field1',
          name: 'field1',
          form: {
            tag: 'select',
            placeholder: '请通过field2和field3获取option选项'
          }
        }, {
          label: 'field2',
          name: 'field2',
          form: {
            tag: 'input',
            placeholder: '随便填',
            chains: ({ chains, values, value }) => {
              if (!value && !values.field3) chains.setOptions('field1', [])
              if (value) chains.setOptions('field1', this.options1)
              if (value && values.field3) chains.setValue('field3', '')
            }
          }
        }, {
          label: 'field3',
          name: 'field3',
          form: {
            tag: 'input',
            placeholder: '随便填',
            chains: ({ chains, values, value }) => {
              if (!value && !values.field2) chains.setOptions('field1', [])
              if (value) chains.setOptions('field1', this.options2)
              if (value && values.field2) chains.setValue('field2', '')
            }
          }
        }],
      options1: [{
        label: '被field2修改的选项1',
        value: '被field2修改的选项1'
      }, {
        label: '被field2修改的选项2',
        value: '被field2修改的选项2'
      }],
      options2: [{
        label: '被field3修改的选项1',
        value: '被field3修改的选项1'
      }, {
        label: '被field3修改的选项2',
        value: '被field3修改的选项2'
      }],
      buttonList: [{
        label: '提交',
        type: 'primary',
        func: (button) => {
          console.log('确认被点击', button)
        }
      }],
      buildReset: (name) => {
        return {
          label: '重置',
          func: () => {
            this.$refs[name].resetForm()
          }
        }
      }
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
