export default class Song {
  constructor(id, singer, title, genre, favorite, date = new Date()) {
    this.id = id;
    this.title = title;
    this.singer = singer;
    this.genre = genre;
    this.favorite = favorite;
    this.date = date;
  }
  playSong() {
    console.log(`${this.title} is performed by ${this.singer}`);
  }
}