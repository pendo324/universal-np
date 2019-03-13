import { remote } from 'electron';
const { platform } = remote.require('os');

export const supportedPlatforms = ['darwin', 'win32'];

const platformHandler = supportedPlatforms.find((p) => platform() === p);

if (typeof platformHandler === 'undefined') {
  throw new Error('Platform not supported.');
}

export default require(`./iTunesHandler_${platformHandler}`).default;
