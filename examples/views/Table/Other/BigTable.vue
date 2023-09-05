<template lang="pug">
.anso-table(style="  background-color: #fff; padding: 8px")
  AnsoBigDatatable(
    keyName='simpleTable',
    :showIndex='true',
    :data='tableData',
    :columns='columns',
    :rowStyle='setRowStyle',
    :cellStyle='setCellStyle',
    :defaultFixedLeft='["name"]',
    :summary-method='getSummaries',
    show-summary
  )
</template>

<script>
import { randomTableData } from './randomData'

export default {
  name: 'tableBasicSimple',
  components: {},
  data () {
    return {
      tableData: randomTableData(10000),
      columns: [
        {
          name: 'name',
          label: 'Name'
        },
        {
          name: 'position',
          label: 'Position'
        },
        {
          name: 'office',
          label: 'Office'
        },
        {
          name: 'age',
          label: 'Age',
          render: {
            type: 'money'
          }
        },
        {
          name: 'startDate',
          label: 'Start Date',
          render: {
            type: 'time',
            timeType: 'YYYY-MM-DD'
          }
        },
        {
          name: 'salary',
          label: 'Salary'
        }
      ]
    }
  },
  methods: {
    setRowStyle ({ row, rowIndex }) {
      if (row.age > 75) {
        return {
          color: '#fff',
          backgroundColor: '#E6A23C'
        }
      }
    },

    setCellStyle ({ row, column, rowIndex, columnIndex }) {
      const value = row[column.name]
      if (value > 800 && value < 900) {
        return {
          color: 'red'
        }
      }
    },
    getSummaries (param) {
      const { columns, data } = param
      const sums = []
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = '总价'
          return
        }

        if (column.render && column.render.type === 'money') {
          const values = data.map((item) => Number(item[column.property]))
          if (!values.every((value) => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr)
              if (!isNaN(value)) {
                return prev + curr
              } else {
                return prev
              }
            }, 0)
            sums[index] += ' 元'
          } else {
            sums[index] = 'N/A'
          }
        } else {
          sums[index] = 'N/A'
        }
      })

      return sums
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
</style>
