import Song from "./song.mjs";

export default class DetailedSong extends Song {
  // constructor(id, singer, title, genre, favorite, date = new Date()) {
  constructor(duration, lyrics, ...args) {
    super(...args);
    this.duration = duration;
    this.lyrics = lyrics;
  }
  playSong() {
    console.log(`${this.title} is performed by ${this.singer}, songs duration is ${this.duration}`);
  }
}
