import showRouter from './show.js'
import layoutRouter from './layout'

import comparedRouter from './compared.js'
import validateRouter from './validate.js'
import chainRouter from './chain.js'
import eventRouter from './event.js'
import appendAndSuffixRouter from './appendAndSuffix.js'
import formButtonRouter from './formButton.js'
import labelRouter from './label.js'

export default {
  path: 'form',
  component: { render: (e) => e('router-view') },
  children: [
    showRouter,
    layoutRouter,
    comparedRouter,
    validateRouter,
    chainRouter,
    eventRouter,
    appendAndSuffixRouter,
    formButtonRouter,
    labelRouter
  ],
  title: '表单',
  icon: ''
}
