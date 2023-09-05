<template lang="pug">
  el-input(
    v-bind="$attrs"
    v-on="$listeners"
    v-model="currentValue"
    :clearable="clearable"
    :show-password="password"
    :type="inputType")
    //- icon/string的两种前后缀方法
    template(:slot="prependType")
      slot(v-if="prepend.type === 'string'", name="prepend") {{prepend.content}}
      i(v-if="prepend.type === 'icon'", :class="['el-input__icon', 'el-icon-' + prepend.content]")
      slot(v-else, :name="prependType")
    template(:slot="appendType")
      slot(v-if="append.type === 'string'", name="append") {{append.content}}
      i(v-if="append.type === 'icon'", :class="['el-input__icon', 'el-icon-' + append.content]")
      slot(v-else, :name="appendType")
    slot(name="subComponent")
</template>
<script>
/**
 * @module AnsoDataformInput 输入框
 * @author chenpy
 *   */
import trim from 'lodash/trim'
export default {
  name: 'AnsoDataformInput',
  /**
   * 输入框
   * @props props参数
   * @prop {String, Number} value 输入框值
   * @prop {String} inputType 输入框类型，传入text: 文字, textarea：文本
   * @prop {Object} affixes 复合型输入框，已支持到简单内容传入
   * @prop {String} icon 带有图标标记输入类型
   * @prop {String} iconAlign 支持配置图标显示位置
   * @prop {Boolean} password 配置为密码框显示
   **/
  props: {
    value: [String, Number],
    inputType: {
      type: String,
      default: 'text'
    },
    // icon: String,
    // iconAlign: {
    //   type: String,
    //   default: 'left'
    // },
    // affixes: {
    //   type: Object,
    //   default: () => ({})
    // }, // affixes废弃
    prepend: {
      type: Object,
      default: () => ({}),
      validator: function (obj) {
        return obj.type ? ['string', 'icon'].includes(obj.type) : true
      }
    }, // prepend: { type: '', content: '' }
    append: {
      type: Object,
      default: () => ({}),
      validator: function (obj) {
        return obj.type ? ['string', 'icon'].includes(obj.type) : true
      }
    }, // append: { type: '', content: '' }
    password: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // listeners () {
    //   return Object.assign({}, this.$listeners, {
    //     input: () => {}
    //   })
    // },
    prependType () {
      if (!this.prepend.type) {
        return this.$slots.prefix ? 'prefix' : this.$slots.prepend ? 'prepend' : null
      }
      return this.prepend?.type === 'icon' ? 'prefix' : 'prepend'
    },
    appendType () {
      if (!this.append.type) {
        return this.$slots.suffix ? 'suffix' : this.$slots.append ? 'append' : null
      }
      return this.append?.type === 'icon' ? 'suffix' : 'append'
    },
    currentValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$nextTick(() => {
          this.$emit('input', trim(val))
        })
      }
    }
  },
  mounted () {
    // console.info(this.$slots)
  }
}
</script>

<style lang="sass" scoped>
.el-textarea
  ::v-deep textarea
    font-family: auto
</style>
