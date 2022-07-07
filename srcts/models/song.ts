export default class Song {
  public id: number;
  public url: URL;
  public title: string;
  public singer: string;
  public genre: string;
  private _favorite: boolean;
  public date: Date;

  public get favorite(): boolean {
    return this._favorite;
  }

  public set favorite(theFavorite: boolean) {
    this._favorite = theFavorite;
  }

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
    this.url = new URL(url);
    this.title = title;
    this.singer = singer;
    this.genre = genre;
    this._favorite = favorite;
    this.date = date;
  }
}
