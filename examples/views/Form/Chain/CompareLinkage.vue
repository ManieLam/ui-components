<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h4 对比表单，链式联动(作废)
  //- AnsoDataformCompared(
  //-   ref="comparedform"
  //-   :value="formData"
  //-   :formFields="fields"
  //-   :buttonList="buttonList"
  //- )
</template>

<script>
/** */
import optionJson from './optionJson.json'
export default {
  name: 'CompareLinkage',
  data () {
    return {
      formData: {},
      fields: [{
        name: 'A',
        label: '字段A',
        form: {
          tag: 'select',
          clearable: true,
          options: [{
            label: '广东省',
            value: 'guangdong'
          }, {
            label: '河南省',
            value: 'henan'
          }],
          chains: ({ chains, value }) => {
            if (!value) return
            chains.setState('B', (state) => {
              state.form.visabled = !!value
              state.form.options = value ? optionJson.city[value] : []
            })
          }
        }
      },
      {
        name: 'B',
        label: '字段B',
        form: {
          tag: 'select',
          clearable: true,
          visabled: false,
          chains: ({ chains, value }) => {
            if (!value) return
            chains.setState('C', (state) => {
              state.form.visabled = !!value
              state.form.options = value ? optionJson.district[value] : []
            })
          }
        }
      },
      {
        name: 'C',
        label: '字段C',
        form: {
          tag: 'select',
          visabled: false
        }
      }],
      buttonList: [{
        label: '提交',
        type: 'primary',
        func: (button) => {
          console.log('确认被点击', button)
        }
      }, {
        label: '重置',
        func: () => {
          this.$refs.comparedform.resetForm()
        }
      }]
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
