<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 时间选择框
    AnsoDataform(
      :formFields="nomalFormFields"
      :buttonList="[]"
    )
    hr
    h4 禁用
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 只读
    AnsoDataform(
      :formFields="readonlyFormFields"
      :value="formValues"
      :buttonList="[]"
    )
    hr
    h4 是否显示清空按钮
    AnsoDataform(
      :formFields="clearableFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置图标(右侧图标需要鼠标hover才可查看)
    AnsoDataform(
      :formFields="iconFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否为固定时间选择器（固定时间：提供几个固定的时间点供用户选择）
    AnsoDataform(
      :formFields="isFixedFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否使用箭头进行时间选择，仅对isFixed = false有效
    AnsoDataform(
      :formFields="arrowControlFormFields"
      :buttonList="[]"
    )
    hr
    h4 时间选择器，可选时间内容限制
    AnsoDataform(
      :formFields="optionsFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleTime',
  components: {},
  data () {
    return {
      nomalFormFields: [{
        name: 'normaTime',
        label: '时间选择框',
        form: {
          tag: 'time'
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'time',
          disabled: true
        }
      }],
      // 只读状态，存在有值，只可查看不可操作
      formValues: { readonly: 1609829135000 },
      readonlyFormFields: [{
        name: 'readonly',
        label: '只读状态，相当于text',
        form: {
          tag: 'time',
          readonly: true
        }
      }],
      clearableFormFields: [{
        name: 'clearable',
        label: '默认可清空，当前设置为不可清空',
        form: {
          tag: 'time',
          clearable: false
        }
      }],
      iconFormFields: [{
        name: 'iconLeft',
        label: '修改时间选择框头部按钮传入类型为String，改为日历',
        /**
         * 传入字符串：由于iconAlign默认值为left,即为头部，因此只需要传入需要修改的icon即可
         */
        form: {
          tag: 'time',
          icon: 'date'
        }
      }, {
        name: 'iconRight',
        label: '修改时间选择框尾部按钮传入类型为String，改为close',
        /**
         * 传入字符串：修改iconAlign值为right,即为尾部，再传入需要修改的icon即可
         */
        form: {
          tag: 'time',
          icon: 'close',
          iconAlign: 'right'
        }
      }, {
        name: 'icon-Array',
        label: '修改时间选择框前后两处按钮传入类型为Array，前部改为日历，后部改为搜索',
        /**
         * 传入数组：提供此参数类型是为了可以同时修改前后两组按钮
         */
        form: {
          tag: 'time',
          icon: [{
            type: 'date',
            align: 'left'
          }, {
            type: 'close',
            align: 'right'
          }]
        }
      }],
      isFixedFormFields: [{
        name: 'noFixed',
        label: '任意时间都可选',
        // 参数isFixed，默认值为false
        form: {
          tag: 'time'
        }
      }, {
        name: 'isFixed',
        label: '固定时间可选',
        form: {
          tag: 'time',
          isFixed: true
        }
      }],
      arrowControlFormFields: [{
        name: 'arrowControl',
        label: '展示箭头可进行时间选择',
        form: {
          tag: 'time',
          arrowControl: true
        }
      }],
      optionsFormFields: [{
        name: 'selectOption',
        label: '固定时间选择器,时间内容限制',
        form: {
          tag: 'time',
          isFixed: true,
          /**
           * 固定时间isFixed = true, pickerOptions配置，配置参数均为String类型
           * start开始时间，默认值为：09:00
           * end结束时间，默认值为：18:00
           * step间隔时间，默认值为：00:30
           * minTime最小时间，小于该时间的时间段将被禁用，默认值为：00:00
           * maxTime最大时间，大于该时间的时间段将被禁用，无默认值
          */
          pickerOptions: {
            start: '05:00',
            end: '22:00',
            step: '00:10'
          }
        }
      }, {
        name: 'pickerOption',
        label: '任意时间选择器,时间内容限制',
        form: {
          tag: 'time',
          /**
           * 固定时间isFixed = false, pickerOptions配置
           * selectableRange可选时间段，例如'18:30:00 - 20:30:00'或者传入数组['09:30:00 - 12:00:00', '14:30:00 - 18:30:00']，无默认值
           * format数据选择的时间格式化，默认值为：'HH:mm:ss'
          */
          arrowControl: true,
          pickerOptions: {
            selectableRange: ['09:30:00 - 12:00:00', '14:30:00 - 18:30:00'],
            format: 'HH:mm:ss'
          }
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
