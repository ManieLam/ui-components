<template lang="pug">
  .anso-cascader_simple
    AnsoDataform(
      :formFields="formFields"
      :value="formValues"
      :buttonList="[]")
</template>

<script>
import cloneDeep from 'lodash/cloneDeep'
export default {
  name: 'CascaderSimple',
  data () {
    const optionsDisabled = cloneDeep(optionsSimpleoptions)
    optionsDisabled[0].disabled = true
    return {
      formValues: {
        cascader_demo3: '13'
      },
      formFields: [{
        name: 'cascader_demo1',
        label: 'click 触发子菜单',
        form: {
          tag: 'cascader',
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo2',
        label: 'hover 触发子菜单',
        form: {
          tag: 'cascader',
          props: { expandTrigger: 'hover' },
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo3',
        label: '配置默认值',
        /**
         * 配置默认值：给当前选项配置已选值
         * 给AnsoDataform组件传入对应的value值 :value="formValues"
         * formValues里的值需要匹配当前级联选项的name值，传入数组
         * 数组为传入options数据，夫层级的value值以及所选子层级value值
         * formValues: { cascader_demo3: '13' }
         */
        form: {
          tag: 'cascader',
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo13',
        label: '根据传入的options数据,变更为正确的valueKey, parentKey',
        form: {
          tag: 'cascader',
          valueKey: 'id',
          parentKey: 'fatherId',
          options: optionschangeoptions
        }
      }, {
        name: 'cascader_demo4',
        label: '禁用选项',
        form: {
          tag: 'cascader',
          options: optionsDisabled
        }
      }, {
        name: 'cascader_demo5',
        label: '默认可清空，当前配置不可清空',
        form: {
          tag: 'cascader',
          clearable: false,
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo6',
        label: '仅显示最后一级',
        form: {
          tag: 'cascader',
          showAllLevels: false,
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo7',
        label: '单选选择任意一级选项',
        form: {
          tag: 'cascader',
          props: { checkStrictly: true },
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo8',
        label: '多选选择任意一级选项',
        form: {
          tag: 'cascader',
          multiple: true,
          // showAllLevels: false,
          props: {},
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo9',
        label: '可搜索',
        form: {
          tag: 'cascader',
          filterable: true,
          props: { checkStrictly: true },
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo10',
        label: '自定义搜索条件',
        form: {
          tag: 'cascader',
          filterable: true,
          filterMethod: (node, keyword) => {
            return node.value.includes(keyword)
          },
          options: optionsSimpleoptions
        }
      }, {
        name: 'cascader_demo11',
        label: 'icon',
        form: {
          tag: 'cascader',
          filterable: true,
          filterMethod: (node, keyword) => {
            return node.value.includes(keyword)
          },
          options: optionsIconoptions
        }
      }, {
        name: 'cascader_demo14',
        label: '远程异步调用',
        form: {
          tag: 'cascader',
          remoteFunc: (data) => {
            /**
             * 出参为node，节点参数
             * 该配置需要先匹配获取level = 1（第一个阶段内容）的数据
             * 在根据点击，通过节点参数获取节点值value，接着获取加下来阶段的内容数据，回调数据
            */
            return new Promise((resolve, reject) => {
              if (!data) resolve([])
              else {
                const { node } = data
                if (node.level === 0) resolve(ansycoption)
                else if (node.level === 1 && node.value === '1') resolve(ansycoption1)
                else if (node.level === 1 && node.value === '2') resolve(ansycoption2)
                else resolve([])
              }
            })
          }
        }
      }, {
        name: 'cascader_demo16',
        label: '简约自定义配置subtext内容',
        form: {
          tag: 'cascader',
          subtext: (data) => {
            return `${data.label} - ${data.value}- 自定义内容`
          },
          options: optionsSimpleoptions
        }
      }]
    }
  }
}
const ansycoption = [
  { value: '1', label: '1' },
  { value: '2', label: '2' }
]
const ansycoption1 = [
  { value: '4', label: '1.1', parentId: '1', isPetty: true },
  { value: '5', label: '1.2', parentId: '1', isPetty: true },
  { value: '6', label: '1.3', parentId: '1', isPetty: false }
]
const ansycoption2 = [
  { value: '7', label: '2.1', parentId: '2', isPetty: true },
  { value: '8', label: '2.2', parentId: '2', isPetty: true },
  { value: '9', label: '2.3', parentId: '2', isPetty: true }
]
const optionsSimpleoptions = [
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
const optionschangeoptions = [
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '4', label: '1.1', fatherId: '1' },
  { id: '5', label: '1.2', fatherId: '1' },
  { id: '6', label: '1.3', fatherId: '1' },
  { id: '7', label: '2.1', fatherId: '2' },
  { id: '8', label: '2.2', fatherId: '2' },
  { id: '9', label: '2.3', fatherId: '2' },
  { id: '10', label: '3.1', fatherId: '3' },
  { id: '11', label: '3.2', fatherId: '3' },
  { id: '12', label: '3.3', fatherId: '3' },
  { id: '13', label: '1.1.1', fatherId: '4' },
  { id: '14', label: '1.1.2', fatherId: '4' },
  { id: '15', label: '1.2.1', fatherId: '5' },
  { id: '16', label: '1.3.1', fatherId: '6' }
]
const optionsIconoptions = [
  { value: '1', label: '1', icon: 's-tools' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '1.1', parentId: '1', icon: 's-ticket' },
  { value: '5', label: '1.2', parentId: '1', icon: 's-management', iconAlign: 'left' },
  { value: '6', label: '1.3', parentId: '1', icon: 's-open', iconAlign: 'right' },
  { value: '7', label: '2.1', parentId: '2', icon: 's-marketing', iconAlign: 'right' },
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
</script>
<style lang="scss" scoped>
.anso-cascader_simple{
  padding: 2rem
}
</style>
