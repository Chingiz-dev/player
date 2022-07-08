import Song from "../model/song";

class Playlist {
  name: string = "my playlist"
  playlist: Song[] = [];

  constructor(name: string, songs: Song[]) {
    this.name = name;
    this.playlist = songs;
  }

  deleteSong(...idList: number[]) {
    idList.forEach((id) => {
      this.playlist = this.playlist.filter((item) => item.id !== id);
    });
  }

  sortSongs(direct = "asc") {
    if (direct === "asc") {
      this.playlist.sort((a, b) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );
    } else {
      this.playlist.sort((a, b) =>
        a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      );
    }
  }
  
  toggleFavorite(id: number): void {
    let objIndex = this.playlist.findIndex((obj => obj.id == id));
    this.playlist[objIndex].favorite = !this.playlist[objIndex].favorite;
  };

  getFavoriteSongs(): Song[] {
    return this.playlist.filter((song) => song.favorite);
  }

  getNotFavoriteSongs(): Song[] {
    return this.playlist.filter((song) => !song.favorite);
  }

  public getOneForSinger(): Song[] {
    return this.playlist.reduce((newplaylist: Song[], current) => {
      if (!newplaylist.some((x: Song) => x.singer === current.singer)) {
        newplaylist.push(current);
      }
      return newplaylist;
    }, []);
  }

  addSongs(...songs: Song[]): void {
    this.playlist.push(...songs);
  }

}

export default Playlist;
