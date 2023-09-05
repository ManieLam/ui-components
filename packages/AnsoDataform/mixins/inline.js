export default {
  computed: {
    inline () {
      return this.type === 'inline'
    }
  },
  directives: {
    maxHeight: {
      inserted (el, binding, vnode) {
        if (!binding.value) {
          el.style.maxHeight = '100%'
        } else {
          const formitemEl = vnode.elm.getElementsByClassName('el-form-item')[0]
          el.style.maxHeight = formitemEl ? (formitemEl.offsetHeight || 32) + 2 + 'px' : 'auto'
        }
      },
      update (el, binding, vnode) {
        if (!binding.value) {
          el.style.maxHeight = '100%'
        } else {
          const formitemEl = vnode.elm.getElementsByClassName('el-form-item')[0]
          el.style.maxHeight = formitemEl ? (formitemEl.offsetHeight || 32) + 2 + 'px' : 'auto'
        }
      }
    }
  }
}
