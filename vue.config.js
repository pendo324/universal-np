module.exports = {
  lintOnSave: false,
  transpileDependencies: ['vuetify'],
  pluginOptions: {
    electronBuilder: {
      externals: ['body-parser'],
      nodeIntegration: true,
      builderOptions: {
        win: {
          publisherName: 'Flying Lawnmower Development'
        }
      }
    }
  }
};
