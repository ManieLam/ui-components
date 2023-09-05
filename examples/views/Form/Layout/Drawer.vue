<template lang='pug'>
div.drawerTestBox(style="padding: 2rem")
  el-button(@click="drawer = true" type="primary") 点我打开侧拉表单
  el-drawer(
    title="侧拉式表单"
    size="40%"
    :visible.sync="drawer"
    :modal="false"
    :before-close="handleClose")
    div.drawerBox
      AnsoDataform.drawerForm(
        ref="form"
        v-model="formData"
        type="row"
        buttonAlign="right"
        labelPosition="top"
        :formFields="formFields"
        :buttonList="buttonList")
</template>

<script>
/** */
import fieldsJson from './fields.json'
export default {
  name: 'FormFormDefault',
  data () {
    return {
      drawer: true,
      formData: {
        name: 'boook',
        field1: 222,
        field2: null,
        field3: [],
        field4: 'field4',
        field5: 'field5',
        field6: []
      },
      formFields: fieldsJson.simple,
      // 设置最大显示行，其余收缩，允许展开
      maxRow: 2,
      colspanNum: 2,
      buttonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (button) => {
          console.log('确认被点击', button)
        }
      }, {
        label: '重置',
        func: () => {
          this.$refs.form.resetForm()
        }
      }]
    }
  },
  methods: {
    handleClose () {
      this.drawer = false
    }
  }
}
</script>

<style lang='sass' scoped>
.drawerTestBox
  width: 100%
  height: 100%
  position: relative
  .el-drawer__wrapper
    position: absolute
    .drawerBox
      height: 100%
      .drawerForm
        padding: .8rem
        width: 100%
        height: 100%
        display: flex
        flex: 1
        flex-direction: column
        ::v-deep .form-body__container
          flex: 1
          overflow: auto
</style>
<style scoped>
.drawerTestBox >>> .el-drawer__body {
  overflow-y: auto
}
.drawerForm >>> .el-row {
  margin: 0 !important
}
</style>
