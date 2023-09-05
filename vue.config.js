const path = require('path')
// const Package = require('./package.json')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
// const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CompressionPlugin = require('compression-webpack-plugin')
const resolve = (dir) => {
  return path.join(__dirname, dir)
}

const isProduction = process.env.NODE_ENV === 'production'
const productionGzipExtensions = ['js', 'css']

// const cdns = {
//   externals: {
//     vue: 'Vue',
//     vuex: 'Vuex',
//     'vue-router': 'VueRouter',
//     // 'vue-pdf': 'vue-pdf'
//     'element-ui': 'ELEMENT',
//     // '@antv/g2plot': 'G2Plot'
//     // lodash: '_',
//     'vue-pdf': false
//     // 'vue-pdf': './public/plugin/vue-pdf/src/vuePdfSss.vue'
//   },
//   // externals: 'vue-pdf',
//   js: [
//     // 'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.min.js',
//     'https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue/2.6.14/vue.runtime.min.js',
//     // 'https://unpkg.com/vuex@4',
//     'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/vuex/3.6.2/vuex.min.js',
//     // 'https://unpkg.com/vue-router@4',
//     'https://lf6-cdn-tos.bytecdntp.com/cdn/expire-1-M/vue-router/3.0.7/vue-router.min.js',
//     'https://unpkg.com/element-ui@2.15.5/lib/index.js',
//     'https://unpkg.com/@antv/g2plot@latest/dist/g2plot.min.js',
//     'https://lf3-cdn-tos.bytecdntp.com/cdn/expire-1-M/lodash.js/4.17.21/lodash.min.js'
//   ]
// }
module.exports = {
  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    proxy: {
      '/api': {
        // target: 'http://0.0.0.0:7001'
        target: 'http://192.168.0.235:7001'
      }
    }
  },
  configureWebpack: {
    // externals: isProduction ? cdns.externals : '',
    plugins: isProduction ? [
      // 使用Gzip压缩文件 - https://segmentfault.com/a/1190000012571492
      // 报错："TypeError: Cannot read property 'tapPromise' of undefined"是compression-webpack-plugin版本问题5.0.1
      new CompressionPlugin({
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      })
    ] : [],
    resolve: {
      extensions: ['.js', 'css', 'scss', '.vue']
    }
  },
  chainWebpack: (config) => {
    config.optimization.minimize(true)
    config.entryPoints.clear()
    config.entry('main').add('./examples/main.js')
    config.resolve.alias
      .set('@', resolve('examples'))
      .set('src', resolve('src'))
      .set('assets', resolve('assets'))
      .set('packages', resolve('packages'))

    config.module.rule('md')
      .test(/\.md/)
      .use('vue-loader')
      .loader('vue-loader')
      .end()
      .use('vue-markd-loader')
      .loader('vue-markd-loader')
      .options({
        replaceFiles: true
      })
      .end()

    /*  'css-loader'、'postcss-loader'、'sass-loader' vue-cli3版本已自带，
    *   详见yarn report:webpack 之后查看report-webpack.json文件
    */
    config.module.rule('sass').oneOfs.store.forEach(item => {
      item
        .use('sass-resources-loader')
        .loader('sass-resources-loader')
        .options({
          resources: [path.resolve(__dirname, './assets/customTheme/_var.sass')]
        })
        .end()
    })
    /**
      在html中添加版本号
    */
    // config
    //   .plugin('html')
    //   .use(HtmlWebpackPlugin)
    //   .tap((args) => {
    //     // console.info('args:', args)
    //     args.version = Package.version
    //     return args
    //   })
    //   .end()

    // if (isProduction) {
    //   config.set('externals', cdns.externals)
    // }

    // config
    //   .plugin('html')
    //   // .use(HtmlWebpackPlugin)
    //   .tap(args => {
    //     args[0].cdn = cdns
    //     return args
    //   })
    //   .end()

    /* vue-cli3 自带terser-webpack-plugin */
    if (isProduction) {
      config.optimization.minimize(true)
      config.optimization
        .minimizer('terser')
        .tap(args => {
          const { terserOptions } = args[0]
          args[0].exclude = ['examples', 'node_modules']
          terserOptions.compress = Object.assign(terserOptions.compress, {
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.info']
            // exclude: /\/examples/ // 保留示例里的控制台信息
          })
          return args
        })
      // config.optimization.usedExports = true
    }
  }
}
