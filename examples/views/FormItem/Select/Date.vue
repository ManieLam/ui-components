<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 日期选择框
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
      v-model="formValues"
      :buttonList="[]"
    )
    hr
    h4 是否显示清空按钮
    AnsoDataform(
      :formFields="clearableFormFields"
      :buttonList="[]"
    )
    hr
    h4 日期选择器，选择类型
    h5 <单个日期类型选择>
    AnsoDataform(
      :formFields="dateTypeFormFields"
      :buttonList="[]"
    )
    h5 <日期选择范围>
    AnsoDataform(
      :formFields="rangeFormFields"
      :buttonList="[]"
    )
    hr
    h4 日期选择器，限制选择范围
    AnsoDataform(
      :formFields="disSomeFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否存在快捷版面
    AnsoDataform(
      :formFields="shortcutFormFields"
      :buttonList="[]"
    )
    hr
    h4 变更周起始日
    AnsoDataform(
      :formFields="firstDayOfWeekFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否使用箭头进行时间选择
    AnsoDataform(
      :formFields="arrowFormFields"
      :buttonList="[]"
    )
    h4 配置图标(右侧图标需要鼠标hover才可查看)
    AnsoDataform(
      :formFields="iconFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
import day from 'dayjs'
export default {
  name: 'simpleDate',
  components: {},
  data () {
    return {
      nomalFormFields: [{
        name: 'normaTime',
        label: '日期选择框',
        form: {
          tag: 'date'
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'date',
          disabled: true
        }
      }],
      // 只读状态，存在有值，只可查看不可操作
      formValues: { readonly: 1609829135000 },
      readonlyFormFields: [{
        name: 'readonly',
        label: '只读状态，相当于text',
        form: {
          tag: 'date',
          readonly: true
        }
      }],
      clearableFormFields: [{
        name: 'clearable',
        label: '默认可清空，当前设置为不可清空',
        form: {
          tag: 'date',
          clearable: false
        }
      }],
      dateTypeFormFields: [{
        name: 'year',
        label: '年份选择',
        form: {
          tag: 'date',
          dateType: 'year'
        }
      }, {
        name: 'month',
        label: '月份选择',
        form: {
          tag: 'date',
          dateType: 'month'
        }
      }, {
        name: 'week',
        label: '周选择',
        form: {
          /**
           * 当前日期选择格式为周时，dateType = 'week'
           * 最好设置下，显示在输入框中的格式，否则默认显示格式为’2012w01‘
           */
          tag: 'date',
          dateType: 'week',
          format: 'yyyy 第 WW 周'
        }
      }, {
        name: 'date',
        label: '单日期选择',
        form: {
          tag: 'date',
          dateType: 'date'
        }
      }, {
        name: 'dates',
        label: '多日期选择',
        form: {
          tag: 'date',
          dateType: 'dates'
        }
      }, {
        name: 'dateTime',
        label: '日期时间选择',
        form: {
          tag: 'date',
          dateType: 'datetime'
        }
      }],
      rangeFormFields: [{
        name: 'datetimerange',
        label: '日期时间范围选择',
        form: {
          tag: 'date',
          dateType: 'datetimerange'
        }
      }, {
        name: 'daterange',
        label: '日期范围选择',
        form: {
          tag: 'date',
          dateType: 'daterange'
        }
      }, {
        name: 'rangeMonth',
        label: '月份范围选择',
        form: {
          tag: 'date',
          dateType: 'monthrange'
        }
      }],
      shortcutFormFields: [{
        name: 'dateTimehortcut',
        label: '时间日期选择器默认快捷版面',
        /**
         * 同样遵守日期选择类型限制
         * 自定义版面，支持数组格式，可传入需要的快捷版面的内容数据
         */
        form: {
          tag: 'date',
          shortcut: 'date',
          dateType: 'datetime'
        }
      }, {
        name: 'shortcutMonth',
        label: '存在日期选择范围默认快捷版面',
        /**
         * ['datetimerange', 'daterange', 'monthrange', 'datetime']
         * 需要日期选择类型为选择范围或时间日期选择器（dateType: 'datetime'）才生效，因此dateType必须配置为以上四种类型，否则配置无效
         */
        form: {
          tag: 'date',
          shortcut: 'defualt',
          dateType: 'daterange'
        }
      }, {
        name: 'ishortcutMonth',
        label: '存在自定义快捷版面',
        /**
         * 同样遵守日期选择类型限制
         * 自定义版面，支持数组格式，可传入需要的快捷版面的内容数据
         */
        form: {
          tag: 'date',
          shortcut: [{
            text: '最近一周',
            onClick (picker) {
              const end = day().endOf('date').valueOf()
              const start = day().subtract(1, 'week').startOf('date').valueOf()
              picker.$emit('pick', [start, end])
            }
          }],
          dateType: 'daterange'
        }
      }],
      disSomeFormFields: [{
        name: 'disSome',
        label: '限制日期选择，小于今天的选项置灰',
        form: {
          tag: 'date',
          pickerOptions: {
            disabledDate: (time) => {
              return time.getTime() <= Date.now() - 8.64e7
            }
          }
        }
      }, {
        name: 'disSomerange',
        label: '限制日期范围选择，大于今天的选项置灰',
        form: {
          tag: 'date',
          dateType: 'daterange',
          pickerOptions: {
            disabledDate: (time) => {
              const curTime = day()
              const chooseTime = time.getTime()
              return curTime.diff(day(chooseTime, 'x'), 'years', true) > 1 || day(chooseTime).isAfter(curTime)
            }
          }
        }
      }],
      firstDayOfWeekFormFields: [{
        name: 'firstDayOfWeek',
        label: '变更周起始日期为周四',
        form: {
          tag: 'date',
          pickerOptions: {
            firstDayOfWeek: 4
          }
        }
      }],
      arrowFormFields: [{
        name: 'datetimearrow',
        label: '日期时间选择,使用箭头进行时间选择',
        form: {
          tag: 'date',
          dateType: 'datetime',
          timeArrowControl: true
        }
      }, {
        name: 'datetimerangearrow',
        label: '日期时间范围选择,使用箭头进行时间选择',
        form: {
          tag: 'date',
          dateType: 'datetimerange',
          timeArrowControl: true
        }
      }],
      iconFormFields: [{
        name: 'iconLeft',
        label: '修改时间选择框头部按钮传入类型为String，改为闹钟',
        /**
         * 传入字符串：由于iconAlign默认值为left,即为头部，因此只需要传入需要修改的icon即可
         */
        form: {
          tag: 'date',
          icon: 'bell'
        }
      }, {
        name: 'iconRight',
        label: '修改时间选择框尾部按钮传入类型为String，改为close',
        /**
         * 传入字符串：修改iconAlign值为right,即为尾部，再传入需要修改的icon即可
         */
        form: {
          tag: 'date',
          icon: 'close',
          iconAlign: 'right'
        }
      }, {
        name: 'icon-Array',
        label: '修改时间选择框前后两处按钮传入类型为Array，前部改为闹钟，后部改为搜索',
        /**
         * 传入数组：提供此参数类型是为了可以同时修改前后两组按钮
         */
        form: {
          tag: 'date',
          icon: [{
            type: 'bell',
            align: 'left'
          }, {
            type: 'close',
            align: 'right'
          }]
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
