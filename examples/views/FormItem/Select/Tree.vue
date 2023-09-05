<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 树组件展示方式配置
    AnsoDataform(
      :formFields="showTypeFormFields"
      v-model="formValues"
      :buttonList="[]")
    h4 树组件-是否多选
    AnsoDataform(
      :formFields="multipleformFields"
      :buttonList="[]")
    h4 树组件-是否显示选中值的完整路径值
    AnsoDataform(
      :formFields="showAllformFields"
      v-model="formValues"
      :buttonList="[]")
    h4 树组件-禁用
    AnsoDataform(
      :formFields="disabledformFields"
      :buttonList="[]")
    h4 树组件-默认值
    AnsoDataformTree(
      ref="treevalues"
      v-model="operatetree"
      :options="optionsSimpleoptions"
      showType="select"
      :operateState="operateState")
    AnsoDataformTree(
      ref="treevalue"
      v-model="treevaluedefault"
      :options="optionsSimpleoptions"
      showType="select"
      :multiple="false"
      :operateState="operateStateSingle")
    h4 树组件配置是否可搜索
    AnsoDataform(
      :formFields="filterformFields"
      :buttonList="[]")
    h4 树组件展开效果-手风琴
    AnsoDataform(
      :formFields="accordionformFields"
      :buttonList="[]")
    h4 远程异步调用(远程异步调用的其它值请通过@currentChoose获取)
    AnsoDataformTree(
      ref="tree3"
      v-model="isRemoteTree"
      showType="select"
      :remoteFunc="remoteFunc"
      @currentChoose="remotecurrentChoose")
    span 当前值： {{isRemoteTree}}
    br
    AnsoDataformTree(
      ref="tree3"
      v-model="isRemoteTreesingle"
      showType="select"
      :multiple="false"
      :remoteFunc="remoteFunc"
      @currentChoose="remotecurrentChoose")
    span 当前值： {{isRemoteTreesingle}}
    h4 简约自定义配置subtext内容
    AnsoDataform(
      :formFields="subtextformFields"
      :buttonList="[]")
    h4 外部调用全选/取消全选/展开所有/合并所有
    <el-button @click="checkAll">全选</el-button>
    <el-button @click="checkAllno">取消全选</el-button>
    <el-button @click="expandAll">展开所有</el-button>
    <el-button @click="expandAllno">合并所有</el-button>
    AnsoDataformTree(
      ref="tree1"
      v-model="tree"
      showType="panel"
      :options="optionsSimpleoptions")
    h4 传参使用全选/取消全选/展开所有/合并所有
    AnsoDataformTree(
      ref="tree2"
      v-model="operatetree"
      :options="optionsSimpleoptions"
      showType="select"
      :operateState="operateState")
    h4 使用全选/取消全选 自定义操作方法函数
    AnsoDataformTree(
      ref="tree3"
      v-model="setTree"
      :disabled="disabled"
      showType="panel"
      :options="optionsSimpleoptions"
      :operateState="operateState"
      :checkAllFunc="checkAllFunc"
      @currentChoose="currentChoose")
    h4 支持传入置灰条件函数
    AnsoDataformTree(
      ref="tree4"
      showType="panel"
      v-model="operatetreeDisabled"
      :disabled="disabled"
      :options="optionsSimpleoptions"
      :operateState="operateState")
    h4 树组件,传入值相关key值的修改
    AnsoDataform(
      :formFields="keyformFields"
      :buttonList="[]")
</template>

