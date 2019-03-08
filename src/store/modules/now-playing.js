import runApplescript from 'run-applescript';
const { platform } = require('os');

const state = {
  player: null,
  track: null
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
  SET_PLAYER(state, { player }) {
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
  }
};

const actions = {
  setPlayer({ commit }, { player }) {
    commit('SET_PLAYER', { player });
  },
  async setTrack({ state, commit }) {
    if (platform() === 'darwin') {
      if (state.player === 'Spotify') {
        const track = await getSpotifyNowPlayingMac();
        console.log(track);
        commit('SET_TRACK', {
          track
        });
      } else if (state.player === 'iTunes') {
        const track = await getiTunesNowPlayingMac();
        console.log(track);
        commit('SET_TRACK', {
          track
        });
      }
    }
  }
};

export default {
  state,
  mutations,
  actions,
  namespaced: true
};
