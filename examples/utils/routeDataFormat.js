export function routeDataFormat (route) {
  const { meta } = route
  const props = ['path', 'meta', 'hash', 'query', 'params', 'fullPath']
  const routeData = {
    title: route.title || (meta && meta.title)
  }
  for (const item of props) {
    routeData[item] = route[item]
  }
  return routeData
}
