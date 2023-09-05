<template lang='pug'>
.transfer__container
  div(
    ref="popupTransfer"
    v-if="isPopup")
    el-button(v-bind="dialogProps" @click="dialogVisible = true") {{dialogProps.btnText}}
    el-dialog(
      v-bind="dialogProps"
      :visible.sync="dialogVisible"
      width="30%")
      Transfer.dialog_transfer(
        v-bind="$attrs"
        v-model="currentValue"
        v-on="$listeners")
  Transfer(
    ref="transfer"
    v-else
    v-bind="$attrs"
    v-model="currentValue"
    v-on="$listeners")
</template>

<script>
/** */
import Transfer from './transfer'
export default {
  name: 'AnsoDataformTransfer',
  components: {
    Transfer
  },
  props: {
    /**
     * @prop {Array} value 穿梭框选项的值
     * @prop {Boolean} isPopup 是否弹窗展示
     * @prop {Object} dialogProps 弹窗信息配置
     */
    value: Array,
    isPopup: {
      type: Boolean,
      default: false
    },
    dialogProps: {
      type: Object,
      default: () => ({
        btnText: '穿梭框选项',
        title: '穿梭框选项'
      })
    }
  },
  computed: {
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  data () {
    return {
      dialogVisible: false
    }
  }
}
</script>

<style lang='sass' scoped>
.transfer__container
  ::v-deep .el-dialog__body
    padding-top: 10px
    .dialog_transfer
      width: 100%
      display: flex
      justify-content: center
      align-items: center
</style>
