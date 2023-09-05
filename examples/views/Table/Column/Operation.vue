<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="operationTable"
      operationWidth="150"
      :data="tableData"
      :columns="columns"
      :operateButtonList="operateButtonList")
</template>

<script>
import data from '@/views/Table/Basic/complexTableData.json'

export default {
  name: 'tableBasicOperation',
  components: {
  },
  data () {
    return {
      tableData: data,
      columns: [{
        name: 'name',
        label: '姓名'
      }, {
        name: 'position',
        label: '居住地址'
      }, {
        name: 'office',
        label: '工作城市'
      }, {
        name: 'age',
        label: '年龄'
      }, {
        name: 'startDate',
        label: '入职日期',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD HH:mm:ss'
        }
      }, {
        name: 'salary',
        label: '年薪'
      }],
      operateButtonList: [{
        label: '按钮',
        name: 'button1',
        type: 'text',
        textType: 'primary',
        disabled: (row) => {
          return row.age < 13
        },
        showabled: (row) => {
          return ![1, 2, 3, 5, 10, 17].includes(row.age)
        },
        func: (button) => {
          console.log('button:', button)
        }
      }, {
        name: 'button2',
        type: 'text',
        textType: 'primary',
        icon: 'sousuo',
        disabled: (row) => {
          return row.age < 13
        },
        func: () => {
        }
      }, {
        name: 'button3',
        type: 'text',
        textType: 'primary',
        icon: 'gerenxinxi-yijianfankui',
        tooltip: {
          content: '编辑',
          placement: 'top'
        },
        disabled: (row) => {
          return row.age < 13
        },
        showabled: (row) => {
          return ![10, 20, 33, 55, 19, 41].includes(row.age)
        },
        func: (button, row) => {
        }
      }]
    }
  },
  methods: {
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
</style>
