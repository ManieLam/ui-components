import axios from 'axios'
/**
 * @childrenKey {String} 存储子级数据的字段key名
 * @isTree {Boolean} 是否为树表格（表格数据为一维数据，未嵌套children数据时，须设置为true才会渲染成树表格）
 * @parentKey {String} 存储父级id的key名
 * @hasChildrenKey {String} 懒加载模式时，判断当前行是否存在子级数据的字段key名
 * @lazyResource {String} 懒加载接口
 * @treeResourceConfig {Function} 懒加载接口配置信息重新定义
 * @transformLazyTreeResponse {Function} 懒加载数据接口响应
 */
/**
 * 支持两种格式的数据
 * 1.[ {id: 1, type: 'type', children: [ { id: 100, type: 'sub-type'} ]} ]
 *  该格式的表格数据无需isTree: true
 * 2.[ {id: 1, type: 'type', parent: null}, {id: 100, type: 'sub-type', parent: 1} ]
 *  该格式的表格数据需搭配isTree: true才生效
 */
export default {
  props: {
    childrenKey: {
      type: String,
      default: 'children'
    },
    isTree: {
      type: Boolean,
      default: false
    },
    parentKey: {
      type: String,
      default: 'parentId'
    },
    hasChildrenKey: {
      type: String,
      default: 'hasChildren'
    },
    lazyResource: String,
    treeResourceConfig: {
      type: Function,
      default: ({ url, row }) => ({
        url,
        method: 'get'
      })
    },
    transformLazyTreeResponse: {
      type: Function,
      default: res => res
    }
  },
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
    lazyTreeLoad (row, node, resolve) {
      if (!this.lazyResource) throw new Error('懒加载接口未配置')
      axios(this.treeResourceConfig({
        url: this.lazyResource,
        row
      })).then(this.transformLazyTreeResponse).then((res) => {
        const { data } = res.data
        if (!data) throw new Error('出参格式错误')
        resolve(data)
      }).catch(err => {
        throw new Error(err)
      })
    }
    // 树表格已选数据重新勾选 // TODO 树表格多选
    // treeReselect () {
    //   const { selection } = this.$refs.table.store.states
    //   console.log('selection', selection, this.$refs.table)
    //   this.clearSelection()
    //   this.$nextTick(() => {
    //     this.toggleRowSelection(selection)
    //   })
    // },
    // /**
    //  * @name 树状表格多选-勾选事件
    //  * 1.若'row'节点是子级节点，则触发toggleParent
    //  * 2.若'row'节点是父级节点，则触发toggleChildren
    //  */
    // treeToggleEvent (rows, row) {
    //   if (row[this.parentKey]) {
    //     this.toggleParent(row)
    //   }
    //   if (row[this.childrenKey]) {
    //     this.toggleChildren(row[this.childrenKey], row)
    //   }
    // },
    // treeSelectAllEvent (rows) {
    //   const { isAllSelected } = this.$refs.table.store.states
    //   if (!isAllSelected) this.clearSelection()
    //   else {
    //     rows.map(row => {
    //       if (row[this.childrenKey]) this.toggleChildren(row[this.childrenKey], row)
    //     })
    //   }
    // },
    // /**
    //  * @name 操作父级节点勾选状态
    //  * 1.当'row'节点所有兄弟节点均已勾选，则触发'row'节点的父级节点勾选
    //  * 2.当'row'节点所有兄弟节点任一未勾选，则触发'row'节点的父级节点取消勾选
    //  * 3.若'row'节点的父级节点还存在父级节点，再往上执行1、2
    //  */
    // toggleParent (row) {
    //   const allSelected = this.everyNodeStatus(row.parent[this.childrenKey], this.$refs.table.selection)
    //   this.$refs.table.toggleRowSelection(row.parent, allSelected)
    //   if (row.parent[this.parentKey]) this.toggleParent(row.parent)
    // },
    // /**
    //  * @name 操作子级节点勾选状态
    //  * 1.触发子级节点全部勾选/全部取消勾选
    //  * 2.若子级节点下还存在子级节点，则再往下执行第一步
    //  */
    // toggleChildren (children, row) {
    //   const parentSelected = this.getNodeStatus(this.$refs.table.selection, row)
    //   children.map(child => {
    //     this.$refs.table.toggleRowSelection(child, parentSelected)
    //     if (child[this.childrenKey]) this.toggleChildren(child[this.childrenKey], child)
    //   })
    // },
    // // @name 获取节点选中状态
    // getNodeStatus: (nodeList, node) => includes(nodeList, node),
    // // @name 断言检查所有节点选中状态是否为“真”
    // everyNodeStatus: (nodeList, selectNodeList) => nodeList.every(node => includes(selectNodeList, node))
  }
}
