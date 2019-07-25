module.exports = {
  lintOnSave: false,
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3030',
        // pathRewrite: { '^/api': '/' },
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'http://localhost:3030/',
        // pathRewrite: { '^/socket.io': '/' },
        changeOrigin: true,
        ws: true,
      },
    },
  },
};
