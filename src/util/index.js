const { readFile, writeFile } = require('fs').promises;
const { join } = require('path');
const { platform } = require('os');
const { exec } = require('child_process');
import Registry from 'winreg';

const installPaths = {
  chrome: {
    darwin:
      '~/Library/Application Support/Google/Chrome/NativeMessagingHosts/com.flyinglawnmower.obsnp.json',
    linux: ''
  },
  firefox: {
    darwin:
      '~/Library/Application Support/Mozilla/NativeMessagingHosts/com.flyinglawnmower.obsnp.json.json',
    linux: '~/.mozilla/native-messaging-hosts/<name>.json'
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
        '\\Software\\Microsoft\\Windows\\CurrentVersion\\Explorer\\FileExts\\.html\\UserChoice\\Progid'
    });

    defaultBrowserRegKey.values((err, items) => {
      if (err) {
        return reject(err);
      }
      if (typeof browsers[items] !== 'undefined') {
        return resolve(items);
      }

      reject(new Error('Default browser not supported.'));
    });
  });
};

const getDefaultBrowserLinux = () => {
  // TBD
};

export const writeConfig = async ({ browser }) => {
  if (platform() === 'darwin' || platform() === 'linux') {
    await writeFile(
      installPaths[browser][platform()],
      await readFile(join(__static, '/com.flyinglawnmower.obsnp.json'))
    );
  } else if (platform() === 'win32') {
    await writeFile(
      installPaths[browser].macos,
      await readFile(join(__static, '/com.flyinglawnmower.obsnp.json'))
    );
  }
};

export const copyNativeExecutable = async () => {
  const nativeHelperNames = {
    darwin: 'native-helper-macos',
    linux: 'native-helper-linux',
    win32: 'native-helper.exe'
  };

  const exeName = nativeHelperNames[platform()];
  if (typeof exeName === 'undefined') {
    throw new Error('Platform not supported.');
  }

  await writeFile(
    `./.config/${nativeHelperNames[platform()]}`,
    await readFile(
      join(__static, `/native-exes/${nativeHelperNames[platform()]}`)
    )
  );
};
