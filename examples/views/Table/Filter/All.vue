<template lang="pug">
  .anso-table_filterAll
    | 选择器加全选的过滤器表格
    AnsoDatatable
</template>

<script>
export default {
  name: 'tableFilterAll',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_filterAll
  display: flex
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
