import Handler from './../Handler';
import { remote } from 'electron';
const { exec } = remote.require('child_process');
const { join } = remote.require('path');

import { copyWindowsScripts } from '@/util';
import { getProcessByName } from '@pendo324/get-process-by-name';

(async () => {
  await copyWindowsScripts();
})();

const getCurrentTrack = () => {
  return new Promise((resolve, reject) => {
    exec(
      `powershell ${join(
        remote.app.getPath('userData'),
        'windows_runtime_scripts',
        'getTrack_iTunes.ps1'
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
      const processes = await getProcessByName('iTunes.exe');

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
