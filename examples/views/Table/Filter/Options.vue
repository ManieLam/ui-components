<template lang="pug">
  .anso-table_filterOpts
    | 选择项与匹配项的options不同
    AnsoDatatable
</template>

<script>
export default {
  name: 'tableFilterOpts',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_filterOpts
  display: flex
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
