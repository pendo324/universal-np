## Universal Now Playing
A now playing tool intended to be used with OBS.

Spiritual successor to [EssentialNowPlaying](https://github.com/pendo324/EssentialNowPlaying)

My reason for rewriting EssentialNowPlaying is because I still wanted to support it, but I no longer had much interest in C#. I know that Electron apps are somewhat controversial (this app takes up ~40MB whereas the C# app took ~10MB), but this is the version that I would rather maintain long-term. There were some nasty bugs in the C# version that I was just not willing to invest the time needed to fix.

The usage of the program remains very similar.

Currently supported:
  - Desktop (Windows [tested], *NIX [untested]):
    * Spotify
    * iTunes
    * VLC
    * MPC-HC
    * MPC-QT (rip)
    * foobar2000
  - WebApps:
    * Mixcloud
    * Spotify web player (play.spotify.com)
    * Soundcloud
    * Tunein
    * YouTube
    * Pandora
    * Google Play (play.google.com)
    * Deezer

Pull requests welcome to add player support. I could also use some Mac/Linux testers.

### Usage
Download the installer from the Releases page. Double click and away you go.

To use the WebApps, you'll need install the companion extension from the web store. Here's a link to it: https://chrome.google.com/webstore/detail/lljahlkpnhdopaegadghfjhhkcpdlijg/.

To use the WebApps you need to do the following:

1. Open Universal Now Playing
2. Select the Player and set the file path in the Settings tab
3. Head to any supported web player
4. Click on the Now Playing Companion Extension and "Use on this page"
5. On the web pop-up click "Start"
6. Go back to Universal Now Playing app and hit "Start"

Be sure that the desktop application is running before activating the extension.

### Contribute
To build, just install the dependencies (`npm i`/`yarn`) and then run the build script, e.g. `npm run electron:build`.

#### Licence
Copyright (c) 2019 Flying Lawnmower Development

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
