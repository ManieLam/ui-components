<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 单选框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 排列状态
    AnsoDataform(
      :formFields="directionFormFields"
      :buttonList="[]"
    )
    hr
    h4 按钮样式
    AnsoDataform(
      :formFields="buttonFormFields"
      :buttonList="[]"
    )
    hr
    h4 带边框
    AnsoDataform(
      :formFields="borderFormFields"
      :buttonList="[]"
    )
    hr
    h4 带边框-大小样式
    AnsoDataform(
      :formFields="sizeFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleRadio',
  components: {
  },
  data () {
    return {
      nomalFormFields: [{
        name: '单选框',
        label: '单选框',
        form: {
          tag: 'radio',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }]
        }
      }],
      disabledFormFields: [{
        name: '禁用单选框',
        label: '禁用单选框',
        form: {
          tag: 'radio',
          disabled: true,
          value: '1',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }, {
        name: '单选框-禁用某一选项',
        label: '单选框-禁用某一选项',
        form: {
          tag: 'radio',
          options: [{
            label: '无',
            value: '0',
            disabled: true
          }, {
            label: '有',
            value: '1'
          }]
        }
      }],
      directionFormFields: [{
        name: '横向单选框',
        label: '横向单选框',
        form: {
          tag: 'radio',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }, {
        name: '纵向单选框',
        label: '纵向单选框',
        form: {
          tag: 'radio',
          isVertical: true,
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }],
      buttonFormFields: [{
        name: '按钮单选框',
        label: '按钮单选框',
        form: {
          tag: 'radio',
          isButton: true,
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }],
      borderFormFields: [{
        name: '带有边框的单选框',
        label: '带有边框的单选框',
        form: {
          tag: 'radio',
          isBorder: true,
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }],
      sizeFormFields: [{
        name: 'medium',
        label: '设置单选组样式大小:medium',
        form: {
          tag: 'radio',
          isBorder: true,
          size: 'medium',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }, {
        name: 'small',
        label: '设置单选组样式大小:small',
        form: {
          tag: 'radio',
          isBorder: true,
          size: 'small',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }, {
        name: 'mini',
        label: '设置单选组样式大小:mini',
        form: {
          tag: 'radio',
          isBorder: true,
          size: 'mini',
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1'
          }, {
            label: '还有',
            value: '2'
          }, {
            label: '没有还有',
            value: '3'
          }]
        }
      }, {
        name: '设置单个单选框样式大小',
        label: '设置单个单选框样式大小',
        form: {
          tag: 'radio',
          isBorder: true,
          options: [{
            label: '无',
            value: '0'
          }, {
            label: '有',
            value: '1',
            size: 'medium'
          }, {
            label: '还有',
            value: '2',
            size: 'small'
          }, {
            label: '没有还有',
            value: '3',
            size: 'mini'
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
