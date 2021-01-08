module.exports = {
  baseUrl: './',
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "@/styles/layouts/layout_2/default/compile/colors.scss";
        `
      }
    }
  },
  devServer: {
    proxy: 'http://localhost:8082',
    port: 8082, // CHANGE YOUR PORT HERE!
  }
};