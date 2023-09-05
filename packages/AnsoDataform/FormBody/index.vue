<template lang='pug'>
.form-body__container(
  :type="type"
  :id="`${$attrs.keyName||'ansoform'}-form-body`"
  :inline="$attrs.inline"
  :isCollapse="$attrs.isCollapse"
  :isCollapseBtns="isCollapseBtns&&$attrs.isCollapse"
  :label-position="labelPosition"
  :class="{'layout-display__flex': !isCollapseBtns&&$attrs.inline}"
  v-maxHeight="isInlineCollasing")
  component(
    class="form-body-content"
    :is="bodyLayout[type] ? bodyLayout[type] : 'FormBodyDefault'"
    :ref="type"
    :label-position="labelPosition"
    v-bind="$attrs"
    v-on="$listeners")
    template(v-slot:body-header="{formData}")
      slot(name="body-header",:formData="formData")
    template(v-slot:body-footer="{formData}")
      slot(name="body-footer",:formData="formData")
  .form-body_buttonlist(:id="`${$attrs.keyName||'ansoform'}-form-footer`")
    slot(name="form-buttonList")
</template>
<script>
/** */
import FormBodyDefault from './Default'
import InlineGrid from './Grid/Inline'
import FormBodyRow from './Row'
export default {
  name: 'AnsoFormBody',
  components: {
    FormBodyDefault,
    InlineGrid,
    FormBodyRow
  },
  props: {
    type: {
      type: String,
      default: 'default'
    },
    labelPosition: {
      type: String,
      default: 'right',
      validator: (value) => {
        return ['top', 'left', 'right', 'center'].indexOf(value) > -1
      }
    },
    /* 是否存在收缩、展开按钮 */
    isCollapseBtns: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      bodyLayout: Object.freeze({
        grid: InlineGrid,
        row: FormBodyRow,
        default: FormBodyDefault
      })
    }
  },
  computed: {
    isInlineCollasing () {
      return this.$attrs.inline && this.$attrs.isCollapse
    }
  },
  directives: {
    maxHeight: {
      inserted (el, binding, vnode) {
        if (!binding.value) {
          el.style.maxHeight = '100%'
        } else {
          const formitemEl = vnode.elm.getElementsByClassName('el-form-item')[0]
          el.style.maxHeight = formitemEl ? (formitemEl.offsetHeight || 32) + 2 + 'px' : 'auto'
        }
      },
      update (el, binding, vnode) {
        if (!binding.value) {
          el.style.maxHeight = '100%'
        } else {
          const formitemEl = vnode.elm.getElementsByClassName('el-form-item')[0]
          el.style.maxHeight = formitemEl ? (formitemEl.offsetHeight || 32) + 2 + 'px' : 'auto'
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.layout-display__flex
  display: flex
  justify-content: space-between
/* row类型表单收缩时候切换成flex布局 */
.form-body__container[isCollapseBtns="true"]
  @extend .layout-display__flex
.form-body__container[isCollapse] > .form-body_buttonlist
  padding-left: $--button-padding-horizontal
/* 表单可收缩时候超出区域隐藏 */
.form-body__container[inline="true"][isCollapseBtns="true"]
  overflow: hidden
</style>

<style scoped>
/* 只读情况下，校验标识不显示 */
.form-body__container[readonly] >>> .el-form-item__label:after{
  display: none
}
</style>
