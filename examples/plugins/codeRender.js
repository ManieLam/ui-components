const fs = require('fs')
var path = require('path')
const COMPONENT_FLODERS = ['Form', 'Table']
// const isArray = require('lodash/isArray')

function getComponent () {
  return new Promise((resolve, reject) => {
    const modulesFiles = COMPONENT_FLODERS.reduce((res, fileDir) => {
      return res.concat(readAllFile(path.join(__dirname, `../views/${fileDir}`)))
    }, [])
    resolve(modulesFiles)
  })
}

function readAllFile (root, reg) {
  let resultArr = []
  if (fs.existsSync(root)) { // 文件或文件夹存在
    const stat = fs.lstatSync(root) // 对于不存在的文件或文件夹，此函数会报错
    // console.log('root:', root.test())
    if (stat.isDirectory()) { // 存在文件夹
      const files = fs.readdirSync(root)
      files.forEach(function (file) {
        const t = readAllFile(root + '/' + file, reg)
        resultArr = resultArr.concat(t)
      })
    } else {
      if (reg !== undefined) {
        if (typeof reg.test === 'function' &&
          reg.test(root)) {
          resultArr.push(root)
        }
      } else {
        resultArr.push(root)
      }
    }
  }

  return resultArr
}

// const codeDocTep = (filePath) => {
//   return `
// ## template 部分

// {{:examples/${filePath}?type=template}}

// ## script 部分

// {{:examples/${filePath}?type=script}}
// `
// }

function copyDir (src, dist, callback) {
  fs.access(dist, function (err) {
    if (err) {
      // 目录不存在时创建目录
      fs.mkdirSync(dist)
    }
    _copy(null, src, dist)
  })

  function _copy (err, dirsrc, dist) {
    if (err) {
      callback(err)
    } else {
      fs.readdir(dirsrc, function (dirErr, paths) {
        if (dirErr) {
          callback(dirErr)
        } else {
          paths.forEach(function (path) {
            var _src = dirsrc + '/' + path
            var _dist = dist + '/' + path
            fs.stat(_src, function (statErr, stat) {
              if (statErr) {
                callback(statErr)
              } else {
                // 判断是文件还是目录
                if (stat.isFile()) {
                  fs.writeFileSync(_dist, fs.readFileSync(_src))
                } else if (stat.isDirectory()) {
                  // 当是目录是，递归复制
                  copyDir(_src, _dist, callback)
                }
              }
            })
          })
        }
      })
    }
  }
}

function createFloder (folder) {
  if (fs.existsSync(folder)) {
    return true
  } else {
    fs.mkdir(path.join(__dirname, folder), { recursive: true }, (err) => {
      if (err) return console.log('fs mkdir err:', err)
    })
  }
}

(function () {
  try {
    getComponent().then(modulesFiles => {
      // console.log('modulesFiles:', modulesFiles)
      // createFloder('../docs/codeDocs')
      // autoBuildDoc(modulesFiles)
      createFloder('../../public/views')
      copyDir(path.join(__dirname, '../views'), path.join(__dirname, '../../public/views'), function (err) {
        if (err) {
          console.error(err)
        }
      })
    })
  } catch (error) {
    console.error('error:', error)
  }
})()
