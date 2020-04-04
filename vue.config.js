module.exports = {
   devServer: {
      proxy: 'http://jarvis:8080/',
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
