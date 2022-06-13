import Album from "./modules/album.mjs";
import Song from "./modules/song.mjs";
import DetailedSong from "./modules/detailedSong.mjs";
import songsList from "./db.json" assert { type: "json" };

(function () {
  
  let songsObj = songsList.map((s) => {
    return s.duration 
    ? new DetailedSong(s.duration, s.lyrics, s.id, s.singer, s.title, s.genre, s.favorite, s.date = new Date())
    : new Song(s.id, s.singer, s.title, s.genre, s.favorite, s.date = new Date());
  });
  
  const myAlbum = new Album(...songsObj);

  myAlbum.sortSongs();
  myAlbum.sortSongs("des");
  myAlbum.showPlaylist();

  myAlbum.deleteSong(1, 3);
  myAlbum.showPlaylist();

  let favor = myAlbum.getFavoriteSongs();
  const favoriteSongs = new Album(...favor);
  favoriteSongs.showPlaylist();

  const notFavorAlbum = new Album(...myAlbum.getNotFavoriteSongs());
  notFavorAlbum.showPlaylist();

  const reducesAlbum = new Album(...myAlbum.getOneForSinger());
  reducesAlbum.showPlaylist();

  myAlbum.playAlbum();
})();
