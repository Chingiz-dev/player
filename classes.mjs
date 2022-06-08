function Album() {
  this.album = [];

  this.addSong = function (song) {
    this.album.push(song);
  };

  this.deleteSong = function (...idList) {
    idList.forEach((id) => {
      this.album = this.album.filter((item) => item.id !== id);
    });
  };

  this.sortSongs = function (direct = "asc") {
    if (direct === "asc") {
      this.album.sort((a, b) =>
        a.title > b.title ? 1 : a.title < b.title ? -1 : 0
      );
    } else {
      this.album.sort((a, b) =>
        a.title < b.title ? 1 : a.title > b.title ? -1 : 0
      );
    }
  };

  this.showPlaylist = function () {
    console.log(this.album);
  };

  this.showFavoriteSongs = function (favorite = false) {
    favorite
      ? console.log(this.album.filter((song) => song.favorite))
      : console.log(this.album.filter((song) => !song.favorite));
  };

  this.showOneForSinger = function () {
    let alToShow = this.album.reduce((newAlbum, current) => {
      if (!newAlbum.some((x) => x.singer === current.singer)) {
        newAlbum.push(current);
      }
      return newAlbum;
    }, []);
    console.log(alToShow);
  };
}

function Song(id, singer, title, genre, favorite) {
  this.id = id;
  this.title = title;
  this.date = Date();
  this.singer = singer;
  this.genre = genre;
  this.favorite = favorite;
}

export { Album, Song };