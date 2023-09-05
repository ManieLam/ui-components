<template lang='pug'>
.column-table-group
  .row-table-item(
    v-for="(row, rIndex) in formFields"
    :key="`row_${rIndex}`"
    :style="gridTemplateColumns(formFields[0])")
    .column-table-item(
      v-for="(cell, cIndex) in row.key"
      :key="`cell_${cIndex}`")
      //- span(v-else) {{cell === 'label' ? row.label : row.isTitle ? columns[cell].label : formatVal(tableValues[cell], cell)}}
</template>

<script>
/** */
import AnsoDataformItem from 'packages/AnsoDataform/AnsoDataformItem'
export default {
  name: 'DimensionGrid',
  components: {
    AnsoDataformItem
  },
  props: {
    formFields: {
      type: Array,
      default: () => ([])
    },
    columns: {
      type: Object,
      default: () => ({})
    },
    dataInit: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      tableValues: this.dataInit
    }
  },
  // computed: {
  //   columns () {
  //     return this.tableParams.columns
  //   }
  // },
  methods: {
    checkIsForm (column) {
      if (!column) return false
      return Object.prototype.hasOwnProperty.cell(column, 'form')
    },
    gridTemplateColumns: (tableHead) => {
      const len = tableHead.key.length
      return {
        'grid-template-columns': `repeat(${len}, 1fr)`
      }
    },
    formatVal (data, columnName) {
      if (data == null) return '-'
      if (this.columns[columnName].isMoney) {
        return this.$toFixed(data)
      }
      if (this.columns[columnName].isPercent) {
        return `${data}%`
      }
      return data
    }
  }
}
</script>

<style lang='sass' scoped>
$border-color: #dfdfdf
$color: #666666
$bg-split: #f7f8fa
.column-table-group
  display: grid
  grid-template-rows: repeat(6, 1fr)
  .row-table-item
    display: grid
    // grid-template-columns: repeat(4, 1fr)
  .column-table-item
    display: grid
    justify-items: center
    align-items: center
    border-bottom: 1px solid $border-color
    border-left: 1px solid $border-color
    padding: 5px 10px
    &:nth-child(2n)
      background: $bg-split
</style>
