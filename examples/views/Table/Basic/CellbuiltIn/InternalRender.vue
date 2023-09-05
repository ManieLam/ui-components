<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="internalRenderTable"
      :border="true"
      :data="tableData"
      :columns="columns")
</template>

<script>
export default {
  name: 'tableInternalRender',
  components: {
  },
  data () {
    return {
      tableData: [{
        DIY: 1222,
        text: '当我只是一段字符串内容当我只是一段字符串内容当我只是一段字符串内容当我只是一段字符串内容当我只是一段字符串内容',
        // money: 574837,
        money: '5234556', // 字符串数字也支持，别杠，不包括'这种'。
        select: true,
        multiselect: ['km', 'js'],
        time: Date.now(),
        icon: 'sousuo',
        file: [{
          fileLength: 72064,
          fileName: '微信图片_20200915095228.jpg',
          fileType: 'jpg',
          id: 2265093,
          shortUrl: 'QrYFbiJvyUFf'
        }]
      }, {
        DIY: 1223245,
        text: '当我只是一段字符串内容',
        money: 123.242,
        select: false,
        multiselect: ['km', 'js'],
        time: Date.now(),
        icon: 'sousuo',
        file: ['https://cn.vuejs.org/images/logo.png']
      }],
      columns: [{
        name: 'DIY',
        label: 'DIY',
        render: (value, field, data) => {
          return '自定义渲染' + value
        }
      }, {
        name: 'text',
        label: 'text',
        render: { type: 'text' }
      }, {
        name: 'money',
        label: 'money',
        width: 80,
        render: { type: 'money' }
      }, {
        name: 'select',
        label: 'select',
        render: { type: 'select' },
        // 选项的值类型得跟表格里数据类型一致，不然匹配不成功。
        options: [{
          value: true,
          label: '对'
        }, {
          value: false,
          label: '错'
        }]
      }, {
        name: 'multiselect',
        label: 'multiselect',
        render: { type: 'multiselect' },
        options: [{
          label: '昆明',
          value: 'km'
        }, {
          label: '金山',
          value: 'js'
        }, {
          label: '南澳',
          value: 'no'
        }]
      }, {
        name: 'time',
        label: 'time',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD'
        }
      // }, {
      //   name: 'icon',
      //   label: 'icon',
      //   render: {
      //     type: 'icon',
      //     width: '20px',
      //     height: '20px'
      //   }
      // }, {
      //   name: 'file',
      //   label: 'file',
      //   width: 150,
      //   render: { type: 'file', fit: 'fill', imageStyle: { height: '24px' } }
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
