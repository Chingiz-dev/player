export default function Song(id, singer, title, genre, favorite) {
  this.id = id;
  this.title = title;
  this.date = Date();
  this.singer = singer;
  this.genre = genre;
  this.favorite = favorite;
}