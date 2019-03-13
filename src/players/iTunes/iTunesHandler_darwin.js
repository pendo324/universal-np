import Handler from './../Handler';

import runApplescript from 'run-applescript';

const getiTunesNowPlayingMac = async () => {
  return await runApplescript(`
if application "iTunes" is running then
  tell application "iTunes"
    set currentArtist to the artist of the current track as string
    set currentTrack to the name of the current track as string

    return currentArtist & " - " & currentTrack
  end tell
end if
return ""
`);
};

class iTunesHandler extends Handler {
  constructor() {
    super({ os: 'darwin', source: 'Desktop', id: 'iTunes', name: 'iTunes' });
  }

  async getTrack() {
    const track = await getiTunesNowPlayingMac();
    return track;
  }
}

export default iTunesHandler;
