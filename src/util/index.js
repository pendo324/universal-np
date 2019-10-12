import { remote } from 'electron';

const mkdirp = require('mkdirp');

const { join } = remote.require('path');
const fs = remote.require('fs');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

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
