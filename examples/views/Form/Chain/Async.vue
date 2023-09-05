<template lang='pug'>
div(style="padding: 0 2rem 1rem")
  h4 异步联动：分组类表单，其他表单chains方法一致
  AnsoDataformGroup.form-withFixed(
    ref="form"
    v-model="formData"
    :buttonFixed="true"
    :colspanNum="2"
    :groupSplit="groupSplit"
    :groupTitle="groupTitle"
    :formFields="formFields"
    :buttonList="buttonList")
</template>

<script>
/** */
export default {
  name: 'FormFormGroupLinkage',
  data () {
    return {
      groupTitle: ['组名1', '组名2', '组名3'],
      groupSplit: [['Field'], ['Field1', 'Field2', 'Field3', 'Field4']],
      formData: {
        Field4: true
      },
      formFields: [{
        name: 'Field',
        label: '用户号',
        form: {
          tag: 'input',
          placeholder: '请随便输入个用户号',
          rules: [{
            required: true, message: '必填', trigger: 'blur'
          }],
          chains: ({ chains, values, value }) => {
            this.getUserInfo(value).then(userInfo => {
              const { field1, field2, field3, field4 } = userInfo
              chains.setValue('Field1', field1)
              chains.setValue('Field2', field2)
              chains.setValue('Field3', field3)
              chains.setValue('Field4', field4)
            })
          }
        }
      }, {
        name: 'Field1',
        label: '身份证号',
        form: {
          tag: 'input',
          disabled: true
        }
      }, {
        name: 'Field2',
        label: '用户名称',
        form: {
          tag: 'input',
          disabled: true
        }
      }, {
        name: 'Field3',
        label: '水表地址',
        form: {
          tag: 'input',
          disabled: true
        }
      }, {
        name: 'Field4',
        label: '是否为失效用户',
        form: {
          tag: 'switch'
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
          this.$refs.form.resetForm()
        }
      }]
    }
  },
  methods: {
    getUserInfo (userNo) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(userNo ? {
            field1: 440524199208231324,
            field2: '张三',
            field3: 'dahdidadhakhdwiuoiu dsdja dssss',
            field4: false
          } : {})
        }, 1000)
      })
    }
  }
}
</script>

<style lang='sass' scoped>

</style>
