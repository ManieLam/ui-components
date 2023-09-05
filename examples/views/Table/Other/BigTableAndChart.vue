<template lang="pug">
.anso-table(style='background-color: #fff; padding: 8px')
  #container(style='flex: 1')
  div(style='height: 10px')
  AnsoBigDatatable(
    ref='bigDatatable',
    keyName='simpleTable',
    :showIndex='true',
    :data='tableData',
    :columns='columns',
    :rowHeight='25',
    style='flex: 1',
    showSummary,
    @rowMouseEnter='rowMouseEnter'
  )
</template>

<script>
import { randomTableData } from './randomData'
import { Bar, Line } from '@antv/g2plot'

export default {
  name: 'tableBasicSimple',
  components: {},
  data () {
    return {
      tableData: randomTableData(2000),
      columns: [
        {
          name: 'value',
          label: 'Value'
        },
        {
          name: 'salary',
          label: 'Salary',
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
          label: 'Age'
        }
      ],
      chart: null,
      isChartFire: true
    }
  },
  mounted () {
    this.showLine()
  },
  methods: {
    // 表格悬停事件, 触发图表显示 tooltip
    rowMouseEnter (item) {
      const datas = this.chart.options.data
      const points = this.chart.chart.geometries[1].dataArray[0]

      const idx = datas.findIndex((t) => t.id === item.id)
      if (idx > -1) {
        this.isChartFire = false
        this.chart.chart.showTooltip(points[idx])
      }
    },
    // 图表悬停事件, 触发表格高亮行
    showHighRow (e) {
      if (this.isChartFire) {
        this.$refs.bigDatatable.setHighRow(e.data.items[0].data, 'id')
      } else {
        this.isChartFire = true
      }
    },
    showLine () {
      const chart = new Line('container', {
        data: this.tableData,
        xField: 'name',
        yField: 'value',
        // 自定义折线颜色
        color: '#FE740C',
        // 更改辅助数据点大小及样式
        point: {
          size: 5,
          shape: 'diamond',
          style: {
            stroke: '#FE740C',
            lineWidth: 2,
            fillOpacity: 0.6
          }
        },
        yAxis: {
          // 格式化 y 轴标签加单位，自定义 labal 样式
          label: {
            formatter: (v) => {
              return v + 'k'
            },
            style: {
              fill: '#FE740C'
            }
          }
        },
        // 添加label
        label: {
          fill: '#FE740C'
        },
        // 添加辅助文本、辅助线
        annotations: [
          {
            type: 'text',
            position: ['min', 'median'],
            content: '辅助标记',
            offsetY: -4,
            style: {
              textBaseline: 'bottom'
            }
          },
          {
            type: 'line',
            start: ['min', 'median'],
            end: ['max', 'median'],
            style: {
              stroke: 'red',
              lineDash: [2, 2]
            }
          }
        ]
      })

      chart.on('tooltip:show', this.showHighRow)

      chart.render()

      this.chart = chart
    },
    showBar () {
      const chart = new Bar('container', {
        data: this.tableData,
        xField: 'name',
        yField: 'value',
        seriesField: 'name',
        xAxis: {
          label: {
            autoRotate: false
          }
        },
        slider: {
          start: 0.1,
          end: 0.5
        }
      })

      chart.on('tooltip:show', this.showHighRow)

      chart.render()

      this.chart = chart
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table
  display: flex
  flex: 1
  flex-direction: column
  padding: 10px
  background-color: #fff
  width: 100%
  height: 100%
</style>
