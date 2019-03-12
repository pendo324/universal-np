/**
 * The file enables `@/store/index.js` to import all vuex modules
 * in a one-shot manner. There should not be any reason to edit this file.
 */

import nowPlaying from './now-playing';

// const files = require.context('.', false, /\.js$/);
// const modules = {};

// files.keys().forEach((key) => {
//   if (key === './index.js') return;
//   modules[key.replace(/(\.\/|\.js)/g, '')] = files(key).default;
// });

// export default modules;

const modules = {
  'now-playing': nowPlaying
};

export default modules;
