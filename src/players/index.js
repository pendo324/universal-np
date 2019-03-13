// const Spotify = require('./Spotify');
// const iTunes = require('./iTunes');

import * as Spotify from './Spotify';
import * as iTunes from './iTunes';

import * as Web from './Web';

export const desktop = {
  Spotify,
  iTunes
};

export const web = {
  ...Web
};

// export default {
// desktop: {
// },
// web: {

// }
// };
