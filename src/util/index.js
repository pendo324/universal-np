import { remote } from 'electron';

const mkdirp = require('mkdirp');

const { join } = require('path');
const { readFile, writeFile } = require('fs').promises;

export const copyWindowsScripts = () => {
  return new Promise((resolve, reject) => {
    const path = join(
      remote.app.getPath('userData'),
      'windows_runtime_scripts'
    );

    mkdirp(path, async (e) => {
      if (e) {
        console.log(e);
        return reject(e);
      }

      await Promise.all(
        ['getTrack_iTunes.ps1'].map(async (f) => {
          return await writeFile(
            join(path, f),
            await readFile(join(__static, '/windows_runtime_scripts/', f))
          );
        })
      );

      resolve();
    });
  });
};
