module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        components: '@/components',
        common: '@/common',
        views: '@/views',
        assets: '@/assets',
        router: '@/router',
        plugin: '@/plugin'
      }
    }
  }
}
