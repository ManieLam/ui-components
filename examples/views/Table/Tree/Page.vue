<template lang="pug">
  .anso-table
    AnsoDatatable(
      keyName="pageTreeTable"
      :isTree="true"
      :highlightClickRow="true"
      :hasPage="false"
      :settingButtonList="[]"
      :data="tableData"
      :columns="columns"
      @rowClick="rowClick"
      @currentChange="currentChange")
</template>

<script>
export default {
  name: 'tableTree',
  components: {
  },
  data () {
    return {
      columns: [{
        name: 'name',
        label: '姓名',
        align: 'left'
      }, {
        name: 'position',
        label: '居住地址'
      }, {
        name: 'office',
        label: '工作城市'
      }, {
        name: 'age',
        label: '年龄',
        sortable: true
      }, {
        name: 'startDate',
        label: '入职日期',
        render: {
          type: 'time',
          timeType: 'YYYY-MM-DD'
        }
      }, {
        name: 'salary',
        label: '年薪'
      }],
      tableData: [
        { id: 1, parentId: null, name: '李兴伟', position: '辽宁省铁岭市', office: '许昌', age: 59, startDate: 1400053756697, salary: '326988', job: 2 },
        { id: 2, parentId: null, name: '孙鹏朋', position: '内蒙古省通辽市', office: '咸宁', age: 63, startDate: 1417957218712, salary: '225878', job: 2 },
        { id: 3, parentId: null, name: '喻守朋', position: '山东省聊城市', office: '衡水', age: 42, startDate: 1545962896117, salary: '709773', job: 3 },
        { id: 4, parentId: 3, name: '倪祥爱', position: '江苏省南京市', office: '茂名', age: 38, startDate: 1459248858309, salary: '899350', job: 2 },
        { id: 5, parentId: 3, name: '任波凤', position: '广东省东莞市', office: '盘锦', age: 23, startDate: 1349951883766, salary: '264292', job: 3 },
        { id: 6, parentId: 3, name: '时芳记', position: '福建省南平市', office: '日喀则', age: 25, startDate: 1551244544591, salary: '775728', job: 3 },
        { id: 7, parentId: 6, name: '陶刚琳', position: '江西省上饶市', office: '南平', age: 25, startDate: 1633838555669, salary: '183771', job: 2 },
        { id: 8, parentId: 6, name: '邹扬文', position: '内蒙古省赤峰市', office: '怀化', age: 11, startDate: 1481351243330, salary: '306828', job: 4 },
        { id: 9, parentId: 6, name: '冯佳君', position: '内蒙古省锡林郭勒市', office: '哈尔滨', age: 78, startDate: 1321473790121, salary: '217058', job: 0 }
      ]
    }
  },
  methods: {
    rowClick (row) {
      console.log('rowClick:', row)
    },
    currentChange (curRow, oldRow) {
      console.log('currentChange:', curRow, oldRow)
    }
  },
  mounted () {
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  flex: 1
  display: flex
  flex-direction: column
  .table-box
    flex: 1
    display: flex
    flex-direction: column
    label
      margin-left: 8px
  .drawerForm
    padding: 0 20px
</style>
