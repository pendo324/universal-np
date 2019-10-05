import Handler from './../Handler';
import { remote } from 'electron';
const { exec } = remote.require('child_process');
const { join } = remote.require('path');

import { copyWindowsScripts } from '@/util';
const { getWindowText } = remote.require('get-window-by-name');

(async () => {
  await copyWindowsScripts();
})();

const getCurrentTrack = () => {
  return new Promise((resolve, reject) => {
    exec(
      `cscript /NoLogo ${join(
        remote.app.getPath('userData'),
        'JScripts',
        'getTrack_iTunes.js'
      )}`,
      (err, stdout) => {
        if (err) {
          return reject(err);
        }

        const parsed = stdout.trim();
        resolve(parsed);
      }
    );
  });
};

class iTunesHandler extends Handler {
  constructor() {
    super({ os: 'darwin', source: 'Desktop', id: 'iTunes', name: 'iTunes' });
  }

  async getTrack() {
    try {
      const processes = getWindowText('iTunes.exe');

      if (processes.length > 0) {
        const track = JSON.parse(await getCurrentTrack());
        if (track.playerState === 'stopped') {
          return 'Paused.';
        }
        return `${track.artist} - ${track.name}`;
      }

      return '';
    } catch (e) {
      return '';
    }
  }
}

export default iTunesHandler;
