module.exports = {
  lintOnSave: false,
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
