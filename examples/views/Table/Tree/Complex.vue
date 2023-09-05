<template lang="pug">
  .anso-table
    AnsoDatatable(
      ref="complexTree"
      keyName="complexTree"
      resource="/api/system/getOrg"
      rowKey="_id"
      :isTree="true"
      :serverSide="true"
      :columns="columns"
      :filterFields="filterFields"
      :toolbarButtonList="toolbarButtonList"
      :operateButtonList="operateButtonList")
    el-drawer.drawer(
      :title="formTitle"
      size="50%"
      :visible.sync="drawer"
      :modal="false"
      :before-close="handleClose")
      AnsoDataform.drawerForm(
        v-model="formData"
        ref="form"
        type="row"
        labelPosition="top"
        :formFields="formFields"
        :buttonList="formButtonList")
</template>

<script>
import axios from 'axios'

export default {
  name: 'tableComplexTree',
  components: {
  },
  data () {
    return {
      filterFields: [
        {
          name: 'orgName',
          label: '组织名称',
          form: {
            tag: 'input'
          }
        },
        {
          name: 'orgType',
          label: '组织类型',
          form: {
            tag: 'select',
            options: [{
              label: '集团',
              value: 'GROUP'
            }, {
              label: '部门',
              value: 'DIVISION'
            }, {
              label: '科室',
              value: 'DEPARTMENT'
            }]
          }
        }
      ],
      columns: [
        { name: 'orgName', label: '组织名称', align: 'left' },
        {
          name: 'orgType',
          label: '组织类型',
          options: [{
            label: '集团',
            value: 'GROUP'
          }, {
            label: '部门',
            value: 'DIVISION'
          }, {
            label: '科室',
            value: 'DEPARTMENT'
          }],
          render: { type: 'select' }
        },
        { name: 'remark', label: '备注' }
      ],
      toolbarButtonList: [{
        label: '新增',
        type: 'primary',
        validate: true,
        func: () => this.openSlider()
      }],
      operateButtonList: [{
        label: '新增',
        name: 'add',
        type: 'text',
        textType: 'primary',
        showabled: (row) => {
          return row.orgType !== 'DEPARTMENT'
        },
        func: (button, row) => this.openSlider(row)
      }, {
        label: '删除',
        name: 'delete',
        type: 'text',
        textType: 'primary',
        disabled: (row) => {
          return row.hasChilds
        },
        func: (button, row) => this.deleteOrg(row._id)
      }],
      formTitle: '新增',
      curRow: {},
      drawer: false,
      formData: {},
      formFields: [{
        name: 'orgName',
        label: '组织名称',
        form: {
          tag: 'input',
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'orgType',
        label: '组织类型',
        form: {
          tag: 'select',
          clearable: true,
          disabled: false,
          options: [{
            label: '集团',
            value: 'GROUP'
          }, {
            label: '部门',
            value: 'DIVISION'
          }, {
            label: '科室',
            value: 'DEPARTMENT'
          }],
          rules: [{ required: true, message: '必填' }]
        }
      }, {
        name: 'remark',
        label: '备注',
        form: {
          tag: 'input',
          type: 'textarea'
        }
      }],
      formButtonList: [{
        label: '提交',
        type: 'primary',
        validate: true,
        func: (form) => this.subForm(form)
      }]
    }
  },
  methods: {
    handleClose () {
      this.drawer = false
      this.formData = {}
    },
    refreshTable () {
      this.$nextTick(() => {
        this.$refs.complexTree.reRenderTableData()
      })
    },
    openSlider (row = {}) {
      console.log(row)
      const orgName = row.orgName ? `【${row.orgName}】` : ''
      this.formTitle = `新增${orgName}`
      this.formData = {}
      this.drawer = true
      this.curRow = row
    },
    subForm (form) {
      const { formData } = form
      return this.addOrg({ ...formData, parentId: this.curRow._id || null })
    },
    orgFetch (config = {}) {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          axios(config).then((res) => {
            resolve(res)
            this.handleClose()
            this.refreshTable()
          })
        }, 1000)
      })
    },
    addOrg (formData) {
      return this.orgFetch({
        url: '/api/system/createOrg',
        method: 'post',
        data: formData
      })
    },
    deleteOrg (id) {
      return this.orgFetch({
        url: `/api/system/delOrg/${id}`,
        method: 'delete'
      })
    }
  },
  mounted () {
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  height: 100%
  flex: 1
  display: flex
  flex-direction: column
  background-color: #eee
  .table-box
    flex: 1
    display: flex
    flex-direction: column
    label
      margin-left: 8px
  .drawerForm
    padding: 0 20px
</style>
