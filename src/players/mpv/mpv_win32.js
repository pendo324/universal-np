import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

class MpvHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpv', name: 'mpv' });
  }

  async getTrack() {
    const processes = (await getProcessByName('mpv.exe')).filter(
      (t) => t.windowTitle && t.windowTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].windowTitle === 'mpv') {
      return '';
    }

    return processes[0].windowTitle.split(' - mpv')[0];
  }
}

export default MpvHandler;
