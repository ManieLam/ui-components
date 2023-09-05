<template lang='pug'>
.example-usal__messageBox
  el-button(type="text" @click="open") 点击打开 ansoMessage Box
  el-button(type="text" @click="dialogVisible=true") 点击打开弹窗
  el-button(type="text" @click="drawer=true") 点击打开侧拉窗
  //- 弹窗
  el-dialog(
    title="提示"
    width="30%"
    :visible.sync="dialogVisible"
    :before-close="beforeCloseDialog")
    span 是一段信息
    span(slot="footer" class="dialog-footer")
      el-button(@click="dialogVisible = false") 取 消
      el-button(type="primary" @click="dialogVisible = false") 确 定
  //- 侧拉
  el-drawer(
    title="我是标题"
    :visible.sync="drawer"
    :direction="direction"
    :before-close="handleCloseDrawer")
    span 我来啦!
</template>

<script>
/** */
export default {
  name: 'Message',
  data () {
    return {
      dialogVisible: false,
      direction: 'rtl',
      drawer: false
    }
  },
  methods: {
    open () {
      // element的$mesbox依然可以使用，ansoMesbox使用方法与$mesbox一致
      this.$ansoMesbox({
        title: '提示',
        message: '此操作将永久删除该文件, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      })
    },
    open1 () {
      this.$ansoMesbox({
        title: '提示',
        message: '此操作将永久删除该文件, 是否继续?',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      })
    },
    beforeCloseDialog () {
      this.$ansoMesbox({
        title: '提示',
        message: '是否关闭',
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        showCancelButton: true,
        type: 'warning'
      })
    },
    handleCloseDrawer () {
      this.$confirm('确认关闭？')
        .then(_ => {
          this.drawer = false
        })
        .catch(_ => {})
    }
  }
}
</script>

<style lang='sass' scoped>
.example-usal__messageBox
  display: flex
  flex-direction: column
</style>
