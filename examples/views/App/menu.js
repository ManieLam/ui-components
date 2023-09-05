import cloneDeep from 'lodash/cloneDeep'
const router = require('@/router/index.js').default

const routes = router.options.routes
const pageRoutes = routes.find(route => route.path === '/')

function deepRoutes (list, parentPath) {
  const cloneList = cloneDeep(list)
  if (cloneList.children) {
    return deepRoutes(cloneList.children, cloneList.path)
  } else if (list instanceof Array) {
    return list
      .filter(item => !item.hidden)
      .map(item => {
        const { title, icon } = item.meta || {}
        const url = parentPath === '/' ? parentPath + item.path : parentPath + '/' + item.path
        return {
          ...item,
          label: item.title || title,
          icon: item.icon || icon,
          url,
          children: item.children ? deepRoutes(item.children, url) : null
        }
      })
  }
}
const menus = [].concat(deepRoutes(pageRoutes))

export default menus
