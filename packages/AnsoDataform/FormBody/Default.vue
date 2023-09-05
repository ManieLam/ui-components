<template lang='pug'>
.dataform-body__default(:isCollapse="isCollapse")
  slot.default-form-item(name="body-header",:formData="formData")
  AnsoDataformItem.default-form-item(
    v-for="field in formFields"
    v-show="field.form.visabled!==false"
    v-model="formData[field.name]"
    v-on="$listeners"
    v-bind="$attrs"
    :inline="$attrs.inline"
    :field="field"
    :full="formData"
    :key="field.name"
    :errorToptip="$attrs.inline ? true : errorToptip"
    @change="$emit('onChange', field, $event)")
  slot.default-form-item(name="body-footer",:formData="formData")
  //- slot(name="form-buttonList",v-if="$attrs.inline&&!$attrs.isCollapse")
</template>
<script>
/**
 * @module AnsoDataformBody
 * @description 表单内容体，普通格式，一般配合AnsoDataform等form系列组件。
 * @author linmn
 */
import AnsoDataformItem from '../AnsoDataformItem'
export default {
  name: 'FormBodyDefault',
  components: {
    AnsoDataformItem
  },
  props: {
    formFields: {
      type: Array,
      required: true,
      default: () => ([])
    },
    formData: {
      type: Object,
      default: () => ({})
    },
    /* 是否展开所有的收缩行, 收缩：true */
    isCollapse: {
      type: Boolean,
      default: false
    },
    errorToptip: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang='sass' scoped>
.dataform-body__default
  flex: 1
.default-form-item:not([inline])
  display: flex
</style>

<style scoped>
/* 表单-内联式 样式定制 */
.dataform-body__default[inline='true'] >>> .tooltip_template>div:not(.without-limit__width) {
  width: 154px;
}
.dataform-body__default[inline='true'] >>> .el-form-item {
  margin-right: 24px;
}
.dataform-body__default[inline='true'] >>> .el-form-item:last-child {
  margin-right: 0;
}
.dataform-body__default[inline='true'] >>> .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label:before {
  display: inline;
  content: '*';
  color: red;
  margin-left: 2px;
}
.dataform-body__default[inline='true'] >>> .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label:after {
  display: none;
}
</style>
