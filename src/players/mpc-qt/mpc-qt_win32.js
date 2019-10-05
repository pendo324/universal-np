import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

const baseTitle = 'Media Player Classic Qute Theater';

class FoobarHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpcQt', name: 'mpc-qt' });
  }

  getTrack() {
    const processes = getWindowText('mpc-qt.exe').filter(
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

    return processes[0].processTitle.split(`${baseTitle} - `)[1];
  }
}

export default FoobarHandler;
