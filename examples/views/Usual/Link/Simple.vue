<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 配置超链接展示形式
    AnsoDataform(
      :formFields="nomalFormFields"
      v-model="formData"
      :buttonList="[]"
    )
    hr
    h4 自定义路由操作方法
    AnsoDataform(
      v-model="formData"
      :formFields="routeFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置超链接类型
    AnsoDataform(
      v-model="formData"
      :formFields="linkTypeFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置超链接跳转打开方式
    AnsoDataform(
      v-model="formData"
      :formFields="openTypeFormFields"
      :buttonList="[]"
    )
    hr
    h4#disabled 超链接禁用,id:#disabled
    AnsoDataform(
      v-model="formData"
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置超链接图标, 适用在文本式超链接和按钮式超链接：showType=text || showType=button
    AnsoDataform(
      v-model="formData"
      :formFields="iconFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置超链接是否支持下划线，适用在文本超链接：showType=text
    AnsoDataform(
      v-model="formData"
      :formFields="underlineFormFields"
      :buttonList="[]"
    )
    hr
    h4 配置超链接状态类型, 适用在文本式超链接和按钮式超链接：showType=text || showType=button
    AnsoDataform(
      v-model="formData"
      :formFields="typeFormFields"
      :buttonList="[]"
    )
    hr
</template>

<script>
export default {
  name: 'simpleLink',
  components: {},
  data () {
    return {
      formData: {
        text: '超链接跳转至百度',
        button: '超链接跳转至百度',
        image: '超链接跳转至百度',
        route: '提供超链接点击后的自定义操作方法',
        outside: '超链接跳转至百度',
        inside: '超链接跳转至本站按钮示例页面',
        anchor: '超链接跳转至本页面锚点id配置#disabled的位置',
        new: '超链接跳转至百度',
        current: '默认超链接当前页页面打开',
        textdisabled: '超链接跳转至百度',
        buttondisabled: '超链接跳转至百度',
        imagedisabled: '超链接跳转至百度',
        icons: '超链接跳转至百度',
        iconAlign: '超链接跳转至百度',
        buttonIcon: '超链接跳转至百度',
        underline: '超链接跳转至百度',
        noUnderline: '超链接跳转至百度',
        default: '超链接跳转至百度',
        primary: '超链接跳转至百度',
        success: '超链接跳转至百度',
        warning: '超链接跳转至百度',
        danger: '超链接跳转至百度',
        info: '超链接跳转至百度'
      },
      nomalFormFields: [{
        name: 'text',
        label: '文本式超链接',
        form: {
          tag: 'link',
          url: 'http://www.baidu.com'
        }
      }, {
        name: 'button',
        label: '按钮式超链接',
        form: {
          tag: 'link',
          url: 'http://www.baidu.com',
          showType: 'button'
        }
      }, {
        name: 'image',
        label: '图片式超链接',
        form: {
          tag: 'link',
          url: 'http://www.baidu.com',
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          showType: 'image'
        }
      }],
      routeFormFields: [{
        name: 'route',
        label: '提供超链接点击后的自定义操作方法',
        form: {
          tag: 'link',
          func: ({ value, data }) => {
            console.log(value, data)
            this.$router.push({ name: 'index' })
          }
        }
      }],
      linkTypeFormFields: [{
        name: 'outside',
        label: '默认url传入外部超链接：http://www.baidu.com',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com'
        }
      }, {
        name: 'inside',
        label: 'url传入内部超链接：/#/form/button/simple',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至本站按钮示例页面',
          url: '/#/form/button/simple',
          linkType: 'inside'
        }
      }, {
        name: 'anchor',
        label: 'url传入锚点超链接：#disabled',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至本页面锚点id配置#disabled的位置',
          url: '#disabled',
          linkType: 'anchor'
        }
      }],
      openTypeFormFields: [{
        name: 'new',
        label: '默认超链接新页面打开',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com'
        }
      }, {
        name: 'current',
        label: '默认超链接当前页页面打开',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          openType: 'current'
        }
      }],
      disabledFormFields: [{
        name: 'textdisabled',
        label: '文本式超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          disabled: true
        }
      }, {
        name: 'buttondisabled',
        label: '按钮式超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          showType: 'button',
          disabled: true
        }
      }, {
        name: 'imagedisabled',
        label: '图片式超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
          showType: 'image',
          disabled: true
        }
      }],
      iconFormFields: [{
        name: 'icons',
        label: '超链接配置icon图标，默认显示在左侧',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          icon: 'gerenxinxi-yijianfankui'
        }
      }, {
        name: 'iconAlign',
        label: '超链接配置icon图标，配置显示在右侧',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          icon: 'gerenxinxi-yijianfankui',
          iconAlign: 'right'
        }
      }, {
        name: 'buttonIcon',
        label: '按钮式超链接配置icon图标，配置显示在右侧',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          showType: 'button',
          icon: 'gerenxinxi-yijianfankui',
          iconAlign: 'right'
        }
      }],
      underlineFormFields: [{
        name: 'underline',
        label: '默认超链接存在下划线',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com'
        }
      }, {
        name: 'noUnderline',
        label: '配置超链接不存在下划线',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          underline: false
        }
      }],
      typeFormFields: [{
        name: 'default',
        label: '默认超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com'
        }
      }, {
        name: 'primary',
        label: '主要超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          linkShowType: 'primary'
        }
      }, {
        name: 'success',
        label: '成功超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          linkShowType: 'success'
        }
      }, {
        name: 'warning',
        label: '警告超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          linkShowType: 'warning'
        }
      }, {
        name: 'danger',
        label: '危险超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          linkShowType: 'danger'
        }
      }, {
        name: 'info',
        label: '信息超链接',
        form: {
          tag: 'link',
          linkLabel: '超链接跳转至百度',
          url: 'http://www.baidu.com',
          linkShowType: 'info'
        }
      }]
    }
  },
  mounted () {}
}
</script>
<style lang="sass" scoped>
.labelText
  margin-right: 10px
</style>
