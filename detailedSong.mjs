import Song from "./song.mjs";

export default class DetailedSong extends Song {
  // constructor(id, singer, title, genre, favorite, date = new Date()) {
  constructor(duration, lyrics, ...args) {
    super(...args);
    this.duration = duration;
    this.lyrics = lyrics;
  }
}
