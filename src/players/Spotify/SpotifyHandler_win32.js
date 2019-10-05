import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

class SpotifyHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'Spotify', name: 'Spotify' });
  }

  getTrack() {
    const processes = getWindowText('Spotify.exe').filter(
      (t) => t.processTitle.length > 0
    );

    if (!processes.length) {
      alert('Tool needs updating.');
    }

    if (processes[0].processTitle === 'Spotify' || processes[0].processTitle === 'Spotify Premium') {
      return '';
    }

    return processes[0].processTitle;
  }
}

export default SpotifyHandler;
