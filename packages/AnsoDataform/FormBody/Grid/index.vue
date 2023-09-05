<template lang='pug'>
.dataform-body__grid
  InlineGrid(
    v-if="inlineGrid"
    v-bind="$attrs"
    v-on="$listeners")
  //- DimensionGrid(
  //-   v-else
  //-   v-bind="$attrs"
  //-   v-on="$listeners")
</template>

<script>
/** */
import InlineGrid from './Inline'
import DimensionGrid from './Dimension'
export default {
  name: 'FormBodyGrid',
  components: {
    InlineGrid,
    DimensionGrid
  },
  props: {
    inlineGrid: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {}
  }
}
</script>

<style lang='sass' scoped>
</style>
