import { remote } from 'electron';
const { join } = remote.require('path');

export const state = {
  player: null,
  track: null,
  browser: null,
  saveLocation: join(remote.app.getPath('userData'), 'data', 'nowplaying.txt'),
  prefix: '',
  suffix: ''
};

const mutations = {
  SET_PLAYER(state, player) {
    state.player = player;
  },
  CLEAR_PLAYER(state) {
    state.player = null;
  },
  SET_TRACK(state, { track }) {
    state.track = track;
  },
  CLEAR_TRACK(state) {
    state.track = null;
  },
  SET_BROWSER(state, { browser }) {
    state.browser = browser;
  },
  SET_SAVE_LOCATION(state, { saveLocation }) {
    state.saveLocation = saveLocation;
  },
  SET_PREFIX(state, { prefix }) {
    state.prefix = prefix;
  },
  CLEAR_PREFIX(state) {
    state.prefix = '';
  },
  SET_SUFFIX(state, { suffix }) {
    state.suffix = suffix;
  },
  CLEAR_SUFFIX(state) {
    state.suffix = '';
  }
};

export const getters = {
  webPlayer(state) {
    return state.source === 'Web';
  },
  nowPlaying(state) {
    if (state.track === null) {
      return 'No song playing.';
    }
    return `${state.prefix}${state.track}${state.suffix}`;
  }
};

export default mutations;
