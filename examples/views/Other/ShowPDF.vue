<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 PDF在线展示, 请上传pdf文件成功
    AnsoDataform(
      :formFields="headerFormFields"
      :buttonList="[]"
    )
    h4 PDF在线展示, 直接获取值展示（TODO）
    br
    i.el-icon-zoom-in  点击可查看在线PDF
    br
    i.el-icon-arrow-left  点击可操作PDF文件上一页
    br
    i.el-icon-arrow-right  点击可操作PDF文件下一页
    br
    AnsoIcon(icon="jia")
    span  点击可操作放大PDF文件
    br
    AnsoIcon(icon="jian")
    span  点击可操作缩小PDF文件
</template>

<script>
// import axios from 'axios'
export default {
  name: 'simpleFile',
  components: {},
  data () {
    return {
      headerFormFields: [{
        name: 'header',
        label: 'PDF在线展示',
        form: {
          tag: 'file',
          isDownload: false,
          typeLimit: ['pdf'],
          tip: '支持扩展名：.pdf',
          resource: '/api/fileserver/upload',
          showResource: '/api/fileserver/download/shortUrl',
          uploadResourceConfig: ({ url, params }) => ({
            url,
            method: 'post',
            headers: {
              'Anso-Token': '123'
            },
            data: params
          })
        }
      }]
    }
  },
  mounted () {
  }
}
</script>
<style lang="scss" scoped>
</style>
