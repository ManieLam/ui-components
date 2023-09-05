<template>
  <el-tabs tab-position="left" class="el-tabs">
    <el-tab-pane label="使用说明">
      <div class="home markdown-body mdReader-body" style="padding: 1rem">
        <README />
      </div>
    </el-tab-pane>
    <el-tab-pane label="更新日志">
      <div class="home markdown-body mdReader-body" style="padding: 1rem">
        <CHANGELOG />
      </div>
    </el-tab-pane>
  </el-tabs>

</template>

<script>
// @ is an alias to /src
import README from '../../README.md'
import CHANGELOG from '../../CHANGELOG.md'
export default {
  name: 'Home',
  components: {
    README,
    CHANGELOG
  }
}
</script>
<style lang="sass" scoped>
.el-tabs ::v-deep .el-tabs__content
  overflow: auto !important
  height: 100%
</style>
