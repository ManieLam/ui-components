<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="externalLinkTable"
      :data="tableData"
      :columns="columns")
</template>

<script>
export default {
  name: 'tableExternalLink',
  components: {
  },
  data () {
    return {
      tableData: [{
        simple: '打开谷歌',
        blank: '打开谷歌'
      }],
      columns: [{
        name: 'simple',
        label: '本页面打开',
        render: {
          type: 'link',
          openType: 'current',
          url: 'http://www.google.com/'
        }
      }, {
        name: 'blank',
        label: '新页面打开',
        render: {
          type: 'link',
          openType: 'new',
          url: 'http://www.google.com/'
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
