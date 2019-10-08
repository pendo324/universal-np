module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      externals: ['get-window-by-name', 'body-parser'],
      builderOptions: {
        win: {
          requestedExecutionLevel: 'highestAvailable'
        }
      }
    }
  }
};
