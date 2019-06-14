module.exports = {
    devServer: {
      proxy: {
        '/middle/*': {
          target: 'http://localhost:3001',
          ws: true,
          changeOrigin: true
        }
      }
    }
    // devServer: {
    //     proxy: 'http://localhost:3000'
    //   }
  }