export default class Song {
  id: number;
  url: URL;
  title: string;
  singer: string;
  genre: string;
  favorite: boolean;
  date: Date;

  constructor(
    id: number,
    url: URL,
    singer: string,
    title: string,
    genre: string,
    favorite: boolean = false,
    date: Date = new Date()
  ) {
    this.id = id;
    this.url = url;
    this.title = title;
    this.singer = singer;
    this.genre = genre;
    this.favorite = favorite;
    this.date = date;
  }
}
