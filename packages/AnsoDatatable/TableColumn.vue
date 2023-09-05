<template lang="pug">
  el-table-column(
    v-bind="columnsObject[name]"
    :key="name"
    :prop="name"
    :id="`${$attrs.keyName}-table-column`"
    :width="columnsObject[name].width"
    :show-overflow-tooltip="showOverflowTooltip"
    :sortable="columnsObject[name].sortable?'custom':false"
    :sort-orders="['descending', 'ascending', null]"
    :fixed="fixed"
    :render-header="columnsObject[name].renderHeader"
    :header-align="columnsObject[name].headerAlign"
    :class-name="columnsObject[name].className"
    :label-class-name="columnsObject[name].labelClassName")
    template(slot="header",slot-scope="scope")
      slot(:name="`column-${name}-header`", :column="columnsObject[name]",:title="columnsObject[name].label") {{columnsObject[name].label}}
    template(slot-scope="scope")
      slot(:name="`column-${name}`", :column="columnsObject[name]", :row="scope.row", :value="scope.row[name]")
        //- {{ renderResult(scope.row, columnsObject[name]) }}
        ColumnItem(v-bind="$attrs", :key="name", :name="name", :field="columnsObject[name]", :rowDatas="scope.row", :scoped="scope")
    TableColumn(
      v-if="columnsObject[name].innerColumns"
      v-for="innerColumn in columnsObject[name].innerColumns"
      :key="innerColumn.name"
      :keyName="`${keyName}-table-column-${innerColumn.name}`"
      :name="innerColumn.name"
      :columnsObject="columnsObject"
      :showOverflowTooltip="showOverflowTooltip"
      :fixed="fixed")
      template(:slot="`column-${innerColumn.name}-header`", slot-scope="scope")
        slot(:name="`column-${innerColumn.name}-header`", :column="scope.column")
      template(:slot="`column-${innerColumn.name}`", slot-scope="scope")
        slot(:name="`column-${innerColumn.name}`", :column="scope.column", :row="scope.row", :value="scope.value")
</template>

<script>
import ColumnItem from './ColumnItem'
export default {
  name: 'TableColumn',
  components: {
    ColumnItem
  },
  props: {
    name: String,
    columnsObject: Object,
    fixed: {
      type: [Boolean, String],
      default: false
    },
    showOverflowTooltip: {
      type: Boolean
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
