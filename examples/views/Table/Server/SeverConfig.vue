<template lang="pug">
  .anso-table
    AnsoDataform.form(
      v-model="formValue"
      ref="form"
      type="inline"
      :formFields="formFields"
      @onChange="onChange")
    span {{typesText[formValue.type].label}}
    AnsoDatatable(
      v-if="isShow"
      v-bind="tableAttrs"
      :filterFields="filterFields"
      :columns="columns")
</template>

<script>
export default {
  name: 'tableSeverConfig',
  computed: {
    tableAttrs () {
      const { type } = this.formValue
      return this.types[type]
    }
  },
  data () {
    return {
      isShow: true,
      filterFields: [{
        name: 'name',
        label: 'Name',
        form: {
          tag: 'input',
          like: true
        }
      }, {
        name: 'position',
        label: 'Position',
        form: {
          tag: 'input'
        }
      }, {
        name: 'office',
        label: 'Office',
        form: {
          tag: 'input'
        }
      }, {
        name: 'age',
        label: 'Age',
        form: {
          tag: 'input'
        }
      }],
      columns: [{
        name: 'name',
        label: 'Name',
        sortable: true
      }, {
        name: 'position',
        label: 'Position',
        sortable: true
      }, {
        name: 'office',
        label: 'Office',
        sortable: true
      }, {
        name: 'age',
        label: 'Age',
        sortable: true
      }, {
        name: 'startDate',
        label: 'Start Date',
        sortable: true
      }, {
        name: 'salary',
        label: 'Salary',
        sortable: true
      }],
      formValue: { type: 0 },
      formFields: [{
        name: 'type',
        label: '配置属性',
        form: {
          tag: 'select',
          options: [{
            label: '分段获取表格数据',
            value: 0
          }, {
            label: '获取全部表格数据',
            value: 1
          }, {
            label: '配置信息重新定义, 更换请求方式和链接',
            value: 2
          }, {
            label: '变更接口输出的数据格式transformRespons',
            value: 3
          }]
        }
      }],
      typesText: [{
        label: '请求表格部分数据，由操作点击再调用接口，将操作条件传给后端，来进行表格过滤，排序，分页等操作'
      }, {
        label: '请求表格所有数据，再由前端支持过滤，排序，分页等操作，后续不在调用接口'
      }, {
        label: "变更表格搜索、method：'post', url: 'tableTemp', 可打开Network查看"
      }, {
        label: '如果接口输出的数据格式变更为{ code, records, message, total } = res, 可能需要通过transformRespons变更输出数据格式为{ code, data: { records: records, total: total }, message }适应底层表格组件展示'
      }],
      types: [{
        resource: '/api/common/list',
        serverSide: true
      }, {
        resource: '/api/common/list'
      }, {
        resource: '/api/common/list',
        serverSide: true,
        resourceConfig: ({ url, params }) => ({
          url: 'tableTemp',
          method: 'post',
          params
        })
      }, {
        resource: '/api/common/list',
        serverSide: true,
        transformResponse () {
          const res = {
            code: 0,
            message: 'success',
            total: 500,
            records: [{
              id: 30,
              name: '明建福',
              position: '河北省唐山市',
              office: '咸宁',
              age: '42',
              startDate: '1515711745585',
              salary: '942772',
              job: 4
            }]
          }
          const { code, records, message, total } = res
          const result = {
            code,
            data: {
              records: records,
              total: total
            },
            message
          }
          return { data: result }
        }
      }]
    }
  },
  methods: {
    onChange ({ values }) {
      this.formValue = values
      this.isShow = false
      this.$nextTick(() => {
        this.isShow = true
      })
    },
    transformResponse (res) {
      const { code, data, message } = res.data
      const result = {
        code,
        records: data.data,
        total: data.total,
        message
      }
      return { data: result }
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
  form, span
    background: #fff
    padding: 8px
    ::v-deep .el-form-item
      margin-bottom: 0
.el-input
  width: auto
</style>
