export default function Song(id, singer, title, genre, favorite, date = new Date()) {
  this.id = id;
  this.title = title;
  this.singer = singer;
  this.genre = genre;
  this.favorite = favorite;
  this.date = date;
}