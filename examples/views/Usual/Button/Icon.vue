<template lang="pug">
  .anso-button_icon
    h6 图标位置
    AnsoButtonGroup(:buttonList="buttonList1")
    hr
    h6 只有图标的按钮
    AnsoButtonGroup(:buttonList="buttonList2")
    hr
    h6 不同尺寸
    AnsoButtonGroup(:buttonList="buttonList3")
    hr
    h6 自定义规格大小，如果按钮存在文字内容, 则遵循字体和图标大小一致的规则
    AnsoButtonGroup(:buttonList="buttonList6")
    AnsoButtonGroup(:buttonList="buttonList7")
    hr
    h6 带提示的图标按钮
    AnsoButtonGroup(:buttonList="buttonList4")
    AnsoButtonGroup(:buttonList="buttonList5")
</template>

<script>
export default {
  name: 'iconButton',
  components: {
  },
  data () {
    return {
      buttonList1: [{
        type: 'primary',
        icon: 'xiangzuofan',
        label: '图标在左侧',
        iconAlign: 'left',
        width: '14px',
        height: '14px'
      }, {
        type: 'primary',
        icon: 'xiangyoufan',
        label: '图标在右侧',
        iconAlign: 'right',
        width: '14px',
        height: '14px'
      }],
      buttonList2: [{
        type: 'primary',
        icon: 'gerenxinxi-yijianfankui'
      }, {
        type: 'danger',
        icon: 'shanchu',
        circle: true
      }, {
        type: 'success',
        icon: 'sousuo',
        round: true
      }],
      buttonList3: [{
        name: 'default',
        icon: 'sousuo',
        label: '默认'
      }, {
        label: '中',
        icon: 'sousuo',
        size: 'medium'
      }, {
        label: '小',
        icon: 'sousuo',
        size: 'small'
      }, {
        label: '极小',
        icon: 'sousuo',
        size: 'mini'
      }],
      buttonList6: [{
        icon: 'sousuo',
        label: '默认'
      }, {
        icon: 'sousuo'
      }, {
        icon: 'sousuo',
        specsSize: 16,
        label: '配置规格'
      }, {
        icon: 'sousuo',
        specsSize: 16
      }],
      buttonList7: [{
        type: 'text',
        icon: 'sousuo',
        specsSize: 32
      }, {
        type: 'text',
        icon: 'sousuo',
        specsSize: '24px'
      }, {
        type: 'text',
        icon: 'sousuo',
        specsSize: '16px'
      }, {
        type: 'text',
        icon: 'sousuo',
        specsSize: 12
      }, {
        type: 'text',
        icon: 'sousuo',
        specsSize: 10
      }],
      buttonList4: [{
        type: 'primary',
        icon: 'gerenxinxi-yijianfankui',
        tooltip: {
          content: 'Top Center',
          placement: 'top'
        }
      }, {
        type: 'danger',
        icon: 'shanchu',
        circle: true,
        tooltip: {
          content: 'Top Center',
          placement: 'top'
        }
      }, {
        type: 'success',
        icon: 'sousuo',
        round: true,
        tooltip: {
          content: 'Top Center',
          placement: 'top'
        }
      }],
      buttonList5: [{
        type: 'text',
        textType: 'info',
        icon: 'sousuo',
        tooltip: {
          content: '搜索',
          placement: 'top'
        }
      }, {
        type: 'text',
        textType: 'danger',
        icon: 'lieshezhi',
        tooltip: {
          content: '设置',
          placement: 'top'
        }
      }, {
        type: 'text',
        textType: 'success',
        icon: 'xiazai',
        tooltip: {
          content: '下载',
          placement: 'top'
        }
      }, {
        type: 'text',
        textType: 'primary',
        icon: 'shuaxin',
        tooltip: {
          content: '刷新',
          placement: 'top'
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-button_icon{
  padding: 2rem
}
</style>
