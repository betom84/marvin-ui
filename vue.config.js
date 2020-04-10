module.exports = {
   devServer: {
      proxy: {
         '/api': {
            target: 'http://jarvis:8080/',
            ws: true,
         },
      },
   },
   configureWebpack: {
      devtool: 'source-map',
   },
   css: {
      loaderOptions: {
         sass: {
            prependData: `@import "@/styles/globals.scss";`,
         },
      },
   },
};
