<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h4 循环联动 Total = Price*Count; Count = Total/Price; Price = Total/Count
  AnsoDataform(
    ref="cricleForm"
    :value="formData"
    :formFields="fields"
    :buttonList="buttonList"
  )
</template>

<script>
/** */
export default {
  name: 'FormFormCricle',
  data () {
    return {
      formData: {},
      fields: [{
        label: 'Price',
        name: 'price',
        form: {
          tag: 'number',
          chains: ({ chains, values, value }) => {
            const { count, total } = values
            if (count) {
              chains.setValue('total', count * value)
            } else {
              if (total) {
                chains.setValue('count', total / value)
              }
            }
          }
        }
      }, {
        label: 'Count',
        name: 'count',
        form: {
          tag: 'number',
          chains: ({ chains, values, value }) => {
            const { price, total } = values
            if (price) {
              chains.setValue('total', price * value)
            } else {
              if (total) {
                chains.setValue('price', total / value)
              }
            }
          }
        }
      }, {
        label: 'Total',
        name: 'total',
        form: {
          tag: 'number',
          chains: ({ chains, values, value }) => {
            const { price, count } = values
            if (price && count) {
              chains.setValue('count', value / price)
              return
            }
            if (count) chains.setValue('price', value / count)
            if (price) chains.setValue('count', value / price)
          }
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
          this.$refs.cricleForm.resetForm()
        }
      }]
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
