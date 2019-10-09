import Handler from './../Handler';

const defaultOptions = {
  source: 'Web',
  os: ''
};

export class DeezerHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'deezer',
      name: 'deezer'
    });
  }
}

export class GooglePlayHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Google Play',
      name: 'Google Play'
    });
  }
}

export class HypeMachineHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'hypem',
      name: 'Hype Machine'
    });
  }
}

export class MixcloudHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Mixcloud',
      name: 'Mixcloud'
    });
  }
}

export class PandoraHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Pandora',
      name: 'Pandora'
    });
  }
}

export class PlexHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Plex',
      name: 'Plex'
    });
  }
}

export class SoundcloudHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Soundcloud',
      name: 'Soundcloud'
    });
  }
}

export class SpotifyHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'Spotify',
      name: 'Spotify (Web)'
    });
  }
}

export class tuneInHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'tunein',
      name: 'tunein'
    });
  }
}

export class YouTubeHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'YouTube',
      name: 'YouTube'
    });
  }
}

export class bandcampHandler extends Handler {
  constructor() {
    super({
      ...defaultOptions,
      id: 'bandcamp',
      name: 'bandcamp'
    });
  }
}
