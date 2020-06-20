import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

class FoobarHandler extends Handler {
  constructor() {
    super({
      os: 'win32',
      source: 'Desktop',
      id: 'foobar2000',
      name: 'foobar2000'
    });
  }

  async getTrack() {
    const processes = (await getProcessByName('foobar2000.exe')).filter(
      (t) => t.windowTitle && t.windowTitle.length > 0
    );

    if (!processes.length) {
      // TODO: add better check/error handling here
      // alert('Tool needs updating.');
      return '';
    }

    const windowTitle = processes[0].windowTitle;

    if (windowTitle === 'foobar2000') {
      return '';
    }

    // remove the default [foobar2000] from the end of the window title
    const defaultSuffix = '[foobar2000]';
    if (windowTitle.endsWith(defaultSuffix)) {
      return windowTitle.split(defaultSuffix)[0].trim();
    }

    return windowTitle;
  }
}

export default FoobarHandler;
