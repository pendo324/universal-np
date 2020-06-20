import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

class GpmdpHandler extends Handler {
  constructor() {
    super({
      os: 'win32',
      source: 'Desktop',
      id: 'gpmdp',
      name: 'Google Play Desktop Player'
    });
  }

  async getTrack() {
    const processes = (
      await getProcessByName('Google Play Music Desktop Player.exe')
    ).filter((t) => t.windowTitle && t.windowTitle.length > 0);

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    const windowTitle = processes[0].windowTitle;

    if (windowTitle.startsWith('(Paused)')) {
      return 'Paused.';
    }

    if (
      windowTitle === 'Google Play Music Desktop Player' ||
      windowTitle === 'crash service'
    ) {
      return '';
    }

    return windowTitle;
  }
}

export default GpmdpHandler;
