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

export const createDefaultConfig = () => {
  return new Promise((resolve, reject) => {
    const dataDirPath = join(remote.app.getPath('userData'), 'data');
    const defaultConfigFilePath = join(dataDirPath, 'nowplaying.txt');

    mkdirp(dataDirPath, async (e) => {
      if (e) {
        console.log(e);
        return reject(e);
      }

      try {
        await writeFile(defaultConfigFilePath, '', {
          flag: 'wx'
        });
      } catch (e) {
        console.log(
          "Couldn't write default config file. It probably already exists: ",
          e
        );
      } finally {
        resolve(defaultConfigFilePath);
      }
    });
  });
};
