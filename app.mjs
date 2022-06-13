import Album from "./album.mjs";
import Song from "./song.mjs";
import DetailedSong from "./detailedSong.mjs";

(function () {
  const myAlbum = new Album();

  let firstSong = new Song(1, "fugees", "killing me softly", "rap", true);
  let secondSong = new Song(2, "fugees", "score", "rap", false);
  let thirdSong = new Song(3, "fugees", "no woman, no cry", "rap", false);
  let fourthSong = new Song(4, "nirvana", "come as you are", "rock", false);
  let fifthSong = new Song(5, "metallica", "battery", "heavy metal", true);
  let sixthSong = new Song(
    6,
    "metallica",
    "master of puppets",
    "heavy metal",
    false
  );
  let seventhSong = new Song(7, "nirvana", "come as you are", "rock", false);
  let eighthSong = new Song(8, "metallica", "battery", "heavy metal", true);
  let ninthSong = new DetailedSong(
    220,
    "tequilla",
    8,
    "the champs",
    "tequila song",
    "jazz",
    false
  );

  myAlbum.addSongs(firstSong, secondSong, thirdSong);
  myAlbum.addSongs(fourthSong, fifthSong, sixthSong, seventhSong);
  myAlbum.addSongs(eighthSong, ninthSong);

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
