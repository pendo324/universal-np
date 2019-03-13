// import { remote } from 'electron';
const util = require('util');
// const writeFile = util.promisify(remote.require('fs').writeFile);
const { writeFile } = require('fs');
const writeFilePromise = util.promisify(writeFile);

import { getDefaultBrowser } from './../../../util';

const actions = {
  async setTrack(context, { preview } = { preview: false }) {
    const { state, commit, getters } = context;
    if (state.player.source === 'Desktop') {
      try {
        const track = await state.player.getTrack();
        commit('SET_TRACK', {
          track
        });
        if (!preview) {
          await writeFilePromise(state.saveLocation, getters.nowPlaying);
        }
      } catch (e) {
        console.log(e);
        return commit('SET_TRACK', {
          track: ''
        });
      }
    }
  },
  async getDefaultBrowser({ commit }) {
    try {
      const browser = await getDefaultBrowser();
      commit('SET_BROWSER', { browser });
    } catch (e) {
      console.log(e);
    }
  }
};

export default actions;
