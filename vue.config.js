const path = require('path');
// function resolve(dir) {
//   return path.join(__dirname, dir);
// }

module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        ws: true,
        changeOrigin: true
      }
    },
    client: {
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    // overlay: {
    //   warnings: false,
    //   errors: false
    // },
  },
  lintOnSave: false,
};
