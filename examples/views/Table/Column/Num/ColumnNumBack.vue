<template lang="pug">
  .anso-table_columnNumBack
    | 序号列（服务端分页时连续）
    AnsoDatatable
</template>

<script>
export default {
  name: 'tableColumnNumBack',
  components: {
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="sass" scoped>
.anso-table_columnNumBack
  display: flex
  flex-direction: column
  background-color: #eee
  width: 100%
  height: 100%
</style>
