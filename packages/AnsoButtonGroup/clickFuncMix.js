import { isPromise } from 'packages/utils/common'

export default {
  methods: {
    onClickButton (button) {
      // const { name, func, action, validate } = button
      if (!button.validate || !button.formValidate) {
        return this.handleClick(button)
      }
      // 验证表单规则
      button.formValidate()
        .then(resolve => this.handleClick(button))
        // eslint-disable-next-line handle-callback-err
        .catch(err => {
          console.warn('button validate err:', err)
          return false
        })
    },
    handleClick (button) {
      const { func } = button
      if (func) {
        const f = func(button, button.data)
        // 执行函数，如果返回的值是异步函数，执行完再关闭loading
        if (isPromise(f)) {
          this.$set(button, 'loading', true)
          f.then(() => {
            this.$set(button, 'loading', false)
          })
        }
      }
    }
  }
}
