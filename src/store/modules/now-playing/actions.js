import { remote } from 'electron';
const { platform } = remote.require('os');
const util = remote.require('util');
const writeFile = util.promisify(remote.require('fs').writeFile);

import { getDefaultBrowser } from './../../../util';

// macos
import runApplescript from 'run-applescript';

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
    try {
      if (platform() === 'darwin') {
        if (state.player.value === 'Spotify') {
          const track = await getSpotifyNowPlayingMac();
          // commit('SET_TRACK', {
          //   track
          // });
          return await updateTrack(
            { state, commit, getters },
            { track, preview }
          );
        } else if (state.player.value === 'iTunes') {
          const track = await getiTunesNowPlayingMac();
          return await updateTrack(
            { state, commit, getters },
            { track, preview }
          );
        }
      } else if (platform() === 'win32') {
        if (state.player.value === 'Spotify') {
          try {
            const { getWindowText } = require(`${'get-window-by-name'}`);

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
          const itunes = require(`${'playback'}`);
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
    } catch (e) {
      console.log(e);
    }
    return commit('SET_TRACK', {
      track: ''
    });
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
