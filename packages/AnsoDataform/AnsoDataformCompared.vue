<template lang="pug">
el-form.anso-dataform__compared(
  v-bind="$attrs"
  :key="formkey"
  :ref="refname"
  :rules="rules"
  :model="formData"
  :label-width="labelWidthVal")
  FormBodyCompared(
    ref="formBody"
    v-bind="$attrs"
    v-on="$listeners"
    :isSelect="highlightChange"
    :columns="formColumns"
    :tableData="tableData"
    :formData="formData"
    :formFields="formFields"
    @resetField="resetField"
    @onChange="onChangeField")
  AnsoButtonGroup(
    formName="comparedForm"
    :buttonList="formButtonList"
    :formValidate="formValidate")
</template>

<script>
/**
 * @module AnsoDataformCompared 对比表单
 * @description 除了AnsoDataform的常规属性，还支持以下：
 * */
import formCommon from './mixins/formCommon.js'
import cloneDeep from 'lodash/cloneDeep'
import FormBodyCompared from './FormBody/Compared'

export default {
  name: 'AnsoDataformCompared',
  mixins: [formCommon],
  components: {
    FormBodyCompared
  },
  props: {
    // ['信息项', '原值', '变更值']
    columns: {
      type: Array,
      default: () => (['信息项', '原值', '变更值'])
    },
    highlightChange: {
      type: Boolean,
      default: true
    },
    originValue: {
      type: Object,
      default: () => ({})
    } // 表单原值
  },
  data () {
    return {
      maxLen: 3,
      refname: 'comparedForm',
      headerKeys: ['title', 'origin', 'changed'],
      tableData: []
    }
  },
  computed: {
    formColumns () {
      const isGreater = this.columns.length > this.maxLen
      if (isGreater) console.warn('暂不支持多列对比')
      const columnList = isGreater ? this.columns.slice(0, this.maxLen) : this.columns
      return columnList.map((label, index) => {
        return {
          label,
          name: this.headerKeys[index]
        }
      })
    },
    formButtonList: {
      get () {
        return this.formTempBtns.map(button => ({
          ...button,
          formData: Object.assign(this.value, this.formData)
        }))
      },
      set (value) {
        this.formTempBtns = value
      }
    }
  },
  methods: {
    transTableData () {
      return this.formFields.map(field => {
        return {
          name: field.name,
          title: field.label,
          origin: cloneDeep(this.originValue[field.name] || this.value[field.name]) || null,
          __allowSelect: false
        }
      })
    },
    resetField (fields) {
      const { name, origin } = fields
      this.$set(this.formData, name, origin)
    },
    resetForm () {
      this.$refs.formBody.clearAllSelection()
      this.$nextTick(() => {
        this.clearChains()
        Object.entries(this.formData).forEach(([key, value]) => {
          if (value == null) delete this.formData[key]
        })
      })
    }
  },
  mounted () {
    this.tableData = this.transTableData()
  }
}
</script>
<style lang="sass" scoped>
</style>
