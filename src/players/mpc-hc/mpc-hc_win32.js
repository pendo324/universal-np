import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

class MpcHcHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpcHc', name: 'mpc-hc' });
  }

  getTrack() {
    const processes = [
      ...getWindowText('mpc-hc64.exe'),
      ...getWindowText('mpc-hc.exe')
    ].filter((t) => t.processTitle.length > 0);

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].processTitle === 'Media Player Classic Home Cinema') {
      return '';
    }

    return processes[0].processTitle;
  }
}

export default MpcHcHandler;
