class Player {
  name = "my playlist"
  playlist = [];

  constructor(name, songs) {
    this.name = name;
    this.playlist = songs;
  }

  deleteSong(...idList) {
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

  showPlaylist() {
    console.log(this.playlist);
  }

  getFavoriteSongs() {
    return this.playlist.filter((song) => song.favorite);
  }

  getNotFavoriteSongs() {
    return this.playlist.filter((song) => !song.favorite);
  }

  getOneForSinger() {
    return this.playlist.reduce((newplaylist, current) => {
      if (!newplaylist.some((x) => x.singer === current.singer)) {
        newplaylist.push(current);
      }
      return newplaylist;
    }, []);
  }

  addSongs(...songs) {
    this.playlist.push(...songs);
  }

  // playplaylist() {
  //   this.playlist.forEach((song) => song.playSong());
  // }
}

export default Player;
