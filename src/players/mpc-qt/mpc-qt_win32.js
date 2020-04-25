import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

const baseTitle = 'Media Player Classic Qute Theater';

class FoobarHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpcQt', name: 'mpc-qt' });
  }

  async getTrack() {
    const processes = (await getProcessByName('mpc-qt.exe')).filter(
      (t) => t.windowTitle && t.windowTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].windowTitle === baseTitle) {
      return '';
    }

    return processes[0].windowTitle.split(`${baseTitle} - `)[1];
  }
}

export default FoobarHandler;
