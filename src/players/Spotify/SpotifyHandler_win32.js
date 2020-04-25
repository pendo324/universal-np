import Handler from './../Handler';
import { getProcessByName } from '@pendo324/get-process-by-name';

class SpotifyHandler extends Handler {
  constructor() {
    super({ os: 'win32', source: 'Desktop', id: 'Spotify', name: 'Spotify' });
  }

  async getTrack() {
    const processes = (await getProcessByName('Spotify.exe')).filter(
      (t) =>
        t.windowTitle &&
        t.windowTitle.length > 0 &&
        t.windowTitle !== 'AngleHiddenWindow'
    );

    if (!processes.length === 0) {
      alert('Tool needs updating.');
    }

    if (
      processes[0].windowTitle === 'Spotify' ||
      processes[0].windowTitle === 'Spotify Premium'
    ) {
      return '';
    }

    return processes[0].windowTitle;
  }
}

export default SpotifyHandler;