<script>
export default {
  name: 'TreeSimple',
  data () {
    return {
      setTree: [],
      isRemoteTreesingle: [],
      isRemoteTree: [],
      operatetreeDisabled: [],
      operatetree: ['14', '15', '9'],
      treevaluedefault: '14',
      operateState: {
        checkAll: true,
        unCheckAll: true,
        expandAll: true,
        unExpandAll: true
      },
      operateStateSingle: {
        checkAll: false,
        unCheckAll: false,
        expandAll: true,
        unExpandAll: true
      },
      tree: [],
      optionsSimpleoptions: [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '1.1', parentId: '1' },
        { value: '5', label: '1.2', parentId: '1', disabled: true },
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
      ],
      formValues: {
        tree_disabled: ['14', '8', '9'],
        tree_value: ['13', '8', '9'],
        tree_showTypePanel: [['1', '4', '13']],
        tree_showAll: [['1', '4', '13']],
        tree_showAll_false: ['13']
      },
      showTypeFormFields: [{
        name: 'tree_showTypePanel',
        label: '平铺',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showType: 'panel'
        }
      }, {
        name: 'tree_showTypeSelect',
        label: '下拉',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions
        }
      }, {
        name: 'tree_showTypeSelect_collapseTags',
        label: '+num 多选数字展示',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          collapseTags: true
        }
      }],
      multipleformFields: [{
        name: 'tree_multiple',
        label: '树组件-默认多选',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions
        }
      }, {
        name: 'tree_multiple_false',
        label: '树组件-单选',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          multiple: false
        }
      }],
      showAllformFields: [{
        name: 'tree_showAll_false',
        label: '树组件-默认展示最后叶子节点的路径',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions
        }
      }, {
        name: 'tree_showAll',
        label: '树组件-默认展示全部路径',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true
        }
      }, {
        name: 'tree_panel_showAll',
        label: '树组件-平铺效果全部路径',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true,
          showType: 'panel'
        }
      }],
      valueformFields: [{

      }],
      disabledformFields: [{
        name: 'tree_disabled',
        label: '树组件置灰',
        form: {
          tag: 'tree',
          options: optionsDisabledoptions
        }
      }, {
        name: 'tree_disabled_panel',
        label: '树组件-平铺-置灰',
        form: {
          tag: 'tree',
          options: optionsDisabledoptions,
          showType: 'panel'
        }
      }, {
        name: 'tree_disabled_multiple',
        label: '树组件-单选-置灰',
        form: {
          tag: 'tree',
          options: optionsDisabledoptions,
          multiple: false
        }
      }, {
        name: 'tree_disabled_panel_multiple',
        label: '树组件-单选-平铺-置灰',
        form: {
          tag: 'tree',
          options: optionsDisabledoptions,
          multiple: false,
          showType: 'panel'
        }
      }],
      allLevelsformFields: [{
        name: 'tree_allLevels',
        label: '树组件输出值为值的多层级内容',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true,
          multiple: false
        }
      }, {
        name: 'tree_allLevelsones',
        label: '树组件,下拉展示,显示多层级值',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true,
          isSelect: true,
          multiple: false
        }
      }],
      filterformFields: [{
        name: 'tree_nofilterablea',
        label: '树组件配置不可搜索-下拉',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          filterable: false
        }
      }, {
        name: 'tree_filterablea',
        label: '树组件配置可搜索, 默认支持关键字，拼音',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          filterable: true
        }
      }, {
        name: 'tree_filters_value',
        label: '树组件配置可搜索, 自行配置检索条件，当前配置为检索选项value值',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          filterable: (data) => {
            const { query, item } = data
            return item.value.indexOf(query) > -1
          },
          showAllLevels: true,
          accordion: true,
          multiple: true
        }
      }],
      accordionformFields: [{
        name: 'tree_accordion',
        label: '树组件展示效果配置',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true,
          accordion: true
        }
      }, {
        name: 'tree_accordion_multiple',
        label: '树组件展示效果配置-单选',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          showAllLevels: true,
          accordion: true,
          multiple: false
        }
      }],
      remoteformFields: [{
        name: 'tree_remote',
        label: '远程异步调用',
        form: {
          tag: 'tree',
          showAllLevels: true
        }
      }],
      subtextformFields: [{
        name: 'tree_ubtext',
        label: '树组件自定义配置subtext内容',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          subtext: (data) => {
            return `${data.label} - ${data.value} - 自定义内容`
          }
        }
      }],
      checkAllformFields: [{
        name: 'tree_checkAll',
        label: '勾选效果',
        form: {
          tag: 'tree',
          options: optionsSimpleoptions,
          multiple: false
        }
      }],
      keyformFields: [{
        name: 'tree_key',
        label: '根据传入的options数据,变更为正确的valueKey, parentKey',
        form: {
          tag: 'tree',
          valueKey: 'id',
          parentKey: 'fatherId',
          options: optionschangeoptions,
          operateState: {
            checkAll: true,
            unCheckAll: true,
            expandAll: true,
            unExpandAll: true
          }
        }
      }]
    }
  },
  methods: {
    remotecurrentChoose (data) {
      console.log('emit.data', data)
    },
    remoteFunc (data) {
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
          else if (node.level === 1 && node.data.value === '1') resolve(ansycoption1)
          else if (node.level === 1 && node.data.value === '2') resolve(ansycoption2)
          else if (node.level === 2 && node.data.value === '6') resolve(ansycoption3)
          else resolve([])
        }
      })
    },
    currentChoose (data) {
      console.log('emit.data', data)
    },
    disabled (data) {
      const { node } = data
      if (node.parentId === '1') return true
      else return null
    },
    checkAllFunc (data) {
      console.log(data)
      /** 自定义勾选数据 */
      const group = [
        { value: '1', label: '1' },
        { value: '4', label: '1.1', parentId: '1' },
        { value: '5', label: '1.2', parentId: '1' },
        { value: '6', label: '1.3', parentId: '1' },
        { value: '13', label: '1.1.1', parentId: '4' },
        { value: '14', label: '1.1.2', parentId: '4' },
        { value: '15', label: '1.2.1', parentId: '5' },
        { value: '16', label: '1.3.1', parentId: '6' }
      ]
      return group
    },
    checkAll () {
      this.$refs.tree1.$children[0].checkAll()
    },
    checkAllno () {
      this.$refs.tree1.$children[0].checkAll(false)
    },
    expandAll () {
      this.$refs.tree1.$children[0].expandAll(true)
    },
    expandAllno () {
      this.$refs.tree1.$children[0].expandAll()
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
const ansycoption3 = [
  { value: '10', label: '1.3.1', parentId: '6', isPetty: true },
  { value: '11', label: '1.3.2', parentId: '6', isPetty: true }
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
  // { value: '11', label: '3.2', parentId: '3' },
  // { value: '12', label: '3.3', parentId: '3' },
  { value: '13', label: '1.1.1', parentId: '4' },
  { value: '14', label: '1.1.2', parentId: '4' },
  { value: '15', label: '1.2.1', parentId: '5' },
  { value: '16', label: '1.3.1', parentId: '6' }
]
const optionschangeoptions = [
  { id: '1', label: '1' },
  { id: '2', label: '2' },
  { id: '3', label: '3' },
  { id: '4', label: '1.1', fatherId: '1', disabled: true },
  { id: '5', label: '1.2', fatherId: '1' },
  { id: '6', label: '1.3', fatherId: '1' },
  { id: '7', label: '2.1', fatherId: '2' },
  { id: '8', label: '2.2', fatherId: '2' },
  { id: '9', label: '2.3', fatherId: '2' },
  { id: '10', label: '3.1', fatherId: '3', disabled: true },
  { id: '11', label: '3.2', fatherId: '3', disabled: true },
  { id: '12', label: '3.3', fatherId: '3' },
  { id: '13', label: '1.1.1', fatherId: '4' },
  { id: '14', label: '1.1.2', fatherId: '4' },
  { id: '15', label: '1.2.1', fatherId: '5', disabled: true },
  { id: '16', label: '1.3.1', fatherId: '6' }
]
const optionsDisabledoptions = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '1.1', parentId: '1' },
  { value: '5', label: '1.2', parentId: '1', disabled: true },
  { value: '6', label: '1.3', parentId: '1', disabled: true },
  { value: '7', label: '2.1', parentId: '2' },
  { value: '8', label: '2.2', parentId: '2' },
  { value: '9', label: '2.3', parentId: '2' },
  { value: '10', label: '3.1', parentId: '3' },
  { value: '11', label: '3.2', parentId: '3' },
  { value: '12', label: '3.3', parentId: '3' },
  { value: '13', label: '1.1.1', parentId: '4' },
  { value: '14', label: '1.1.2', parentId: '4', disabled: true },
  { value: '15', label: '1.2.1', parentId: '5', disabled: true },
  { value: '16', label: '1.3.1', parentId: '6', disabled: true }
]
</script>
<style lang="scss" scoped>
.anso-cascader_simple{
  padding: 2rem
}
</style>
