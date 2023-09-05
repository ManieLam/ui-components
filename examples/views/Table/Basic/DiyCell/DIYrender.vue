<template lang="pug">
  .anso-table
    span 表格单元格自定义渲染多种展示类型
    AnsoDatatable(
      keyName="diyRenderTable"
      :data="tableData"
      :columns="columns")
      div(slot="column-htmlTag",slot-scope="scope",style="color:red;background:yellow;margin-left: -10px;margin-right: -20px") {{scope.value}}
      el-progress(slot="column-html",slot-scope="scope",:percentage="scope.value")
      AnsoLink(slot="column-link",slot-scope="scope",:value="scope.value",:linkLabel="scope.column.linkLabel",url="/#/table/basic/simple")
      AnsoLink(slot="column-fuchLink",slot-scope="scope",:value="scope.value",:linkLabel="scope.column.linkLabel",:func="func",:data="scope.row")
      AnsoInfoRender(slot="column-file",slot-scope="scope",:value="scope.value",:field="filefield")
      div(slot="column-icon",slot-scope="scope" @click="iconClick(scope)")
        AnsoIcon(:icon="scope.column.icon")
</template>

<script>
export default {
  name: 'tableDIYrender',
  components: {
  },
  data () {
    return {
      tableData: [{
        DIY: 123,
        htmlTag: 456,
        html: 40,
        link: '综合表格-0',
        fuchLink: '带参跳转-0',
        file: [{
          fileLength: 72064,
          fileName: '微信图片_20200915095228.jpg',
          fileType: 'jpg',
          id: 2265093,
          shortUrl: 'QrYFbiJvyUFf'
        }],
        icon: '我是按钮值-0'
      }, {
        DIY: 456,
        htmlTag: 789,
        html: 80,
        link: '综合表格-1',
        fuchLink: '带参跳转-1',
        file: [{
          fileLength: 72064,
          fileName: '微信图片_20200915094587.jpg',
          fileType: 'jpg',
          id: 2265094,
          shortUrl: 'QrYFbiJvyUFds'
        }],
        icon: '我是按钮值-1'
      }],
      columns: [{
        name: 'DIY',
        label: 'DIY',
        render: (value, field, data) => {
          return '自定义渲染' + value
        }
      }, {
        name: 'htmlTag',
        label: '使用html标签嵌入'
      }, {
        name: 'html',
        label: 'html标签嵌入el-progress'
      }, {
        name: 'link',
        label: '跳转至综合表格',
        linkLabel: (value, data) => {
          return `<span style="color: red">跳转至综合表格（${value}）</span>`
        }
      }, {
        name: 'fuchLink',
        label: '函数式带参跳转',
        linkLabel: (value, data) => {
          return `<span style="color: red">函数式带参跳转（${value}）</span>`
        }
      }, {
        name: 'file',
        label: '文件'
      }, {
        name: 'icon',
        label: '按钮展示',
        icon: 'sousuo'
      }],
      filefield: {
        render: {
          type: 'file'
        }
      },
      func: ({ value, data }) => {
        this.$router.push({
          path: '/index',
          query: {
            details: data.html
          }
        })
      }
    }
  },
  methods: {
    iconClick (scope) {
      console.log(scope)
      const { row, value } = scope
      this.$message.success(`你点到了我的搜索按钮, 当前行html标签嵌入el-progress, 值为: ${row.html}, 我自身值为: ${value}`)
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  background-color: #fff
  width: 100%
  height: 100%
  span
    padding: 8px
</style>
