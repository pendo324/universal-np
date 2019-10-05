import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

class MpvHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpv', name: 'mpv' });
  }

  getTrack() {
    const processes = getWindowText('mpv.exe').filter(
      (t) => t.processTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].processTitle === 'mpv') {
      return '';
    }

    return processes[0].processTitle.split(' - mpv')[0];
  }
}

export default MpvHandler;
