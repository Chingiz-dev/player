class Album {
  album = [];

  deleteSong(...idList) {
    idList.forEach((id) => {
      this.album = this.album.filter((item) => item.id !== id);
    });
  };
  
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
  };
  
  showPlaylist() {
    console.log(this.album);
  };
  
  showFavoriteSongs(favorite = false) {
    favorite
      ? console.log(this.album.filter((song) => song.favorite))
      : console.log(this.album.filter((song) => !song.favorite));
  };
  
  showOneForSinger() {
    let alToShow = this.album.reduce((newAlbum, current) => {
      if (!newAlbum.some((x) => x.singer === current.singer)) {
        newAlbum.push(current);
      }
      return newAlbum;
    }, []);
    console.log(alToShow);
  };
  
  addSongs(...songs) {
    this.album.push(...songs);
  };
}

export default Album;
