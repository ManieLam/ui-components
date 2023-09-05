<template lang="pug">
  .anso-button_group
    h6 水平按钮组
    .group_vertical
      AnsoButtonGroup.btnBlock(:isGroup="true",:buttonList="buttonList1" :isInterval="false")
      AnsoButtonGroup.btnBlock(:isGroup="true",:buttonList="buttonList1")
      AnsoButtonGroup.btnBlock(:isGroup="true",:buttonList="buttonList1",:needDivider="true")
      AnsoButtonGroup.btnBlock(:isGroup="true",:buttonList="buttonList3")
    hr
    h6 垂直按钮组
    .group_horizontal
      AnsoButtonGroup.btnBlock(:isGroup="true",:isVertical="true",:buttonList="buttonList2")
      AnsoButtonGroup.btnBlock(:isGroup="true",:isVertical="true",:needDivider="true", dividerDirection='horizontal',:buttonList="buttonList2")
      AnsoButtonGroup.btnBlock(:isGroup="true",:isVertical="true",:buttonList="buttonList4" :isInterval="false")
      AnsoButtonGroup.btnBlock(:isGroup="true",:isVertical="true",:buttonList="buttonList4")
      AnsoButtonGroup.btnBlock(:isGroup="true",:isVertical="true",:needDivider="true", dividerDirection='horizontal',:buttonList="buttonList4")
</template>

<script>
export default {
  name: 'tooltipButton',
  components: {
  },
  data () {
    return {
      buttonList1: [{
        label: '上一页',
        type: 'primary',
        icon: 'xiangzuofan'
      }, {
        label: '下一页',
        type: 'primary',
        icon: 'xiangyoufan',
        iconAlign: 'right'
      }, {
        type: 'success',
        icon: 'gerenxinxi-yijianfankui',
        tooltip: {
          content: '编辑',
          placement: 'top'
        }
      }, {
        type: 'danger',
        icon: 'xitongshezhi-zizhanghuguanli',
        tooltip: {
          content: '分享',
          placement: 'top'
        }
      }, {
        type: 'warning',
        icon: 'shanchu',
        tooltip: {
          content: '删除',
          placement: 'top',
          effect: 'light'
        }
      }],
      buttonList2: [{
        type: 'text',
        icon: 'sousuo',
        tooltip: {
          content: '查看查看查看查看查看查看'
        },
        badge: {
          value: 100,
          max: 99
        }
      }, {
        type: 'text',
        icon: 'zizhanghaoqiehuan',
        tooltip: {
          content: '跳转'
        },
        badge: {
          isDot: true
        }
      }, {
        type: 'text',
        textType: 'success',
        tooltip: {
          content: '成功'
        },
        icon: 'gerenxinxi-yijianfankui'
      }, {
        type: 'text',
        textType: 'danger',
        tooltip: {
          content: '危险'
        },
        icon: 'xitongshezhi-zizhanghuguanli'
      }, {
        type: 'text',
        textType: 'warning',
        icon: 'jingshi-chongman',
        tooltip: {
          content: '警告'
        },
        badge: {
          value: 100,
          max: 99
        }
      }],
      buttonList3: [{
        label: '查看查看查看查看查看查看',
        badge: {
          value: 100,
          max: 99
        }
      }, {
        label: '跳转',
        badge: {
          isDot: true
        }
      }, {
        label: '成功',
        type: 'success'
      }, {
        label: '危险',
        type: 'danger'
      }, {
        label: '警告',
        type: 'warning',
        badge: {
          value: 100,
          max: 99
        }
      }],
      buttonList4: [{
        label: '查看',
        icon: 'sousuo',
        iconAlign: 'right'
      }, {
        label: '跳转',
        icon: 'zizhanghaoqiehuan',
        iconAlign: 'right',
        badge: {
          isDot: true
        }
      }, {
        type: 'success',
        icon: 'gerenxinxi-yijianfankui'
      }, {
        type: 'danger',
        icon: 'xitongshezhi-zizhanghuguanli'
      }, {
        type: 'warning',
        icon: 'jingshi-chongman'
      }]
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-button_group
  padding: 2rem
.group_horizontal
  display: flex
  .btnBlock+.btnBlock
    margin-left: 60px
.group_vertical
  display: flex
  flex-direction: column
  .btnBlock
    margin-bottom: 10px
.group_horizontal+.group_horizontal
  margin-top: 20px
</style>
