<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="internalLinkTable"
      :data="tableData"
      :columns="columns")
</template>

<script>
export default {
  name: 'tableInternalLink',
  components: {
  },
  data () {
    return {
      tableData: [{
        simple: '跳转至简单表格',
        new: '跳转至简单表格(新页面打开)',
        disabled: '跳转至简单表格',
        underline: '跳转至简单表格',
        icon: '跳转至简单表格',
        iconRight: '跳转至简单表格',
        valueString: '跳转至简单表格',
        valueFunction: '跳转至简单表格'
      }],
      columns: [{
        name: 'simple',
        label: '表格内容跳转',
        render: {
          type: 'link',
          openType: 'current',
          url: '/#/table/basic/simple'
        }
      }, {
        name: 'new',
        label: '表格内容跳转（新页面打开）',
        render: {
          type: 'link',
          url: '/#/table/basic/simple'
        }
      }, {
        name: 'disabled',
        label: '禁用跳转',
        render: {
          type: 'link',
          url: '/#/table/basic/simple',
          disabled: true
        }
      }, {
        name: 'underline',
        label: '无下划线',
        render: {
          type: 'link',
          url: '/#/table/basic/simple',
          openType: 'current',
          linkType: 'inside',
          underline: false
        }
      }, {
        name: 'icon',
        label: '前置icon',
        render: {
          type: 'link',
          openType: 'current',
          url: '/#/table/basic/simple',
          icon: 'gerenxinxi-yijianfankui'
        }
      }, {
        name: 'iconRight',
        label: '后置icon',
        render: {
          type: 'link',
          url: '/#/table/basic/simple',
          openType: 'current',
          icon: 'gerenxinxi-yijianfankui',
          iconAlign: 'right'
        }
      }, {
        name: 'valueString',
        label: '设置value(String)',
        render: {
          type: 'link',
          url: '/#/table/basic/simple',
          openType: 'current',
          linkLabel: '自定义显示内容'
        }
      }, {
        name: 'valueFunction',
        label: '设置value(Function)',
        width: 200,
        render: {
          type: 'link',
          url: '/#/table/basic/simple',
          openType: 'current',
          linkLabel: (val) => {
            return `<span style="color: red">支持html（${val}）</span>`
          }
        }
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
