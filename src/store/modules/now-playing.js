const { platform } = require('os');
const { writeFile } = require('fs').promises;
const { join } = require('path');

import { remote } from 'electron';

// macos
import runApplescript from 'run-applescript';
// win32
const itunes = remote.require('playback');

import {
  getDefaultBrowser,
  copyNativeExecutable,
  writeConfig
} from './../../util';

const state = {
  player: null,
  track: null,
  browser: null,
  saveLocation: join(remote.app.getPath('userData'), 'data', 'nowplaying.txt'),
  prefix: '',
  suffix: ''
};

// const checkAppRunning = async (appName) => {
//   return await runApplescript(`
// if application "${appName}" is running then
//   return true
// end if
// return false
// `);
// };

const getSpotifyNowPlayingMac = async () => {
  return await runApplescript(`
if application "Spotify" is running then
  tell application "Spotify"
    set currentArtist to artist of current track as string
    set currentTrack to name of current track as string

    return currentArtist & " - " & currentTrack
  end tell
end if
return ""
`);
};

const getiTunesNowPlayingMac = async () => {
  return await runApplescript(`
if application "iTunes" is running then
  tell application "iTunes"
    set currentArtist to the artist of the current track as string
    set currentTrack to the name of the current track as string

    return currentArtist & " - " & currentTrack
  end tell
end if
return ""
`);
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

const getters = {
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

const updateTrack = async ({ state, commit, getters }, { track, preview }) => {
  commit('SET_TRACK', {
    track
  });
  if (!preview) {
    await writeFile(state.saveLocation, getters.nowPlaying);
  }
};

const actions = {
  async setTrack({ state, commit, getters }, { preview } = { preview: false }) {
    if (platform() === 'darwin') {
      if (state.player.value === 'Spotify') {
        const track = await getSpotifyNowPlayingMac();
        console.log(track);
        // commit('SET_TRACK', {
        //   track
        // });
        return await updateTrack(
          { state, commit, getters },
          { track, preview }
        );
      } else if (state.player.value === 'iTunes') {
        const track = await getiTunesNowPlayingMac();
        console.log(track);
        return await updateTrack(
          { state, commit, getters },
          { track, preview }
        );
        // commit('SET_TRACK', {
        //   track
        // });
      }
    } else if (platform() === 'win32') {
      if (state.player.value === 'Spotify') {
        try {
          const { getWindowText } = remote.require(`${'get-window-by-name'}`);

          const processes = getWindowText('Spotify.exe').filter(
            (t) => t.processTitle.length > 0
          );

          if (!processes.length) {
            alert('Tool needs updating.');
          }

          if (processes[0].processTitle === 'Spotify') {
            return await updateTrack(
              { state, commit, getters },
              { track: '', preview }
            );
            // return commit('SET_TRACK', {
            //   track: ''
            // });
          }

          return await updateTrack(
            { state, commit, getters },
            { track: processes[0].processTitle, preview }
          );
          // commit('SET_TRACK', {
          //   track: processes[0].processTitle
          // });
        } catch (e) {
          console.log(e);
        }
      } else if (state.player.value === 'iTunes') {
        itunes.currentTrack(async (track) => {
          if (typeof track !== 'undefined') {
            if (typeof track.name !== 'undefined') {
              return await updateTrack(
                { state, commit, getters },
                { track: `${track.name} - ${track.artist}`, preview }
              );
              // commit('SET_TRACK', {
              //   track: `${track.name} - ${track.artist}`
              // });
            } else {
              return await updateTrack(
                { state, commit, getters },
                { track: '', preview }
              );
              // commit('SET_TRACK', {
              //   track: ''
              // });
            }
          } else {
            return await updateTrack(
              { state, commit, getters },
              { track: '', preview }
            );
            // commit('SET_TRACK', {
            //   track: ''
            // });
          }
        });
      }
    }
    return commit('SET_TRACK', {
      track: ''
    });
  },
  async getDefaultBrowser({ commit }) {
    const browser = await getDefaultBrowser();
    // await writeConfig({ browser });
    commit('SET_BROWSER', { browser });
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
