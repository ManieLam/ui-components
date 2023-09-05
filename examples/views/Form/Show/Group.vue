<template lang='pug'>
.demo-layout__group
  AnsoDataformSelect(v-model="groupType",:options="groupTypeOptions",style="margin: 10px")
  AnsoDataformSelect(v-model="styleType",:options="styleTypeOptions",style="margin: 10px")
  hr
  AnsoDataformGroup.form-withFixed(
    ref="form"
    v-model="formData"
    :buttonFixed="true"
    :styleType="styleType"
    :groupType="groupType"
    :colspanNum="3"
    :readOnly="true"
    :groupSplit="groupSplit"
    :groupTitle="groupTitle"
    :formFields="formFields"
    :buttonList="buttonList")
</template>

<script>
/** */
import fieldsJson from './groupfields.json'
export default {
  name: 'RenderGroupSimple',
  data () {
    return {
      groupType: 'row',
      styleType: 'default',
      groupTitle: ['基础信息', '实名制信息', '收费信息'],
      groupSplit: [
        ['field1', 'field8', 'field9', 'field10', 'field11', 'field12', 'field13', 'field14', 'field15'],
        ['field16', 'field17', 'field18', 'field19', 'field20', 'field21'],
        ['field22', 'field23', 'field24', 'field25', 'field26']
      ],
      /* ==== 表单字段配置 ==== */
      formFields: fieldsJson.group,
      /* ==== 表单数据 ==== */
      formData: {
        book: 'asdadadhjhkj',
        field1: 'BH2020040599606007070',
        field8: '水务集团',
        field9: '299000607007080808080',
        field10: '1',
        field11: '1',
        field12: '1',
        field13: '深圳市南山区留仙洞创智云城',
        field14: 1615824000000,
        field15: 1615824000000,
        field16: '1',
        field17: '45678199602178900',
        field18: '李怡然',
        field19: '13709878990',
        field20: '98805678199602178900',
        field21: 'anso-98900088@163.com',
        field22: '1',
        field23: '423',
        field24: '中国人民银行',
        field25: '678900998777727888988',
        field26: '1'
        // field6: [{
        //   fileLength: 72064,
        //   fileName: '微信图片_20200915095228.jpg',
        //   fileType: 'jpg',
        //   id: 2265094,
        //   shortUrl: require('@/assets/logo.png')
        // }]
      },
      groupTypeOptions: [{
        label: '网格',
        value: 'grid'
      }, {
        label: '栅格(默认标准)',
        value: 'row'
      }],
      styleTypeOptions: [{
        label: '块',
        value: 'block'
      }, {
        label: '边框',
        value: 'border'
      }, {
        label: '默认标准',
        value: 'default'
      }],
      buttonList: [{
        label: '返回',
        func: () => {}
      }]
    }
  }
}
</script>

<style lang='sass' scoped>
// .anso-dataform__group[readOnly="true"]
//   .el-form-item
//     margin-bottom: 24px
//     .el-form-item__label
//       display: block
//       width: 100% !important
//       line-height: 20px !important
//       margin-bottom: 2px
//     .el-form-item__content
//       .el-select, .el-cascader, el-slider, .el-date-editor[tag="date"], .el-date-editor[tag="time"]
//         width: 100%
//     .el-form-item__label, .el-form-item__content
//       text-align: left
//       margin-left: 0 !important
</style>
