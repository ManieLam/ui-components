<template lang="pug">
div.checkbox
  el-checkbox.selectAll(
    v-if="isSelectAll"
    :indeterminate="isIndeterminate" v-model="checkAll" @change="handleChecked(currentValue)") 全选
  el-checkbox-group(
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue"
    :class="isVertical ? 'vertical' : ''")
    component(
      :is="isButton ? 'el-checkbox-button' : 'el-checkbox'"
      v-for="(checkbox, index) in options"
      v-bind="checkbox"
      :key="checkbox.index"
      :border="isBorder"
      :label="checkbox.value") {{checkbox.label}}
</template>
<script>
/**
 * @module AnsoDataformCheckbox 多选框
 * @author chenpy
 *   */
export default {
  name: 'AnsoDataformCheckbox',
  /**
   * 多选框
   * @props props参数
   * @prop {Array} options 多选框组，以多个多选框配置为对象
   * @prop {Boolean} isVertical 多选框组是否垂直显示
   * @prop {Boolean} isButton 多选组合,按钮组方式呈现
   * @prop {Boolean} isBorder 多选是否显示边框,如将多选框设置成按钮组isButton = true，则设置无效
   * @prop {Boolean} isSelectAll 是否显示全选，需要配合func使用，出效果
   * @prop {Function} func 支持全选按钮点击后的操作，isSelectAll = true 有效
   **/
  data () {
    return {
      isIndeterminate: false,
      checkAll: false
    }
  },
  props: {
    value: {
      type: Array,
      default: () => ([])
    },
    options: {
      type: Array,
      default: () => ([])
    },
    isVertical: {
      type: Boolean,
      default: false
    },
    isButton: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    },
    isSelectAll: {
      type: Boolean,
      default: false
    },
    func: {
      type: Function,
      default: () => {
        return false
      }
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
  watch: {
    currentValue: {
      immediate: true,
      handler (value) {
        const CheckboxListLen = this.options.length // 多选框组数据源数量
        const defaultValueLen = this.currentValue.length // 多选框组勾选数据数量
        if (defaultValueLen !== CheckboxListLen && defaultValueLen !== 0) {
          this.isIndeterminate = true // 勾选数量不等于数据源数量，且勾选数量不为0时，多选组件不确定状态isIndeterminate为true
        } else {
          this.isIndeterminate = false // 勾选数量等于数据源数量,多选组件不确定状态isIndeterminate为false
          this.checkAll = defaultValueLen !== 0 // 全选为true
        }
      }
    }
  },
  methods: {
    handleChecked (value) { // 当绑定值变化时触发的事件
      const funcProps = {
        checkbox: this,
        data: value
      }
      // 出参为checkbox(组件所有属性)、data(组件值)
      this.$emit('handleAllChange', funcProps)
      if (this.func) {
        this.func({ funcProps })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.checkbox
  width: 100%
  display: table-cell
  .el-checkbox-group.vertical
    display: flex
    flex-direction: column
    .el-checkbox-button
      border-left: 1px solid #D9D9D9
      border-radius: 2px 0 0 2px
</style>
<style scoped>
.el-checkbox-group.vertical >>> .el-checkbox-button__inner {
  border-left: none;
  border-radius: 0
}
.checkbox >>> .el-checkbox__label {
  padding-left: 5px
}
.el-checkbox-group >>> .el-checkbox__label {
  font-weight: normal
}
</style>
