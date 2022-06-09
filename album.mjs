function Album() {
  this.album = [];
}

Album.prototype.deleteSong = function (...idList) {
  idList.forEach((id) => {
    this.album = this.album.filter((item) => item.id !== id);
  });
};

Album.prototype.sortSongs = function (direct = "asc") {
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

Album.prototype.showPlaylist = function () {
  console.log(this.album);
};

Album.prototype.showFavoriteSongs = function (favorite = false) {
  favorite
    ? console.log(this.album.filter((song) => song.favorite))
    : console.log(this.album.filter((song) => !song.favorite));
};

Album.prototype.showOneForSinger = function () {
  let alToShow = this.album.reduce((newAlbum, current) => {
    if (!newAlbum.some((x) => x.singer === current.singer)) {
      newAlbum.push(current);
    }
    return newAlbum;
  }, []);
  console.log(alToShow);
};

Album.prototype.addSongs = function (...songs) {
  this.album.push(...songs);
};

export default Album;
