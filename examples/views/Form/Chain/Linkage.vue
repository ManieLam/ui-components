<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h4 默认表单，链式联动
  small 即有A就有B，有B就有C，A为祖父节点; 清除祖父A数据则会清除B，B清除影响C
  AnsoDataform(
    ref="form"
    v-model="formData"
    :formFields="fields"
    :buttonList="[...buttonList, buildReset('form')]")
  hr
  //- h4 对比表单，链式联动
  //- AnsoDataformCompared(
  //-   ref="comparedform"
  //-   v-model="formData"
  //-   :formFields="fields"
  //-   :buttonList="[...buttonList, buildReset('comparedform')]"
  //- )
  //- hr
  h4 栅格式表单，链式联动
  AnsoDataform(
    ref="gridform"
    v-model="formData"
    type="row"
    :colspanNum="2"
    :formFields="fields"
    :buttonList="[...buttonList, buildReset('gridform')]"
  )
</template>

<script>
/** */
import optionJson from './optionJson.json'
export default {
  name: 'FormChainLinkage',
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
