<template lang='pug'>
.demo-box
  //- .d-flex
  //-   label 设置icon颜色
  //-   ansoDataformInput(v-model="color")
  h4 调用方法：使用icon.font_class作为ansoIcon组件的icon属性
  h5 注意事项：
    a(href="https://www.iconfont.cn/help/detail?spm=a313x.7781069.1998910419.d8cf4382a&helptype=code") 官方使用文档
  h4 改变icon颜色：
  AnsoDataformRadio(v-model="iconColor", :options="colorOptions")
  small 如果加入iconfont库里的图标原本有颜色，则不会改变
  hr
  .icon-item__content(v-for="icon in iconList", :key="icon.font_class")
    AnsoIcon(
      v-bind="iconStyles"
      :style="{...iconStyles, color: iconColor}"
      :icon="icon.font_class")
    .icon-item__description
      .desc_text {{icon.name}}
      .desc_text {{icon.font_class}}
</template>

<script>
/** */
import iconfontJSON from 'assets/icon/iconfont.json'
export default {
  name: 'ColorfulIcon',
  data () {
    return {
      iconList: iconfontJSON.glyphs,
      iconStyles: {
        'font-size': '20px'
      },
      iconColor: '#595959',
      colorOptions: [{
        label: '红',
        value: '#FF4D4F'
      }, {
        label: '蓝',
        value: '#1890FF'
      }, {
        label: '默认',
        value: '#595959'
      }]
    }
  }
}
</script>

<style lang='sass' scoped>
.demo-box
  display: table
  &::after
    content: ''
    clear: both
.icon-item__content
  float: left
  min-width: 100px
  height: 100px
  border: 1px solid #ddd
  padding: 8px
  margin-bottom: 10px
  text-align: center
  margin-left: 10px
  overflow: hidden
  font-size: 1em
  color: #1890FF
  &:hover
    border: 1px solid #1890FF
    .anso-icon
      color: #1890FF
    .desc_text
      color: #1890FF
.desc_text
  color: rgba(0,0,0,.4)
</style>
