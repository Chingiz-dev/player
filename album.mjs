class Album {
  album = [];

  deleteSong = function (...idList) {
    idList.forEach((id) => {
      this.album = this.album.filter((item) => item.id !== id);
    });
  };
  
  sortSongs = function (direct = "asc") {
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
  
  showPlaylist = function () {
    console.log(this.album);
  };
  
  showFavoriteSongs = function (favorite = false) {
    favorite
      ? console.log(this.album.filter((song) => song.favorite))
      : console.log(this.album.filter((song) => !song.favorite));
  };
  
  showOneForSinger = function () {
    let alToShow = this.album.reduce((newAlbum, current) => {
      if (!newAlbum.some((x) => x.singer === current.singer)) {
        newAlbum.push(current);
      }
      return newAlbum;
    }, []);
    console.log(alToShow);
  };
  
  addSongs = function (...songs) {
    this.album.push(...songs);
  };
}

export default Album;
