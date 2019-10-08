import { remote } from 'electron';

const mkdirp = require('mkdirp');
const Registry = require('winreg');

const { join } = remote.require('path');
const { platform } = remote.require('os');
const { exec } = remote.require('child_process');
const fs = remote.require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

const installPaths = {
  chrome: {
    darwin:
      '~/Library/Application Support/Google/Chrome/NativeMessagingHosts/obsnp@flyinglawnmower.com',
    linux: ''
  },
  firefox: {
    darwin:
      '~/Library/Application Support/Mozilla/NativeMessagingHosts/obsnp@flyinglawnmower.com',
    linux: '~/.mozilla/native-messaging-hosts/obsnp@flyinglawnmower.com'
  }
};

export const getDefaultBrowser = async () => {
  if (platform() === 'darwin') {
    return await getDefaultBrowserMac();
  } else if (platform() === 'win32') {
    return await getDefaultBrowserWindows();
  } else if (platform() === 'linux') {
    return await getDefaultBrowserLinux();
  }
};

export const getDefaultBrowserMac = () => {
  const browsers = {
    'com.google.chrome': 'chrome',
    'org.mozilla.firefox': 'firefox'
  };

  return new Promise((resolve, reject) => {
    exec(
      `
x=~/Library/Preferences/com.apple.LaunchServices/com.apple.launchservices.secure.plist; \
plutil -convert xml1 $x; \
grep 'https' -b3 $x | awk 'NR==2 {split($2, arr, "[><]"); print arr[3]}'; \
plutil -convert binary1 $x`,
      (err, stdout) => {
        if (err) {
          return reject(err);
        }

        const parsed = stdout.trim();

        if (typeof browsers[parsed] !== 'undefined') {
          return resolve(browsers[parsed]);
        }

        reject(new Error('Default browser not supported.'));
      }
    );
  });
};

const getDefaultBrowserWindows = () => {
  const browsers = {
    FirefoxHTML: 'firefox',
    ChromeHTML: 'chrome'
  };

  return new Promise((resolve, reject) => {
    const defaultBrowserRegKey = new Registry({
      hive: Registry.HKCU,
      key:
        '\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice'
    });

    defaultBrowserRegKey.values((err, items) => {
      if (err) {
        return reject(err);
      }

      const defaultBrowserRegItem = items.find((r) => r.name === 'ProgId');
      if (defaultBrowserRegItem !== null) {
        const browser = Object.keys(browsers).find((b) => {
          if (defaultBrowserRegItem.value.startsWith(b)) {
            return browsers[b];
          }
          return false;
        });
        if (browsers[browser] !== null) {
          return resolve(browsers[browser]);
        }
      }

      reject(new Error('Default browser not supported.'));
    });
  });
};

const getDefaultBrowserLinux = () => {
  // TBD
};

export const writeConfig = ({ browser }) => {
  return new Promise(async (resolve, reject) => {
    const fileNameEnding = () => {
      if (platform() === 'macos' || platform() === 'linux') {
        return `-${platform()}`;
      } else if (platform() === 'win32') {
        return '.exe';
      }
    };

    const path = join(
      remote.app.getPath('userData'),
      'native-exes',
      `native-helper${fileNameEnding()}`
    );

    const baseConfig = () => {
      return {
        name: 'com.flyinglawnmower.obsnp',
        description: 'Now Playing Helper',
        path,
        type: 'stdio'
      };
    };

    const config = () => {
      if (browser === 'chrome') {
        return {
          ...baseConfig(),
          allowed_origins: [
            'chrome-extension://aocghdlnkcebaipehcejjpeiijpdjldo/'
          ]
        };
      } else if (browser === 'firefox') {
        return {
          ...baseConfig(),
          allowed_extensions: ['obsnp@flyinglawnmower.com']
        };
      }
    };

    if (platform() !== 'win32') {
      await writeFile(
        installPaths[browser][platform()],
        await JSON.stringify(config())
      );
    } else {
      // add key to registry
      if (browser === 'firefox') {
        const regKey = new Registry({
          hive: Registry.HKCU,
          key: '\\Software\\Mozilla\\NativeMessagingHosts'
        });

        regKey.set(
          'obsnp@flyinglawnmower.com',
          Registry.REG_SZ,
          path,
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      } else if (browser === 'chrome') {
        const regKey = new Registry({
          hive: Registry.HKCU,
          key: '\\Software\\Google\\Chrome\\NativeMessagingHosts'
        });

        regKey.set(
          'com.flyinglawnmower.obsnp',
          Registry.REG_SZ,
          path,
          (err) => {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      }
    }
  });
};

export const copyNativeExecutable = () => {
  const nativeHelperNames = {
    darwin: ['native-helper-macos'],
    linux: ['native-helper-linux'],
    win32: [
      'native-helper.exe',
      'libcurl-d.dll',
      'LIBEAY32.dll',
      'libssh2.dll',
      'SSLEAY32.dll',
      'zlibd1.dll'
    ]
  };

  return new Promise((resolve, reject) => {
    const exeName = nativeHelperNames[platform()];
    if (typeof exeName === 'undefined') {
      reject(new Error('Platform not supported.'));
    }

    const path = join(remote.app.getPath('userData'), 'native-exes');

    mkdirp(path, async (err) => {
      if (err) {
        return reject(err);
      }
      Promise.all(
        nativeHelperNames[platform()].map(async (f) => {
          await writeFile(
            join(path, f),
            await readFile(join(__static, '/native-exes/', f))
          );
        })
      );

      resolve();
    });
  });
};

export const copyWindowsScripts = () => {
  return new Promise((resolve, reject) => {
    const path = join(remote.app.getPath('userData'), 'JScripts');

    mkdirp(path, async (e) => {
      if (e) {
        console.log(e);
        return reject(e);
      }

      await Promise.all(
        ['getTrack_iTunes.js'].map(async (f) => {
          return await writeFile(
            join(path, f),
            await readFile(join(__static, '/JScripts/', f))
          );
        })
      );

      resolve();
    });
  });
};

export const createDataDir = () => {
  return new Promise((resolve, reject) => {
    mkdirp(join(remote.app.getPath('userData'), 'data'), async (err) => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
};
