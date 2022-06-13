import Album from "./modules/album.mjs";
import Song from "./modules/song.mjs";
import DetailedSong from "./modules/detailedSong.mjs";
import songsList from "./db.json" assert { type: "json" };

(function () {
  const myAlbum = new Album();

  // let firstSong = new Song(1, "fugees", "killing me softly", "rap", true);
  // let secondSong = new Song(2, "fugees", "score", "rap", false);
  // let thirdSong = new Song(3, "fugees", "no woman, no cry", "rap", false);
  // let fourthSong = new Song(4, "nirvana", "come as you are", "rock", false);
  // let fifthSong = new Song(5, "metallica", "battery", "heavy metal", true);
  // let sixthSong = new Song(
  //   6,
  //   "metallica",
  //   "master of puppets",
  //   "heavy metal",
  //   false
  // );
  // let seventhSong = new Song(7, "nirvana", "come as you are", "rock", false);
  // let eighthSong = new Song(8, "metallica", "battery", "heavy metal", true);
  // let ninthSong = new DetailedSong(
  //   220,
  //   "tequilla",
  //   8,
  //   "the champs",
  //   "tequila song",
  //   "jazz",
  //   false
  // );
  // let songsL = JSON.stringify([firstSong, secondSong, thirdSong, fourthSong, fifthSong, sixthSong, seventhSong, eighthSong, ninthSong]);
  
  let songsObj = songsList.map((s) => {
    return s.duration 
    ? new DetailedSong(s.duration, s.lyrics, s.id, s.singer, s.title, s.genre, s.favorite, s.date = new Date())
    : new Song(s.id, s.singer, s.title, s.genre, s.favorite, s.date = new Date());
  });

  myAlbum.addSongs(...songsObj);
  myAlbum.sortSongs();
  myAlbum.sortSongs("des");
  myAlbum.showPlaylist();
  myAlbum.deleteSong(1, 3);
  myAlbum.showPlaylist();
  myAlbum.showFavoriteSongs(1);
  myAlbum.showFavoriteSongs();
  myAlbum.showOneForSinger();
  myAlbum.playAlbum();
})();
