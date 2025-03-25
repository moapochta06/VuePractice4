module.exports = {
    devServer: {  
      proxy: {
        '/api': {
          target: 'http://lifestealer86.ru',
          changeOrigin: true,
          pathRewrite: { '^/api': '/api-shop' },
          onProxyReq: (proxyReq) => {
            console.log('Проксируем запрос на:', proxyReq.path);
          }
        }
      }
    }
  }