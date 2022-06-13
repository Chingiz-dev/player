class Album {
  album = [];

  constructor(...songs) {
    this.album.push(...songs);
  }

  deleteSong(...idList) {
    idList.forEach((id) => {
      this.album = this.album.filter((item) => item.id !== id);
    });
  }

  sortSongs(direct = "asc") {
    if (direct === "asc") {
      this.album.sort((a, b) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );
    } else {
      this.album.sort((a, b) =>
        a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      );
    }
  }

  showPlaylist() {
    console.log(this.album);
  }

  getFavoriteSongs() {
    return this.album.filter((song) => song.favorite);
  }

  getNotFavoriteSongs() {
    return this.album.filter((song) => !song.favorite);
  }

  getOneForSinger() {
    return this.album.reduce((newAlbum, current) => {
      if (!newAlbum.some((x) => x.singer === current.singer)) {
        newAlbum.push(current);
      }
      return newAlbum;
    }, []);
  }

  addSongs(...songs) {
    this.album.push(...songs);
  }

  playAlbum() {
    this.album.forEach((song) => song.playSong());
  }
}

export default Album;
