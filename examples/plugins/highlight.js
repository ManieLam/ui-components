
import Vue from 'vue'
import hljs from 'highlightjs'
import hljsDefineVue from 'highlightjs-vue'

Vue.directive('highlight', {
  inserted: el => {
    const blocks = el.querySelectorAll('code')
    blocks.forEach((block) => {
      hljsDefineVue(hljs)
      hljs.highlightBlock(block)
    })
  },
  componentUpdated: el => {
    const blocks = el.querySelectorAll('code')
    blocks.forEach((block) => {
      hljsDefineVue(hljs)
      hljs.highlightBlock(block)
    })
  }
})
