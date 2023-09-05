<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 上传组件
    span 需要到文件服务通畅的id, 才可查看效果
    hr
    button(@click='clicktrue') 点击置灰
    button(@click='clickfalse') 取消置灰
    button(@click='addData') 赋值默认值
    button(@click='chackReadOnly') 表单只读
    AnsoDataform(
      ref="AnsoDataform"
      :formFields="nomalFormFields"
      :buttonList="[]"
      type="grid"
      :gridspanNum="1"
      :value="formData"
      :readOnly="readOnly"
      @onChange="onChange"
    )
    hr
    h4 禁用状态
    AnsoDataform(
      :formFields="disabledFormFields"
      :buttonList="[]"
    )
    hr
    h4 上传备注可修改
    AnsoDataform(
      :formFields="tipFormFields"
      :buttonList="[]"
    )
    hr
    h4 限制上传内容
    AnsoDataform(
      :formFields="limitFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否支持多选
    AnsoDataform(
      :formFields="multipleFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否支持下载
    AnsoDataform(
      :formFields="downloadFormFields"
      :buttonList="[]"
    )
    hr
    h4 是否支持预览
    AnsoDataform(
      :formFields="previewFormFields"
      :buttonList="[]"
    )
    //- hr
    //- h4 是存在默认值
    //- AnsoDataform(
    //-   :formFields="defalutFormFields"
    //-   :value="formData"
    //-   :buttonList="[]"
    //- )
    hr
    h4 接口请求配置信息重新定义
    AnsoDataform(
      :formFields="headerFormFields"
      :buttonList="[]"
    )
</template>

<script>
import axios from 'axios'
export default {
  name: 'simpleFile',
  components: {},
  data () {
    return {
      formData: {
        button: [{ id: 2282, fileName: '微信图片_20210311115046.png', path: 'group1/M00/00/08/CgAALmK2fGiAcesAAAbZMFgwHfQ925.png', shortUrl: 'BbeaueqiMbyy', fileType: 'png', uploadTime: null }]
      },
      readOnly: false,
      formData1: {
        // name: ['AJBRFrn2euUf', 'feiAfuNbMZjy'],
        button: [{ id: 2450, fileName: '无标题 (3).xlsx', shortUrl: 'ZjEZnyyEbUFz', fileType: 'xlsx' }, { id: 2451, fileName: '身份证.jpg', shortUrl: 'vyIjI3uARJba', fileType: 'jpg' }, { id: 2452, fileName: '定位点-绿 (2).png', shortUrl: '2Mb6Bbb2ENJj', fileType: 'png' }],
        drag: [779, 778]
      },
      nomalFormFields: [{
        name: 'name',
        label: '按钮点击上传',
        form: {
          tag: 'file',
          uploadType: 'button',
          tip: null,
          uploadResourceConfig: ({ url, params }) => ({
            url,
            method: 'post',
            headers: {
              'Anso-Token': '123'
            },
            data: params
          })
          // showResourceType: 'shortUrl',
          // showResource: '/api/fileserver/download/shortUrl'
        },
        render: {
          type: 'file'
          // showResourceType: 'shortUrl',
          // showResource: '/api/fileserver/download/shortUrl'
        }
      }, {
        name: 'button',
        label: '默认上传',
        form: {
          tag: 'file',
          tip: null,
          uploadResourceConfig: ({ url, params }) => ({
            url,
            method: 'post',
            headers: {
              'Anso-Token': '123'
            },
            data: params
          })
          // showResourceType: 'shortUrl',
          // showResource: '/api/fileserver/download/shortUrl'
        },
        render: {
          type: 'file'
          // showResourceType: 'shortUrl',
          // showResource: '/api/fileserver/download/shortUrl'
        }
      }, {
        name: 'drag',
        label: '拖拽上传',
        form: {
          tag: 'file',
          uploadType: 'drag'
          // uploadResourceConfig: ({ url, params }) => ({
          //   url,
          //   method: 'post',
          //   headers: {
          //     'Anso-Token': '123'
          //   },
          //   data: params
          // })
        },
        render: {
          type: 'file'
        }
      }],
      disabledFormFields: [{
        name: 'disabled',
        label: '禁用',
        form: {
          tag: 'file',
          disabled: true
        }
      }],
      tipFormFields: [{
        name: 'tip',
        label: '修改上传备注内容',
        form: {
          tag: 'file',
          tip: '上传文件大小不能超过 10MB!'
        }
      }],
      limitFormFields: [{
        name: 'limit',
        label: '限制只能上传3个文件',
        form: {
          tag: 'file',
          limit: 3,
          tip: '上传文件大小不能超过3个'
        }
      }, {
        name: 'typeLimit',
        label: '限制只能上传文件类型为 [jpg, png] ',
        form: {
          tag: 'file',
          typeLimit: ['jpg', 'png'],
          tip: '支持扩展名：.jpg .png'
        }
      }],
      multipleFormFields: [{
        name: 'download',
        label: '多选，默认为支持，配置不支持',
        form: {
          tag: 'file',
          multiple: false
        }
      }, {
        name: 'downloadlimit',
        label: '多选，且限制上传文件不超过3个,且限制文件上传格式为jpg',
        form: {
          tag: 'file',
          limit: 3,
          typeLimit: ['jpg'],
          tip: '支持扩展名：.jpg 且上传文件不超过3个'
        }
      }],
      downloadFormFields: [{
        name: 'download',
        label: '下载，默认支持，配置不支持',
        form: {
          tag: 'file',
          isDownload: false
        }
      }],
      previewFormFields: [{
        name: 'preview',
        label: '预览，默认为支持，配置不支持',
        form: {
          tag: 'file',
          isPreview: false
        }
      }],
      defalutFormFields: [{
        name: 'defalut',
        label: '组件传入值',
        form: {
          tag: 'file'
        }
      }],
      headerFormFields: [{
        name: 'header',
        label: '添加请求头部',
        form: {
          tag: 'file',
          uploadResourceConfig: ({ url, params }) => ({
            url,
            method: 'post',
            headers: {
              'Anso-Token': '123'
            },
            data: params
          })
        }
      }]
    }
  },
  methods: {
    clicktrue () {
      this.$set(this.nomalFormFields[0].form, 'disabled', true)
      this.$set(this.nomalFormFields[1].form, 'disabled', true)
      this.$set(this.nomalFormFields[2].form, 'disabled', true)
    },
    clickfalse () {
      this.$set(this.nomalFormFields[0].form, 'disabled', false)
      this.$set(this.nomalFormFields[1].form, 'disabled', false)
      this.$set(this.nomalFormFields[2].form, 'disabled', false)
    },
    onChange (val) {
      console.log(val)
      this.formData = val.values
    },
    addData () {
      this.formData = this.formData1
      // this.$set(this.formData, 'button', this.formData.name[0])
      // this.$set(this.formData, 'certificateNum', dataPicked.certificateNum)
      // console.log(this.formData)
      // this.$refs.AnsoDataform.datas.button = this.formData.name[0]
      // console.log(this.formData)
      // this.formData1 = this.formData
    },
    chackReadOnly () {
      this.readOnly = !this.readOnly
    }
  },
  mounted () {
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
<style lang="scss" scoped>
</style>
