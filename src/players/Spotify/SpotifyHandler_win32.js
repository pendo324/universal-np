import Handler from './../Handler';
import { getWindowText } from 'get-window-by-name';

class SpotifyHandler extends Handler {
  getTrack() {
    const processes = getWindowText('Spotify.exe').filter(
      (t) => t.processTitle.length > 0
    );

    if (!processes.length) {
      alert('Tool needs updating.');
    }

    if (processes[0].processTitle === 'Spotify') {
      return '';
    }

    return processes[0].processTitle;
  }
}

export default SpotifyHandler;
