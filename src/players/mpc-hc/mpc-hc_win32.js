import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

class MpcHcHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'mpcHc', name: 'mpc-hc' });
  }

  async getTrack() {
    let processes = null;

    // favor mpc-hc64 because I'm lazy
    processes = await getProcessByName('mpc-hc64.exe');
    console.log(processes);
    if (!processes.length) {
      processes = await getProcessByName('mpc-hc.exe');
    }

    processes = processes.filter(
      (t) => t.windowTitle && t.windowTitle.length > 0
    );
    console.log(processes);

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    if (processes[0].windowTitle === 'Media Player Classic Home Cinema') {
      return '';
    }

    return processes[0].windowTitle;
  }
}

export default MpcHcHandler;
