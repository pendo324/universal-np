import Handler from './../Handler';
import itunes from 'playback';

const currentTrackAsync = () => {
  return new Promise((resolve) => {
    itunes.currentTrack(async (track) => {
      if (typeof track !== 'undefined') {
        if (typeof track.name !== 'undefined') {
          resolve(`${track.name} - ${track.artist}`);
        } else {
          resolve('');
        }
      } else {
        resolve('');
      }
    });
  });
};

class iTunesHandler extends Handler {
  constructor() {
    super({ os: 'darwin', source: 'Desktop', id: 'iTunes', name: 'iTunes' });
  }

  async getTrack() {
    const track = await currentTrackAsync();
    return track;
  }
}

export default iTunesHandler;
