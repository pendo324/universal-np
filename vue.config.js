module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      externals: ['body-parser'],
      builderOptions: {
        win: {
          requestedExecutionLevel: 'highestAvailable'
        }
      }
    }
  }
};
