<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 时间范围选择框，默认限制为开始值不可大于结束值
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
    h4 是否显示清空按钮
    AnsoDataform(
      :formFields="clearableFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否使用箭头进行时间选择
    AnsoDataform(
      :formFields="arrowControlFormFields"
      :buttonList="[]"
    )
    hr
    h4 连接符号
    AnsoDataform(
      :formFields="connectFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置图标(右侧图标需要鼠标hover才可查看)
    AnsoDataform(
      :formFields="iconFormFields"
      :buttonList="[]"
    )
    hr
    h4 时间范围选择器,可限制时间范围
    AnsoDataform(
      :formFields="rangeSomeFormFields"
      :buttonList="[]"
    )
    hr
    h4 直接引用AnsoDataformTimeRange范围组件
    AnsoDataformTimeRange(v-model="ranges" :width='120' connect='至')
    br
    span 输出值为：{{ranges}}
</template>

<script>
export default {
  name: 'simpleTimeRange',
  components: {},
  data () {
    return {
      ranges: [],
      nomalFormFields: [{
        name: 'normaTime',
        label: '时间选择框',
        form: {
          tag: 'timeRange'
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'timeRange',
          disabled: true
        }
      }],
      clearableFormFields: [{
        name: 'clearable',
        label: '默认可清空，当前设置为不可清空',
        form: {
          tag: 'timeRange',
          clearable: false
        }
      }],
      arrowControlFormFields: [{
        name: 'arrowControl',
        label: '显示使用箭头进行时间选择',
        form: {
          tag: 'timeRange',
          arrowControl: true
        }
      }],
      connectFormFields: [{
        name: 'connect',
        label: '变更连接符号为：至',
        form: {
          tag: 'timeRange',
          connect: '至'
        }
      }],
      iconFormFields: [{
        name: 'iconLeft',
        label: '修改时间选择框头部按钮传入类型为String，改为日历',
        /**
         * 传入字符串：由于iconAlign默认值为left,即为头部，因此只需要传入需要修改的icon即可
         */
        form: {
          tag: 'timeRange',
          icon: 'date'
        }
      }, {
        name: 'iconRight',
        label: '修改时间选择框尾部按钮传入类型为String，改为close',
        /**
         * 传入字符串：修改iconAlign值为right,即为尾部，再传入需要修改的icon即可
         */
        form: {
          tag: 'timeRange',
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
          tag: 'timeRange',
          icon: [{
            type: 'date',
            align: 'left'
          }, {
            type: 'close',
            align: 'right'
          }]
        }
      }],
      rangeSomeFormFields: [{
        name: 'noFixedTime',
        label: '固定时间选择框范围限制大小值',
        form: {
          tag: 'timeRange',
          isFixed: true,
          pickerOptions: {
            start: '05:00',
            end: '12:00',
            step: '00:10',
            minTime: '05:10',
            maxTime: '10:00'
          }
        }
      }, {
        name: 'fixedTime',
        label: '任意时间选择框范围限制大小值',
        form: {
          tag: 'timeRange',
          pickerOptions: {
            // 限制任意时间范围限只可传入字符串，及为限制一个时间段可选
            selectableRange: '09:00:00 - 12:00:00'
          }
        }
      }]
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
