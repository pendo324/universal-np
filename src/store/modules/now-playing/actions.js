const { writeFileSync } = require('fs');

const actions = {
  async setTrack(context, { preview } = { preview: false }) {
    const {
      state: { player, saveLocation },
      commit,
      getters: { nowPlaying }
    } = context;
    if (player !== null) {
      if (player.source === 'Desktop') {
        try {
          const track = await player.getTrack();
          commit('SET_TRACK', {
            track
          });
          if (!preview) {
            writeFileSync(saveLocation, nowPlaying, {
              encoding: 'utf8'
            });
          }
        } catch (e) {
          console.log(e);
          return commit('SET_TRACK', {
            track: ''
          });
        }
      } else if (player.source === 'Web') {
        if (!preview) {
          writeFileSync(saveLocation, nowPlaying);
        }
      }
    }
  }
};

export default actions;
