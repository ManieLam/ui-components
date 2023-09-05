<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 简单选择框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    //- hr
    h4 有禁用选项
    AnsoDataform(
      :formFields="disItemFormFields"
      :buttonList="[]"
    )
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 可清空单选
    AnsoDataform(
      :formFields="clearableFormFields"
      :buttonList="[]"
    )
    hr
    h4 基础多选
    AnsoDataform(
      :formFields="multipleFormFields"
      :buttonList="[]"
    )
    hr
    h4 自定义选项
    AnsoDataform(
      :formFields="customFormFields"
      :buttonList="[]"
    )
    hr
    h4 自定义选项 - 选项说明长度限制(无限制默认长度)
    AnsoDataform(
      :formFields="subtextlimitFormFields"
      :buttonList="[]"
    )
    hr
    h4 分组
    AnsoDataform(
      :formFields="groupFormFields"
      :buttonList="[]"
    )
    hr
    h4 支持异步远程搜索
    AnsoDataform(
      :formFields="remoteFormFields"
      :buttonList="[]"
    )
    hr
    h4 可搜索(可以利用搜索功能快速查找选项)
    AnsoDataform(
      :formFields="filterFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleSelect',
  components: {},
  data () {
    return {
      nomalFormFields: [{
        name: '简单选择框',
        label: '简单选择框',
        form: {
          tag: 'select',
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学小学',
            value: 3
          }]
        }
      }],
      disItemFormFields: [{
        name: '存在禁用项选择框',
        label: '存在禁用项选择框',
        form: {
          tag: 'select',
          options: [{
            label: '高中',
            value: 1,
            disabled: true
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }, {
        name: '存在禁用分组项选择框-分组',
        label: '存在禁用分组项选择框-分组',
        form: {
          tag: 'select',
          isGroup: true,
          options: [{
            label: '20岁',
            value: 0,
            group: '年龄',
            disabled: true
          }, {
            label: '30岁',
            value: 1,
            group: '年龄'
          }, {
            label: '男',
            value: 2,
            group: '性别'
          }, {
            label: '女',
            value: 3,
            group: '性别'
          }]
        }
      }],
      disabledFormFields: [{
        name: '禁用',
        label: '禁用',
        form: {
          tag: 'select',
          disabled: true,
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }],
      clearableFormFields: [{
        name: '清空选项',
        label: '清空选项默认为可清空，当前配置为不可',
        form: {
          tag: 'select',
          clearable: false,
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }],
      multipleFormFields: [{
        name: '基础多选-排列文字显示',
        label: '基础多选-排列文字显示',
        form: {
          tag: 'select',
          multiple: true,
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }, {
        name: '基础多选-合并为一段文字显示',
        label: '基础多选-文字显示',
        form: {
          tag: 'select',
          multiple: true,
          collapseTags: true,
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }],
      customFormFields: [{
        name: '自定义选项-传函数直接获取options任意内容',
        label: '自定义选项-传函数直接获取options任意内容',
        form: {
          tag: 'select',
          subtext: (option) => { return option.subtext },
          options: [{
            label: '高中',
            value: 1,
            subtext: '某某某，高一三班哈哈哈哈哈哈哈哈哈哈哈哈哈啊'
          }, {
            label: '初中',
            value: 2,
            subtext: '某某某，初中三班哈哈哈哈哈啊'
          }, {
            label: '小学',
            value: 3,
            subtext: '某某某，小学三班嘿嘿'
          }]
        }
      }, {
        name: '自定义选项-直接获取options,subtext内容',
        label: '自定义选项-直接获取options,subtext内容',
        form: {
          tag: 'select',
          options: [{
            label: '高中',
            value: 1,
            subtext: '作业很多'
          }, {
            label: '初中',
            value: 2,
            subtext: '作业马马虎虎多'
          }, {
            label: '小学',
            value: 3,
            subtext: '作业马马虎虎不多'
          }]
        }
      }, {
        name: '自定义选项-options中存在img内容，配置图片',
        label: '自定义选项-options中存在img内容，配置图片',
        form: {
          tag: 'select',
          options: [{
            label: '高中',
            value: 1,
            subtext: '作业很多',
            img: require('@/assets/logo.png')
          }, {
            label: '初中',
            value: 2,
            subtext: '作业马马虎虎多',
            img: require('@/assets/logo.png')
          }, {
            label: '小学',
            value: 3,
            subtext: '作业马马虎虎不多',
            img: require('@/assets/logo.png')
          }]
        }
      }],
      subtextlimitFormFields: [{
        name: '默认选项说明长度',
        label: '默认选项说明长度(若无限制长度，则会根据最大宽度限制内容限制)',
        form: {
          tag: 'select',
          options: [{
            label: '高中',
            value: 1,
            subtext: '作业很多'
          }, {
            label: '初中',
            value: 2,
            subtext: '作业马马虎虎多作业马马虎虎多作业马马虎虎多作业马马虎虎多'
          }, {
            label: '小学',
            value: 3,
            subtext: '作业马马虎虎不多还好'
          }]
        }
      }, {
        name: '设置选项说明长度：15',
        label: '设置选项说明长度：15',
        form: {
          tag: 'select',
          subtextlimit: 15,
          options: [{
            label: '高中',
            value: 1,
            subtext: '作业很多',
            img: require('@/assets/logo.png')
          }, {
            label: '初中',
            value: 2,
            subtext: '作业马马虎虎多作业马马虎虎多作业马马虎虎多作业马马虎虎多',
            img: require('@/assets/logo.png')
          }, {
            label: '小学',
            value: 3,
            subtext: '作业马马虎虎不多还好',
            img: require('@/assets/logo.png')
          }]
        }
      }],
      groupFormFields: [{
        name: '分组',
        label: '分组',
        /**
         * 配置为分组时，group参数为必填
         * 后续会根据所传的group参数分配分组，值为分组名称
         */
        form: {
          tag: 'select',
          isGroup: true,
          groupKey: 'disabled',
          groupLabel: (data) => {
            const { label } = data
            return label === 'true' ? '不可选' : '可选'
          },
          options: [{
            label: '20岁',
            value: 0,
            disabled: true
          }, {
            label: '20岁',
            value: 10,
            disabled: true
          }, {
            label: '30岁',
            value: 1
          }, {
            label: '男',
            value: 2
          }, {
            label: '女',
            value: 3
          }]
        }
      }, {
        name: '分组-options传入组名key值可变更',
        label: '分组-options传入组名key值可变更',
        form: {
          tag: 'select',
          /**
           * 配置为分组时，group参数为必填
           * group参数的key值可变更为自己需要的值
           * 如下group参数key值通过配置‘groupKey’，变更为parents
           * 后续会根据所传的parents参数分配分组
          */
          groupKey: 'parents',
          isGroup: true,
          options: [{
            label: '20岁',
            value: 0,
            parents: '年龄'
          }, {
            label: '30岁',
            value: 1,
            parents: '年龄'
          }, {
            label: '男',
            value: 2,
            parents: '性别'
          }, {
            label: '女',
            value: 3,
            parents: '性别'
          }]
        }
      }],
      remoteFormFields: [{
        name: '支持异步搜索',
        label: '支持异步搜索',
        form: {
          tag: 'select',
          filterable: true,
          remoteFunc: (data) => {
            return new Promise((resolve, reject) => {
              if (!data) resolve([])
              else {
                const { query } = data
                const group = query ? [{
                  label: '高中',
                  value: 1
                }, {
                  label: '初中',
                  value: 2
                }, {
                  label: '小学',
                  value: 3
                }] : []
                resolve(group)
              }
            })
          }
        }
      }],
      filterFormFields: [{
        name: '可搜索',
        label: '可搜索',
        form: {
          tag: 'select',
          filterable: true,
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }, {
        name: '自定义可搜索',
        label: '自定义搜索，数组的value值',
        form: {
          tag: 'select',
          filterable: (data) => {
            const { query, item } = data
            // console.log(query, item)
            const group = item.filter(ones => ones.value.toString().search(query) > -1)
            return group
          },
          subtext: (option) => { return `${option.value} - ${option.label}` },
          options: [{
            label: '高中',
            value: 1
          }, {
            label: '初中',
            value: 2
          }, {
            label: '小学',
            value: 3
          }]
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
