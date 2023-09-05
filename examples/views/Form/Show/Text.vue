<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 基础纯文本框
    h5 传入AnsoDataform的value值: {{toggerFormData}}
    AnsoDataform(
      :formFields="normalFormFields"
      :value="toggerFormData"
      :buttonList="[]")
    el-button(@click="setDate") 点击变更值
    hr
    h4 其它参数配置
    AnsoDataform(
      :formFields="otherFormFields"
      :value="toggerFormData"
      :buttonList="[]")
    hr
</template>

<script>
import axios from 'axios'
export default {
  name: 'simpleText',
  components: {},
  data () {
    return {
      formData: {
        input: '陈大大',
        select: '2',
        multiple: ['1', '2'],
        time: 1609829135000,
        money: 10,
        icon: 1609829135000,
        selectLink: '2',
        textStyle: '1',
        selectTooltip: '2'
      },
      formData1: {
        file: [{
          fileLength: 72064,
          fileName: '微信图片_20200915095228.jpg',
          fileType: 'jpg',
          id: 2265093,
          shortUrl: 'QrYFbiJvyUFf'
        }],
        input: '陈小学',
        select: '1',
        multiple: null,
        time: null,
        money: null,
        icon: 1609829135000,
        selectLink: '2',
        textStyle: '1',
        selectTooltip: '2'
      },
      toggleflag: false,
      toggerFormData: {},
      normalFormFields: [{
        name: 'input',
        label: '配置输入框类型',
        form: {
          tag: 'text'
        },
        render: { type: 'text' }
      }, {
        name: 'select',
        label: '配置选择类型',
        form: {
          tag: 'text'
        },
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
        render: { type: 'select' }
      }, {
        name: 'multiple',
        label: '配置多选择框类型',
        form: {
          tag: 'text'
        },
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
        render: { type: 'multiselect' }
      }, {
        name: 'time',
        label: '配置时间类型',
        form: {
          tag: 'text'
        },
        render: { type: 'time', timeType: 'YYYY-MM-DD HH:mm:ss' }
      }, {
        name: 'money',
        label: '配置转换输出金钱类型',
        form: {
          tag: 'text'
        },
        render: { type: 'money' }
      }, {
        name: 'file',
        label: '配置转换输出图片',
        form: {
          tag: 'text'
        },
        render: { type: 'file' }
      }],
      otherFormFields: [{
        name: 'icon',
        label: '是否带icon',
        form: {
          tag: 'text',
          icon: 'date'
        },
        render: { type: 'time', timeType: 'YYYY-MM-DD' }
      }, {
        name: 'selectLink',
        label: '是否存在函数操作点击为链接',
        form: {
          tag: 'text',
          func: ({ funcProps }) => {
            window.location.href = 'http://www.baidu.com'
          }
        },
        options: [{
          label: '跳转时间选择器',
          value: '0'
        }, {
          label: '跳转日期选择器',
          value: '1'
        }, {
          label: '跳转百度',
          value: '2'
        }],
        render: { type: 'select' }
      }, {
        name: 'textStyle',
        label: '修改内容样式',
        form: {
          tag: 'text',
          textStyle: {
            color: 'red',
            'text-decoration': 'underline'
          },
          func: ({ funcProps }) => {
            this.$router.push({
              path: '/form/select/Date'
            })
          }
        },
        options: [{
          label: '跳转时间选择器',
          value: '0'
        }, {
          label: '跳转日期选择器',
          value: '1'
        }, {
          label: '跳转百度',
          value: '2'
        }],
        render: { type: 'select' }
      }, {
        name: 'selectTooltip',
        label: '是否存在提示性语句',
        form: {
          tag: 'text',
          func: ({ funcProps }) => {
            window.location.href = 'http://www.baidu.com'
          },
          tooltip: {
            content: '点击跳转至百度'
          }
        },
        options: [{
          label: '时间选择器',
          value: '0'
        }, {
          label: '日期选择器',
          value: '1'
        }, {
          label: '百度',
          value: '2'
        }],
        render: { type: 'select' }
      }]

    }
  },
  methods: {
    setDate () {
      this.toggleflag = !this.toggleflag
      this.$set(this, 'toggerFormData', this.toggleflag ? this.formData : this.formData1)
    }
  },
  mounted () {
    this.setDate()
    const config = {
      url: '/pub/v1/relation',
      method: 'post',
      headers: {
        'Anso-Token': '123'
      }
    }
    axios(config).then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }
}
</script>
<style lang="sass" scoped>
.labelText
  margin-right: 10px
</style>
