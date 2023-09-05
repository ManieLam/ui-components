<template lang="pug">
  .anso-cascader_panel
    h6 级联选择器控件
    AnsoDataformCascader(
      :options="options")
    h6 级联选择器面板
    AnsoDataformCascader(
      :isPanel="true"
      :options="options")
</template>

<script>
export default {
  name: 'CascaderPanel',
  data () {
    return {
      options: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '1.1', parentId: '1' },
        { value: '5', label: '1.2', parentId: '1' },
        { value: '6', label: '1.3', parentId: '1' },
        { value: '7', label: '2.1', parentId: '2' },
        { value: '8', label: '2.2', parentId: '2' },
        { value: '9', label: '2.3', parentId: '2' },
        { value: '10', label: '3.1', parentId: '3' },
        { value: '11', label: '3.2', parentId: '3' },
        { value: '12', label: '3.3', parentId: '3' },
        { value: '13', label: '1.1.1', parentId: '4' },
        { value: '14', label: '1.1.2', parentId: '4' },
        { value: '15', label: '1.2.1', parentId: '5' },
        { value: '16', label: '1.3.1', parentId: '6' }
      ]
    }
  }
}
</script>
<style lang="scss" scoped>
.anso-cascader_panel{
  padding: 2rem
}
</style>
