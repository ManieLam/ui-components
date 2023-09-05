<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 多选框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 排列状态
    AnsoDataform(
      :formFields="directionFormFields"
      :buttonList="[]"
    )
    hr
    h4 可选项目数量的限制
    AnsoDataform(
      :formFields="minmaxFormFields"
      :buttonList="[]"
    )
    hr
    h4 按钮样式
    AnsoDataform(
      :formFields="buttonFormFields"
      :buttonList="[]"
    )
    hr
    h4 带边框
    AnsoDataform(
      :formFields="borderFormFields"
      :buttonList="[]"
    )
    hr
    h4 indeterminate 状态
    h5 <直接使用AnsoDataformCheckbox组件配置>
    AnsoDataformCheckbox(:isSelectAll="true" :options="allList" v-model="allListValue" @handleAllChange="change")
    h5 <使用AnsoDataform组件配置>
    AnsoDataform(
      :formFields="indeterminateFormFields"
      :value="formValues"
      :buttonList="[]"
    )
</template>

<script>
export default {
  name: 'simpleCheckbox',
  components: {
  },
  data () {
    return {
      nomalFormFields: [{
        name: '多选框',
        label: '多选框',
        form: {
          tag: 'checkbox',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }],
      disabledFormFields: [{
        name: 'disabledAll',
        label: '禁用整个多选框组',
        form: {
          tag: 'checkbox',
          disabled: true,
          value: ['2'],
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: 'disabledone',
        label: '禁用多选框组-某个选项',
        form: {
          tag: 'checkbox',
          options: [{
            label: '北京',
            disabled: true,
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }],
      directionFormFields: [{
        name: '横向多选框',
        label: '横向多选框',
        form: {
          tag: 'checkbox',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: '纵向多选框',
        label: '纵向多选框',
        form: {
          tag: 'checkbox',
          isVertical: true,
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }],
      minmaxFormFields: [{
        name: 'minmax',
        label: '限制选择数量min为1，max为2',
        form: {
          tag: 'checkbox',
          min: 1,
          max: 2,
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }],
      buttonFormFields: [{
        name: 'button',
        label: '按钮多选框组',
        form: {
          tag: 'checkbox',
          isButton: true,
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }],
      borderFormFields: [{
        name: 'border',
        label: '带有边框的多选框组',
        form: {
          tag: 'checkbox',
          isBorder: true,
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: 'medium',
        label: 'medium',
        form: {
          tag: 'checkbox',
          isBorder: true,
          size: 'medium',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: 'small',
        label: 'small',
        form: {
          tag: 'checkbox',
          isBorder: true,
          size: 'small',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: 'mini',
        label: 'mini',
        form: {
          tag: 'checkbox',
          isBorder: true,
          size: 'mini',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }]
        }
      }, {
        name: '多选框个项样式配置',
        label: '多选框个项样式配置',
        form: {
          tag: 'checkbox',
          isBorder: true,
          options: [{
            label: '北京',
            size: 'medium',
            value: '0'
          }, {
            label: '上海',
            size: 'small',
            value: '1'
          }, {
            label: '汕头',
            size: 'mini',
            value: '2'
          }]
        }
      }],
      /**
       * 设置indeterminate状态, 直接使用AnsoDataformCheckbox组件配置
       * AnsoDataformCheckbox(:isSelectAll="true" :options="allList" v-model="isAllValue" @handleAllChange="change")
       * 函数调用handleAllChange方法，出参为checkbox(组件所有属性)、data(组件值)，操作获取点击全选后的组件checkAll属性状态（组件checkAll属性：判断全选的勾选框是否勾选）
       * 根据checkAll属性状态，操作传入组件的值，也可进行别的操作
       */
      allList: [{ // 必传的多选选项
        label: '北京',
        value: '0'
      }, {
        label: '上海',
        value: '1'
      }, {
        label: '汕头',
        value: '2'
      }],
      allListValue: [], // 组件值
      /**
       * 设置indeterminate 状态. 配置为表单AnsoDataform输出
       * func为props属性，出参为checkbox(组件所有属性)、data(组件值)
       */
      formValues: {},
      indeterminateFormFields: [{
        name: 'isAll',
        label: '多选框组全选勾选',
        form: {
          tag: 'checkbox',
          options: [{
            label: '北京',
            value: '0'
          }, {
            label: '上海',
            value: '1'
          }, {
            label: '汕头',
            value: '2'
          }],
          isSelectAll: true,
          func: ({ funcProps }) => {
            const { checkbox } = funcProps
            this.formValues = checkbox.checkAll ? { isAll: ['0', '1', '2'] } : {}
          }
        }
      }]
    }
  },
  methods: {
    change (funcProps) {
      const { checkbox } = funcProps
      this.allListValue = checkbox.checkAll ? ['0', '1', '2'] : []
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
