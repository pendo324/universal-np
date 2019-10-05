import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

const baseTitle = 'VLC media player';

class VlcHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'vlc', name: 'vlc' });
  }

  getTrack() {
    const processes = getWindowText('vlc.exe').filter(
      (t) => t.processTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].processTitle === baseTitle) {
      return '';
    }

    return processes[0].processTitle.split(` - ${baseTitle}`)[0];
  }
}

export default VlcHandler;
