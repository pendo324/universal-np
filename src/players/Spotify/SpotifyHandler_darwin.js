import Handler from './../Handler';

import runApplescript from 'run-applescript';

const getSpotifyNowPlayingMac = async () => {
  return await runApplescript(`
if application "Spotify" is running then
  tell application "Spotify"
    set currentArtist to artist of current track as string
    set currentTrack to name of current track as string

    return currentArtist & " - " & currentTrack
  end tell
end if
return ""
`);
};

class SpotifyHandler extends Handler {
  constructor() {
    super({ os: 'darwin', source: 'Desktop', id: 'Spotify', name: 'Spotify' });
  }

  async getTrack() {
    const track = await getSpotifyNowPlayingMac();
    return track;
  }
}

export default SpotifyHandler;
