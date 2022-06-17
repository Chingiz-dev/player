import Song from "./song.mjs";

export default class DetailedSong extends Song {
  // constructor(id, singer, title, genre, favorite, date = new Date()) {
  constructor(duration, desc, ...args) {
    super(...args);
    this.duration = duration;
    this.desc = desc;
  }
  playSong() {
    console.log(`${this.title} is performed by ${this.singer}, songs duration is ${this.duration}`);
  }
}
