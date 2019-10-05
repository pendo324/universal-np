// const Spotify = require('./Spotify');
// const iTunes = require('./iTunes');

import * as Spotify from './Spotify';
import * as iTunes from './iTunes';
import * as foobar from './foobar2000';
import * as mpcQt from './mpc-qt';
import * as mpcHc from './mpc-hc';
import * as mpv from './mpv';
import * as vlc from './vlc';

import * as Web from './Web';

export const desktop = {
  Spotify,
  iTunes,
  foobar,
  mpcQt,
  mpcHc,
  mpv,
  vlc
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
