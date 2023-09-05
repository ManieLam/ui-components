import Vue from 'vue'
import App from './views/App'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/highlight.js'
import 'github-markdown-css/github-markdown.css'
import 'highlight.js/styles/atom-one-dark.css'
import 'assets/customTheme/index.sass'
import 'assets/icon/iconfont.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
}).$mount('#app')
