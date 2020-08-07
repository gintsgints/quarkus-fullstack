module.exports = {
  pluginOptions: {
    i18n: {
      enableInSFC: true
    }
  },

  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        ws: true
        // changeOrigin: true
      }
    }
  }
}
