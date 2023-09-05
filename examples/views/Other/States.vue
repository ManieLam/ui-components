<template lang="pug">
  div(:style="{padding: '2rem'}")
    h4 状态组件  成功、失败类型选择（仅仅支持这两种类型可以直接配置）
    AnsoDataformSelect(v-model="type",:options="typeOptions",style="margin: 10px")
    AnsoStates(:type="type")
    hr
    h4 状态组件  支持自定义配直标识颜色和文本
    AnsoStates(color="#a9a9a9" statesLabel="等待")
    AnsoStates(color="#f276ec" statesLabel="超期")
    AnsoStates(color="#eecd7c" statesLabel="超时")
    AnsoStates(color="#7cc7ee" statesLabel="已发送")
    AnsoStates(color="#086aee" statesLabel="已送达")
    AnsoStates(color="green" statesLabel="在线")
    AnsoStates(color="#a9a9a9" statesLabel="离线")
    AnsoStates(color="#eecd7c" statesLabel="异常")
    AnsoStates(color="red" statesLabel="冻结")
    AnsoStates(color="#7cc7ee" statesLabel="未认证")
    AnsoStates(color="#086aee" statesLabel="正常")
    hr
    h4 状态组件  支持修改标识的大小样式
    AnsoDataformSelect(v-model="size",:options="sizeOptions",style="margin: 10px")
    AnsoStates(color="green" statesLabel="等待" :circleStyle="circleStyle")
</template>
<script>
export default {
  name: 'states',
  data () {
    return {
      type: 'success',
      typeOptions: [{
        label: '成功',
        value: 'success'
      }, {
        label: '失败',
        value: 'fail'
      }],
      size: '6px',
      sizeOptions: [{
        label: '6px',
        value: '6px'
      }, {
        label: '8px',
        value: '8px'
      }, {
        label: '10px',
        value: '10px'
      }, {
        label: '12px',
        value: '12px'
      }]
    }
  },
  computed: {
    circleStyle () {
      return {
        height: this.size,
        width: this.size
      }
    }
  }
}
</script>
