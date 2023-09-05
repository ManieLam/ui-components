<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 配置穿梭框某选项置灰, 表示该项数据是否禁止转移
    AnsoDataform.transfer(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置穿梭框为 value 和 label 设置别名
    AnsoDataform.transfer(
      :formFields="propsFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置穿梭框可自定义展示内容, 需要再使用页面修改想展示的样式
    AnsoDataform.transfer(
      :formFields="contentFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置穿梭框可检索
    AnsoDataform(
      :formFields="filterFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置穿梭框按钮样式配置
    AnsoDataform(
      :formFields="btnFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置穿梭框展示形式
    AnsoDataform(
      :formFields="isGroupFormFields"
      :buttonList="[]"
    )
    hr
    //- AnsoDataform.transfer(
    //-   :formFields="nomalsFormFields"
    //-   :buttonList="[]"
    //- )
</template>

<script>
export default {
  name: 'simpleTransfer',
  components: {},
  data () {
    return {
      disabledFormFields: [{
        name: 'disabled',
        label: '传入置灰参数数组，对应value值置灰不可移动',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          disabled: ['1', '5', '3']
        }
      }, {
        name: 'disabledoptions',
        label: '传入options数组内带有disabled参数，代表对应项置灰不可移动',
        form: {
          tag: 'transfer',
          options: disabledOptions
        }
      }],
      propsFormFields: [{
        name: 'props',
        label: '属性为 value 和 label 设置别名, 配合options对应显示',
        form: {
          tag: 'transfer',
          options: propsOptions,
          valuekey: 'key',
          labelkey: 'name'
        }
      }],
      contentFormFields: [{
        name: 'content',
        label: '可以对数据项的渲染函数、进行自定义',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          renderContent: (h, option) => {
            return <div class="header"><el-avatar size="small" src={option.img}></el-avatar><span>{option.label}</span></div>
          }
        }
      }, {
        name: 'title',
        label: '可以对列表标题的渲染',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          titles: ['待选项', '已选项']
        }
      }],
      filterFormFields: [{
        name: 'filterable',
        label: '配置筛选框可检索，默认支持关键字，拼音检索',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          filterable: true
        }
      }, {
        name: 'filter',
        label: '配置筛选框可检索，自行配置检索条件，当前配置为检索选项value值',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          renderContent: (h, option) => {
            return <div class="header"><span>{option.value} - {option.label}</span></div>
          },
          filterable: (data) => {
            const { query, item } = data
            return item.value.indexOf(query) > -1
          }
        }
      }],
      btnFormFields: [{
        name: 'text',
        label: '穿梭框按钮配置文字, icon图标, 排列顺序',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          button: {
            text: ['往左', '往右'],
            icon: ['el-icon-d-arrow-left', 'el-icon-d-arrow-right'],
            direction: 'horizontal'
          }
        }
      }],
      isGroupFormFields: [{
        name: 'normal',
        label: '简单式穿梭框',
        form: {
          tag: 'transfer',
          options: defaultOptions
        }
      }, {
        name: 'isGroup',
        label: '弹窗式穿梭框',
        form: {
          tag: 'transfer',
          options: defaultOptions,
          isPopup: true,
          dialogProps: {
            btnText: '打开穿梭框选择',
            type: 'primary',
            title: '配置信息项'
          }
        }
      }]
    }
  },
  mounted () {}
}
const defaultOptions = [{
  label: '北京',
  value: '0',
  img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}, {
  label: '上海',
  value: '1',
  img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
}, {
  label: '汕头',
  value: '2',
  img: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}, {
  label: '广州',
  value: '3',
  img: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}, {
  label: '深圳',
  value: '4',
  img: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}, {
  label: '北京',
  value: '5',
  img: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
}, {
  label: '上海',
  value: '6',
  img: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png'
}, {
  label: '汕头',
  value: '7',
  img: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}, {
  label: '广州',
  value: '8',
  img: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
}]
const disabledOptions = [{
  label: '北京',
  value: '0',
  disabled: true
}, {
  label: '上海',
  value: '1',
  disabled: true
}, {
  label: '汕头',
  value: '2'
}, {
  label: '广州',
  value: '3'
}, {
  label: '深圳',
  value: '4'
}, {
  label: '北京',
  value: '5'
}]
const propsOptions = [{
  name: '北京',
  key: '0'
}, {
  name: '上海',
  key: '1'
}, {
  name: '汕头',
  key: '2'
}, {
  name: '广州',
  key: '3'
}, {
  name: '深圳',
  key: '4'
}, {
  name: '北京',
  key: '5'
}]
</script>
<style lang="sass" scoped>
.transfer
  ::v-deep .header
    vertical-align: top
    display: flex
    align-items: center
    .el-avatar
      margin-right: 5px
</style>
