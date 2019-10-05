import Handler from './../Handler';
// const { getWindowText } = require('get-window-by-name');

import { remote } from 'electron';
const { getWindowText } = remote.require('get-window-by-name');

class FoobarHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'foobar2000', name: 'foobar2000' });
  }

  getTrack() {
    const processes = getWindowText('foobar2000.exe').filter(
      (t) => t.processTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].processTitle === 'foobar2000') {
      return '';
    }

    return processes[0].processTitle;
  }
}

export default FoobarHandler;
