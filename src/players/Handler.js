class PlayerHandler {
  constructor({ name, os, source, id }) {
    this.name = name;
    this.os = os;
    this.source = source;
    this.id = id;
  }

  getTrack() {
    throw new TypeError('Must override method.');
  }
}

export default PlayerHandler;
