module.exports = {
    devServer: {  
      proxy: {
        '/api': {
          target: 'http://lifestealer86.ru',
          changeOrigin: true,
          pathRewrite: { '^/api': '/api-shop' }
        }
      }
    }
  }