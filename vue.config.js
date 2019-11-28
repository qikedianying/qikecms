const path = require('path')
module.exports = {
  publicPath: '/qikecms',
  devServer: {
    proxy: {
      '/app': {
        target: `http://localhost:3000`,
        changeOrigin: true,
        pathRewrite: {
          '^/app': ''
        }
      }
    }
  },
  lintOnSave: false,
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [
        path.resolve(__dirname, './src/assets/less/variable.less')
      ]
    }
  }
}
