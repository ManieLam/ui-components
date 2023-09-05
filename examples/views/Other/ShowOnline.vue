<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 excel, word在线展示, 请上传excel, word文件成功
    AnsoDataform(
      :formFields="headerFormFields"
      :buttonList="[]"
    )
    i.el-icon-zoom-in  上传附件后，点击可查看在线附件
    br
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
        label: 'excel, word在线展示',
        form: {
          tag: 'file',
          isDownload: false,
          typeLimit: ['xls', 'xlsx', 'doc', 'docx'],
          tip: '支持扩展名：.xlsx .xlx .doc .docx',
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
